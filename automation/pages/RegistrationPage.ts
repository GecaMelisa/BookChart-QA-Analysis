import { By, WebDriver, until } from "selenium-webdriver";

export class RegisterPage {
  driver: WebDriver;

  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  // Locators
  loginNavbarButton = By.xpath("//button[span[contains(text(), 'Login')]]");
  registerTab = By.xpath("//button[span[contains(text(), 'Register')]]");
  firstNameInput = By.css("input[formcontrolname='firstName']");
  lastNameInput = By.css("input[formcontrolname='lastName']");
  userNameInput = By.css("input[formcontrolname='userName']");
  passwordInput = By.css("input[formcontrolname='password']");
  confirmPasswordInput = By.css("input[formcontrolname='confirmPassword']");
  maleGenderRadio = By.xpath("//label[contains(., 'Male')]");
  registerButton = By.xpath("//button[span[contains(text(), 'Register')]]");
  loginUsernameInput = By.css("input[formcontrolname='userName']"); // Used to confirm login page

  //Navigate to homepage and open registration tab
  async goToRegisterPage(baseUrl: string) {
    await this.driver.get(baseUrl);
    await this.driver
      .wait(until.elementLocated(this.loginNavbarButton), 10000)
      .click();
    await this.driver
      .wait(until.elementLocated(this.registerTab), 5000)
      .click();
  }

  //Fill and submit the registration form
  async registerUser(user: {
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
  }) {
    console.log("Filling registration form...");
    await this.driver.findElement(this.firstNameInput).sendKeys(user.firstName);
    await this.driver.findElement(this.lastNameInput).sendKeys(user.lastName);
    await this.driver.findElement(this.userNameInput).sendKeys(user.userName);
    await this.driver.findElement(this.passwordInput).sendKeys(user.password);
    await this.driver
      .findElement(this.confirmPasswordInput)
      .sendKeys(user.password);
    await this.driver.findElement(this.maleGenderRadio).click();
    console.log("📨 Submitting registration form...");
    await this.driver.findElement(this.registerButton).click();
  }

  // Check if redirected to login page by looking for login form input
  async isOnLoginPage(): Promise<boolean> {
    try {
      const currentUrl = await this.driver.getCurrentUrl();
      console.log("Current URL after registration:", currentUrl);

      await this.driver.wait(
        until.elementLocated(this.loginUsernameInput),
        10000
      );
      return true;
    } catch (err) {
      console.error("Login page not detected. Possibly registration failed.");
      return false;
    }
  }
}
