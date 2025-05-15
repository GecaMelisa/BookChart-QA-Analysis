# Bug Report – BookCart Demo

**Environment:**

- URL: https://bookcart.azurewebsites.net
- Browser: Chrome (latest), Windows 10

---

## BUG-01: Registration silently blocks on missing gender (TC02)

**Steps to Reproduce:**

1. Navigate to https://bookcart.azurewebsites.net/register
2. Fill in all required fields except **Gender**
3. Click **Register**

**Expected Result:**

- Either registration succeeds without Gender
- **OR** a clear validation message (“Please select your gender”)

**Actual Result:**

- Form does not submit and no feedback or error message is shown

**Severity:** Medium  
**Priority:** P2  
**Status:** Open

---

## BUG-02: Placeholder/identical names allowed (TC04)

**Steps to Reproduce:**

1. Navigate to https://bookcart.azurewebsites.net/register
2. Enter **First Name** = `Test`, **Last Name** = `Test`
3. Fill remaining fields correctly and click **Register**

**Expected Result:**

- Validation error: “Please enter your real name”

**Actual Result:**

- Registration succeeds with placeholder names, harming data quality

**Severity:** Low  
**Priority:** P3  
**Status:** Open

---

## BUG-03: No error on invalid password during login (TC07)

**Steps to Reproduce:**

1. Navigate to https://bookcart.azurewebsites.net/login
2. Enter valid **Username**, invalid **Password**
3. Click **Login**

**Expected Result:**

- Error message “Invalid username or password”

**Actual Result:**

- Login fails but no error or feedback is displayed

**Severity:** High  
**Priority:** P1  
**Status:** Open

---

## BUG-04: No error on non-existent account login (TC08)

**Steps to Reproduce:**

1. Navigate to https://bookcart.azurewebsites.net/login
2. Enter a username that does not exist and any password
3. Click **Login**

**Expected Result:**

- Error message “User does not exist” or “Invalid credentials”

**Actual Result:**

- Page remains on login form with no feedback

**Severity:** High  
**Priority:** P1  
**Status:** Open

---

## BUG-05: Partial-text search fails (TC09)

**Steps to Reproduce:**

1. Navigate to https://bookcart.azurewebsites.net
2. Enter “Harry” (partial title) or “JKR” (author) in search bar
3. Press **Enter**

**Expected Result:**

- Results for partial matches (e.g., “Harry Potter…” or by author abbreviation)

**Actual Result:**

- Only full-title exact matches return results; partial/author searches return none

**Severity:** Medium  
**Priority:** P2  
**Status:** Open

---

## BUG-06: No “no results” message on invalid search (TC10)

**Steps to Reproduce:**

1. Navigate to https://bookcart.azurewebsites.net
2. Search for random string (e.g., `asdf1234`)
3. Press **Enter**

**Expected Result:**

- “No books found” message and empty result set

**Actual Result:**

- All books remain displayed; no indication that no matches were found

**Severity:** Low  
**Priority:** P3  
**Status:** Open

---

## BUG-07: Category filter shows unrelated books (TC11)

**Steps to Reproduce:**

1. Navigate to https://bookcart.azurewebsites.net
2. Click category “Biography” in sidebar

**Expected Result:**

- Only books in “Biography” category display

**Actual Result:**

- Unrelated titles (e.g., Fiction, Romance) also appear

**Severity:** Medium  
**Priority:** P2  
**Status:** Open

---

## BUG-08: Cart item remains when quantity set to zero (TC16)

**Steps to Reproduce:**

1. Add a book to cart
2. On Cart page, decrease its quantity to 0
3. Observe cart contents

**Expected Result:**

- Item is removed or prompt to remove item

**Actual Result:**

- Item remains with quantity “0” and price “₹0.00”; no prompt to remove

**Severity:** Medium  
**Priority:** P2  
**Status:** Open

---

## BUG-09: Wishlist item not removed after adding to cart (TC19)

**Steps to Reproduce:**

1. Add a book to Wishlist
2. From Wishlist page, click **Add to Cart** on that book

**Expected Result:**

- Book moves to cart **and** is removed from Wishlist

**Actual Result:**

- Book is added to cart but still appears in Wishlist, causing duplication

**Severity:** Low  
**Priority:** P3  
**Status:** Open

---

## BUG-10: Placeholder data accepted in checkout (TC22 scenario B)

**Steps to Reproduce:**

1. Proceed to Checkout with cart items
2. Enter placeholder text (e.g., Name: `test`, Address: `blabla`)
3. Submit order

**Expected Result:**

- Validation error rejecting low-quality/placeholder values

**Actual Result:**

- Placeholder data accepted and order completes, degrading data quality

**Severity:** Medium  
**Priority:** P2  
**Status:** Open

---

## BUG-11: “My Orders” search/pagination broken & missing titles (TC24)

**Steps to Reproduce:**

1. Navigate to **My Orders** page after placing orders
2. Use search bar and pagination controls

**Expected Result:**

- Orders filter by search term; pagination works; book titles displayed

**Actual Result:**

- Search/pagination do not function; only Order ID, date, and total show (no titles)

**Severity:** Medium  
**Priority:** P2  
**Status:** Open

---

## BUG-12: “Generate plot summary” button unresponsive (TC27)

**Steps to Reproduce:**

1. On a Book Details page, click **Generate book plot summary using Google Gemini**

**Expected Result:**

- Summary is generated or at least a loading/spinner and error feedback

**Actual Result:**

- Nothing happens; no feedback or error

**Severity:** Low  
**Priority:** P3  
**Status:** Open
