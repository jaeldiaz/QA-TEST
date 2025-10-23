/**
 * Test configuration and data
 */
export const testConfig = {
    baseUrl: 'https://www.saucedemo.com/v1/',
    defaultTimeout: 10000,
    credentials: {
        standardUser: {
            username: 'standard_user',
            password: 'secret_sauce'
        },
        lockedOutUser: {
            username: 'locked_out_user',
            password: 'secret_sauce'
        }
    },
    textErrorLogin: 'Epic sadface: Sorry, this user has been locked out.'
};