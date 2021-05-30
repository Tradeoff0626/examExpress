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
exports.get_products = ( _ , res) => {
    //res.send('admin products 이후 url');
    
    //res.render( 'admin/products.html', {        //템플릿 렌더링. 파일의 경로는 app.js의 nunjucks 설정에서 입력한 템블릿 경로 이후 url
    //    message : '<h1>Hello!!!</h1>'           //2번째 인자. 템플릿에 전달할 값 <K-V>.
    //} );

    models.Products.findAll({

    }).then( (products) => {
        // DB에서 받은 products를 products변수명으로 내보냄
        res.render( 'admin/products.html', { products : products });    //res.render( 'admin/products.html', { products });
    });

}


//단건 조회(상세보기)
exports.get_products_detail = ( req , res ) => {

    models.Products.findByPk(req.params.id).then( (product) => {
        res.render('admin/detail.html', { product : product });         //res.render( 'admin/products.html', { product });
    });

};

//제품 입력 화면
exports.get_products_write = ( _ , res) => {
    res.render( 'admin/write.html');
}


//제품 입력
exports.post_products_write = ( req , res ) => {
    //res.send('post send test...');
    //res.send(req.body.price);             //템플릿 (write.html)에 name이 price인 속성의 input값 전달
    //res.send(req.body);                   //템플릿 (write.html)에 name 속성이 설정된 모든 input값 전달


    /*
    //전체 일괄 입력(req.body와 모델의 입력 컬림이 완전히 동일한 경우)
    models.Products.create(req.body).then( () => {
        res.redirect('/admin/products');
    });
    */

    //컬럼 개별 입력
    models.Products.create({
        name : req.body.name,
        price : req.body.price ,
        description : req.body.description
    }).then( () => {
        res.redirect('/admin/products');
    });

}


//제품 수정할 데이터 조회
exports.get_products_edit = ( req , res ) => {
    //기존에 폼에 value안에 값을 셋팅하기 위해 만든다.
    models.Products.findByPk(req.params.id).then( (product) => {
        res.render('admin/write.html', { product : product });
    });
};


//제품 수정 데이터 전달
exports.post_products_edit = ( req , res ) => {

    models.Products.update(
        {                                           //수정할 데이터
            name : req.body.name,
            price : req.body.price ,
            description : req.body.description
        }, 
        {                                           //수정 조건(where)
            where : { id: req.params.id } 
        }
    ).then( () => {
        res.redirect('/admin/products/detail/' + req.params.id );       //이전 상세 페이지로 이동
    });

};


//제품 삭제(단건)
exports.get_products_delete = ( req , res ) => {
    models.Products.destroy({
        where: {
            id: req.params.id
        }
    }).then( () => {
        res.redirect('/admin/products');
    });
};