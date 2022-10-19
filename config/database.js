module.exports = {
    HOST: 'ec2-3-1-33-10.ap-southeast-1.compute.amazonaws.com',
    USER: 'mccpgdb',
    PASSWORD: 'mccpgdb1qaz',
    DB: 'pg_mcc',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        charset: "utf8",
        dialectOptions: {
            "collate": "utf8_general_ci"
        },
        freezeTableName: true,
        timestamps: false
    },
    dialectOptions: {
        "useUTC": false
    },
    // timezone: '+07:00'
    timezone: 'Asia/Jakarta',
};