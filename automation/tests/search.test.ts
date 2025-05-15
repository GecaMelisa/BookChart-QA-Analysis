// File: automation/tests/search.test.ts

import { Builder, WebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import { HomePage } from "../pages/HomePage";

jest.setTimeout(40000);

const BASE_URL = "https://bookcart.azurewebsites.net";
const WORKING_QUERIES = ["Harry Potter and the Chamber of Secrets"];
const BROKEN_QUERIES = ["Harry", "JKR", "Kiersten White"];

describe("TC09 - Search for books/authors", () => {
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

  for (const q of WORKING_QUERIES) {
    it(`should return results for full title "${q}"`, async () => {
      await homePage.searchBook(q);
      expect(await homePage.isSearchResultVisible()).toBe(true);
    });
  }

  for (const q of BROKEN_QUERIES) {
    it(`(known issue) partial/author search "${q}" returns no results`, async () => {
      await homePage.searchBook(q);
      expect(await homePage.isSearchResultVisible()).toBe(false);
    });
  }
});
