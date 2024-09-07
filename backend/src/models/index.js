const dbConfig = require("../config/db.config.js");

const sequelizeLib = require("sequelize");
const sequelize = new sequelizeLib(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.sequelizeLib = sequelizeLib;
db.sequelize = sequelize;

db.userModel = require("./user.model.js")(sequelize, sequelizeLib);
db.documentModel = require("./document.model.js")(sequelize, sequelizeLib);
db.docuentRequestModel = require("./documentrequest.model.js")(sequelize, sequelizeLib);

//Set up associations
Object.keys(db).forEach(modelName => {
    if(db[modelName].associate) {
        db[modelName].associate(db);
    }
}); 

module.exports = db;