const { test, expect } = require('@playwright/test');
require('dotenv').config();


async function login(page) {
  // Navigate to the login page
  await page.goto('https://app.asana.com/-/login');

  //  interact with form fields
  const emailField = page.getByLabel('Email address');
  const passwordField = page.getByLabel('Password', {exact: true});
  const loginButtonEmail = page.getByRole('button', { name: 'Continue' , exact: true });
  const loginButtonPassword = page.getByRole('button', { name: 'Log in' });

  // Fill in email and password fields
  await emailField.fill(process.env.ASANA_EMAIL);
  await loginButtonEmail.click();

  await passwordField.fill(process.env.ASANA_PASSWORD);
  await loginButtonPassword.click();

  // Wait for successful navigation or check an element on the dashboard
  await page.waitForURL('https://app.asana.com/0/home/*'); 
}

module.exports = { login };

//npx playwright codegen https://app.asana.com/-/login
