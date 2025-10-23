import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../e2e-pom/pages/InventoryPage';
import { LoginPage } from '../../e2e-pom/pages/LoginPage';

test.describe('Inventory Page Tests', () => {
    let inventoryPage: InventoryPage;
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);

        await loginPage.navigateTo();

        // Login before each test
        await loginPage.login({
            username: 'standard_user',
            password: 'secret_sauce'
        });
    });

    test('should display all products correctly', async () => {
        const products = await inventoryPage.getProducts();
        expect(products.length).toBeGreaterThan(0);
        expect(products[0].name).toBeTruthy();
        expect(products[0].price).toBeTruthy();
    });

    test('should add and remove product from cart', async () => {
        const productName = 'Sauce Labs Backpack';
        
        // Add to cart
        await inventoryPage.addProductToCart(productName);
        expect(await inventoryPage.getCartCount()).toBe(1);

        // Remove from cart
        await inventoryPage.removeProductFromCart(productName);
        expect(await inventoryPage.getCartCount()).toBe(0);
    });

    test('should sort products alphabetically', async () => {
        await inventoryPage.sortProducts('az');
        const products = await inventoryPage.getProducts();
        
        // Verify products are sorted alphabetically
        const productNames = products.map(p => p.name);
        const sortedNames = [...productNames].sort();
        expect(productNames).toEqual(sortedNames);
    });

    test('should navigate through menu items', async ({ page }) => {
        // Test menu navigation
        await inventoryPage.openMenu();
        await inventoryPage.clickAbout();
        
        // Verify navigation
        expect(page.url()).toContain('saucelabs.com');
        
        // Go back to inventory
        await page.goBack();
        await inventoryPage.clickAllItems();
        
        // Verify we're back at inventory
        expect(page.url()).toContain('/inventory.html');
    });

    test('should reset app state', async () => {
        // Add item to cart first
        await inventoryPage.addProductToCart('Sauce Labs Backpack');
        expect(await inventoryPage.getCartCount()).toBe(1);

        // Reset app state
        await inventoryPage.resetAppState();
        expect(await inventoryPage.getCartCount()).toBe(0);
    });
});