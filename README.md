# COCO CMS
* Maybe some flavor text here about what COCO CMS is
## Dependencies
* Explain our current tech stack for frontend ( React, Storybook, Jest, etc... )
* How to install dependencies that aren't part of Javascript (pre-commit and jq, these are tightly coupled dependencies btw)
* Explain how to install deployment/devOps stack (docker, kubernetes, and helm) and deploy to local kubernetes instance (Use the makefile)
## Getting Started
* What command to start the app
* How to run tests
* How to run linter
## Versioning
We version according based on [Semantic Versioning Standards](https://semver.org/)

General structure is as follows:
```
Example:
v1.0.4 = v<MAJOR VERSION>.<MINOR VERSION>.<PATCH VERSION>

MAJOR version when you make significant change that is backwards incompatible
MINOR version when you add functionality
PATCH version when you make hot fixes or patches for bugs/styling
```
## File Structure
First and foremost, the objective of our file structure is to prevent nesting components deeply
```
App folder structure
/src
.
../components - component folder - mainly used for pure components that render purely on props
..../fancy-button
.....FancyButton.jsx - Pure Component that relies on props for render logic
.
../layouts - layout components that remain static, used for organizing page structure
..../header
....../user-icon - tightly coupled component that isn't reused anywhere else ( for now, may change )
....._header.scss - Base scss module for file
.....Header.jsx
.
../pages - contains content that is unique per page - e.g. Landing Page vs Registration Page
..../registration-page
....._registrationPage.scss
.....RegistrationPage.jsx
.
../utils
.
.App.jsx - Home of the components, should be the source for global contexts
.index.html
.index.jsx
.main.scss - Main SCSS file. Any new SCSS files should be imported here rather than loaded at component level
```
## CSS & CSS-in-JS
* Explain rationale for combining the two
* Explain use case for SCSS and CSS-in-JS
* Explain how to style components that use emotion's composition API
## ESLint
* Explain what ESLint does & what style convention we are adhering to
* Walk through custom  eslint configuration and how to add new rules (but make sure it's obvious we don't want to change it often)
## Jest
I'll write this part once I make a few more tests
## Helm
Maybe make a guide on reading charts and setting values