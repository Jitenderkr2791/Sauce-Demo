  export const TEST_DATA = {
    URL: '/',
    
    USERS: {
      STANDARD: {
        username: 'standard_user',
        password: 'secret_sauce'
      },
      INVALID: {
        username: 'invalid_user',
        password: 'wrong_password'
      },
      WRONG_CASE: {
        username: 'Standard_User',
        password: 'Secret_Sauce'
      }
    },

    ERRORS: {
      USERNAME_REQUIRED: 'Username is required',
      PASSWORD_REQUIRED: 'Password is required',
      INVALID_CREDENTIALS: 'Username and password do not match'
    },

    Product: {
       BACKPACK: 'Sauce Labs Backpack',
       BIKE_LIGHT: 'Sauce Labs Bike Light'
    }
  }