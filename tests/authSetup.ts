import { test as setup, expect } from '@playwright/test';
import { generateUser } from '../utils/generateUser';
import * as fs from 'fs';

// Declarations
let authToken: string;


const newUser = generateUser();

const newUserPayload = {
    "user": {
        "email": newUser.email,
        "password": newUser.password,
        "username": newUser.username
    }
}

setup('create new user and save authentication token', async ({ request, page }) => {

    const signUpResponse = await request.post('https://api.realworld.show/api/users',
        {
            data: newUserPayload
        })

    // asserting if the response is 201 - successful new user creation
    expect(signUpResponse.status()).toBe(201)

    const signUpResponseJson = await signUpResponse.json();
    authToken = `Token ${signUpResponseJson.user.token}`;

    // write the token in a file to access later for API calls
    fs.mkdirSync('playwright/.auth', { recursive: true });

    //write the token value as json string in a file
    fs.writeFileSync('playwright/.auth/token.json', JSON.stringify({ token: authToken }))

    // write the generated new user information as json string in a file
    fs.writeFileSync('playwright/.auth/userInfo.json', JSON.stringify(
        {
            username: newUser.username,
            email: newUser.email,
            password: newUser.password
        }
    ))

    // inject the token value to localStorage for browser authentication
    await page.addInitScript((tokenValue) => {
        window.localStorage.setItem('jwtToken', tokenValue)
    }, authToken)

    await page.goto('/')

    // capture the authenticated browser information in storage state
    await page.context().storageState({ path: 'playwright/.auth/userStorageState.json' })

})