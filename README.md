# Playwright UI + API Automation | Conduit Web Application

A hybrid test automation suite built with Playwright and TypeScript, covering both API and 
UI layers of the [Conduit](https://demo.realworld.show/) web application.

![CI](https://github.com/VaishThumma/Playwright_UI_API_Automation/actions/workflows/playwright.yml/badge.svg)

## Why Hybrid API + UI Testing

Most automation projects test either the UI or the API in isolation. This project 
deliberately combines both to validate that the frontend and backend stay in sync,
verifying that an article created through the API appears correctly in the browser, and 
that a resource deleted via the API is no longer accessible in the UI.

This approach is a form of integration testing, confirming that data flows correctly across 
system boundaries, not just that each layer works on its own. Real systems often fail not 
within a single layer, but in the handoff between them.

## Tech Stack

- [Playwright](https://playwright.dev/) - UI and API test execution
- TypeScript - strongly typed test code
- Page Object Model - maintainable UI interaction layer
- GitHub Actions - CI pipeline, triggered on every push

## Test Scenarios

### Completed
- User registration via API with token persistence and browser storageState setup
- Article creation via API with response validation, author assertion and slug format check
- Article lifecycle integration test - article created via API, verified in UI feed, 
  deleted via API, confirmed removed from UI

### Planned
- Negative test: unauthorised user cannot delete another user's article (access control)

## Project Structure
```
tests/
  authSetup.ts          — global auth setup, runs before all tests
  apiTests.spec.ts      — API layer tests
  hybridTests.spec.ts   — combined UI + API integration tests
pages/
  HomePage.ts           — Page Object for the Conduit home feed
utils/
  apiUtils.ts           — reusable API methods
  generateUser.ts       — dynamic test user generation
  testData.json         — centralised test data
  constants.ts          — shared URL constants
```

## Running Tests Locally
```bash
npm install
npm test
```

To run specific test suites:
```bash
npm run test:api       # API tests only
npm run test:hybrid    # Hybrid UI + API tests only
npm run report         # Open HTML test report
```

> Note: Tests target a live public demo API which may occasionally be unavailable. 
> All tests pass when the environment is stable - CI history reflects this.