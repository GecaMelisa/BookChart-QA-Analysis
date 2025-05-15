import { Builder, WebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import { RegisterPage } from "../pages/RegistrationPage";

jest.setTimeout(40000);

const BASE_URL = "https://bookcart.azurewebsites.net";

//Generate a unique user each run
const TEST_USER = {
  firstName: "Sacir",
  lastName: "Sacarko",
  userName: `user${Date.now()}`, // Prevent duplicate username errors
  password: "SacirSacir1",
};

describe("TC03 - Register a new user", () => {
  let driver: WebDriver;
  let registerPage: RegisterPage;

  // Setup Chrome WebDriver before the test
  beforeAll(async () => {
    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(new chrome.Options())
      .build();

    await driver.manage().setTimeouts({ implicit: 5000 });
    registerPage = new RegisterPage(driver);
  });

  //Cleanup WebDriver after test
  afterAll(async () => {
    await driver.quit();
  });

  // Register a new user and verify redirection to login page
  it("should register a new user and redirect to login page", async () => {
    await registerPage.goToRegisterPage(BASE_URL); // Navigate to form
    await registerPage.registerUser(TEST_USER); // Fill and submit form

    const result = await registerPage.isOnLoginPage();
    expect(result).toBe(true);
  });
});
