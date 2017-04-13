# Angular CLI Starter

This project was generated with [angular-cli](https://github.com/angular/angular-cli)

## Prerequisites

- [NodeJS 7.x](https://nodejs.org)
- [dev-api](https://github.com/jmlivingston/dev-api) - Simple node project with REST API and Security (OAuth and role based security)

Note: This is only used as a placeholder for a real API.

## Installation

`npm install -g angular-cli@latest`
`npm install`

## Start Server

- Start the [dev-api](https://github.com/jmlivingston/dev-api) project.
- Run `npm start`. [http://localhost:4001](http://localhost:4001)

## Features

In addition to angular-cli, it adds the following features. See Notes below for more information.

- Style Guide - Based on Bootstrap 4. Allows developers to style using scss and provide a place to review.
- Dev API - Based on json-server. Just drop a json file into the collections folder to use.
- API Helper - Allows GET, POST, PUT, and DELETE of REST API calls.
- Dev OAuth Backend Service - Allow developers to easily test security. You can login using the hints provided.
- To Do - with role based security. (admin, editor, restricted, readonly)
- Post - Simple readonly example.
- Home - Simple home with basic nav and sticky footer.
- 404 Not Found Page
- About page
- Unit Testing

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4001`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Feature Notes

- E2E testing - The documentation is not well-defined for angular-cli or angular.io. While the angular-cli creates an e2e directory with a few files, it isn't clear how these work together or how you should add additional ones. The Angular 2 style guide only provides advice for naming conventions.
- Testing - `npm run coverage` was added.

## Style Guide

- Use the Angular.io Style Guide.
- Additional naming conventions:
  - base.ts - for base classes
  - interface.ts - for interface classes
