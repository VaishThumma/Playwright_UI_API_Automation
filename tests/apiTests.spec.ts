import { test, expect } from '@playwright/test'
import testData from '../utils/testData.json';
import { APIUtils } from '../utils/apiUtils';


test('Validate new article creation', async ({ request }) => {

    // declarations
    const apiUtils = new APIUtils(request)

    // create new article via api
    const newArticleResponse = await apiUtils.createArticle();

    // fetch user information used for signup and login
    const userInfo = await apiUtils.getUserInfo();

    // assert successful article creation via api
    expect(newArticleResponse.status()).toBe(201);

    const articleResponseJSON = await newArticleResponse.json();
    const articleTitle = articleResponseJSON.article.title;
    const articleBody = articleResponseJSON.article.body;
    const authorName = articleResponseJSON.article.author.username;
    const slugValue = articleResponseJSON.article.slug;

    // verify article title
    expect(articleTitle).toContain(testData.articleTitle);

    // verify article body
    expect(articleBody).toEqual(testData.articleBody);

    // verify authorname
    expect(authorName).toEqual(userInfo.username)

    // verfiy if slug exists
    expect(slugValue.length).toBeGreaterThan(0);

    // verify if slug is in correct format
    expect(slugValue).toMatch(/^[a-z0-9-]+$/);

})

