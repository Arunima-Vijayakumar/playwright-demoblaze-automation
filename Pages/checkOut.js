
export default class checkout {

    constructor(page) {
        this.page = page;
        this.name = page.locator('#name');
        this.country = page.locator('#country');
        this.city = page.locator('#city');
        this.creditCard = page.locator('#card');
        this.month = page.locator('#month');
        this.year = page.locator('#year');
        this.purchaseButton = page.getByRole('button', {
            name: 'Purchase'
        });
    }

    async enterPurchaseDetails(data) {
        await this.name.fill(data.name);
        await this.country.fill(data.country);
        await this.city.fill(data.city);
        await this.creditCard.fill(data.creditCard);
        await this.month.fill(data.month);
        await this.year.fill(data.year);
    }

    async clickPurchase() {
        await this.purchaseButton.click();
    }
}
