const models = require('../../models');

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

exports.get_products_write = ( _ , res) => {
    res.render( 'admin/write.html');
}

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