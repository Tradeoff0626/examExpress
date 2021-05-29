const app = require('../app.js');
const { Router } = require('express');
const router = Router()

/*
const vipMiddleware = ( req, res, next ) => {
    console.log('최우선 미들웨어');
    next();
};
*/

//경로 등록 (경로별 경로.ctrl.js 및 index.js 파일 필요함)
//router.use('/sample', require('./sample_dir'));
//router.use('/admin', vipMiddleware, require('./admin'));        // '/admin' 및 하위에 모두 적용되는 최우선 미들웨어
router.use('/admin', require('./admin'));


module.exports = router;