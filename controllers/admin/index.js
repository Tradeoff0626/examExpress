/* admin url 및 middleware 설정 */
const { Router } = require('express');
const router = Router();
const ctrl = require('./admin.ctrl');

function testMiddleWare1( req, res, next ){
    console.log('첫번째 미들웨어');
    next();
}

function testMiddleWare2( req, res, next ){
    console.log('두번째 미들웨어');
    next();
}

router.get('/', testMiddleWare1, testMiddleWare2 , (req,res) => {
    res.send('admin app');
});

router.get('/products', ctrl.get_products );

router.get('/products/detail/:id', ctrl.get_products_detail );      //''/:id'로 endpoint 동적 처리 가능

router.get('/products/write', ctrl.get_products_write );

router.post('/products/write', ctrl.post_products_write );


module.exports = router;