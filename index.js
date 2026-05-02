const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;


app.use(express.json());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      
    password: '',      
    database: 'db_belajar_api',
    port: 3307,
});


db.connect((err) => {
    if (err) {
        console.error('Gagal terhubung ke database:', err);
        return;
    }
    console.log('Berhasil terhubung ke database MySQL!');
});




app.get('/api/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ status: 'error', message: err.message });
        }
        res.status(200).json({
            status: 'success',
            message: 'Berhasil mengambil data',
            data: results
        });
    });
});




app.post('/api/users', (req, res) => {
    
    const { nama, email } = req.body;
    
    
    if (!nama || !email) {
        return res.status(400).json({ status: 'error', message: 'Nama dan email wajib diisi!' });
    }

    const sql = 'INSERT INTO users (nama, email) VALUES (?, ?)';
    
    db.query(sql, [nama, email], (err, result) => {
        if (err) {
            return res.status(500).json({ status: 'error', message: err.message });
        }
        res.status(201).json({
            status: 'success',
            message: 'Data berhasil ditambahkan',
            data: {
                id: result.insertId,
                nama: nama,
                email: email
            }
        });
    });
});


app.listen(port, () => {
    console.log(`Server Express berjalan di http://localhost:${port}`);
});