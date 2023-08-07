const { expect } = require('@playwright/test')

exports.CartPage = class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    this.page = page
    this.modalWindowElement = page
      .getByRole('button')
      //   .filter({ hasText: 'Verder naar bestellen' })
      .first()
    this.divWhenProductInCart = page.getByTestId('item-row')
  }

  async proceedToShoppingCart() {
    await this.modalWindowElement.waitFor()
    if (!this.modalWindowElement) {
      console.log('You go straight to the shopping cart!')
    }
    await this.modalWindowElement.hover()
    await this.modalWindowElement.click()
  }

  async verifyProductInCart() {
    this.page.getByTestId('basket-button').filter({ hasNotText: '0' })
    expect(this.divWhenProductInCart).toBeTruthy()
    await this.divWhenProductInCart.isVisible()
  }
}
