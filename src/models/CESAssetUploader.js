var robot  = require("robotjs");
const utilityMethods = require("../utils/utilitymethods");

class CESAssetUploader {
    constructor(page){
        console.log("inside asset uploader constructor");
        this.page = page;
    }
 
    //Elements
    firstImage = 'div.image-upload label img';
    submitButton = 'button:has-text("SUBMIT EDITED LP")';
    imageBriefField = 'p';
    questionAssetBriefField1 = 'div.ProseMirror.ProseMirror-focused p';
    questionAssetBriefField = ':nth-match(p.is-empty.is-editor-empty,2)';
    teacherTipField = 'text=Teacher TipTeacher tip description >> p';
    yesMoveButton = 'button:has-text("Yes, Move")';

    //Methods

   async uploadProjectImages(){
       console.log("Inside the upload images method");
        await this.page.click(this.firstImage);
        utilityMethods.sleep(2000);
        robot.typeString("C:\\Users\\deepak\\Downloads\\download.jpg");
        robot.keyTap("enter");
    }

    async enterImageBrief(){
       await this.clicknfill(this.imageBriefField, "This is Image Brief");
    }

    async enterQuestionAssesstBrief(){
        await this.page.click(this.questionAssetBriefField);
        await this.page.fill(this.questionAssetBriefField1, "This is question asset briefs");
     }
 

    async enterTeacherTipText(){
        await this.clicknfill(this.teacherTipField, "This is teacher Tip");
    }

    async clicknfill(selector, textValue){
        await this.page.click(selector);
        await this.page.fill(selector, textValue);
    }
}

module.exports = {CESAssetUploader};