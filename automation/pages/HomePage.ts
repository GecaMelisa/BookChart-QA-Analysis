import { By, WebDriver, until, WebElement } from "selenium-webdriver";

export class HomePage {
  driver: WebDriver;

  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  // Locators
  private searchInput = By.css("input[placeholder='Search books or authors']");
  private bookCard = By.css("app-book-card");
  private bookCardTitle = By.css(".card-title");
  private cartIcon = By.xpath("//button[.//mat-icon[text()='shopping_cart']]");
  private cartItemLink = By.linkText("Harry Potter and the Chamber of Secrets");
  private checkoutBtn = By.xpath(
    "//button[contains(translate(normalize-space(string(.)), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'checkout')]"
  );
  private nameInput = By.css("input[formcontrolname='name']");
  private addr1Input = By.css("input[formcontrolname='addressLine1']");
  private addr2Input = By.css("input[formcontrolname='addressLine2']");
  private pincodeInput = By.css("input[formcontrolname='pincode']");
  private stateInput = By.css("input[formcontrolname='state']");
  private placeOrderBtn = By.xpath(
    "//button[.//span[normalize-space(text())='Place Order']]"
  );
  private orderHeader = By.xpath("//h1[contains(text(),'Order Summary')]");

  // My Orders menu
  private menuTrigger = By.css("[aria-haspopup='menu']");
  private myOrdersItem = By.xpath(
    "//button[@role='menuitem']//span[normalize-space(text())='My Orders']"
  );

  /**
   * Wait until at least one <app-book-card> is present
   */
  async waitForHomePage(timeout = 20000): Promise<void> {
    await this.driver.wait(
      until.elementLocated(this.bookCard),
      timeout,
      "Timed out waiting for book cards"
    );
  }

  /**
   * Search by typing in the search box + enter
   */
  async searchBook(query: string): Promise<void> {
    const input = await this.driver.wait(
      until.elementLocated(this.searchInput),
      10000
    );
    await input.clear();
    await input.sendKeys(query + "\n");
  }

  /**
   * Returns true if any .card-title is present
   */
  async isSearchResultVisible(): Promise<boolean> {
    try {
      const el = await this.driver.wait(
        until.elementLocated(this.bookCardTitle),
        10000
      );
      return (await el.getText()).length > 0;
    } catch {
      return false;
    }
  }

  /**
   * Adds the very first book card's Add to Cart button
   */
  async addFirstBookToCart(): Promise<void> {
    await this.waitForHomePage();
    const cards = await this.driver.findElements(this.bookCard);
    if (cards.length === 0) {
      throw new Error("No book cards found on home page");
    }
    const addBtn = await cards[0].findElement(
      By.css("button[color='primary']")
    );
    await this.driver.executeScript(
      "arguments[0].scrollIntoView({block:'center'});",
      addBtn
    );
    await this.driver.wait(until.elementIsVisible(addBtn), 5000);
    await this.driver.wait(until.elementIsEnabled(addBtn), 5000);
    await addBtn.click();
  }

  /**
   * Adds a book by exact title match
   */
  async addBookToCartByTitle(bookTitle: string): Promise<void> {
    await this.waitForHomePage().catch(() => {});
    const cards = await this.driver.findElements(this.bookCard);
    for (const card of cards) {
      try {
        const titleEl = await card.findElement(this.bookCardTitle);
        const title = (await titleEl.getText()).trim();
        if (title.toLowerCase() === bookTitle.toLowerCase()) {
          const btn = await card.findElement(By.css("button[color='primary']"));
          await this.driver.executeScript(
            "arguments[0].scrollIntoView({block:'center'});",
            btn
          );
          await this.driver.wait(until.elementIsVisible(btn), 5000);
          await this.driver.wait(until.elementIsEnabled(btn), 5000);
          await btn.click();
          return;
        }
      } catch {
        // next card
      }
    }
    throw new Error(`Book titled "${bookTitle}" not found.`);
  }

  /**
   * Clicks the cart icon
   */
  async goToCart(): Promise<void> {
    const btn = await this.driver.wait(
      until.elementLocated(this.cartIcon),
      10000
    );
    await btn.click();
  }

  /**
   * Returns true if the cart page table is present
   */
  async isOnCartPage(): Promise<boolean> {
    try {
      await this.driver.wait(
        until.elementLocated(By.css("table.mat-mdc-table")),
        10000
      );
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Returns true if our specific book link is in the cart
   */
  async isBookInCart(): Promise<boolean> {
    try {
      await this.driver.wait(until.elementLocated(this.cartItemLink), 10000);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Clicks Checkout button on cart page
   */
  async proceedToCheckout(): Promise<void> {
    const btn = await this.driver.wait(
      until.elementLocated(this.checkoutBtn),
      10000
    );
    await this.driver.wait(until.elementIsVisible(btn), 5000);
    await this.driver.wait(until.elementIsEnabled(btn), 5000);
    await btn.click();
  }

  async fillCheckoutForm(): Promise<void> {
    // wait for name field
    await this.driver.wait(until.elementLocated(this.nameInput), 10000);
    await this.driver.findElement(this.nameInput).sendKeys("Šaćir");
    await this.driver.findElement(this.addr1Input).sendKeys("Sarajevo");
    await this.driver.findElement(this.addr2Input).sendKeys("Apartment 24A");

    // Pincode: type each digit separately
    const pinEl = await this.driver.findElement(this.pincodeInput);
    await pinEl.clear();
    for (const digit of "877659") {
      await pinEl.sendKeys(digit);
    }

    // State
    await this.driver.findElement(this.stateInput).sendKeys("Sarajevo");
  }

  /**
   * Clicks Place Order
   */
  async placeOrder(): Promise<void> {
    const btn = await this.driver.wait(
      until.elementLocated(this.placeOrderBtn),
      10000
    );
    await btn.click();
  }

  /**
   * Returns true if order confirmation header is present
   */
  async isOrderConfirmed(): Promise<boolean> {
    try {
      await this.driver.wait(until.elementLocated(this.orderHeader), 10000);
      return true;
    } catch {
      return false;
    }
  }

  /** Opens user menu and clicks "My Orders" */
  async goToMyOrders(): Promise<void> {
    const trigger = await this.driver.wait(
      until.elementLocated(this.menuTrigger),
      10000,
      "Menu trigger not found"
    );
    await trigger.click();

    // 2. Wait for the My Orders menu item and click it
    const ordersItem = await this.driver.wait(
      until.elementLocated(this.myOrdersItem),
      10000,
      "My Orders menu item not found"
    );
    await ordersItem.click();

    // 3. Wait for navigation to /orders
    await this.driver.wait(
      until.urlContains("/myorders"),
      10000,
      "Did not navigate to /myorders"
    );
  }
}
