const express = require('express');
const nunkuscks = require('nunjucks');  //npm install nunjucks

const admin = require('./routes/admin');

const app = express();
const port = 3000;

//nunjucks 설정
nunkuscks.configure('template' ,{   //'template'는 템플릿 경로
    autoescape  : true,             //템플릿의 html를 그대로 출력할지 여부 (XSS 공격 방지용)
    express     : app               //express() 변수명
});

app.get('/', (req, res) => {
    res.send('test express...');
});

//routing 등록(/admin) - admin 변수에 설정된 경로에 해당하는 js에 export된 router를 /admin 하위 경로로 등록
app.use('/admin', admin);

app.listen( port, () => {
    console.log(`Express listening on port `, port);
});