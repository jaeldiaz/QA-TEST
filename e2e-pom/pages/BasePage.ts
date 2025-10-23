import { Page } from '@playwright/test';

/**
 * BasePage class that contains common methods and properties for all page objects
 */
export abstract class BasePage {
    protected readonly page: Page;
    protected readonly baseUrl: string;

    constructor(page: Page, baseUrl: string) {
        this.page = page;
        this.baseUrl = baseUrl;
    }

    /**
     * Navigates to a specific URL
     * @param path - The path to navigate to (will be appended to baseUrl)
     */
    async navigateTo(path: string = ''): Promise<void> {
        await this.page.goto(`${this.baseUrl}${path}`);
    }

    /**
     * Waits for an element to be visible
     * @param selector - The selector to wait for
     * @param timeout - Optional timeout in milliseconds
     */
    async waitForElement(selector: string, timeout: number = 5000): Promise<void> {
        await this.page.waitForSelector(selector, { timeout, state: 'visible' });
    }

    /**
     * Checks if an element is visible
     * @param selector - The selector to check
     */
    async isElementVisible(selector: string): Promise<boolean> {
        return await this.page.isVisible(selector);
    }

    /**
     * Gets text content of an element
     * @param selector - The selector to get text from
     */
    async getElementText(selector: string): Promise<string | null> {
        return await this.page.textContent(selector);
    }
}