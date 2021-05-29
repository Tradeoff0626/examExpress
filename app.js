const express = require('express');
const nunkuscks = require('nunjucks');  //npm install nunjucks [view engine]
const logger = require('morgan');       //npm istall morgan [console logger <terminal>]
const bodyParser = require('body-parser');
//npm install dotenv [database<mysql, postgreDB, ...> access] (ex. process.env.DB_USER)

//클래스 형식으로 초기화 설정
class App {

    constructor () {
        this.app = express();

        // 뷰엔진 셋팅
        this.setViewEngine();

        // 미들웨어 셋팅
        this.setMiddleWare();

        // 정적 디렉토리 추가
        this.setStatic();

        // 로컬 변수
        this.setLocals();

        // 라우팅
        this.getRouting();

        //error 핸들링의 경우 설정한 경로가 없는 경우 처리기 때문에 마지막에 설정함.
        // 404 페이지를 찾을수가 없음
        this.status404();

        // 에러처리
        this.errorHandler();

    }

    setMiddleWare (){
    
        // 미들웨어 설정
        this.app.use(logger('dev'));                                    //터미널 콘솔 로그 출력 
        this.app.use(bodyParser.json());                                //body-parser 초기화 설정
        this.app.use(bodyParser.urlencoded({ extended: false }));       //body-parser 초기화 설정
    
    }

    setViewEngine (){

        //nunjucks 설정
        nunkuscks.configure('template', {   //'template'는 템플릿 경로
            autoescape  : true,             //템플릿에 전달한 데이터 중 html를 그대로 출력할지 여부 (XSS 공격 방지용)
            express     : this.app               //express() 변수명
        });

    }


    setStatic (){

        this.app.use('/uploads', express.static('uploads'));    //정적파일 경로 설정 (/uploads 경로의 파일을 uploads 이름으로 접근)
    
    }

    setLocals(){

        // global 템플릿 변수
        this.app.use( (req, res, next) => {
            this.app.locals.isLogin = false;
            this.app.locals.req_path = req.path;
            next();
        });

    }

    getRouting (){
        this.app.use(require('./controllers'))
    }

    status404() {        

        this.app.use( ( req, res, _ ) => {                  //미사용 파라미터는 '_'로 표시. (여기서는 next에 해당)
            res.status(404).render('common/404.html');      //상태값이 404인 경우 404.html 랜더링
        });

    }

    errorHandler() {

        this.app.use( (err, req, res, _ ) => {
            console.log(err);
            res.status(500).render('common/500.html');      //상태값이 500인 경우 500.html 랜더링
        });
        

    }

}

//인스턴스로 app을 exports
module.exports = new App().app;