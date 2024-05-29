# CygnusVisuales

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.6.
-----------------------------------------------------------------
## Run local PRD

Run `ng serve --configuration production ` for a dev server. Navigate to `http://localhost:2423/`. The app will automatically reload if you change any of the source files.

## RUN local UAT

Run `ng serve --configuration development ` for a dev server. Navigate to `http://localhost:2423/`. The app will automatically reload if you change any of the source files.

## RUN server PRD
1.- Run `npx tsc`
2.- Run `ng build --configuration production`
3.- Run `node dist/server.js OR C:\FastAPI\pAPI>pm2 restart 6 OR C:\Visuales\cygnusvisuales>pm2 start dist/server.js --name "Visuales" --watch`

## RUN server UAT
1.- Run `npx tsc`
2.- Run `ng build --configuration development`
3.- Run `node dist/server.js OR C:\FastAPI\pAPI>pm2 restart 6 OR C:\Visuales\cygnusvisuales>pm2 start dist/server.js --name "Visuales" --watch `

-----------------------------------------------------------------


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
