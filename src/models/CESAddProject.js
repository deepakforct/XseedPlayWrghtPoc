const utilityMethods = require("../utils/utilitymethods");
class CESAddProject{

    constructor(page){
        this.page = page;
    }

    //Elements
    //Add Project Details
    productDropDown = '.v-input.select-grade-dropdown';
    boardDropDown = '.v-input.select-board-dropdown';    
    subjectDropDown = '.v-input.select-subject-dropdown';
    gradeDropDown = ':nth-match(.v-input.select-grade-dropdown, 2)';
    nextButton = 'button:has-text("Next")';

    //Add Project Type
    blockDropDown = ':nth-match(.v-input.select-board-dropdown, 2)';
    lessonPlanDropDown = '.v-input.select-block-children-dropdown';
    projectName = ':nth-match(div.v-text-field__slot input, 2)';
    nextButtonProjectType = ':nth-match(button:has-text("Next"), 2)';

    //Uploader, Reviewer and Approver section
    assetUploaderDropDown ='text = ​Asset Uploader >> input[type="text"]'; 
    assetAuthorizerDropDown ='text=​Asset Authorizer >> input[type="text"]'; 
    proofReaderDropDown = 'text=​Proof Reader >> input[type="text"]';
    saveButton = 'button:has-text("Save")';

    //Methods
    async addprojectdetails(product, board, subject, grade){
        await this.waitandclick(this.productDropDown);
        await this.page.click(product);
        await this.waitandclick(this.boardDropDown);
        await this.page.click(board);
        await this.waitandclick(this.subjectDropDown);
        await this.page.click(subject);
        await this.waitandclick(this.gradeDropDown);
        await this.page.click(grade);
        await this.page.click(this.nextButton);
    }

    async addprojecttypedetails(block, lessonPlan){
        await this.waitandclick(this.blockDropDown);
        await this.page.click(block);
        await this.waitandclick(this.lessonPlanDropDown);
        await this.page.click(lessonPlan);
        await this.page.press(this.lessonPlanDropDown, 'Escape');
        var projectName = utilityMethods.randomString();
        var projectName = utilityMethods.randomString();
        await this.page.fill(this.projectName, ("XSEED One India G1 ENG Blk (10) - Describing an Animal - " +  projectName));
        await this.page.click(this.nextButtonProjectType);
        return projectName;
    }

    async addVerifierDetails(textValue) {
        await this.typeandenter(this.assetAuthorizerDropDown, textValue);
        await this.typeandenter(this.assetUploaderDropDown, textValue);
        await this.typeandenter(this.proofReaderDropDown, textValue);
    }

    async waitandclick(selector){
        await this.page.waitForSelector(selector);
        await this.page.click(selector);
    }

    async typeandenter(selector, textValue){
        await this.page.fill(selector, textValue);
        await this.page.press(selector, 'Enter');
    }

}

module.exports = { CESAddProject };