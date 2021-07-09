const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');
const { CESAddProject } = require('../models/CESAddProject');
const { LoginPage } = require('../models/LoginPage');
const { CESHomePage } = require('../models/CESHomePage');
//var robot = require("robotjs");
const {getAccessToken} = require('../utils/auth');
const { createAnIALessonPlan } = require("../utils/createIALP");

// test('basic test', async ({ page }) => {
//   await page.goto('https://library.xseeddigital.info/');
//   const name = await page.innerText('.navbar__title');
//   expect(name).toBe('Playwright');
// });

test('Login to XSeed Library', async () => {
  await createAnIALessonPlan();
  const browser = await chromium.launch({headless: false});
  const context = await browser.newContext({
    javaScriptEnabled: true
  });
  const page = await context.newPage();
  page.setDefaultTimeout(50000);
  await page.goto('https://accounts.xseeddigital.info/#/login?redirectTo=https%3A%2F%2Fces.xseeddigital.info%2F');
  await page.once('load', () => console.log('The home page is loaded'));
  //const title = await page.title();
  //expect(title).toBe('XSEED Library');
  const loginPage = new LoginPage(page);
  await loginPage.login('kaushal.mishra+admin@xseededucation.com','xseed123'); 

//Home Page
  const homePage=new CESHomePage(page);
  await homePage.clickAddProject();

//Add Project 
   const addProjectPage = new CESAddProject(page);
  await addProjectPage.addprojectdetails('.v-list-item__title >> text=2020', '.v-list-item__title >> text=XSEED One India','.v-list-item__title >> text=English', '.v-list-item__title >> text=1' );
  var projectName = await addProjectPage.addprojecttypedetails('text=TTCBEN109 - Describing an Animal', '.v-list-item__title >> text=TestAutomation');
  await addProjectPage.addVerifierDetails("Kaushal Mishra");
  await page.click(addProjectPage.saveButton);

//Search and Publish Created project
  homePage.search("TestAutomation_4yaw");
  await page.waitForSelector(':nth-match(td.text-start, 2) >> text=TestAutomation');
  await addProjectPage.waitandclick('button >> text=View');
  await addProjectPage.waitandclick('button >> text=View');
  await page.waitForSelector('button:has-text("ASSETS")');
  //await page.setInputFiles('');
  await page.click('div.image-upload label img');
 // await robot.typeString("C:\Users\deepak\Downloads\download.jpg");
  //await browser.close();
  await page.pause();
});