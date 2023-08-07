exports.ProductPage = class ProductPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page
    this.pageTitle = page.getByTestId('page-title')
    this.liElements = page.$$('li.product-item--row')
    this.liElements = page.$$('li.product-item--row')
  }

  async verifyProductPage(text) {
    await this.pageTitle.getByText(text)
    await this.pageTitle.isVisible()
  }

  async selectProduct() {
    const element = this.liElements[2]
    const addToBasketButton = await element?.$('[data-test="add-to-basket"]')
    await addToBasketButton?.click()
  }
}
