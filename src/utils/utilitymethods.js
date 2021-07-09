function randomString (){
    return "TestAutomation_" + Math.random().toString(36).substring(2,6);
}

module.exports = { randomString };