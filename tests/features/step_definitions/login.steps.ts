import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { Actor } from '../../../e2e-screenplay/actors/Actor';
import { OpenApp, Login } from '../../../e2e-screenplay/tasks/Tasks';
import { Ensure } from '../../../e2e-screenplay/questions/Questions';
import { Page, expect, chromium } from '@playwright/test';
import { Targets } from '../../../e2e-screenplay/targets/UIElements';

let actor: Actor;
let page: Page;
let browser: any;

// Inicializar el navegador y la página antes de cada escenario
Before(async function () {
     browser = await chromium.launch({ 
        headless: false,
        slowMo: 1000 // agrega un retraso de 1000ms entre acciones
    });
    const context = await browser.newContext();
    page = await context.newPage();
});


// Cerrar el navegador después de cada escenario
After(async function () {
    await browser.close();
});

Given('que Michael está en la página de inicio de sesión', async function () {
    actor = Actor.named('Michael', page);
    await actor.attemptsTo(
        OpenApp.at('https://www.saucedemo.com/v1/index.html')
    );
});

When('inicia sesión con usuario {string} y contraseña {string}', async function (username: string, password: string) {
    await actor.attemptsTo(
        Login.withCredentials(username, password)
    );
});

Then('debería ver la página de Productos', async function () {
    const isProductsVisible = await Ensure.that(page).containsText('Products', Targets.PRODUCTS_PAGE.PRODUCTS_CONTAINER);
    expect(isProductsVisible).toBeTruthy();
});

Then('debería ver el mensaje de error', async function () {
    const isErrorVisible = await Ensure.that(page).containsText('Epic sadface: Sorry, this user has been locked out.', Targets.LOGIN_PAGE.ERROR_MESSAGE);
    expect(isErrorVisible).toBeTruthy();
});

Then('debería ver el mensaje de error de usuario incorrecto', async function () {
    const isErrorVisible = await Ensure.that(page).containsText('Epic sadface: Username and password do not match any user in this service', Targets.LOGIN_PAGE.ERROR_MESSAGE);
    expect(isErrorVisible).toBeTruthy();
});