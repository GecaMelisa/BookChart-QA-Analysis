import { Builder, WebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import { HomePage } from "../pages/HomePage";

jest.setTimeout(40000);

const BASE_URL = "https://bookcart.azurewebsites.net";

describe("TC13 - Add a book to cart from homepage (no login)", () => {
  let driver: WebDriver;
  let homePage: HomePage;

  beforeAll(async () => {
    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(new chrome.Options())
      .build();
    await driver.manage().setTimeouts({ implicit: 5000 });
    homePage = new HomePage(driver);
    await driver.get(BASE_URL);
  });

  afterAll(async () => {
    await driver.quit();
  });

  it("should add a book to the cart and display it", async () => {
    await homePage.addFirstBookToCart();
    await homePage.goToCart();
    expect(await homePage.isOnCartPage()).toBe(true);
    expect(await homePage.isBookInCart()).toBe(true);
  });
});
