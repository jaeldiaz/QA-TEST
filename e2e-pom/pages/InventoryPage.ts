import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Interface for product data
 */
interface Product {
    name: string;
    description: string;
    price: string;
}

/**
 * InventoryPage class that handles all inventory-related actions and elements
 */
export class InventoryPage extends BasePage {
    // Main container
    private readonly inventoryContainer = '#inventory_container';
    private readonly inventoryList = '.inventory_list';
    
    // Header elements
    private readonly menuButton = '.bm-burger-button';
    private readonly cartContainer = '#shopping_cart_container';
    private readonly sortDropdown = '[data-test="product_sort_container"]';
    
    // Menu items
    private readonly menuAllItems = '#inventory_sidebar_link';
    private readonly menuAbout = '#about_sidebar_link';
    private readonly menuLogout = '#logout_sidebar_link';
    private readonly menuReset = '#reset_sidebar_link';
    
    // Product elements
    private readonly productItem = '.inventory_item';
    private readonly productName = '.inventory_item_name';
    private readonly productDesc = '.inventory_item_desc';
    private readonly productPrice = '.inventory_item_price';
    private readonly addToCartButton = 'button.btn_primary.btn_inventory';
    private readonly removeButton = 'button.btn_secondary.btn_inventory';

    constructor(page: Page) {
        super(page, 'https://www.saucedemo.com/v1/inventory.html');
    }

    /**
     * Opens the side menu
     */
    async openMenu(): Promise<void> {
        await this.page.click(this.menuButton);
    }

    /**
     * Navigates to All Items from menu
     */
    async clickAllItems(): Promise<void> {
        await this.openMenu();
        await this.page.click(this.menuAllItems);
    }

    /**
     * Clicks the About link
     */
    async clickAbout(): Promise<void> {
        await this.openMenu();
        await this.page.click(this.menuAbout);
    }

    /**
     * Performs logout action
     */
    async clickLogout(): Promise<void> {
        await this.openMenu();
        await this.page.click(this.menuLogout);
    }

    /**
     * Resets the app state
     */
    async resetAppState(): Promise<void> {
        await this.openMenu();
        await this.page.click(this.menuReset);
    }

    /**
     * Gets all products from the inventory
     */
    async getProducts(): Promise<Product[]> {
        const products: Product[] = [];
        const productElements = this.page.locator(this.productItem);
        const count = await productElements.count();
        
        for (let i = 0; i < count; i++) {
            const item = productElements.nth(i);
            products.push({
                name: (await item.locator(this.productName).textContent()) || '',
                description: (await item.locator(this.productDesc).textContent()) || '',
                price: (await item.locator(this.productPrice).textContent()) || ''
            });
        }
        
        return products;
    }

    /**
     * Adds a product to cart by its name
     */
    async addProductToCart(productName: string): Promise<void> {
        const productContainer = await this.page.locator(this.productItem, {
            has: this.page.locator(this.productName, { hasText: productName })
        });
        await productContainer.locator(this.addToCartButton).click();
    }

    /**
     * Removes a product from cart by its name
     */
    async removeProductFromCart(productName: string): Promise<void> {
        const productContainer = await this.page.locator(this.productItem, {
            has: this.page.locator(this.productName, { hasText: productName })
        });
        await productContainer.locator(this.removeButton).click();
    }

    /**
     * Gets the current cart count
     */
    async getCartCount(): Promise<number> {
        const cartBadge = await this.page.locator('.shopping_cart_badge');
        const text = await cartBadge.textContent();
        return text ? parseInt(text, 10) : 0;
    }

    /**
     * Sorts products by the given option
     */
    async sortProducts(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
        await this.page.selectOption(this.sortDropdown, option);
    }
}