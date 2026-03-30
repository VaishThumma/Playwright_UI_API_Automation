export function generateUser() {
    const uniqueID = Date.now();
    return {
        username: `newUser${uniqueID}`,
        email: `newUser${uniqueID}@test.com`,
        password: 'Password123!'
    }
}