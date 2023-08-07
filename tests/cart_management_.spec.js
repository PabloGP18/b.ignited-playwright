// @ts-check
const { test, expect } = require('@playwright/test')
const { HomePage } = require('./pages/HomePage')
const { ProductPage } = require('./pages/ProductPage')
const { CartPage } = require('./pages/CartPage')

const PRODUCT_NAME = 'Pikachu'
const testProducts = [
  {
    productName: 'Squirtle'
  },
  {
    productName: 'Charmender'
  }
]

test.describe('Adding article to cart', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.navigate()
    await expect(page).toHaveURL(/.*bol/)
    await homePage.acceptCookies()
  })

  test('should search for an article, add it to the cart, verify the product', async ({
    page
  }) => {
    const homePage = new HomePage(page)
    const productPage = new ProductPage(page)
    const cartPage = new CartPage(page)
    await homePage.searchProduct(PRODUCT_NAME)
    await productPage.verifyProductPage(PRODUCT_NAME)
    await productPage.selectProduct()
    await cartPage.proceedToShoppingCart()
    await cartPage.verifyProductInCart()
  })

  testProducts.forEach(({ productName }) => {
    test(`should search for the article ${productName}, add it to the cart, verify the product`, async ({
      page
    }) => {
      const homePage = new HomePage(page)
      const productPage = new ProductPage(page)
      const cartPage = new CartPage(page)
      await homePage.searchProduct(productName)
      await productPage.verifyProductPage(productName)
      await productPage.selectProduct()
      await cartPage.proceedToShoppingCart()
      await cartPage.verifyProductInCart()
    })
  })

  test('should be able to login', async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.loginFlow()
  })
})
