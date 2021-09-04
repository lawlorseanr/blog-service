# Overview
A backend service for blog hosting website which extends the functionality of an existing endpoint.

# Description
The blog-service API connects to an existing blog endpoint to return blog posts. The existing endpoint only accepts a single query parameter `tag` and no other options. The blog-service API enables users to search for multiple tags with one query, utilizing parallel asynchronous calls to the existing endpoint to return more data in approximately the same time. Further, the blog-service API allows the user to sort by different parameters, and to specify if those results should be sorted ascending or descending. Valid `sortBy` options include: ['id' (default), 'reads', 'popularity', 'likes'], and valid `direction` options include: ['asc' (default), 'desc'].

# Usage
The only required parameter is the `tags` parameter, which must contain a comma separated list of tags to search for. The `sortBy` and `direction` parameters are both optional, and the API will default to the indicated parameters above when a value is not provided. 

Further, the blog-service API uses caching middleware to quickly return results which have been queried previously, saving both time and potential API costs. 

# Installation
1. Navigate to the main project directory at the top level.
2. Run `npm install` in the terminal to install all packages.
3. Run `npm run start` to intialize the service by default on `localhost:3000`.
4. To run the test suite, or review the --coverage output, run `npm run test` for jest data.

# Developer
[Sean Lawlor](https://github.com/lawlorseanr)
