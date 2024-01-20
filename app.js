// Memuat modul Express, sebuah framework web untuk Node.js.
const express = require('express');
// Memuat modul path, yang digunakan untuk memanipulasi dan mengonversi jalur file.
const path = require('path');

const app = express();
const port = process.env.PORT || 3060;

// menggunakan middleware express untuk menangani file statis (seperti CSS, JS, dan gambar). Middleware ini akan menyajikan file dari direktori 'public' ketika permintaan untuk file statis diterima.)
app.use(express.static(path.join(__dirname, 'public')));

// Mendefinisikan route untuk permintaan HTTP GET pada endpoint '/'. Ketika permintaan diterima, server akan mengirimkan file 'index.html' sebagai respons.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Menggunakan metode listen untuk memulai server pada port yang telah dikonfigurasi sebelumnya. Ketika server berhasil dimulai, pesan log akan dicetak ke konsol.
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});