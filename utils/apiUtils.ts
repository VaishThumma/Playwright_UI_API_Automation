import { APIRequestContext } from '@playwright/test';
import * as fs from 'fs';
import testData from './testData.json';


export class APIUtils {


    constructor(private request: APIRequestContext) {

    }

    // read token value from file
    getToken() {
        const fileText = fs.readFileSync('playwright/.auth/token.json', 'utf-8');
        const fileParsed = JSON.parse(fileText);
        return fileParsed.token;

    }

    // read user info from file 
    getUserInfo() {
        const filetext = fs.readFileSync('playwright/.auth/userInfo.json', 'utf-8');
        const fileParsed = JSON.parse(filetext);
        return fileParsed;

    }

    // Create new article via API
    async createArticle() {
        const articleResponse = await this.request.post('https://api.realworld.show/api/articles', {
            data: {
                "article": {
                    "title": testData.articleTitle,
                    "description": testData.articleDescription,
                    "body": testData.articleBody,
                    "tagList": [
                        testData.tag
                    ]
                }
            },
            headers: {
                Authorization: this.getToken()
            }
        })
        return articleResponse;

    }


}