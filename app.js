const express = require('express');

const admin = require('./routes/admin');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('test express...');
});

//routing 등록(/admin) - admin 변수에 설정된 경로에 해당하는 js에 export된 router를 /admin 하위 경로로 등록
app.use('/admin', admin);

app.listen( port, () => {
    console.log(`Express listening on port `, port);
});