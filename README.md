# COCO CMS
COCO Content Management System ("COCO CMS") is a platform that allows users to create virtual store experiences.

## Table of Contents
* [Getting Started](#Getting-Started)
* [Versioning](#Versioning)
* [CSS & CSS-in-JS](#CSS-&-CSS-in-JS)
* [Jest](#Jest)

## Getting Started
### Available Scripts
* `npm start` to start a local environment for development
* `npm test` to run jest
* `lint` to run linter on all files
* `npm run storybook` to start Storybook
* `make local` to deploy to local Kubernetes

### Installation
* `npm install` to install all dependencies
* Pre-Commit
  * `pip install pre-commit` to install via pip, `brew install pre-commit` via homebrew, or `conda install -c conda-forge pre-commit` via conda
  * run `pre-commit install` to set up git hooks in .pre-commit-config.yaml. This now runs automatically on git commit
* jq
  * `brew install jq` to install JSON CLI (required for the check-gitlab-ci pre-commmit hook)
* `make local` to make a local deployment of COCO CMS in Kubernetes. This deploys a local instance of COCO CMS within a Kubernetes namespace
  * Kubernetes
  * Docker
  * Helm

## Versioning - [Semantic Versioning Standards](https://semver.org/)
Update versions within:
  * Chart.yaml
  * package.json
  * gitlab-ci.yml

## CSS & CSS-in-JS
COCO CMS adopts Emotion for CSS-in-JS as a solution and alternative to inline styles for use cases that require receiving external resources or receiving data. It also works well in cases where animation is procedurally generated from data or changes in state. Aside from dynamic renders in styling, SCSS should be used as a base for styling the frontend because of it's scalability and stability.
* Emotion - [API](https://emotion.sh/docs/emotion#api)
  * The css function provided by Emotion accepts styles as a template literal, object, or array of objects and returns an object containing the computed name and flattened styles
  * In order to use the css function, babel extends React's native jsx to accept the css prop
  * Additional features are referenced in Emotion's API documentation

## Jest
I'll write this part once I make a few more tests