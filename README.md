# Playwright UI + API Automation - Conduit Web Application

A hybrid test automation suite built with Playwright and TypeScript, covering both API and UI layers of the [Conduit](https://demo.realworld.show/) web application.

## Why Hybrid API + UI Testing

Most automation projects test either the UI or the API in isolation. This project deliberately combines both to validate that the frontend and backend stay in sync. For example, verifying that an article created through the API actually appears correctly in the browser, or that a resource deleted via the API is no longer accessible in the UI.

This approach is a form of integration testing, confirming that data flows correctly across system boundaries, not just that each layer works on its own. It reflects how real systems can fail: not within a single layer, but in the handoff between them.

## Tech Stack 

- [Playwright](https://playwright.dev/) - UI and API test execution
- TypeScript - strongly typed test code
- Page Object Model - maintainable UI interaction layer
- GitHub Actions - CI pipeline for automated test runs on every push

## Test Scenarios

### Completed
- User registration via API with token persistence and browser storageState setup
- Article creation via API with response validation and author assertion
- Hybrid integration test where article is create via API and UI is validated for successful 
  creation

- This demonstrates integration testing. API calls are used to set up state, and UI 
  assertions verify that the frontend correctly reflects what the backend returns. This validates the contract between the two layers.

### In Progress
- Delete article via API, verify it is no longer visible in the UI

## Running Tests Locally
```bash
npm install
npx playwright test
```

To run only the API tests:
```bash
npx playwright test tests/apiTests.spec.ts
```
To run only the hybrid tests:
```bash
npx playwright test tests/hybridTests.spec.ts
```

To view the HTML report after a run:
```bash
npx playwright show-report
```