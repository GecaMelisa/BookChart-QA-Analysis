import { Builder, WebDriver, By, until, WebElement } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";

const BASE_URL = "https://bookcart.azurewebsites.net";

jest.setTimeout(120000);

describe("TC23 - Verify My Orders listing", () => {
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

  it("should list at least one order in My Orders", async () => {
    await homePage.goToMyOrders();

    // wait for a single row
    const rowLocator = By.css("table.mat-mdc-table tbody tr");
    await driver.wait(until.elementLocated(rowLocator), 10000);

    // fetch all rows
    const rows: WebElement[] = await driver.findElements(rowLocator);
    expect(rows.length).toBeGreaterThan(0);

    // verify first row format
    const txt = await rows[0].getText();
    expect(txt).toMatch(/\d{3}-\d{6}/);
  });
});
