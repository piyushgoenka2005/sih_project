module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "ax_veridion",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

//connecing Javascript objecs to MySql