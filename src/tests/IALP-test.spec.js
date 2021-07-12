const { test } = require('@playwright/test');
const { chromium } = require('playwright');
const { CESAddProject } = require('../models/CESAddProject');
const { LoginPage } = require('../models/LoginPage');
const { CESHomePage } = require('../models/CESHomePage');
const { CESAssetUploader } = require('../models/CESAssetUploader');
const utilityMethods = require("../utils/utilitymethods");
const { createAnIALessonPlan } = require("../utils/createIALP");


test('Login to XSeed Library', async ({page}) => {
  await createAnIALessonPlan();
  await page.goto('https://accounts.xseeddigital.info/#/login?redirectTo=https%3A%2F%2Fces.xseeddigital.info%2F');
  page.once('load', () => console.log('The home page is loaded'));
  //const title = await page.title();
  //expect(title).toBe('XSEED Library');
  const loginPage = new LoginPage(page);
  await loginPage.login('kaushal.mishra+admin@xseededucation.com','xseed123'); 

//Home Page
  const homePage=new CESHomePage(page);
  await page.waitForSelector('button >> text=View');
  await homePage.clickAddProject();

//Add Project 
   const addProjectPage = new CESAddProject(page);
   await addProjectPage.addprojectdetails('.v-list-item__title >> text=2020', '.v-list-item__title >> text=XSEED One India','.v-list-item__title >> text=English', '.v-list-item__title >> text=1' );
    var projectName = await addProjectPage.addprojecttypedetails('text=TTCBEN109 - Describing an Animal', '.v-list-item__title >> text=TestAutomation');
  
  //await page.pause();
  await addProjectPage.addVerifierDetails("Kaushal Mishra");
  await page.click(addProjectPage.saveButton);

//Search and Publish Created project
  await homePage.search(projectName);
  await page.waitForSelector(':nth-match(td.text-start, 2) >> text=TestAutomation');
  await addProjectPage.waitandclick('button >> text=View');
  utilityMethods.sleep(1000);
  await addProjectPage.waitandclick('button >> text=View');
  console.log("waiting for selector");
  await page.waitForSelector('button:has-text("VALIDATE")');
  utilityMethods.sleep(3000);
  //await page.setInputFiles('');
  const assetUploader = new CESAssetUploader(page);
  await assetUploader.uploadProjectImages();
  utilityMethods.sleep(4000);
  var Elements = await page.$$('p.is-empty.is-editor-empty');
  for (i =0; i <Elements.length; i++){
  await Elements[i].click();
  }
  utilityMethods.sleep(4000);
  await assetUploader.enterImageBrief();
  await assetUploader.uploadProjectImages();
  utilityMethods.sleep(5000);
  await assetUploader.enterQuestionAssesstBrief();
  utilityMethods.sleep(3000);
  await assetUploader.enterTeacherTipText();
  await page.click('text=FINAL Asset');
  await page.click(':nth-match(:text("FINAL Asset"),2)');
  
  await page.click(assetUploader.submitButton);
  await page.click(assetUploader.yesMoveButton);

  //Proof reading
  await page.waitForSelector('text=Proofreading');
  await addProjectPage.waitandclick('button >> text=View');
  await page.waitForSelector('button:has-text("SUBMIT PROOFREAD LP")');
  await page.click('button:has-text("SUBMIT PROOFREAD LP")');
  await page.click(assetUploader.yesMoveButton);

  //Publish Project
  await page.waitForSelector("text=Completed");
  await page.click('button:has-text("PUBLISH PROJECT")');


  //await page.pause();
});
