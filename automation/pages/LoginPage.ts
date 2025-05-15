import { By, WebDriver, until } from "selenium-webdriver";

export class LoginPage {
  driver: WebDriver;

  // Navbar Login button
  private loginNavbarButton = By.xpath(
    "//button[span[normalize-space(text())='Login'] and not(@mat-raised-button)]"
  );
  // Username / password inputs
  private usernameInput = By.css("input[formcontrolname='username']");
  private passwordInput = By.css("input[formcontrolname='password']");
  // Form “Login” submit (mat-raised button inside the form)
  private loginFormButton = By.xpath(
    "//form//button[@mat-raised-button and span[normalize-space(text())='Login']]"
  );

  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  /** Navigate browser to the given URL */
  async goToHomePage(url: string): Promise<void> {
    await this.driver.get(url);
  }

  /**
   * Opens the login form via navbar, fills credentials, and submits.
   */
  async login(username: string, password: string): Promise<void> {
    // 1. Click navbar Login
    const navBtn = await this.driver.wait(
      until.elementLocated(this.loginNavbarButton),
      10000,
      "Login button in navbar not found"
    );
    await navBtn.click();

    // 2. Wait for and fill username/password
    const userField = await this.driver.wait(
      until.elementLocated(this.usernameInput),
      10000,
      "Username field not found"
    );
    await userField.sendKeys(username);

    const passField = await this.driver.wait(
      until.elementLocated(this.passwordInput),
      10000,
      "Password field not found"
    );
    await passField.sendKeys(password);

    // 3. Submit
    const submitBtn = await this.driver.wait(
      until.elementLocated(this.loginFormButton),
      10000,
      "Login submit button not found"
    );
    await submitBtn.click();
  }
}
