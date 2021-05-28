const express = require('express');
const router = express.Router();

//routing 경로는 express.Router()에 추가 등록.

const testMiddlerWare1 = ( req, res, next ) => {
    console.log('첫번째 미들웨어');
    next();
};

const testMiddlerWare2 = ( req, res, next ) => {
    console.log('두번째 미들웨어');
    next();                                             //미들웨어 처리 후 계속 진행
};

//router.get('/', testMiddlerWare1, (req, res) => {
router.get('/', testMiddlerWare1, testMiddlerWare2, (req, res) => {     //미들웨어 적용 테스트
    res.send('admin 이후 url');
});

router.get('/products', (req, res) => {
    //res.send('admin products 이후 url');
    res.render( 'admin/products.html', {        //템플릿 렌더링. 파일의 경로는 app.js의 nunjucks 설정에서 입력한 템블릿 경로 이후 url
        message : '<h1>Hello!!!</h1>'           //템플릿에 전달할 값
    } );
});

module.exports = router;