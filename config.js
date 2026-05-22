export const ENV = {
  dev: {
    baseURL: 'https://www.saucedemo.com/'
  },
  stage: {
    baseURL: 'https://www.saucedemo.com/'
  },
  prod: {
    baseURL: 'https://www.saucedemo.com/'
  }
};

export const currentEnv = ENV[process.env.NODE_ENV || 'dev'];