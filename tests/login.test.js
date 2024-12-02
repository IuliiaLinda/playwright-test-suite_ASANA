const { test, expect } = require('@playwright/test');
const { login } = require('../utils/login'); // Import the login function
const testData = require('../data/testData.json');


test.describe('Asana Task Validation Tests', () => {
  testData.forEach((projectData) => {
    projectData.tasks.forEach((taskData) => {
      test(`Verify task "${taskData.name}" in project "${projectData.project}"`, async ({ page }) => {
        // Log in to Asana
        await login(page);
      
        // Navigate to the project
        await page.click(`text=${projectData.project}`);
      
        // Locate the task by its name within the project
        const task = page.getByText(taskData.name);
      
        // Verify the task is in the correct column
        const columnLocator = task.locator('xpath=ancestor::div[contains(@class, "column")]')
        .locator(`text=${taskData.column}`);
        await expect(columnLocator).toBeVisible();

        //  Verify each tag associated with the task
        for (const tag of taskData.tags) {
          const tagLocator = task.locator('xpath=ancestor::div[contains(@class, "task")]')                    
          .locator(`text=${tag}`);
          await expect(tagLocator).toBeVisible();
        }
        
        
        });
      });
    });
  });

 
