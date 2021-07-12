const request = require('supertest');
const {getAccessToken} = require('./auth');
const utilityMethods = require('./utilitymethods');

let token = '';
let sequenceId = '';
let createdLPId = '';
let requestUrl = "http://xseed-gateway.xseeddigital.info/graphql";

async function createAnIALessonPlan(){
    token = await getAccessToken();
    let response = await request(requestUrl)
        .post("")
        .set('Authorization', token)
        .set('Content-Type', 'application/json')
        .send(getLessonSeqBody)
    let lessonsArray = response.body.data.block.lessonPlans;
    sequenceId = (lessonsArray[lessonsArray.length-1].sequence) + 1;
    console.log(sequenceId);
    //console.log(createNewLPBody);
    console.log(createdLPId);
    response = await request(requestUrl)
    .post("")
    .set('Authorization', token)
    .set('Content-Type', 'application/json')
    .send(createNewLPBody)
    createdLPId = response.body.data.createLessonPlan.id;
    //  createdLPId = 30196;
    // console.log("This is " +createdLPId);
    console.log(buildlinkLPtoBlockBody());
    response = await request(requestUrl)
    .post("")
    .set('Authorization', token)
    .set('Content-Type', 'application/json')
    .send(buildlinkLPtoBlockBody())
    console.log(response.body);
    return;
}


const getLessonSeqBody = JSON.stringify({
    query:`{
    block(id: 509){
      title
      lessonPlans
      {
        sequence
      }
    }
  }`
});

const createNewLPBody = JSON.stringify({
    query: `mutation {
        createLessonPlan(lessonPlan: {name: "${utilityMethods.randomString()}", description: "Test Automation", type: "information_and_assessment"}) 
        {
          id
          name
          description
          type
        }
      }`
});

function buildlinkLPtoBlockBody(){
return JSON.stringify({
    query:`mutation {
    linkLessonPlanToBlock(data: {blockId: 509, lessonPlanId: ${createdLPId}, sequence: ${sequenceId}, displaySequence: ${sequenceId}}) 
    {
      blockId
      sequence
      displaySequence
      lessonPlanId
    }
  }`
});
}

module.exports = { createAnIALessonPlan } ;