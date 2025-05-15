# BookCart QA Automation

Automated UI tests and QA artifacts for the BookCart demo e-commerce application (https://bookcart.azurewebsites.net/).  
Built with Selenium WebDriver, Jest, and TypeScript.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Artifacts](#artifacts)
3. [Tech Stack](#tech-stack)
4. [Prerequisites](#prerequisites)
5. [Setup & Installation](#setup--installation)
6. [Project Structure](#project-structure)
7. [Running Tests](#running-tests)
   - [Smoke Tests](#smoke-tests)
   - [Full Test Suite](#full-test-suite)
8. [Test Plan & Cases](#test-plan--cases)
9. [Bug Report](#bug-report)

---

## Project Overview

This repository contains:

- **Manual QA artifacts**  
  – `test-cases.md`: Detailed positive & negative test cases (27 scenarios)  
  – `smoke-tests.md`: Selected critical user flows for smoke validation  
  – `bug-report.md`: Repro steps, severity, and status of discovered defects

- **Automated Smoke Test**  
  – Written in TypeScript using Selenium WebDriver + Jest  
  – Page Object Model under `automation/pages`  
  – Smoke scenario implemented under `automation/tests/smoke.test.ts`

---

## Artifacts

| File             | Description                                                 |
| ---------------- | ----------------------------------------------------------- |
| `test-cases.md`  | Comprehensive list of all test cases (positive & negative). |
| `smoke-tests.md` | Identified smoke tests (critical happy paths).              |
| `bug-report.md`  | Documented bugs with steps to reproduce & priority.         |
| `README.md`      | This document.                                              |

---

## Tech Stack

- **Language**: TypeScript
- **Test Runner**: Jest
- **Browser Automation**: Selenium WebDriver (Chrome)
- **Assertions**: Jest built-in
- **Page Objects**: Under `automation/pages`
- **CI/CD**: (optional) integrate via GitHub Actions or similar

---

## Prerequisites

- **Node.js** v22.12.0
- **npm** v10.9.0
- **Chrome** (latest)
- **ChromeDriver** matching your Chrome version (installed automatically by `selenium-webdriver`)

---

## Setup & Installation

1. **Clone repository**

   ```bash
   git clone https://github.com/<your-org>/bookcart-qa-automation.git
   cd bookcart-qa-automation

   ```

2. **Install dependencies**
   Using npm
   npm install
   or
   yarn install

3. Verify ChromeDriver
   Selenium WebDriver for Chrome will download the matching driver automatically.

.
├── automation
│ ├── pages # Page Object Model classes
│ │ ├── HomePage.ts
│ │ ├── LoginPage.ts
│ │ └── RegistrationPage.ts
│ └── tests # Jest test specs
│ ├── smoke.test.ts # Smoke test suite
│ ├── register.test.ts # Registration flow
│ ├── login.test.ts # Login flow
│ ├── search.test.ts # Search functionality
│ ├── add-to-cart.test.ts # Add to cart flow
│ ├── checkout.test.ts # Checkout flow
│ └── checkout-my-orders.test.ts # “My Orders” verification
├── bug-report.md # Logged defects & repro steps
├── smoke-tests.md # Identified smoke-test scenarios
├── test-cases.md # Manual test matrix
├── jest.config.js # Jest configuration
├── package.json
└── README.md # This file

## Running Tests

**Full Test Suite**
Execute all automated tests:

```
npx jest

```

**Execute Particular test**

```
npx jest automation/tests/test-name.test.ts

```

## Test Plan & Cases

Manual test plan, including positive & negative scenarios, is in test-cases.md.
Smoke tests (critical flows) are listed in smoke-tests.md.

## Bug Report

All discovered defects with repro steps, expected vs. actual, severity & priority are in bug-report.md.
