module.exports = {
    HOST: 'ec2-3-1-33-10.ap-southeast-1.compute.amazonaws.com',
    USER: '',
    PASSWORD: '',
    DB: '',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};