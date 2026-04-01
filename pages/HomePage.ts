import { Page, Locator } from "@playwright/test";

export class HomePage {

    // Declarations
    private navBar: Locator;
    private previewCards: Locator;
    private sidebarTags: Locator;


    constructor(private page: Page) {

        this.previewCards = page.locator('.article-preview')
        this.sidebarTags = page.locator('.sidebar .tag-list');
        this.navBar = page.locator('.navbar .navbar-nav li')
    }

    get articlePreviewCards() {
        return this.previewCards;
    }

    get sidebarTagList() {
        return this.sidebarTags;
    }

    getAuthorName(newArticle: Locator) {
        return newArticle.locator('.author');
    }

    get navBarItems() {
        return this.navBar;
    }

}