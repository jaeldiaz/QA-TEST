import { test, expect } from '@playwright/test';
import { Actor } from '../../e2e-screenplay/actors/Actor';
import { OpenApp, Login } from '../../e2e-screenplay/tasks/Tasks';
import { Ensure } from '../../e2e-screenplay/questions/Questions';
import { Targets } from '../../e2e-screenplay/targets/UIElements';

test.describe('Login Tests', () => {
    test('should login successfully and see products page', async ({ page }) => {
        // Given
        const actor = Actor.named('Michael', page);
        const url = 'https://www.saucedemo.com/v1/index.html';
        const username = 'standard_user';
        const password = 'secret_sauce';

        // When
        await actor.attemptsTo(
            OpenApp.at(url),
            Login.withCredentials(username, password)
        );

        // Then
        const isProductsVisible = await Ensure.that(page).containsText('Products', Targets.PRODUCTS_PAGE.PRODUCTS_CONTAINER);
        expect(isProductsVisible).toBeTruthy();
    });

    test('should login locked out user and see error message', async ({ page }) => {
        // Given
        const actor = Actor.named('Michael', page);
        const url = 'https://www.saucedemo.com/v1/index.html';
        const username = 'locked_out_user';
        const password = 'secret_sauce';

        // When
        await actor.attemptsTo(
            OpenApp.at(url),
            Login.withCredentials(username, password)
        );

        // Then
        const isProductsVisible = await Ensure.that(page).containsText('Epic sadface: Sorry, this user has been locked out.', Targets.LOGIN_PAGE.ERROR_MESSAGE);
        expect(isProductsVisible).toBeTruthy();
    });
});