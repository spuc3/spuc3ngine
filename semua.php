<?php

define('RAW_STATIC_QRIS', '00020101021126610014COM.GO-JEK.WWW01189360091430102013260210G0102013260303UMI51440014ID.CO.QRIS.WWW0215ID10243540049380303UMI5204581653033605802ID5923INGGAR SOLUTION, GAMING6013JAKARTA PUSAT61051031062070703A0163049E1D');
define('LIVECHAT_URL', 'https://direct.lc.chat/123213/');
define('MIN_DEPOSIT', 10000);


function calculateCRC16($str) {
    $crc = 0xFFFF;
    $len = strlen($str);
    for ($i = 0; $i < $len; $i++) {
        $c = ord($str[$i]);
        $crc ^= ($c << 8);
        for ($j = 0; $j < 8; $j++) {
            if (($crc & 0x8000) !== 0) {
                $crc = (($crc << 1) ^ 0x1021) & 0xFFFF;
            } else {
                $crc = ($crc << 1) & 0xFFFF;
            }
        }
    }
    return strtoupper(str_pad(dechex($crc), 4, '0', STR_PAD_LEFT));
}


function parseTLV($qrisStr) {
    $tags = [];
    $pos = 0;
    $maxLen = strlen($qrisStr);

    while ($pos < $maxLen) {
        if ($pos + 4 > $maxLen) break;
        $tag = substr($qrisStr, $pos, 2);
        $len = intval(substr($qrisStr, $pos + 2, 2));
        if ($len <= 0 || ($pos + 4 + $len) > $maxLen) break;
        $value = substr($qrisStr, $pos + 4, $len);
        
        $tags[] = ['tag' => $tag, 'len' => $len, 'value' => $value];
        $pos += 4 + $len;
    }
    return $tags;
}



function generateDynamicQRIS($baseQr, $amount) {
    $tags = parseTLV(trim($baseQr));
    
    
    $filteredTags = array_filter($tags, function($item) {
        return $item['tag'] !== '63' && $item['tag'] !== '54';
    });

    $amtStr = (string)$amount;
    $tag54 = [
        'tag'   => '54',
        'len'   => strlen($amtStr),
        'value' => $amtStr
    ];

    // Sisipkan Tag 54 di tempat yang tepat
    $newTags = [];
    $inserted = false;
    foreach ($filteredTags as $item) {
        $newTags[] = $item;
        if ($item['tag'] === '53' && !$inserted) {
            $newTags[] = $tag54;
            $inserted = true;
        }
    }
    
    if (!$inserted) {
        // Jika tag 53 tidak ditemukan, cari tag 58 atau taruh di akhir
        $temp = [];
        foreach ($newTags as $item) {
            if ($item['tag'] === '58' && !$inserted) {
                $temp[] = $tag54;
                $inserted = true;
            }
            $temp[] = $item;
        }
        if (!$inserted) $temp[] = $tag54;
        $newTags = $temp;
    }

    // Build payload string
    $payload = "";
    foreach ($newTags as $item) {
        $lenStr = str_pad($item['len'], 2, '0', STR_PAD_LEFT);
        $payload .= $item['tag'] . $lenStr . $item['value'];
    }

    $payload .= "6304";
    $checksum = calculateCRC16($payload);
    
    return $payload . $checksum;
}


$errorMsg = "";
$qrisUrl = "";
$finalAmount = 0;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = $_POST['nominal'] ?? '';
   
    $cleanAmount = (int)preg_replace('/[^0-9]/', '', $rawInput);

    if ($cleanAmount < MIN_DEPOSIT) {
        $errorMsg = "MINIMAL DEPOSIT RP " . number_format(MIN_DEPOSIT, 0, ',', '.');
    } else {
        $finalAmount = $cleanAmount;
        $payload = generateDynamicQRIS(RAW_STATIC_QRIS, $finalAmount);
        $qrisUrl = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" . urlencode($payload);
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>INGGAR PAY - PAYMENT GATEWAY OTOMATIS</title>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600;800;900&family=Rajdhani:wght@600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-core: #05020a;
            --purple-neon: #9d4edd;
            --purple-light: #c77dff;
            --purple-glow: rgba(157, 78, 221, 0.5);
            --purple-dark: #3c096c;
            --text-white: #ffffff;
            --text-muted: #a0a0ab;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Rajdhani', sans-serif;
            background-color: var(--bg-core);
            background-image: 
                radial-gradient(circle at 50% 10%, rgba(157, 78, 221, 0.25), transparent 60%),
                linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
            background-size: 100% 100%, 30px 30px, 30px 30px;
            animation: gridMove 20s linear infinite;
            color: var(--text-white);
            min-height: 100vh;
            width: 100vw;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
            overflow-x: hidden;
        }

        @keyframes gridMove {
            0% { background-position: 0 0, 0 0, 0 0; }
            100% { background-position: 0 0, 0 30px, 30px 0; }
        }

        .card-outer {
            position: relative;
            width: 100%;
            max-width: 560px;
            border-radius: 24px;
            padding: 1.5px;
            background: transparent;
            overflow: hidden;
            box-shadow: 0 0 50px rgba(157, 78, 221, 0.3), 0 30px 90px rgba(0, 0, 0, 0.98);
        }

        .card-outer::before {
            content: '';
            position: absolute;
            top: -50%; left: -50%;
            width: 200%; height: 200%;
            background: conic-gradient(
                from 0deg,
                transparent 0deg,
                var(--purple-neon) 120deg,
                transparent 180deg,
                #ffffff 300deg,
                transparent 360deg
            );
            animation: rotateGlow 4s linear infinite;
            z-index: 0;
        }

        @keyframes rotateGlow {
            100% { transform: rotate(360deg); }
        }

        .app-wrapper {
            position: relative;
            z-index: 1;
            width: 100%;
            background: rgba(12, 8, 20, 0.94);
            backdrop-filter: blur(30px);
            -webkit-backdrop-filter: blur(30px);
            border-radius: 23px;
            padding: 32px 26px;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .top-header {
            text-align: center;
            border-bottom: 1px dashed rgba(157, 78, 221, 0.3);
            padding-bottom: 20px;
        }

        .header-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-family: 'Orbitron', sans-serif;
            font-size: 11px;
            font-weight: 900;
            color: #fff;
            background: linear-gradient(90deg, var(--purple-neon), var(--purple-dark));
            padding: 6px 16px;
            border-radius: 20px;
            letter-spacing: 2px;
            text-transform: uppercase;
            margin-bottom: 12px;
            box-shadow: 0 0 20px var(--purple-glow);
            animation: pulseBadge 2s infinite alternate;
        }

        @keyframes pulseBadge {
            0% { transform: scale(0.98); box-shadow: 0 0 10px var(--purple-glow); }
            100% { transform: scale(1.02); box-shadow: 0 0 25px var(--purple-neon); }
        }

        .brand-title {
            font-family: 'Orbitron', sans-serif;
            font-size: 28px;
            font-weight: 900;
            color: #fff;
            letter-spacing: 2px;
        }

        .brand-title span {
            color: var(--purple-neon);
            text-shadow: 0 0 15px var(--purple-glow);
        }

        .sub-title {
            font-size: 13px;
            color: var(--text-muted);
            margin-top: 6px;
            font-weight: 700;
            letter-spacing: 0.5px;
        }

        .form-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .form-group label {
            font-size: 13px;
            font-weight: 800;
            color: var(--purple-light);
            text-transform: uppercase;
            letter-spacing: 1.5px;
            font-family: 'Orbitron', sans-serif;
        }

        .form-control {
            width: 100%;
            padding: 18px;
            background: rgba(5, 2, 10, 0.85);
            border: 1.5px solid rgba(157, 78, 221, 0.4);
            border-radius: 12px;
            color: #fff;
            font-size: 22px;
            font-weight: 800;
            font-family: 'Rajdhani', sans-serif;
            outline: none;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .form-control:focus {
            border-color: var(--purple-neon);
            box-shadow: 0 0 20px var(--purple-glow);
            background: #000;
        }

        .btn-pay {
            position: relative;
            width: 100%;
            padding: 18px;
            background: linear-gradient(135deg, #ffffff 0%, var(--purple-neon) 40%, var(--purple-dark) 100%);
            border: none;
            border-radius: 12px;
            color: #ffffff;
            font-family: 'Orbitron', sans-serif;
            font-size: 15px;
            font-weight: 900;
            letter-spacing: 2px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            box-shadow: 0 0 25px var(--purple-glow);
            overflow: hidden;
        }

        .btn-pay:hover {
            transform: translateY(-2px);
            box-shadow: 0 0 40px rgba(157, 78, 221, 0.8);
        }

        .btn-livechat {
            width: 100%;
            padding: 15px;
            background: rgba(5, 2, 10, 0.6);
            border: 1.5px solid var(--purple-neon);
            border-radius: 12px;
            color: var(--purple-light);
            font-family: 'Orbitron', sans-serif;
            font-size: 13px;
            font-weight: 800;
            letter-spacing: 1.5px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            text-decoration: none;
        }

        .btn-livechat:hover {
            background: var(--purple-neon);
            color: #fff;
            box-shadow: 0 0 25px var(--purple-glow);
        }

        .guide-box {
            background: rgba(5, 2, 10, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-left: 4px solid var(--purple-neon);
            border-radius: 10px;
            padding: 18px;
        }

        .guide-title {
            font-family: 'Orbitron', sans-serif;
            font-size: 13px;
            color: var(--purple-light);
            font-weight: 800;
            margin-bottom: 10px;
            letter-spacing: 1px;
        }

        .guide-list {
            padding-left: 20px;
            color: var(--text-muted);
            font-size: 14px;
            line-height: 1.6;
            font-weight: 600;
        }

        .qr-wrapper {
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;
            margin-top: 5px;
            animation: fadeIn 0.4s ease-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .qr-card {
            background: #ffffff;
            padding: 16px;
            border-radius: 18px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .qr-card img {
            width: 240px;
            height: 240px;
            display: block;
            border-radius: 8px;
        }

        .amount-box {
            background: rgba(5, 2, 10, 0.85);
            border: 1px solid rgba(157, 78, 221, 0.4);
            padding: 14px 20px;
            border-radius: 12px;
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .amount-title {
            font-size: 11px;
            color: var(--text-muted);
            font-family: 'Orbitron', sans-serif;
            letter-spacing: 1px;
        }

        .amount-display {
            font-family: 'Orbitron', sans-serif;
            font-size: 22px;
            color: #ffffff;
            font-weight: 900;
            text-shadow: 0 0 12px var(--purple-glow);
        }

        .action-row {
            display: flex;
            gap: 12px;
            width: 100%;
        }

        .action-row button, .action-row a {
            flex: 1;
            padding: 15px;
            font-family: 'Orbitron', sans-serif;
            font-size: 12px;
            font-weight: 800;
            border-radius: 10px;
            cursor: pointer;
            border: none;
            text-align: center;
            text-decoration: none;
            transition: all 0.3s ease;
        }

        .btn-save {
            background: rgba(5, 2, 10, 0.8);
            color: #fff;
            border: 1px solid var(--purple-neon) !important;
        }

        .btn-save:hover {
            background: var(--purple-neon);
            color: #fff;
            box-shadow: 0 0 20px var(--purple-glow);
        }

        .btn-done {
            background: var(--purple-neon);
            color: #fff;
        }

        .btn-done:hover {
            background: #fff;
            color: #000;
            box-shadow: 0 0 25px rgba(255, 255, 255, 0.8);
        }

        .toast {
            position: fixed;
            bottom: 25px;
            left: 50%;
            transform: translateX(-50%);
            background: #d00000;
            color: #fff;
            padding: 12px 28px;
            border-radius: 10px;
            font-family: 'Orbitron', sans-serif;
            font-size: 12px;
            font-weight: 900;
            box-shadow: 0 0 25px rgba(208, 0, 0, 0.8);
            z-index: 9999;
        }
    </style>
</head>
<body>

    <div class="card-outer">
        <div class="app-wrapper">
            <div class="top-header">
                <div class="header-badge">QRIS INSTANT OTOMATIS</div>
                <div class="brand-title">DEPOSIT <span>INGGAR PAY</span></div>
                <div class="sub-title">Sistem Pembayaran Otomatis & Real-Time 24 Jam</div>
            </div>

            <form method="POST" action="">
                <div class="form-group" style="margin-bottom: 20px;">
                    <label>Nominal Deposit (Rp)</label>
                    <input name="nominal" id="deposit-val" class="form-control" type="text" placeholder="Contoh: 50.000" value="<?= isset($_POST['nominal']) ? htmlspecialchars($_POST['nominal']) : '' ?>" oninput="formatCurrency(this)" required>
                </div>
                <button type="submit" class="btn-pay">BAYAR SEKARANG</button>
            </form>

            <!-- TAMPILAN QR HASIL GENERATE -->
            <?php if (!empty($qrisUrl)): ?>
                <div class="qr-wrapper">
                    <div class="qr-card">
                        <img id="qris-img" src="<?= $qrisUrl ?>" alt="QRIS INGGAR PAY">
                    </div>

                    <div class="amount-box">
                        <span class="amount-title">TOTAL BAYAR:</span>
                        <span class="amount-display">Rp <?= number_format($finalAmount, 0, ',', '.') ?></span>
                    </div>

                    <div class="action-row">
                        <button class="btn-save" onclick="downloadQR('<?= $qrisUrl ?>')">💾 SIMPAN QRIS</button>
                        <a href="<?= LIVECHAT_URL ?>" target="_blank" class="btn-done">💬 SUDAH BAYAR</a>
                    </div>
                </div>
            <?php endif; ?>

            <div class="guide-box">
                <div class="guide-title">PANDUAN PEMBAYARAN:</div>
                <ol class="guide-list">
                    <li>Buka e-Wallet (Dana, Ovo, GoPay, ShopeePay) atau Mobile Banking kamu.</li>
                    <li>Pilih fitur <b>SCAN / QRIS</b>.</li>
                    <li>Arahkan kamera ke QR Code atau upload dari galeri HP kamu.</li>
                    <li>Periksa nominal lalu selesaikan pembayaran.</li>
                </ol>
            </div>

            <a href="<?= LIVECHAT_URL ?>" target="_blank" class="btn-livechat">
                💬 HUBUNGI LIVECHAT
            </a>
        </div>
    </div>

    <!-- ERROR NOTIFICATION TOAST -->
    <?php if (!empty($errorMsg)): ?>
        <div id="toast-msg" class="toast"><?= $errorMsg ?></div>
        <script>
            setTimeout(() => {
                const toast = document.getElementById('toast-msg');
                if (toast) toast.style.display = 'none';
            }, 3000);
        </script>
    <?php endif; ?>

    <script>
        function formatCurrency(el) {
            let val = el.value.replace(/[^0-9]/g, "");
            if (!val) {
                el.value = "";
                return;
            }
            el.value = Number(val).toLocaleString("id-ID");
        }

        function downloadQR(url) {
            fetch(url)
                .then(res => res.blob())
                .then(blob => {
                    const bUrl = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = bUrl;
                    a.download = "qris-inggarpay.png";
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(blob);
                })
                .catch(() => alert("Gagal mengunduh QRIS"));
        }
    </script>
</body>
</html>
