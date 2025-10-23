import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Interface for login credentials
 */
interface LoginCredentials {
    username: string;
    password: string;
}

/**
 * LoginPage class that handles all login-related actions and elements
 */
export class LoginPage extends BasePage {
    // Selectors as readonly properties for better maintenance
    private readonly usernameInput = '[data-test="username"]';
    private readonly passwordInput = '[data-test="password"]';
    private readonly loginButton = 'text=LOGIN';
    private readonly productsHeader = '.product_label';
    private readonly errorMessage = '[data-test="error"]';

    constructor(page: Page) {
        super(page, 'https://www.saucedemo.com/v1/');
    }

    /**
     * Performs login with the given credentials
     * @param credentials - Object containing username and password
     */
    async login(credentials: LoginCredentials): Promise<void> {
        await this.fillUsername(credentials.username);
        await this.fillPassword(credentials.password);
        await this.clickLoginButton();
    }

    /**
     * Fills in the username field
     * @param username - Username to input
     */
    private async fillUsername(username: string): Promise<void> {
        await this.page.fill(this.usernameInput, username);
    }

    /**
     * Fills in the password field
     * @param password - Password to input
     */
    private async fillPassword(password: string): Promise<void> {
        await this.page.fill(this.passwordInput, password);
    }

    /**
     * Clicks the login button
     */
    private async clickLoginButton(): Promise<void> {
        await this.page.getByRole('button', { name: 'LOGIN' }).click();
    }

    /**
     * Verifies if login was successful by checking for the products header
     * @returns Promise<boolean>
     */
    async isLoginSuccessful(): Promise<boolean> {
        await this.waitForElement(this.productsHeader);
        const headerText = await this.getElementText(this.productsHeader);
        return headerText === 'Products';
    }

    async getErrorMessage(): Promise<string> {
        await this.waitForElement(this.errorMessage);
        return this.getElementText(this.errorMessage) as Promise<string>;
    }   
}