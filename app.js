const express = require('express');
const nunkuscks = require('nunjucks');  //npm install nunjucks [view engine]
const logger = require('morgan');       //npm istall morgan [console logger <terminal>]

const admin = require('./routes/admin');

const app = express();
const port = 3000;

const vipMiddleware = ( req, res, next ) => {
    console.log('최우선 미들웨어');
    next();
};

//nunjucks 설정
nunkuscks.configure('template' ,{   //'template'는 템플릿 경로
    autoescape  : true,             //템플릿에 전달한 데이터 중 html를 그대로 출력할지 여부 (XSS 공격 방지용)
    express     : app               //express() 변수명
});

//미들웨어 설정
app.use( logger('dev') );           //터미널 콘솔 로그 출력 

app.get('/', (req, res) => {
    res.send('test express...');
});

//routing 등록(/admin) - admin 변수에 설정된 경로에 해당하는 js에 export된 router를 /admin 하위 경로로 등록
//app.use('/admin', admin);
app.use('/admin', vipMiddleware, admin);        // '/admin' 및 하위에 모두 적용되는 최우선 미들웨어

app.listen( port, () => {
    console.log(`Express listening on port `, port);
});