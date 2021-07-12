function randomString (){
    return "TestAutomation_" + Math.random().toString(36).substring(2,6);
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
  
module.exports = { randomString, sleep };