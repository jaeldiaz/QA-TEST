import { test, expect } from '@playwright/test';
import { LoginPage } from '../../e2e-pom/pages/LoginPage';
import { testConfig } from '../../e2e-pom/config/testConfig';

test.describe('Login Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateTo();
    });

    test('should login successfully with valid credentials', async () => {
        // When: User logs in with valid credentials
        await loginPage.login(testConfig.credentials.standardUser);

        // Then: Login should be successful
        const isLoginSuccessful = await loginPage.isLoginSuccessful();
        expect(isLoginSuccessful).toBeTruthy();
    });

    test('should login locked out user and see error message', async () => {
        // When: User logs in with locked out user credentials
        await loginPage.login(testConfig.credentials.lockedOutUser);
        
        // Then: Login should fail
        const isLoginSuccessful = await loginPage.isLoginSuccessful();
        expect(isLoginSuccessful).toBeFalsy();
    });
});