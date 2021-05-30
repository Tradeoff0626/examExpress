const models = require('../../models');

/*
    models.테이블명.create(데이터)
    
    models.테이블명.findAll(조회조건)
    models.테이블명.findByPk(primary key)
    models.테이블명.findOne(조회조건)
    
    models.테이블명.update(데이터, 조회조건)
    
    models.테이블명.destroy(조회조건)
*/


//전체 목록 조회
exports.get_products = async ( _ , res) => {
    //res.send('admin products 이후 url');
    
    //res.render( 'admin/products.html', {        //템플릿 렌더링. 파일의 경로는 app.js의 nunjucks 설정에서 입력한 템블릿 경로 이후 url
    //    message : '<h1>Hello!!!</h1>'           //2번째 인자. 템플릿에 전달할 값 <K-V>.
    //} );

    try {
        const products = await models.Products.findAll();  
        res.render( 'admin/products.html', { products });
    } catch(e) {
        console.log(e);
    }

}


//단건 조회(상세보기)
exports.get_products_detail = async ( req , res ) => {

    try {
        const product = await models.Products.findByPk(req.params.id);
        res.render('admin/detail.html', { product });         //res.render( 'admin/products.html', { product : product });
    } catch(e) {
        console.log(e);
    }

};

//제품 입력 화면
exports.get_products_write = ( _ , res) => {
    res.render( 'admin/write.html');
}


//제품 입력
exports.post_products_write = async ( req , res ) => {
    //res.send('post send test...');
    //res.send(req.body.price);             //템플릿 (write.html)에 name이 price인 속성의 input값 전달
    //res.send(req.body);                   //템플릿 (write.html)에 name 속성이 설정된 모든 input값 전달


    try {        
        //전체 일괄 입력(req.body와 모델의 입력 컬림이 완전히 동일한 경우)
        await models.Products.create(req.body);
        res.redirect('/admin/products');

        /*
        //컬럼 개별 입력
        await models.Products.create({
            name : req.body.name,
            price : req.body.price ,
            description : req.body.description
        });
        */

        res.redirect('/admin/products');
    } catch(e) {
        console/log(e);
    }

}


//제품 수정할 데이터 조회
exports.get_products_edit = async ( req , res ) => {

    try {
        //기존에 폼에 value안에 값을 셋팅하기 위해 조회
        const product = await models.Products.findByPk(req.params.id);
        res.render('admin/write.html', { product });
    } catch(e) {
        console.log(e);
    }
};


//제품 수정 데이터 전달
exports.post_products_edit = async ( req , res ) => {

    try {
        await models.Products.update(
            /*
            {                                           //수정할 데이터
                name : req.body.name,
                price : req.body.price ,
                description : req.body.description
            }*/
            req.body, 
            {                                           //수정 조건(where)
                where : { id: req.params.id } 
            }
        );

        res.redirect('/admin/products/detail/' + req.params.id );       //이전 상세 페이지로 이동
    } catch(e) {
        console.log(e);
    }

};


//제품 삭제(단건)
exports.get_products_delete = async ( req , res ) => {
    
    try {
        await models.Products.destroy({
            where: {
                id: req.params.id
            }
        });

        res.redirect('/admin/products');
    } catch(e) {
        console.log(e);
    }
};