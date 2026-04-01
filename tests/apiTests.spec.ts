import { test, expect } from '@playwright/test'
import testData from '../utils/testData.json';
import { APIUtils } from '../utils/apiUtils';




test('validate new article creation', async ({ request }) => {

    const apiUtils = new APIUtils(request)
    const newArticleResponse = await apiUtils.createArticle();
    const userInfo = await apiUtils.getUserInfo();

    expect(newArticleResponse.status()).toBe(201);
    const articleResponseJSON = await newArticleResponse.json();

    // Verift article title
    expect(articleResponseJSON.article.title).toEqual(testData.articleTitle);

    // verify article body
    expect(articleResponseJSON.article.body).toEqual(testData.articleBody);

    // verify authorname
    expect(articleResponseJSON.article.author.username).toEqual(userInfo.username)

    // Verfiy if slug exists
    expect(articleResponseJSON.article.slug.length).toBeGreaterThan(0);

    // verify if slug is in correct format
    expect(articleResponseJSON.article.slug).toMatch(/^[a-z0-9-]+$/);

})