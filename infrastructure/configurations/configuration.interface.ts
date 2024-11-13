export interface IConfiguration {
  NODE_ENV: string;
  PORT: number;

  SWAGGER_PATH: string;

  CRYPT_SALT: number;
  JWT_SECRET_KEY: string;
  JWT_SECRET_REFRESH_KEY: string;
  TOKEN_EXPIRE_TIME: string;
  TOKEN_REFRESH_EXPIRE_TIME: string;
}
