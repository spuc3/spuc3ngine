<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>SPUC3NGINE PAY - SYSTEM DEPOSIT OTOMATIS TERBAIK</title>
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

        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Rajdhani', sans-serif; }

        body {
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
            padding: 35px 15px;
        }

        .container { width: 100%; max-width: 440px; }

        /* OUTER CARD WITH ROTATING GLOW */
        .outer-card {
            position: relative;
            width: 100%;
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

        .card {
            width: 100%;
            background: var(--card-bg);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            padding: 30px 22px;
            border-radius: 22px;
            display: flex;
            flex-direction: column;
            position: relative;
            z-index: 1;
        }

        /* HEADER & LOGO */
        .header-logo {
            text-align: center;
            margin-bottom: 20px;
        }

        .qris-header-logo {
            height: 38px;
            width: auto;
            filter: drop-shadow(0 0 8px rgba(255,255,255,0.2));
            display: inline-block;
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

        /* RUNNING MARQUEE */
        .marquee-box {
            background: rgba(0, 0, 0, 0.6);
            border: 1px solid rgba(0, 255, 102, 0.2);
            border-radius: 12px;
            padding: 10px;
            margin-bottom: 20px;
            overflow: hidden;
            white-space: nowrap;
        }
        .marquee-box p {
            display: inline-block;
            padding-left: 100%;
            animation: moveText 15s linear infinite;
            color: var(--neon-yellow);
            font-size: 12px;
            font-weight: 700;
        }
        @keyframes moveText {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
        }

        /* TAB SWITCHER */
        .tab-switcher {
            display: flex;
            background: rgba(0, 0, 0, 0.6);
            padding: 4px;
            border-radius: 12px;
            border: 1px solid rgba(0, 255, 102, 0.2);
            margin-bottom: 22px;
            gap: 6px;
        }

        .tab-btn {
            flex: 1;
            padding: 12px 8px;
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

        .deposit-panel { display: none; }
        .deposit-panel.active { display: block; animation: panelFade 0.3s ease both; }

        @keyframes panelFade {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* FORM CONTROLS */
        .form-group {
            display: flex;
            flex-direction: column;
            width: 100%;
            margin-bottom: 18px;
            text-align: left;
        }

        .form-group label {
            font-size: 14px;
            font-weight: 700;
            color: var(--text-white);
            margin-bottom: 8px;
        }

        .input-control {
            width: 100%;
            height: 48px;
            padding: 0 16px;
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 12px;
            font-size: 15px;
            font-weight: 600;
            background: rgba(15, 23, 34, 0.9);
            color: #fff;
            box-sizing: border-box;
            transition: all 0.25s ease;
            outline: none;
        }

        .input-control:focus {
            border-color: var(--neon-green);
            box-shadow: 0 0 12px var(--neon-green-glow);
        }

        select.input-control {
            appearance: none;
            -webkit-appearance: none;
            background-image: url('data:image/svg+xml;utf8,<svg fill="%2300ff66" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
            background-repeat: no-repeat;
            background-position: right 12px center;
        }

        /* BUTTONS */
        .btn {
            width: 100%;
            height: 52px;
            border: none;
            border-radius: 12px;
            font-family: 'Orbitron', sans-serif;
            font-size: 14px;
            font-weight: 900;
            letter-spacing: 1.5px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .btn-primary {
            background: var(--neon-yellow);
            color: #000;
            box-shadow: 0 0 20px var(--neon-yellow-glow);
            margin-top: 6px;
        }

        .btn-primary:hover {
            background: #fff;
            box-shadow: 0 0 25px rgba(255, 255, 255, 0.5);
            transform: translateY(-1px);
        }

        .btn-success {
            background: var(--neon-green);
            color: #000;
            box-shadow: 0 0 20px var(--neon-green-glow);
            margin-top: 18px;
        }

        .btn-success:hover {
            background: #fff;
            box-shadow: 0 0 25px rgba(255, 255, 255, 0.5);
        }

        /* GOPAY CARD */
        .gopay-card {
            background: linear-gradient(135deg, rgba(0, 255, 102, 0.1), rgba(0, 165, 207, 0.05));
            border: 1px solid var(--neon-green);
            border-radius: 14px;
            padding: 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 18px;
            text-align: left;
        }

        .pay-info { display: flex; flex-direction: column; }
        .pay-label { font-family: 'Orbitron', sans-serif; font-size: 11px; font-weight: 800; color: var(--neon-green); }
        .pay-number { font-size: 20px; font-weight: 700; color: #fff; letter-spacing: 0.5px; }
        .pay-name { font-size: 13px; color: var(--neon-yellow); font-weight: 700; }

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

        /* QRIS RESULT DISPLAY (FIXED CENTER) */
        #qris-display { 
            display: none; 
            margin-top: 20px; 
            border-top: 1px dashed rgba(255,255,255,0.12); 
            padding-top: 20px; 
            text-align: center;
            width: 100%;
        }
        
        .info-row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; font-weight: 700; }
        .info-label { color: var(--text-gray); }
        .info-val { color: #fff; }
        .status-pending { color: #ff2a2a; text-shadow: 0 0 8px rgba(255, 42, 42, 0.5); }

        /* PRESISI QR CODE CENTER */
        .qris-image-wrap {
            background: #fff;
            padding: 12px;
            border-radius: 14px;
            display: block;
            margin: 18px auto;
            width: max-content;
            box-shadow: 0 0 25px var(--neon-green-glow);
            border: 2px solid var(--neon-green);
            position: relative;
            overflow: hidden;
        }

        .qris-image-wrap::after {
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

        .qris-image-wrap img { 
            width: 210px; 
            height: 210px; 
            display: block; 
            margin: 0 auto;
        }

        /* LIVECHAT SECTION */
        .livechat-area {
            margin-top: 22px;
            width: 100%;
        }

        .livechat-button {
            background: rgba(0, 0, 0, 0.6);
            border: 1px solid rgba(0, 255, 102, 0.25);
            border-radius: 14px;
            padding: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .livechat-button:hover {
            background: rgba(0, 255, 102, 0.08);
            border-color: var(--neon-yellow);
            box-shadow: 0 0 18px rgba(255, 230, 0, 0.2);
        }

        .livechat-button svg {
            width: 24px;
            height: 24px;
            fill: var(--neon-green);
            filter: drop-shadow(0 0 6px var(--neon-green-glow));
            animation: iconPulse 1.5s infinite alternate;
        }

        @keyframes iconPulse {
            0% { transform: scale(0.95); opacity: 0.8; }
            100% { transform: scale(1.1); opacity: 1; fill: var(--neon-yellow); }
        }

        .livechat-details { display: flex; flex-direction: column; text-align: left; }
        .livechat-details .main-title-lc {
            font-family: 'Orbitron', sans-serif;
            font-weight: 900;
            font-size: 12px;
            color: var(--neon-green);
            letter-spacing: 1px;
        }
        .livechat-details .sub-title-lc { font-size: 11px; color: var(--text-gray); margin-top: 1px; }

        /* GUIDELINES BOX */
        .tutorial {
            background: var(--panel-inner);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            padding: 20px;
            margin-top: 20px;
            text-align: left;
        }

        .tutorial h4 {
            color: var(--neon-yellow);
            font-family: 'Orbitron', sans-serif;
            font-size: 14px;
            font-weight: 800;
            margin-bottom: 12px;
        }

        .tutorial ol {
            margin: 0;
            padding-left: 18px;
            color: #cbd5e1;
            font-size: 13.5px;
            line-height: 1.6;
            font-weight: 600;
        }

        .tutorial ol li { margin-bottom: 4px; }

        /* TOKOPAY BANNER */
        .payment-banner-container {
            margin-top: 22px;
            width: 100%;
            background: #ffffff;
            border-radius: 10px;
            padding: 8px 12px;
            box-sizing: border-box;
            box-shadow: 0 0 12px rgba(255, 255, 255, 0.15);
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .payment-banner-img {
            max-width: 85%;
            max-height: 55px;
            width: auto;
            height: auto;
            display: block;
            object-fit: contain;
        }

        /* OVERLAY LOADER */
        .overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(4, 7, 10, 0.9);
            display: none; align-items: center; justify-content: center;
            z-index: 100; flex-direction: column;
        }
        .spinner {
            width: 45px; height: 45px;
            border: 4px solid rgba(0, 255, 102, 0.1);
            border-top: 4px solid var(--neon-green);
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            margin-bottom: 15px;
        }
        @keyframes spin { 100% { transform: rotate(360deg); } }
    </style>
</head>
<body>

<div class="container">
    <div class="outer-card">
        <div class="card">
            
            <div class="header-logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/QRIS_logo.svg/960px-QRIS_logo.svg.png" alt="QRIS Logo" class="qris-header-logo">
                <div class="brand-title"><span>SPUC3NGINE</span> <span class="yellow-txt">PAY</span></div>
            </div>

            <div class="marquee-box">
                <p>Gunakan QRIS atau GoPay untuk proses deposit instant 24 jam. Pastikan nominal sesuai dengan yang tertera di layar untuk menghindari keterlambatan proses otomatis.</p>
            </div>

            <!-- TAB MENU -->
            <div class="tab-switcher">
                <button class="tab-btn active" onclick="switchTab('qris-panel', this)">Otomatis QRIS</button>
                <button class="tab-btn" onclick="switchTab('manual-panel', this)">Manual GoPay</button>
            </div>

            <!-- PANEL 1: OTOMATIS QRIS -->
            <div id="qris-panel" class="deposit-panel active">
                <div id="form-input">
                    <div class="form-group">
                        <label>Nominal Deposit (Rp)</label>
                        <input type="text" id="input-nominal" class="input-control" placeholder="Contoh: 50.000" oninput="formatRupiahInput(this)">
                    </div>

                    <div class="form-group">
                        <label>Pilih Bonus Promosi</label>
                        <select id="input-bonus" class="input-control">
                            <option value="Tanpa Bonus">Tanpa Bonus (Default)</option>
                            <option value="Bonus 300k Get 3Jt">Bonus Deposit 300k Get 3Jt</option>
                            <option value="Bonus 500k Get 5Jt">Bonus Deposit 500k Get 5Jt</option>
                            <option value="Bonus 800k Get 8Jt">Bonus Deposit 800k Get 8Jt</option>
                            <option value="Garansi Kekalahan 100%">Bonus Garansi Kekalahan 100%</option>
                            <option value="X2 To X2">X2 To X2</option>
                        </select>
                    </div>

                    <button class="btn btn-primary" onclick="generateQris()">Buat QRIS Sekarang</button>
                </div>

                <!-- HASIL GENERATE QRIS -->
                <div id="qris-display">
                    <div class="info-row">
                        <span class="info-label">Status</span>
                        <span class="info-val status-pending">● PENDING</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Nominal</span>
                        <span class="info-val" id="res-nominal">Rp 0</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Bonus</span>
                        <span class="info-val" id="res-bonus">-</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Exp. Time</span>
                        <span class="info-val" id="countdown" style="color:var(--neon-yellow)">03:00</span>
                    </div>

                    <div class="qris-image-wrap">
                        <img id="img-qris" src="" alt="QRIS Code">
                    </div>

                    <button class="btn btn-success" onclick="confirmPayment()">SAYA TELAH MEMBAYAR</button>
                </div>
            </div>

            <!-- PANEL 2: MANUAL GOPAY -->
            <div id="manual-panel" class="deposit-panel">
                <div class="gopay-card">
                    <div class="pay-info">
                        <span class="pay-label">E-WALLET GOPAY</span>
                        <span class="pay-number" id="target-gopay-num">088294217129</span>
                        <span class="pay-name">A/N ICHWAN</span>
                    </div>
                    <button class="btn-copy" onclick="copyGopayNumber()">SALIN</button>
                </div>

                <div class="form-group">
                    <label>Nominal Transfer (Rp)</label>
                    <input type="text" id="manual-nominal" class="input-control" placeholder="Contoh: 50.000" oninput="formatRupiahInput(this)">
                </div>

                <button class="btn btn-primary" onclick="confirmManualGopay()">KONFIRMASI GOPAY</button>
            </div>

            <!-- LIVECHAT KONSOL KLAIM -->
            <div class="livechat-area">
                <div class="livechat-button" onclick="openLiveChatSystem()">
                    <div style="display: flex; align-items: center;">
                        <svg viewBox="0 0 24 24">
                            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
                        </svg>
                    </div>
                    <div class="livechat-details">
                        <span class="main-title-lc">HUBUNGI LIVECHAT</span>
                        <span class="sub-title-lc">Konfirmasi / Klaim Deposit via Livechat 24 Jam</span>
                    </div>
                </div>
            </div>

            <!-- PANDUAN -->
            <div class="tutorial">
                <h4>Panduan Pembayaran:</h4>
                <ol>
                    <li>Buka aplikasi Bank atau E-Wallet (Dana, Ovo, GoPay, dll).</li>
                    <li>Pilih fitur "Scan" atau "Bayar".</li>
                    <li>Arahkan kamera ke kode QRIS di atas.</li>
                    <li>Masukkan nominal sesuai tagihan dan selesaikan transaksi.</li>
                </ol>
            </div>

            <!-- TOKOPAY BANNER -->
            <div class="payment-banner-container">
                <img src="https://tokopay.id/assets/img/list-payment.png" class="payment-banner-img" alt="Payment Methods">
            </div>

        </div>
    </div>
</div>

<div class="overlay" id="loading">
    <div class="spinner"></div>
    <p style="font-size: 14px; font-family: 'Orbitron', sans-serif; letter-spacing: 1px; color: var(--neon-green);">Membuat QRIS...</p>
</div>

<script>
    // STRING QRIS STATIS ASLI GOPAY KAMU
    const RAW_STATIC_QRIS = "00020101021126610014COM.GO-JEK.WWW01189360091438288678500210G8288678500303UKE51440014ID.CO.QRIS.WWW0215ID10254600521900303UKE5204753853033605802ID5920SPUC3NGINE, Otomotif6006BANTUL61055518862070703A0163047E23";

    // FUNGSI FORMATTING DEPOSIT RIBUAN AUTOMATIS (100.000)
    function formatRupiahInput(element) {
        let value = element.value.replace(/[^0-9]/g, "");
        if (value === "") {
            element.value = "";
            return;
        }
        element.value = Number(value).toLocaleString("id-ID");
    }

    // HELPER UNTUK MENGAMBIL ANGKA MURNI DARI FORMAT TIKET (100.000 -> 100000)
    function parseAmount(str) {
        return Number(str.replace(/\./g, "") || 0);
    }

    // KALKULATOR CRC16-CCITT (FALSE / 0x1021) STANDAR EMVCo
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

    // PARSER EMVCo TLV (Tag-Length-Value)
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

    // GENERATOR QRIS DINAMIC LOKAL PRESISE
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

    function switchTab(panelId, btnElement) {
        document.querySelectorAll('.deposit-panel').forEach(panel => panel.classList.remove('active'));
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(panelId).classList.add('active');
        btnElement.classList.add('active');
    }

    function generateQris() {
        const rawNominal = document.getElementById('input-nominal').value;
        const amount = parseAmount(rawNominal);
        const bonus = document.getElementById('input-bonus').value;

        if (!amount || amount < 50000) {
            alert("Minimal deposit Rp 50.000");
            return;
        }

        document.getElementById('loading').style.display = 'flex';

        setTimeout(() => {
            const dynamicQrPayload = generateDynamicQRIS(RAW_STATIC_QRIS, amount);
            const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(dynamicQrPayload)}`;

            document.getElementById('img-qris').src = qrImageUrl;
            document.getElementById('res-nominal').innerText = "Rp " + amount.toLocaleString('id-ID');
            document.getElementById('res-bonus').innerText = bonus;
            
            document.getElementById('form-input').style.display = 'none';
            document.getElementById('qris-display').style.display = 'block';
            document.getElementById('loading').style.display = 'none';
            
            startTimer(180);
        }, 800);
    }

    function startTimer(duration) {
        let timer = duration, minutes, seconds;
        const display = document.getElementById('countdown');
        const interval = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                clearInterval(interval);
                display.textContent = "EXPIRED";
                document.getElementById('img-qris').style.opacity = '0.2';
            }
        }, 1000);
    }

    function copyGopayNumber() {
        const num = document.getElementById('target-gopay-num').textContent;
        navigator.clipboard.writeText(num).then(() => {
            alert("✓ Nomor GoPay Berhasil Disalin!");
        }).catch(() => {
            alert("Gagal menyalin nomor.");
        });
    }

    function confirmManualGopay() {
        const rawNominal = document.getElementById('manual-nominal').value;
        const amount = parseAmount(rawNominal);
        
        if (!amount || amount < 50000) {
            alert("Minimal transfer Rp 50.000");
            return;
        }
        alert("Terima kasih! Konfirmasi pembayaran GoPay Anda sedang diproses.");
        openLiveChatSystem();
    }

    function confirmPayment() {
        alert("Terima kasih! Pembayaran Anda sedang diproses.");
        openLiveChatSystem();
    }

    function openLiveChatSystem() {
        window.open("https://direct.lc.chat/19851307/", "_blank");
    }
</script>

</body>
</html>
