
export default class products {
    constructor(page) {
        this.page = page
        

        this.randomProduct = page.getByRole('link', {
            name: 'Sony xperia z5'
        })

        this.addtoCartBtn = page.getByRole('link', {
            name: 'Add to cart'
        })

       this.laptopBtn = page.getByRole('link', { name: 'Laptops' })
        this.randomLaptop = page.getByRole('link', {
            name: 'Sony vaio i7'
        })
        this.cartLink= page.locator('#cartur')
        this.placeOrderBtn= page.getByRole('button', {name: 'Place Order'})
        this.monitorBtn = page.getByRole('link', { name: 'Monitors' })
        this.randomMonitor = page.getByRole('link', { name: 'Apple monitor 24'})
    }

    async clickProduct() {
        await this.randomProduct.click();
    }

    async laptopClick(){
        await this.laptopBtn.click()
    }

    async randomLaptopClick(){
        await this.randomLaptop.click()
    }

    async addToCart() {
        await this.addtoCartBtn.click();
    }

    dialogAccept() {
        this.page.once('dialog', async dialog => {
            await dialog.accept();
        })}

    async cartLinkClick(){
       await this.cartLink.click()
    }

    async placeOrderClick(){
        await this.placeOrderBtn.click()
    }

    async monitorClick() {
    await this.monitorBtn.click()
}

async randomMonitorClick() {
    await this.randomMonitor.click()
}



}
