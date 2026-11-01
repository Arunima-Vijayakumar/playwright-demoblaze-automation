export default class logIn{
    constructor(page){
        this.page= page
        this.logInLink= page.locator('#login2')
        this.userNameLogin= page.locator('#loginusername')
        this.passwordLogin= page.locator('#loginpassword')
        this.logInBtn= page.getByRole('button', {name: 'Log in'})
        this.loggedUserName= page.locator('#nameofuser')
        this.logOutBtn= page.locator('#logout2')


    }

    async clickLogInLink(){
        await this.logInLink.click()
    }

    async enterUsernameLogin(userName){
        await this.userNameLogin.fill(userName)
    }

    async enterPasswordLogin(passWord){
        await this.passwordLogin.fill(passWord)
    }

    async logInBtnClick(){
        await this.logInBtn.click()
    }

     getLoggedInName(){
         return  this.loggedUserName
    }
    getLogInLink() {
    return this.logInLink
}

    async logOut(){
        await this.logOutBtn.click()
    }
}