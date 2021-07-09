class CESHomePage{

    constructor(page){
        this.page = page;
    }

    async clickAddProject() {
    await this.page.click('button:has-text("Add Project")');       
    }

    async search(term){
        await this.page.fill('div.v-text-field__slot input', term);
        await this.page.press('div.v-text-field__slot input', 'Enter');
    }
}

module.exports = {CESHomePage};