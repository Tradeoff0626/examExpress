const express = require('express');
const router = express.Router();

//routing 경로는 express.Router()에 추가 등록.

router.get('/', (req, res) => {
    res.send('admin 이후 url');
});

router.get('/products', (req, res) => {
    res.send('admin products 이후 url');
});

module.exports = router;