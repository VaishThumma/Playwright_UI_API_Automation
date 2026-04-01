import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { APIUtils } from '../utils/apiUtils';
import testData from '../utils/testData.json';

test('verify article is successfully created in UI', async ({ page, request }) => {

    // Create class objects
    const homePage = new HomePage(page);
    const apiUtils = new APIUtils(request);

    //assert if the new article is created
    await apiUtils.createArticle();
    const user = apiUtils.getUserInfo();

    // navigate to the app
    await page.goto('/');

    // Ensre user is created and login is successful
    await expect((homePage.navBarItems).filter({ hasText: user.username })).toBeVisible();

    const newArticle = homePage.articlePreviewCards.filter({ hasText: testData.articleTitle }).first();
    const newTag = homePage.sidebarTagList.filter({ hasText: testData.tag });
    const author = homePage.getAuthorName(newArticle).filter({ hasText: user.username });

    // assert if new article created via API is successfully visible on UI
    await expect(newArticle).toBeVisible();
    await expect(newTag).toBeVisible();
    await expect(author).toBeVisible();

})



