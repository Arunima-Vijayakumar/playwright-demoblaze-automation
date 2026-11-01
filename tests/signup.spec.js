import signUp from '../Pages/signUp.js'
import {test, expect} from '@playwright/test'
import TestDataGenerator from '../Utlities/TestDataGenerator'
import { sign } from 'node:crypto'
test('Verify sign up', async ({page}) =>{

    await page.goto('https://demoblaze.com/index.html')
    //signing up
    const signUpObj= new signUp(page)
    const randomData= new TestDataGenerator()

    await signUpObj.SignUpLink()
    let username= randomData.generateUsername()
    let password= randomData.generatePassword()
    await signUpObj.enterUsernameSignUp(username)
    await signUpObj.enterPasswordSignUp(password)
    await signUpObj.Buttonclick()
    await page.pause()

    //close button
    await signUpObj.SignUpLink()
    await signUpObj.enterUsernameSignUp(username)
    await signUpObj.enterPasswordSignUp(password) 
    await signUpObj.closeBtnClick()
    await page.pause()

    await signUpObj.closeBtnClick()
    await expect(signUpObj.getSignUpModal()).toBeHidden()

})
