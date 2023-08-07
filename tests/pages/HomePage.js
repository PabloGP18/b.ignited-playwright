const { expect } = require('@playwright/test')
const { name } = require('../../playwright.config')

exports.HomePage = class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    this.page = page
    this.url = 'https://bol.com/'
    this.modalWindow = page.locator('.modal__window')
    this.SearchBar = page.getByPlaceholder('Waar ben je naar op zoek?')
    this.acceptCookiesButton = page.getByRole('button', {
      name: 'Alles accepteren'
    })
    this.login = page.locator('.h-color-white-text')
    this.emailInputField = page
      .locator('li')
      .filter({ hasText: 'Inloggen' })
      .locator('a')
    this.passwordInputField = page.getByPlaceholder('Wachtwoord')
    this.loginButton = page.getByRole('button').filter({ hasText: 'Inloggen' })
  }

  async navigate() {
    await this.page.goto(this.url)
  }

  async acceptCookies() {
    await this.modalWindow.waitFor()
    await this.acceptCookiesButton.hover()
    await this.acceptCookiesButton.click()
  }

  async searchProduct(text) {
    await this.SearchBar.waitFor({ state: 'visible' })
    await this.SearchBar.isVisible()
    await this.SearchBar.click()
    await this.SearchBar.type(text, { delay: 100 })
    await this.SearchBar.press('Enter')
  }

  async loginFlow() {
    const email = process.env.PLAYWRIGHT_EMAIL
    const password = process.env.PLAYWRIGHT_PASSWORD

    await this.login.click()
    await this.emailInputField.type(email)
    await this.passwordInputField.type(password)
    await this.loginButton.click()
  }
}
