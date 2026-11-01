
import { test, expect } from '@playwright/test'
import logIn from '../Pages/logIn.js'
import logInCreds from '../test-data/logInCreds.json' with { type: 'json' }

for (const data of logInCreds) {

    test(`Login - ${data.scenario}`, async ({ page }) => {

        await page.goto('https://demoblaze.com/index.html')

        const logInObj = new logIn(page)

        await logInObj.clickLogInLink()
        await logInObj.enterUsernameLogin(data.usernameLogin)
        await logInObj.enterPasswordLogin(data.passwordLogin)

        if (data.expectedResult === 'success') {

            // Valid login
            await logInObj.logInBtnClick()

            // Verify successful login
            await expect(logInObj.getLoggedInName())
                .toHaveText(`Welcome ${data.usernameLogin}`)

            // Logout
            await logInObj.logOut()

            // Verify successful logout
            await expect(logInObj.getLogInLink()).toBeVisible()
            await expect(logInObj.getLoggedInName()).toBeHidden()

        } else {

            // Invalid login - capture error alert
            const dialogPromise = page.waitForEvent('dialog')

            await logInObj.logInBtnClick()

            const dialog = await dialogPromise

            // Verify expected error message
            expect(dialog.message()).toBe(data.expectedResult)

            await dialog.accept()
        }
    })
}
