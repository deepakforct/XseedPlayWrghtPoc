class LoginPage {
    constructor(page){
        this.page = page;
    }

    //Elements
     userNameField = '[placeholder="enter your email"]';
     passwordField =  '[placeholder="enter password"]';
     loginButton = 'button:has-text("Login")';

    //Methods 
    async login(username, password) {
        //await this.page.goto('https://library.xseeddigital.info/');
        await this.page.fill(this.userNameField, username);
        await this.page.fill(this.passwordField, password);
        await this.page.click(this.loginButton);
      }
}
module.exports = { LoginPage };