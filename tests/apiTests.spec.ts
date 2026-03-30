import { test, expect } from '@playwright/test'
import testData from '../utils/testData.json';
import { APIUtils } from '../utils/apiUtils';




test('validate new article creation', async ({ request }) => {

    const apiUtils = new APIUtils(request)
    const newArticleResponse = await apiUtils.createArticle();
    const userInfo = await apiUtils.getUserInfo();

    expect(newArticleResponse.status()).toBe(201);
    const articleResponseJSON = await newArticleResponse.json();
    //console.log('created article title:', articleResponseJSON.article.title);
    expect(articleResponseJSON.article.title).toEqual(testData.articleTitle);
    // console.log('created article body:', articleResponseJSON.article.body);
    expect(articleResponseJSON.article.body).toEqual(testData.articleBody);
    //console.log('author:', articleResponseJSON.article.author.username);
    expect(articleResponseJSON.article.author.username).toEqual(userInfo.username)


})