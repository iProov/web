# iProov Web SDK Example

This demo is a self-contained NodeJS server and minimal frontend which covers:

* Running a server with a `BASE_URL`, `API_KEY` and `API_SECRET` that you can obtain from https://portal.iproov.com;
* Creating tokens for Genuine Presence and Liveness transactions;
* Enrolling and verifying;
* Customising iProov Web with web component slots and CustomEvents.

### Running the example:

For a basic example, all you need to run it is Docker and some minimal configuration:

1. Obtain your environment variables and create a `.env` file - see `.env.example` for a template.
2. From this `demo` directory, bring up the container with: `bash run.sh`
3. Navigate to http://localhost:8080 in any desktop or mobile web browser.

For a deeper dive, you can of course run the server locally using [NodeJS 14+](https://nodejs.org/en/download/):

```
export $(cat .env | xargs) && node src/server.js
```  

### Features

* **Frontend customisation**:
    * You can customise `createSDK` inside `static/js/vendor/iproov-integration.js`
    * [Available events](https://github.com/iProov/web#-events)
    * [Slot customisation](https://github.com/iProov/web#-slots)
    * [Language customisation](https://github.com/iProov/web#-localization)
* **Backend customisation**:
    * You can customise `PlatformAPI` inside `src/platform.js`
    * The server side is written in JavaScript and uses Hapi.js
    * [iProov Platform API v2 docs](https://eu.rp.secure.iproov.me/docs.html)
* **Validate endpoint**: you can extend the example to implement the validate call
    * Note that in production, it's important that this is implemented on the server side otherwise your API credentials will be exposed!

### Support and SSL Certificates
To access the device camera and other browser APIs, a "secure context" is required.

In practice this means running the server under TLS, or simply using localhost.

For this demo, we keep things simple with localhost. But to test on another device on your network like a mobile, TLS is required.
