const moment = require('moment');       //npm install moment

module.exports = function(sequelize, DataTypes){
    const Products = sequelize.define('Products',
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            name : { type: DataTypes.STRING },
            price : { type: DataTypes.INTEGER },
            description : { type: DataTypes.TEXT }
        }
    );

    //템플릿에서 함수 형식으로 호출 처리. 모델에서 함수 처리가 필요한 경우 이와 같이 활용 가능
    Products.prototype.dateFormat = (date) => (
        moment(date).format('YYYY-MM-DD')       //moment(date).format('YYYY년 MM월 DD일')
    );

    return Products;
}