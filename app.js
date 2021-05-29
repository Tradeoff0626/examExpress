const express = require('express');
const nunkuscks = require('nunjucks');  //npm install nunjucks [view engine]
const logger = require('morgan');       //npm istall morgan [console logger <terminal>]
const bodyParser = require('body-parser');

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
app.use( logger('dev') );                                   //터미널 콘솔 로그 출력 
app.use( bodyParser.json() );                               //body-parser 초기화 설정
app.use( bodyParser.urlencoded( { extended : false} ));     //body-parser 초기화 설정

app.use( '/uploads', express.static('uploads') );           //정적파일 경로 설정 (/uploads 경로의 파일을 uploads 이름으로 접근)

app.use( (req, res, next) => {
    app.locals.isLogin = false;                              //global 변수 설정(test)
    app.locals.req_path = req.path;
    next();
});

app.get('/', (req, res) => {
    res.send('test express...');
});

//routing 등록(/admin) - admin 변수에 설정된 경로에 해당하는 js에 export된 router를 /admin 하위 경로로 등록
//app.use('/admin', admin);
app.use('/admin', vipMiddleware, admin);            // '/admin' 및 하위에 모두 적용되는 최우선 미들웨어


//error 핸들링의 경우 설정한 경로가 없는 경우 처리기 때문에 마지막에 설정함.
app.use( (req, res, _) => {                         //미사용 파라미터는 '_'로 표시. (여기서는 next에 해당)
    res.status(404).render('common/404.html');      //상태값이 404인 경우 404.html 랜더링
});

app.use( (req, res, _) => {
    res.status(500).render('common/500.html');      //상태값이 500인 경우 500.html 랜더링
});

app.listen( port, () => {
    console.log(`Express listening on port `, port);
});