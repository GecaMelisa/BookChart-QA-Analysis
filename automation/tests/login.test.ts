// File: automation/tests/login.test.ts

import { Builder, WebDriver, By, until, WebElement } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import { LoginPage } from "../pages/LoginPage";

jest.setTimeout(40000);

const BASE_URL = "https://bookcart.azurewebsites.net";
const VALID_USER = {
  username: "šaćir",
  password: "SacirSacir1",
};

describe("TC04 - Login with valid credentials", () => {
  let driver: WebDriver;
  let loginPage: LoginPage;

  beforeAll(async () => {
    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(new chrome.Options())
      .build();
    await driver.manage().setTimeouts({ implicit: 5000 });
    loginPage = new LoginPage(driver);
  });

  afterAll(async () => {
    await driver.quit();
  });

  it("should login and show book cards", async () => {
    // 1) Navigate to homepage
    await loginPage.goToHomePage(BASE_URL);

    // 2) Perform login
    await loginPage.login(VALID_USER.username, VALID_USER.password);

    // 3) Wait for at least one <app-book-card> to appear
    const cardLocator = By.css("app-book-card");
    await driver.wait(
      until.elementLocated(cardLocator),
      10000,
      "Timed out waiting for book cards after login"
    );

    // 3b) fetch all book cards
    const cards: WebElement[] = await driver.findElements(cardLocator);

    // 4) Assert we saw at least one
    expect(cards.length).toBeGreaterThan(0);
  });
});
