import dotenv from 'dotenv';

dotenv.config();

export default {
  development: {
    use_env_variable: 'DATABASE_URL',
    dialect: "postgres",
    logging: false
  },
  test: {
    use_env_variable: 'DATABASE_URL_TEST',
    dialect: "postgres",
    logging: false
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false },
    }
  }
};
