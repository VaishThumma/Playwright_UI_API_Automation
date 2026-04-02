import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { APIUtils } from '../utils/apiUtils';
import testData from '../utils/testData.json';

test('article lifecycle: create and delete via API, validate appropriate reflections in UI', async ({ page, request }) => {

    // create class objects
    const homePage = new HomePage(page);
    const apiUtils = new APIUtils(request);

    // create new article via api
    const newArticleResponse = await apiUtils.createArticle();
    expect(newArticleResponse.status()).toBe(201);

    // extract the slug value of the new article created
    const newArticleResponseJSON = await newArticleResponse.json();
    const slug = newArticleResponseJSON.article.slug;
    const articleTitle = newArticleResponseJSON.article.title;

    // fetch user information used to signup and login
    const user = apiUtils.getUserInfo();

    // navigate to the app
    await page.goto('/');

    // ensure user is logged-in
    await expect((homePage.navBarItems).filter({ hasText: user.username })).toBeVisible();

    const article = homePage.articlePreviewCards.filter({ hasText: articleTitle })
    const tag = homePage.sidebarTagList.filter({ hasText: testData.tag });
    const author = homePage.getAuthorName(article).filter({ hasText: user.username });

    // assert if new article created via API is successfully visible on UI
    await expect(article).toBeVisible();
    await expect(tag).toBeVisible();
    await expect(author).toBeVisible();

    // delete the article via api
    const deleteArticleResponse = await apiUtils.deleteArticle(slug);
    expect(deleteArticleResponse.status()).toBe(204);  //no content

    // reload the page and assert if the article is no longer visible on UI
    await page.reload();
    await expect(article).not.toBeVisible();


})
