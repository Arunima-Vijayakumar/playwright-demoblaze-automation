export default class signUp{
    constructor(page){
        this.page= page
        this.signUpButton= page.locator('#signin2')
        this.userName= page.locator('#sign-username')
        this.passWord= page.locator('#sign-password')
        this.finalButton= page.getByRole('button', {name: 'Sign up'})
        this.closeButton= page.getByRole('button', {name: 'Close'}).last()
        this.signUpModal = page.locator('#signInModal')

    }

    async SignUpLink(){
        await this.signUpButton.click()
    }

    async enterUsernameSignUp(usernameData){
        await this.userName.fill(usernameData)
    }

    async enterPasswordSignUp(passwordData){
        await this.passWord.fill(passwordData)
    }

    async Buttonclick(){
        await this.finalButton.click()
    }
    
    async closeBtnClick(){
        await this.closeButton.click()
    }
       getSignUpModal() {
    return this.signUpModal
}
}