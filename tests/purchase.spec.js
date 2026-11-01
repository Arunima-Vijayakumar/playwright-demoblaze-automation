
import { test, expect } from '@playwright/test'
import XLSX from 'xlsx'
import products from '../Pages/products.js'
import logIn from '../Pages/logIn.js'
import checkout from '../Pages/checkOut.js'
import validCreds from '../test-data/validCreds.json' with { type: 'json' }

// Read Excel file
const workbook = XLSX.readFile('./test-data/purchaseData.xlsx')

const sheet = workbook.Sheets[workbook.SheetNames[0]]

// Convert Excel data into JavaScript objects
const purchaseData = XLSX.utils.sheet_to_json(sheet, {
    raw: false
})

// Get the first row of Excel data
const exceldata = purchaseData[0]

if (!exceldata) {
    throw new Error('No purchase data found in Excel')
}

// Iterate through valid login credentials
for (const data of validCreds) {

    // TEST CASE 1: Add a product to cart
    test(`Add a random product to Cart with ${data.username}`, async ({ page }) => {

        await page.goto('https://demoblaze.com/index.html')

        const logInObj = new logIn(page)

        await logInObj.clickLogInLink()
        await logInObj.enterUsernameLogin(data.username)
        await logInObj.enterPasswordLogin(data.password)
        await logInObj.logInBtnClick()

        // Verify successful login
        await expect(logInObj.getLoggedInName())
            .toHaveText(`Welcome ${data.username}`)

        const productObj = new products(page)

        // Select Sony Xperia Z5
        await productObj.clickProduct()

        // Register alert handler before clicking Add to cart
        productObj.dialogAccept()
        await productObj.addToCart()
    })

    // TEST CASE 2: Complete purchase of a laptop
    test(`Complete purchase of a laptop with ${data.username}`, async ({ page }) => {

        await page.goto('https://demoblaze.com/index.html')

        const logInObj = new logIn(page)

        await logInObj.clickLogInLink()
        await logInObj.enterUsernameLogin(data.username)
        await logInObj.enterPasswordLogin(data.password)
        await logInObj.logInBtnClick()

        // Verify successful login
        await expect(logInObj.getLoggedInName())
            .toHaveText(`Welcome ${data.username}`)

        const productObj = new products(page)

        // Select Laptops category
        await productObj.laptopClick()

        // Select Sony Vaio i7
        await productObj.randomLaptopClick()

        // Register alert handler before clicking Add to cart
        productObj.dialogAccept()
        await productObj.addToCart()

        // Navigate to cart
        await productObj.cartLinkClick()

        // Verify laptop is in cart
       await expect(page.getByRole('cell', {
    name: 'Sony vaio i7'
}).first()).toBeVisible()

        // Place order
        await productObj.placeOrderClick()

        const checkoutObj = new checkout(page)

        // Enter details from Excel
        await checkoutObj.enterPurchaseDetails(exceldata)

        // Complete purchase
        await checkoutObj.clickPurchase()

        // Verify purchase confirmation
        await expect(page.getByText('Thank you for your purchase!'))
            .toBeVisible()
    })
}

for (const data of validCreds) {

    // TEST CASE 3: Complete purchase of a monitor
    test(`Complete purchase of a monitor with ${data.username}`, async ({ page }) => {

        await page.goto('https://demoblaze.com/index.html')

        const logInObj = new logIn(page)

        // Login using JSON credentials
        await logInObj.clickLogInLink()
        await logInObj.enterUsernameLogin(data.username)
        await logInObj.enterPasswordLogin(data.password)
        await logInObj.logInBtnClick()

        // Verify successful login
        await expect(logInObj.getLoggedInName())
            .toHaveText(`Welcome ${data.username}`)

        const productObj = new products(page)

        // Select Monitors category
        await productObj.monitorClick()

        // Select Apple monitor 24
        await productObj.randomMonitorClick()

        // Handle Add to cart alert
        const dialogPromise = new Promise((resolve, reject) => {
            page.once('dialog', async dialog => {
                try {
                    expect(dialog.message()).toBe('Product added.')
                    await dialog.accept()
                    resolve()
                } catch (error) {
                    reject(error)
                }
            })
        })

        await productObj.addToCart()
        await dialogPromise

        // Navigate to cart
        await productObj.cartLinkClick()

        // Verify monitor is in cart
        await expect(page.getByRole('cell', {
            name: 'Apple monitor 24'
        }).first()).toBeVisible()

        // Place order
        await productObj.placeOrderClick()

        const checkoutObj = new checkout(page)

        // Enter purchase details from Excel
        await checkoutObj.enterPurchaseDetails(exceldata)

        // Complete purchase
        await checkoutObj.clickPurchase()

        // Verify successful purchase
        await expect(page.getByText('Thank you for your purchase!'))
            .toBeVisible()
    })}

