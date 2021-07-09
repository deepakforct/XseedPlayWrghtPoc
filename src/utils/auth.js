const request = require('supertest');

let generateTokenBody = {
"email":"kaushal.mishra+admin@xseededucation.com",
"password":"xseed123",
"referrer":"library.xseeddigital.info"
}

let token;
let requestUrl = "https://accounts-api.xseeddigital.info/api";

async function getAccessToken() {
	const response = await request(requestUrl)
		.post('/login')		
		.set('Content-Type', 'application/json')
		.send(generateTokenBody)
		token = "Bearer " + response.body.token;
		//console.log("Token: " + token);
	return token;
}

module.exports = { getAccessToken };