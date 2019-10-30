# iProov HTML5 Client v2.0.0 (beta)

## Introduction

The HTML5 client is the iProov client for web browser based authentication. It can be integrated in a number of ways to support your web journeys for onboarding and authentication.

Please note that to use the HTML5 client you will require Service Provider credentials. You can set these up automatically after registering your company on our [portal](https://portal.iproov.com/login).

You will need to generate a token from your back-end to use with the HTML5 client. You can use the [API documentation](https://secure.iproov.me/docs.html) to make the relevant API calls and return the token to your front-end.

The current published version is 2.0.0 beta 4 provided for customers and partners to integrate with stable API calls and customisation options. A small number of features are still in progress. Accordingly this version should be considered as beta and should not be used in full production.

## Quick Links

- [iProov HTML5 Client v2.0.0 (beta)](#iproov-html5-client-v200-beta)

  - [Introduction](#introduction)
  - [Quick Links](#quick-links)
  - [Supported Browsers](#supported-browsers)
  - [Integrating](#integrating)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [Script Tag](#script-tag)
  - [Node Module](#node-module)
    - [Setup](#setup)
    - [Vanilla JavaScript](#vanilla-javascript)
    - [jQuery](#jquery)
    - [Angular v7](#angular-v7)
      - [Safari 12.1 Known WebRTC issue](#safari-121-known-webrtc-issue)
    - [React v16](#react-v16)
    - [Vue v2](#vue-v2)
  - [Events](#events)
    - [Details](#details)
    - [Listeners](#listeners)
  - [Customisation](#customisation)
    - [Slots](#slots)
    - [Options](#options)
      - [Base URL](#base-url)
      - [Allow Landscape](#allow-landscape)
      - [Screen Brightness](#screen-brightness)
      - [Show Countdown](#show-countdown)
      - [Prefer App](#prefer-app)
      - [Colours](#colours)
      - [Logo](#logo)
      - [Custom Title](#custom-title)
        - [Examples](#custom-title-examples)
    - [HTML](#html)
    - [JavaScript](#javascript)
    - [Language Support](#language-support)
      - [Default Language](#default-language)
      - [Custom Language](#custom-language)
    - [Language Code Examples](#language-code-examples)
      - [ES6 static JSON object](#es6-static-json-object)
      - [ES6 async/await fetch file from local or external source](#es6-asyncawait-fetch-file-from-local-or-external-source)
      - [React 16, Axios, ES6 async/await fetch file from local or external source](#react-16-axios-es6-asyncawait-fetch-file-from-local-or-external-source)
      - [Angular 7, HttpClient, ES6 fetch file from local filesystem](#angular-7-httpclient-es6-fetch-file-from-local-filesystem)
      - [Angular 7, HttpClient, ES6 fetch file from external source](#angular-7-httpclient-es6-fetch-file-from-external-source)

## Supported Browsers

iProov's HTML5 Application requires modern browsers to be able to work due to making use of technologies [WebRTC](https://webrtc.org/), [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API), [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) and [WebAssembly](https://webassembly.org/). See below for the full list of supported browsers and their minimum versions.

| ![Chrome](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/51.0.17/archive/chrome_1-11/chrome_1-11.svg) | ![Firefox](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/51.0.17/archive/firefox_1.5-3/firefox_1.5-3.svg) | ![Opera](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/51.0.17/archive/opera_10-14/opera_10-14.svg) | ![Safari](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/51.0.17/safari-ios/safari-ios.svg) | ![SamsungInternet](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/51.0.17/archive/samsung-internet_5/samsung-internet_5.svg) |
| ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| 58+ ✔                                                                                                       | 55+ ✔                                                                                                            | 45+ ✔                                                                                                      | 11+ ✔                                                                                             | 8.2 ✔                                                                                                                              |

> If the device attempting to iProov doesn't meet the minimum requirements. The `unsupported` event will be fired. See [#events](#events) for more details.

## Integrating

### Backend

To make use of this HTML5 client you will require integration with the back-end iProov service. To access credentials and an integration guide, please visit [portal.iproov.com](https://portal.iproov.com).

When starting an iProov transaction (or claim), you would first need to generate an [enrolment](https://secure.iproov.me/docs.html#operation/userEnrolServerToken) or [verification](https://secure.iproov.me/docs.html#operation/userVerifyServerToken) token, which can be done as part of the page load or with AJAX. You would then need to pass the token to your frontend to initialise the HTML5 client.

After receiving the result from the HTML5 client, you must then confirm its authenticity by calling the validate API from your backend on page submission or with AJAX.

> The REST API should always be called from your backend so as to never expose your secret to your client application.

> Always call the validate API from your backend after receiving a result; never trust the result provided directly from the HTML client.

### Frontend

Once an iProov token has been generated by your backend, you should pass it to the HTML5 client using one of the [integration methods](#integration) described below.

After a successful iProov, the result must be validated by the backend before granting the user any privileges.

In these examples, the token is generated and validated using AJAX (in the register/login demo) and form submission (for the integration examples) by passing the following data to the backend:

- **user_id** - the email address provided by the user
- **action** - the specific endpoint to call:
  - _token_ - generate a unique 64 character token for the client
  - _validate_ - check the validity of the result provided by the client

## Script Tag

The simplest and fastest method of integrating with the iProov HTML5 client is to reference our generated client javascript file within your page as shown below. You would then use either the [Vanilla JavaScript](#vanilla-javascript) or [jQuery](#jquery) methods depending on your page's setup.

```html
<script src="https://client.iproov.app/v2"></script>
```

## Node Module

The iProov HTML5 Node Module `@iproov/html5` allows for integration of the iProov HTML5 client. It makes use of the [Web Components](https://www.webcomponents.org/introduction) APIs which are supported by most modern browsers and uses the [Polymer Project](https://www.polymer-project.org) to add support where they are not yet available.

### Setup

Install the node module as a dependency. You can use [Yarn](https://yarnpkg.com/lang/en/) or [NPM](https://www.npmjs.com/get-npm) to do this.

```
yarn add @iproov/html5
```

```
npm i @iproov/html5 --save
```

After you have installed the `@iproov/html5` package, you must then include the code into your project ideally at the root of your application:

```javascript
require("@iproov/html5")
```

It's as simple as that including the HTML5 client. You now need to inject the webcomponent by one of the [integration methods](#integration) shown below.

To include the iProov HTML5 client on your page, complete one of the following steps.

### Vanilla JavaScript

Inject the `<iproov-me>` element into the page with your token:

```javascript
window.addEventListener("WebComponentsReady", function(event) {
  const iProovMe = document.createElement("iproov-me")
  iProovMe.setAttribute("token", "***YOUR_TOKEN_HERE***")
  document.getElementById("your-container-id").appendChild(iProovMe)
})
```

### jQuery

The HTML can also be injected directly onto the page as in this jQuery example:

```javascript
window.addEventListener("WebComponentsReady", function(event) {
  $("#your-container-id").append($('<iproov-me token="***YOUR_TOKEN_HERE***"></iproov-me>'))
})
```

### Angular v7

Integrating with an Angular project has a few steps that need to be implemented to work out of the box. You will first need to create a custom Angular component which will allow you to inject the HTML5 client into your project.

> Note that the iProov HTML5 client has only been tested with Angular v7 and may not be compatiable with earlier versions.

The example below shows how to use iProov within your application and an example integrating with some of the events available for you to use. [View the full list of events](#events)

`iproov-component.html`

```html
<style type="text/css">
  #accessibility {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
</style>
<!-- Screen reader dynamic messages injected here from the feedback event -->
<div id="accessibility" aria-live="assertive" aria-hidden="false"></div>
<!-- <iproov-me> web component is injected here-->
<div id="iproov-container"></div>
```

`iproov.component.ts`

```javascript
import { Component, OnInit } from "@angular/core"
import "@iproov/html5"

@Component({
  selector: "app-iproov", // component name used to inject iproov into app <app-iproov>
  template: "./iproov-component.html", // iproov-component.html as shown above
})
export class IproovComponent implements OnInit {
  token = "***YOUR_TOKEN_HERE***" // replace with your generated token
  ngOnInit() {
    //- Wait for web components to be ready before trying to use them
    window.addEventListener("WebComponentsReady", () => {
      const iProovMe = document.createElement("iproov-me")

      //- Bind any events before injecting into the page (must be before to work)
      iProovMe.addEventListener("unsupported", () => {
        console.warn("unsupported event was fired!")
      })

      // - Bind messages from the feedback event to div on page
      iProovMe.addEventListener("feedback", event => {
        const { key, message } = event.detail
        console.warn(`Key: ${key} Message: ${message}`)

        // - Triggers event to DOM element
        const trigger = (target, event = "change") => {
          const evt = document.createEvent("HTMLEvents")
          evt.initEvent(event, true, true)
          target.dispatchEvent(evt)
        }

        const element = document.getElementById("accessibility")
        if (element) {
          element.textContent = message // escape html...
          trigger(element)
        }
      })

      //- Set your generated token
      iProovMe.setAttribute("token", this.token)

      //- Inject any custom slots
      iProovMe.innerHTML = `
      <div slot="button">
          <button>
              Scan Face <small>BETA TEST</small>
          </button>
      </slot>`

      //- An alternative way of injecting a custom slots
      const buttonSlot = document.createElement("button")
      buttonSlot.setAttribute("slot", "button")
      buttonSlot.innerHTML = `Scan Face <small>BETA TEST</small>`
      iProovMe.appendChild(buttonSlot)

      //- Inject iproov element into your page
      document.getElementById("iproov-container").insertAdjacentElement("beforebegin", iProovMe)
    })
  }
}
```

You will then need to inject the component into your application and also tell Angular that we are using custom web components. The code below is from the `angular-cli` default generated app.

`app.module.ts`

```javascript
import { BrowserModule } from "@angular/platform-browser"
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core" // import Custom Elements from Angular

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { IproovComponent } from "./iproov.component" // import the iproov component we just created

@NgModule({
  declarations: [
    AppComponent,
    IproovComponent, // include the iproov component
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA, // define the custom element schema
  ],
})
export class AppModule {}
```

We then need to reference our new component in our app. The code below is again from the `angular-cli` default generated app.

`app.component.html`

```html
<div style="text-align:center">
  <app-iproov></app-iproov>
  <h1>
    Welcome to {{ title }}!
  </h1>
</div>
```

#### Safari 12.1 Known WebRTC issue

Currently, Angular Apps in Safari 12.1 using WebRTC have an issue causing video streams to not send. To fix this, create a file called `zone-flags.js` if you don't already have one and paste inside that file: `(window as any).__zone_symbol__BLACK_LISTED_EVENTS = ['icecandidate'];`. Then import that file within your `pollyfills.js` with the following `import './zone-flags.ts'` before the zone import.

### React v16

Integrating with React is pretty straight forward. First of all, include the `@iproov/html5` package into your application and then include the <iproov-me> web component with your generated token. If you want to pass any [custom slots](#Customisation) in, use the same method as shown below. The example below is taken from the [create-react-app](https://github.com/facebook/create-react-app) tool.

```javascript
import React, { Component } from 'react';

require('@iproov/html5'); // includes the @iproov/html5 client into your app

class App extends Component {
  render() {
    return (
      <div className="App">
        <!-- replace with your generated token -->
        <iproov-me token="***YOUR_TOKEN_HERE***">
            <!-- add any custom slots here -->
            <div slot="button">
                <button>
                    My Custom Button Text
                </button>
            </slot>
        </iproov-me>
      </div>
    );
  }
}

export default App;

```

### Vue v2

Integrating with Vue JS is super easy and can be done with just a few lines of code. The example below was taken from using [Vue create hello-world](https://cli.vuejs.org/guide/creating-a-project.html). Include the `<iproov-me>` web component and replace with your generated token. Then all you need to do is include the `@iproov/html5` client.

```html
<template>
  <div class="hello">
    <iproov-me token="***YOUR_TOKEN_HERE***"
      ><!-- replace with your generated token -->
      <!-- add any custom slots here -->
      <div slot="button">
        <button>Scan Face <small>Vue Example</small></button>
      </div>
    </iproov-me>
  </div>
</template>

<script>
  require("@iproov/html5") // include the @iproov/html5 client
  export default {
    name: "HelloWorld",
    props: {
      msg: String,
    },
  }
</script>
```

> Note that JavaScript methods are run after the **WebComponentsReady** event to ensure that the client is ready to be injected.

## Events

There are a set of [CustomEvents](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) that can be used to integrate bespoke functionality. Events are bound directly to the `<iproov-me>` element after the [WebComponentsReady](https://www.webcomponents.org/polyfills#the-webcomponentsready-event) event.

### Details

Every event has a [detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail) property which contains data relating to that event. The following details are present for every event:

```json
{
  "token": "Your Generated Token"
}
```

The available events are detailed below with any extra properties that are supplied:

| Event                 | Extra Properties      | Description                                                          |
| --------------------- | --------------------- | -------------------------------------------------------------------- |
| **ready**             | None                  | iProov has initialised successfully and has camera permission        |
| **started**           | None                  | The user has started iProov by launching into fullscreen             |
| **aborted**           | _feedback, reason_    | The user has aborted iProov by exiting fullscreen                    |
| **streamed**          | None                  | The user has finished streaming and the client has exited fullscreen |
| **progress**          | _percentage, message_ | iProov has published a progress update for the authentication        |
| **passed**            | None                  | The authentication was successful so the result can now be validated |
| **failed**            | _feedback, reason_    | The authentication was unsuccessful so the user needs to try again   |
| **error**             | _feedback, reason_    | iProov encountered an error while processing the authentication      |
| **unsupported**       | _feedback, reason_    | The browser does not support using iProov                            |
| **feedback**          | _key, message_        | Used for accessibility integration see [example below](#listeners)   |
| **permission**        | None                  | Camera permission is unknown and not blocked, show permission screen |
| **permission_denied** | None                  | The user has blocked access to the camera                            |

All possible properties of the event's **detail** property are described below:

| Property       | Events                                | Description                                                |
| -------------- | ------------------------------------- | ---------------------------------------------------------- |
| **cameras**    | All                                   | The total number of cameras available to the browser       |
| **token**      | All                                   | The token associated with the authentication attempt       |
| **type**       | All                                   | The type of authentication (enrol or verify)               |
| **percentage** | _progress_                            | A percentage (between 0 and 100) representing the progress |
| **message**    | _progress_                            | A user-friendly description of the current progress stage  |
| **feedback**   | _aborted, failed, error, unsupported_ | A fixed feedback code for making logical decisions         |
| **reason**     | _aborted, failed, error, unsupported_ | An English description of the reason for the event         |

In the case of the **aborted**, **failed**, **error** and **unsupported** events, the _feedback_ code can be used for dealing with special cases and the _reason_ can be displayed to the user. The following are some of the possible responses:

| Feedback                              | Reason                                                |         Event |
| ------------------------------------- | ----------------------------------------------------- | ------------: |
| **client_browser**                    | The browser is not supported                          | _unsupported_ |
| **fullscreen_change**                 | Exited fullscreen without completing iProov           |     _aborted_ |
| **ambiguous_outcome**                 | Sorry, ambiguous outcome                              |      _failed_ |
| **network_problem**                   | Sorry, network problem                                |      _failed_ |
| **user_timeout**                      | Sorry, your session has timed out                     |      _failed_ |
| **lighting_flash_reflection_too_low** | Ambient light too strong or screen brightness too low |      _failed_ |
| **lighting_backlit**                  | Strong light source detected behind you               |      _failed_ |
| **lighting_too_dark**                 | Your environment appears too dark                     |      _failed_ |
| **lighting_face_too_bright**          | Too much light detected on your face                  |      _failed_ |
| **motion_too_much_movement**          | Please keep still                                     |      _failed_ |
| **motion_too_much_mouth_movement**    | Please do not talk while iProoving                    |      _failed_ |
| **client_config**                     | There was an error with the client configuration      |       _error_ |
| **client_api**                        | There was an error calling the API                    |       _error_ |
| **client_camera**                     | There was an error getting video from the camera      |       _error_ |
| **client_stream**                     | There was an error streaming the video                |       _error_ |
| **client_error**                      | An unknown error occurred                             |       _error_ |
| **server_abort**                      | The server aborted the claim before iProov completed  |       _error_ |
| **invalid_token**                     | The provided token has already been claimed           |       _error_ |

### Listeners

It is recommended that you listen for at least the **ready** and **unsupported** events as one of them will always be called so you can determine if iProov is supported or not:

```javascript
document.querySelector("iproov-me").addEventListener("ready", function(event) {
  console.log("iProov is ready to " + event.detail.type + " with token " + event.detail.token)
})
document.querySelector("iproov-me").addEventListener("unsupported", function(event) {
  console.warn("iProov is not supported: " + event.detail.reason)
})
```

> The **unsupported** event will be called by older browsers that support [CustomEvents](https://caniuse.com/customevent) (browsers released in 2011 and after - e.g. IE9+). If you want to degrade nicely in even older browsers, you should implement you own test like [checking for CustomEvent](https://stackoverflow.com/questions/20956964/detect-working-customevent-constructor).

As all of the event **details** follow the same structure, they can be handled by a single function if desired:

```javascript
var iProovMe = document.querySelector("iproov-me")
iProovMe.addEventListener("ready", iProovEvent)
iProovMe.addEventListener("started", iProovEvent)
iProovMe.addEventListener("aborted", iProovEvent)
iProovMe.addEventListener("streamed", iProovEvent)
iProovMe.addEventListener("progress", iProovEvent)
iProovMe.addEventListener("passed", iProovEvent)
iProovMe.addEventListener("failed", iProovEvent)
iProovMe.addEventListener("error", iProovEvent)
iProovMe.addEventListener("unsupported", iProovEvent)
iProovMe.addEventListener("feedback", iProovEvent)
iProovMe.addEventListener("permission", iProovEvent)
iProovMe.addEventListener("permission_denied", iProovEvent)

function iProovEvent(event) {
  switch (event.type) {
    case "aborted":
    case "failed":
    case "error":
    case "unsupported":
    case "permission":
    case "permission_denied":
      console.warn("iProov " + event.type + " - " + event.detail.reason)
      break
    case "progress":
      console.info(event.detail.message + " (" + event.detail.progress + "%)")
      break
    case "feedback":
      feedback(event)
    default:
      console.log("iProov " + event.detail.type + " " + event.type)
  }
}

// - Example of how to use the feedback event
// - This example would require the HTML below to work:
/*
<style type="text/css">
  #accessibility {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
</style>
<!-- Screen reader dynamic messages injected here from the feedback event -->
<div id="accessibility" aria-live="assertive" aria-hidden="false"></div>
*/
function feedback(event) {
  var key = event.detail.key // optional key used for different languages
  var message = event.detail.message // the full message to be read out

  // - Triggers event to DOM element
  function trigger(target) {
    var evt = document.createEvent("HTMLEvents")
    evt.initEvent("change", true, true)
    target.dispatchEvent(evt)
  }

  var element = document.getElementById("accessibility")
  if (element) {
    element.textContent = message // escape html...
    trigger(element)
  }
}
```

If using [jQuery](https://jquery.com), you can attach to all the events in one go:

```javascript
$("iproov-me").on("ready started aborted streamed progress passed failed error unsupported", iProovEvent)
```

Further examples of event usage can be found in [examples.js](./examples.js) and [script.js](./script.js).

## Customisation

### Slots

Visual customisation can be achieved with [templates and slots](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots) using the [Shadow DOM API](https://webkit.org/blog/4096/introducing-shadow-dom-api/). The following [slots](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot) can be used with the `<iproov-me>` web component and have associated [events](#events):

| Slot                  | Description                                                                                    |
| --------------------- | ---------------------------------------------------------------------------------------------- |
| **button**            | Element that a user taps or clicks on to launch into fullscreen and start iProov               |
| **ready**             | Screen displayed to the user when the component is ready to start the main iProov user journey |
| **aborted**           | Screen displayed to the user when they exit fullscreen before iProoving                        |
| **progress**          | Screen displayed to the user when streaming has completed and iProov is processing the result  |
| **passed**            | Screen displayed to the user when the user passed iProov                                       |
| **failed**            | Screen displayed to the user when the user failed iProov                                       |
| **error**             | Screen displayed to the user in the event of an error                                          |
| **unsupported**       | Screen displayed to the user when their browser is not supported                               |
| **permission_denied** | Screen displayed to the user when camera permission has been blocked                           |
| **grant_permission**  | Screen displayed to the user when camera permission is unknown and not blocked                 |
| **grant_button**      | Element that user taps or clicks to grant camera permission                                    |
| **no_camera**         | Screen displayed to the user when there is no camera                                           |

Slots can be embedded as HTML or injected with JavaScript.

### Options

#### Base URL

You can change the backend server you are attempting to iProov against by passing the `base_url` property. This needs to match the same endpoint you used when generating tokens for enrols and verifications.

```html
<iproov-me token="***YOUR_TOKEN_HERE***" base_url="https://eu.rp.secure.iproov.me">
  <div slot="ready">
    <h1>Ready to iProov</h1>
  </div>
</iproov-me>
```

#### Locale

The iProov HTML5 app will look at the device currently iprooving and determine its locale value. This value is used to decide which language files to use (where supported). You can pass `locale` as an option which will override the devices value and force that language.

> This feature will only work if the language is supported. In the case it isn't, a warning in the console will be fired and you will need to pass in the language overrides by using the options found in [Languages](#language-support)

```html
<iproov-me token="***YOUR_TOKEN_HERE***" locale="nl">
  <div slot="ready">
    <h1>Ready to iProov</h1>
  </div>
</iproov-me>
```

#### Prefer App

The `prefer_app` setting converts the scan button into an app launch URL which will launch the iProov app or iProov SDK when within a WebView. The following values are allowed and multiple can be used when separated by a comma:

- always
- ios
- android
- ios-webview
- android-webview

```html
<iproov-me token="***YOUR_TOKEN_HERE***" prefer_app="ios,ios-webview">
  <div slot="ready">
    <h1>Ready to iProov</h1>
  </div>
</iproov-me>
```

#### Allow Landscape

Mobile devices are by default prevented from iProoving while in landscape. This feature can be disabled by passing `allow_landscape` `true` with your component as shown below.

```html
<iproov-me token="***YOUR_TOKEN_HERE***" allow_landscape="true">
  <div slot="ready">
    <h1>Ready to iProov</h1>
  </div>
</iproov-me>
```

#### Screen Brightness

The screen brightness prompt which is displayed on mobile devices can be disabled by passing in `screen_brightness_prompt` `false`. By default, `screen_brightness_prompt` is true (on). The example below shows how to disable the screen brightness prompt.

```html
<iproov-me token="***YOUR_TOKEN_HERE***" screen_brightness_prompt="false">
  <div slot="ready">
    <h1>Ready to iProov</h1>
  </div>
</iproov-me>
```

#### Show Countdown

By setting `show_countdown` to `true`, a countdown will be shown to the user before scanning actually starts. If this is set to `false`, when the users face becomes properly aligned the scanner will start in 2 seconds as long as the users face is still properly aligned. By default, `show_countdown` is `false`. The example below shows how to enable the countdown.

```html
<iproov-me token="***YOUR_TOKEN_HERE***" show_countdown="true">
  <div slot="ready">
    <h1>Ready to iProov</h1>
  </div>
</iproov-me>
```

#### Colours

You can customise the look and feel of the main layout by changing the following options. You can pass a literal value i.e. `red`, RGB i.e. `rgb(230, 245, 66)` or a hex value i.e. `#e6f542`.

```javascript
loading_tint_color = "#5c5c5c" // The app is connecting to the server or no face found. Default: grey (#5c5c5c)
not_ready_tint_color = "#f5a623" // Cannot start iProoving until the user takes action (e.g. move closer, etc). Default: orange (#f5a623)
ready_tint_color = "#01bf46" // Ready to start iProoving. Default: green (#01bf46)
```

The example below changes the default grey no face to `#4293f5` (blue), giving feedback like "Move Closer" to red `rgb(245, 66, 66)` and starting to `purple`.

```html
<iproov-me
  token="***YOUR_TOKEN_HERE***"
  loading_tint_color="#4293f5"
  not_ready_tint_color="rgb(245, 66, 66)"
  ready_tint_color="purple"
>
  <div slot="ready">
    <h1>Ready to iProov</h1>
  </div>
</iproov-me>
```

#### Logo

You can use a custom logo by simply passing a relative link or absolute path to your logo. Ideally, the logo would be in an SVG format for scaling but you can use any web safe image format. If you don't pass a logo, the iProov logo will be shown by default. If you do not want a logo to show pass the `logo` attribute as `null`.

```html
<iproov-me token="***YOUR_TOKEN_HERE***" logo="https://www.waterloobank.co.uk/assets/img/logo.svg">
  <div slot="ready">
    <h1>Ready to iProov</h1>
  </div>
</iproov-me>
```

#### Custom Title

Specify a custom title to be shown. Defaults to show an iProov-generated message. Set to empty string "" to hide the message entirely. You can also pass in `%@` characters which will be mapped in this order to `type` (Enrol or Verify), `user_name` (the user_name you passed when generating the token), `sp_name` (the service provider you used to generate the token).

> Note: iProov-generated messages are passed through our translators. Passing a custom title will prevent this and you will need to provide the translated version.

##### Custom Title Examples:
```html
<!-- Set the title to a plain string -->
<iproov-me token="***YOUR_TOKEN_HERE***" custom_title="iProov Ltd" />

<!-- Hide the title, empty string, "null" or "false" can be used. Must be a string! -->
<iproov-me token="***YOUR_TOKEN_HERE***" custom_title="" />

<!-- Build dynamic string with type, user_name and sp_name-->
<!-- i.e. Below would generate "Enrol AS andrew@iproov.com TO iProov" -->
<iproov-me token="***YOUR_TOKEN_HERE***" custom_title="%@ AS %@ TO %@" />
```

### HTML

The simplest way to add a slot is to include it within the `<iproov-me>` HTML tag:

```html
<iproov-me token="***YOUR_TOKEN_HERE***">
  <div slot="ready">
    <h1>Ready to iProov</h1>
  </div>
  <slot name="button">
    <button>Scan Face <small>beta</small></button>
  </slot>
</iproov-me>
```

> In order to style and manipulate your slots, you can add custom classes and IDs which can be accessed from your CSS and JavaScript.

### JavaScript

You can also build up the slots with JavaScript before injecting the Web Component:

```javascript
window.addEventListener("WebComponentsReady", function(event) {
  const iProovMe = document.createElement("iproov-me")
  iProovMe.setAttribute("token", "***YOUR_TOKEN_HERE***")
  var ready = document.createElement("div")
  ready.setAttribute("slot", "ready")
  ready.innerHTML = "<h1>Register your face</h1>"
  component.appendChild(ready)

  var button = document.createElement("button")
  button.setAttribute("slot", "button")
  button.innerText = "Start face scan..."
  component.appendChild(button)

  document.getElementById("your-container-id").appendChild(iProovMe)
})
```

With [jQuery](https://jquery.com), the entire Web Component can be injected with slots using HTML syntax, for example:

```javascript
window.addEventListener("WebComponentsReady", function(event) {
  var component = $('<iproov-me token="***YOUR_TOKEN_HERE***"></iproov-me>')

  component.append('<div slot="ready"><h1>Register your face</h1></div>')
  component.append('<button slot="button">Start face scan...</button>')

  $("#your-container-id").append(component)
})
```

### Language Support

The iProov HTML5 application supports the customisation of languages through JSON configurations. All language files have the same keys and only the values of those keys are what will be shown.

#### Default Language

The default language is set by looking at the device's language and then if a configuration for that language exists, that will be set as default. If a configuration file cannot be found then the default language is set to `en`.

#### Custom Language

You can customise the language by supplying the `language` key with your iProov component. The keys value must be valid JSON and passed as a string. This is then converted and merged with the default language overriding any given keys. See below for [language code examples](#language-code-examples).

### Language Code Examples

#### ES6 static JSON object

```javascript
window.addEventListener("WebComponentsReady", event => {
  const iProovMe = document.createElement("iproov-me")
  iProovMe.setAttribute("token", "***YOUR_TOKEN_HERE***")

  const customLanguage = `{
    "iproov_success": "You passed!",
    "prompt_loading": "Its loading"
  }`
  element.setAttribute("language", customLanguage)

  // inject iproov element into page
  document.getElementById("your-container-id").appendChild(iProovMe)
})
```

#### ES6 async/await fetch file from local or external source

```javascript
window.addEventListener("WebComponentsReady", async event => {
  async function getLanguage(path) {
    const response = await fetch(path)
    const language = await response.text()

    return language
  }

  const iProovMe = document.createElement("iproov-me")
  iProovMe.setAttribute("token", "***YOUR_TOKEN_HERE***")

  const languageFile = "" // local or external path to language file
  const customLanguage = await getLanguage(languageFile)
  element.setAttribute("language", customLanguage)

  // inject iproov element into page
  document.getElementById("your-container-id").appendChild(iProovMe)
})
```

#### React 16, Axios, ES6 async/await fetch file from local or external source

```javascript
import React, { Component } from "react"
import axios from "axios" // assumes you have already installed axios as a dependency
import "@iproov/html5" // includes the @iproov/html5 client into your app

export default class App extends Component {
  state = {
    language: "", // keep empty to stop render firing until we have a language object
    token: "***YOUR_TOKEN_HERE***",
  }

  componentDidMount() {
    this.setLanguage()
  }

  async setLanguage() {
    const path = "" // local or external path to language JSON file
    const response = await axios.get(path).catch(error => console.error(error))

    const language = await JSON.stringify(response.data)
    this.setState({ language })
  }

  render() {
    const { token, language } = this.state
    // only render in the iproov component when we have a language object
    if (!language) {
      return null
    }

    return (
      <div className="App">
        <iproov-me token={token} language={language} />
      </div>
    )
  }
}
```

#### Angular 7, HttpClient, ES6 fetch file from local filesystem

Add below to your `tsconfig.json` file to import json files locally in Angular. The example below is based from the [Angular integration examples](#Angular-v7).

```json
{
  "resolveJsonModule": true,
  "esModuleInterop": true
}
```

```typescript
import { Component, OnInit, Injectable } from "@angular/core"
import "@iproov/html5"

import Language from "./lang.json" // enter your relative path to desired language file

@Component({
  selector: "app-iproov",
  templateUrl: "./iproov-component.html",
})
export class IproovComponent implements OnInit {
  constructor() {
    // this.getData() // external file example
    this.language = <any>Language // local file example
    this.token = "***YOUR_TOKEN_HERE***" // replace with your generated token
  }

  ngOnInit() {
    // inject iproov-me component into page with token
    window.addEventListener("WebComponentsReady", () => {
      let iProovMe = document.createElement("iproov-me")
      // set your generated token
      iProovMe.setAttribute("token", this.token)
      iProovMe.setAttribute("language", JSON.stringify(this.language))

      // inject iproov element into your page
      document.getElementById("iproov-container").insertAdjacentElement("beforebegin", iProovMe)
    })
  }
}
```

#### Angular 7, HttpClient, ES6 fetch file from external source

Add below to your `tsconfig.json` file to import json files locally in Angular. The example below is based from the [Angular integration examples](#Angular-v7).

```json
{
  "resolveJsonModule": true,
  "esModuleInterop": true
}
```

You then need to import `HttpClientModule` within your `app.module.ts`

```typescript
import { BrowserModule } from "@angular/platform-browser"
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core"
import { HttpClientModule } from "@angular/common/http" // import HttpClientModule from Angular

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { IproovComponent } from "./iproov.component"
@NgModule({
  declarations: [AppComponent, IproovComponent],
  imports: [
    BrowserModule,
    HttpClientModule, // add new imported module here
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

Then within your component, you can access the HttpClient and inject into the `<iproov />` component as shown below.

```typescript
import { Component, OnInit, Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http" // import HttpClient from angular
import "@iproov/html5"

@Component({
  selector: "app-iproov",
  templateUrl: "./iproov-component.html",
})
export class IproovComponent implements OnInit {
  // add HttpClient to component
  constructor(private http: HttpClient) {
    this.getData()
  }
  getData() {
    // get the json file and return as a string
    this.http.get("https://path-to-your-lang-file.json", { responseType: "text" }).subscribe(res => {
      this.language = <any>res
      this.injectElement()
    })
  }
  ready = false
  language = ""
  token = "***YOUR_TOKEN_HERE***" // replace with your generated token
  ngOnInit() {
    // inject iproov-me component into page with token
    window.addEventListener("WebComponentsReady", () => {
      this.ready = true
      this.injectElement()
    })
  }

  injectElement() {
    // only inject <iproov> component if lanugage has loaded and WebComponentsReady event has fired
    if (this.ready && this.language) {
      let iProovMe = document.createElement("iproov-me")
      // set your generated token
      iProovMe.setAttribute("token", this.token)
      iProovMe.setAttribute("language", this.language)

      // inject iproov element into your page
      document.getElementById("iproov-container").insertAdjacentElement("beforebegin", iProovMe)
    }
  }
}
```
