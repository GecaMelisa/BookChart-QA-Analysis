import { Builder, WebDriver, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";

const BASE_URL = "https://bookcart.azurewebsites.net";

jest.setTimeout(120000);

describe("TC21 - Complete checkout with valid data", () => {
  let driver: WebDriver;
  let loginPage: LoginPage;
  let homePage: HomePage;

  beforeAll(async () => {
    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(new chrome.Options())
      .build();
    await driver.manage().setTimeouts({ implicit: 5000 });
    loginPage = new LoginPage(driver);
    homePage = new HomePage(driver);

    await loginPage.goToHomePage(BASE_URL);
    await loginPage.login("šaćir", "SacirSacir1");
    await homePage.waitForHomePage();
  });

  afterAll(async () => {
    await driver.quit();
  });

  it("should complete checkout and show confirmation", async () => {
    await homePage.searchBook("Harry Potter and the Chamber of Secrets");
    expect(await homePage.isSearchResultVisible()).toBe(true);

    await homePage.addBookToCartByTitle(
      "Harry Potter and the Chamber of Secrets"
    );

    await homePage.goToCart();
    await driver.wait(
      until.urlIs(`${BASE_URL}/shopping-cart`),
      10000,
      "Cart URL did not match"
    );
    expect(await homePage.isOnCartPage()).toBe(true);
    expect(await homePage.isBookInCart()).toBe(true);

    await homePage.proceedToCheckout();
    await homePage.fillCheckoutForm();
    await homePage.placeOrder();
    expect(await homePage.isOrderConfirmed()).toBe(true);
  });
});
