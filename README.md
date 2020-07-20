# iProov Web SDK v2.2.1

## 📖 Table of contents

- [Introduction](#-introduction)
- [Contents](#-contents)
- [Upgrading from earlier versions](#-upgrading-from-earlier-versions)
- [Registration](#-registration)
- [Installation](#-installation)
- [Get started](#-get-started)
- [Options](#-options)
- [Slots](#-slots)
- [Events](#-events)
- [Localization](#-localization)
- [Browser support](#-browser-support)
- [WebViews](#-webviews)
- [Native bridge](#-native-bridge)
- [Help & support](#-help--support)

## 🤳 Introduction

The iProov Web SDK is the client for web browser based authentication. It can be integrated in a number of ways to support your web journeys for onboarding and authentication. You can find out more about how to use iProov Web in your [User Journeys](https://portal.iproov.com/documentation) and create [API Keys](https://portal.iproov.com/service-providers/create) on the [iProov Portal](https://portal.iproov.com/).

You will need to generate a token from your back-end to use with the iProov Web SDK. You can use the [REST API](https://eu.rp.secure.iproov.me/docs.html) to make the relevant calls and return the token to your front-end. See the [backend section](#backend) for more details.

## 📖 Contents

This repository contains a demo showing an example of a backend and frontend integration. In these examples, the token is generated and validated using AJAX (in the register/login demo) and form submission (for the integration examples) by passing the following data to the backend:

- **user_id** - the email address provided by the user
- **action** - the specific endpoint to call:
  - _token_ - generate a unique 64 character token for the client
  - _validate_ - check the validity of the result provided by the client

## ⬆ Upgrading from earlier versions

Please note that there is new name for the NPM package and URL for the script tag. If you are upgrading from v1 or v2-beta, please ensure that you update your integration to use the new name or URL as described in the [installation](#-installation) section below.

A few of the options have changed from earlier versions so be sure to check the current supported [list of options](#-options) when upgrading.

## ✍ Registration

You can obtain API credentials by registering on the [iProov Portal](https://portal.iproov.com/).

## 📲 Installation

### Script Tag

The simplest and fastest method of integrating with the iProov Web SDK is to reference it in a script tag using our [NPM package](https://www.npmjs.com/package/@iproov/web) hosted on a CDN such as [jsDelivr](https://www.jsdelivr.com/package/npm/@iproov/web) or [UNPKG](https://unpkg.com/browse/@iproov/web/).

#### jsDelivr

```html
<script src="https://cdn.jsdelivr.net/npm/@iproov/web"></script>
```

#### UNPKG

```html
<script src="https://unpkg.com/@iproov/web"></script>
```

### NPM Package

The npm package `@iproov/web` allows for integration of the iProov Web SDK. It makes use of the [Web Components](https://www.webcomponents.org/introduction) APIs which are supported by most modern browsers and uses the [Polymer Project](https://www.polymer-project.org) to add support where they are not yet available.

#### Setup

Install the package as a dependency. You can use [Yarn](https://yarnpkg.com/lang/en/) or [NPM](https://www.npmjs.com/get-npm) to do this.

```sh
yarn add @iproov/web
```

```sh
npm i @iproov/web --save
```

After you have installed the `@iproov/web` package, you must then include the code into your project ideally at the root of your application:

```javascript
require("@iproov/web")
```

It's as simple as that to include the iProov Web SDK. You now need to inject the web component by one of the [integration methods](#frontend) shown below.

## 🚀 Get started

### Backend

To make use of this SDK you will require integration with the back-end iProov service. To access credentials and an integration guide, please visit [portal.iproov.com](https://portal.iproov.com).

When starting an iProov transaction (or claim), you would first need to generate an [enrolment](https://secure.iproov.me/docs.html#operation/userEnrolServerToken) or [verification](https://secure.iproov.me/docs.html#operation/userVerifyServerToken) token, which can be done as part of the page load or with AJAX. You would then need to pass the token to your frontend to initialise the iProov Web SDK.

After receiving the result from the SDK, you must then confirm its authenticity by validating the [enrolment](https://secure.iproov.me/docs.html#operation/userEnrolValidate) or [verification](https://secure.iproov.me/docs.html#operation/userVerifyValidate) token _before_ escalating the user's privileges. This must be done from your backend and is typically invoked with a redirect, form submission or AJAX call triggered by the `passed` [event](#-events).

> ⚠️ The REST API should always be called from your backend so as to never expose your secret to your client application.
> Always call the validate API from your backend after receiving a result; never trust the result provided by the web client.

### Frontend

Once an iProov token has been generated by your backend, you should pass it as an attribute to the custom element using one of the integration methods described below. After a successful iProov, the result must be validated by the backend before granting the user any privileges.

#### HTML

The simplest way to pass the token to iProov is to include it as an attribute to the `<iproov-me>` HTML tag as shown here:

```html
<iproov-me token="***YOUR_TOKEN_HERE***"></iproov-me>
```

#### JavaScript

The `<iproov-me>` element can also be injected into the page with the token:

```javascript
window.addEventListener("WebComponentsReady", function(event) {
  const iProovMe = document.createElement("iproov-me")
  iProovMe.setAttribute("token", "***YOUR_TOKEN_HERE***")
  document.getElementById("your-container-id").appendChild(iProovMe)
})
```

#### jQuery

The HTML can also be injected directly onto the page as in this jQuery example:

```javascript
window.addEventListener("WebComponentsReady", function(event) {
  $("#your-container-id").append($('<iproov-me token="***YOUR_TOKEN_HERE***"></iproov-me>'))
})
```

There are also the following framework specific example integrations available on the wiki:

- [Angular v10](https://github.com/iProov/web/wiki/Angular-v10)
- [React v16](https://github.com/iProov/web/wiki/React-v16)
- [Vue v2](https://github.com/iProov/web/wiki/Vue-v2)

> ℹ️ JavaScript methods are run after the **WebComponentsReady** event to ensure that the SDK is ready to be injected.

## ⚙ Options

The behaviour of the iProov Web SDK can be altered by setting the following options as attributes of the `<iproov-me>` tag in the same way as the token.

#### Base URL

You can change the backend server you are attempting to iProov against by passing the `base_url` property. This needs to point to the same platform used for generating tokens (defaults to the EU platform if not defined). Reverse proxies are supported and a custom path to the WebSocket endpoint can be used, for example: `https://custom.domain.com/custom-path/socket.io/v2/`

```html
<iproov-me token="***YOUR_TOKEN_HERE***" base_url="https://eu.rp.secure.iproov.me"></iproov-me>
```

#### Assets URL

Currently, external resources are loaded from our CDN at iproov.app. This may cause issues with firewall rules and custom reverse proxy configurations and therefore this option is available to use.

These resources include WASM files, UI assets, animations, and web workers relevant to encoding and face finding on the client side.

Some of these files cannot be packaged as part of a JS bundle, and in some cases it makes sense for us to be able to ship updates without requiring code changes the integrator's end.

```html
<iproov-me token="***YOUR_TOKEN_HERE***" assets_url="https://cdn.iproov.app/assets"></iproov-me>
```

#### Logo

You can use a custom logo by simply passing a relative link or absolute path to your logo. Ideally, the logo would be in an SVG format for scaling but you can use any web safe image format. If you don't pass a logo, the iProov logo will be shown by default. If you do not want a logo to show pass the `logo` attribute as `null`.

```html
<iproov-me token="***YOUR_TOKEN_HERE***" logo="https://www.iproov.com/images/iproov_logo.svg"></iproov-me>
```

#### Custom Title

Specify a custom title to be shown. Defaults to show an iProov-generated message. Set to empty string "" to hide the message entirely. You can also pass in `%@` characters which will be mapped in this order to `type` (Enrol or Verify), `user_name` (the user_name you passed when generating the token), `sp_name` (the service provider you used to generate the token).

> ⚠️ iProov-generated messages are passed through our translators. Passing a custom title will prevent this and you will need to provide the translated version.

```html
<!-- Set the title to a plain string -->
<iproov-me token="***YOUR_TOKEN_HERE***" custom_title="iProov Ltd" />

<!-- Hide the title, empty string, "null" or "false" can be used. Must be a string! -->
<iproov-me token="***YOUR_TOKEN_HERE***" custom_title="" />

<!-- Build dynamic string with type, user_name and sp_name-->
<!-- i.e. Below would generate "Enrol AS andrew@iproov.com TO iProov" -->
<iproov-me token="***YOUR_TOKEN_HERE***" custom_title="%@ AS %@ TO %@" />
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
></iproov-me>
```

#### Allow Landscape

Mobile devices are by default prevented from iProoving while in landscape. This feature can be disabled by passing `allow_landscape` `true` with your component as shown below.

```html
<iproov-me token="***YOUR_TOKEN_HERE***" allow_landscape="true"></iproov-me>
```

#### Show Countdown

By setting `show_countdown` to `true`, a countdown will be shown to the user before scanning actually starts. If this is set to `false`, when the users face becomes properly aligned the scanner will start in 2 seconds as long as the users face is still properly aligned. By default, `show_countdown` is `false`. The example below shows how to enable the countdown.

```html
<iproov-me token="***YOUR_TOKEN_HERE***" show_countdown="true"></iproov-me>
```

#### Kiosk Mode

Note this setting enables a feature which is in alpha and still under active development.

For deploying iProov on tablets or fixed hardware such as laptops and desktop devices. Enables snap to face and increases matchable range.

Set to true to enable; omit the setting to keep disabled.

A known issue is that kiosk mode currently has display issues in portrait mode, this will be resolved in a later release.

```html
<iproov-me token="***YOUR_TOKEN_HERE***" kiosk_mode="true"></iproov-me>
```

## 📥 Slots

Slots allow the HTML content shown before and after the iProov fullscreen experience to be customised and styled for a more seamless visual integration. The following examples show different ways to include some of the most commonly used slots.

### HTML

The simplest way to add a slot is to include it within the `<iproov-me>` HTML tag as shown in the example below:

```html
<iproov-me token="***YOUR_TOKEN_HERE***">
  <div slot="ready">
    <h1 class="iproov-lang-heading">Ready to iProov</h1>
  </div>
  <div slot="button">
    <button type="button">Scan Face</button>
  </div>
</iproov-me>
```

> ℹ️ In order to style and manipulate your slots, you can add custom classes and IDs which can be accessed from your CSS and JavaScript.

#### JavaScript

You can also build up the slots with JavaScript before injecting the Web Component:

```javascript
window.addEventListener("WebComponentsReady", function(event) {
  const iProovMe = document.createElement("iproov-me")
  iProovMe.setAttribute("token", "***YOUR_TOKEN_HERE***")
  const ready = document.createElement("div")
  ready.setAttribute("slot", "ready")
  ready.innerHTML = '<h1 class="iproov-lang-heading">Register your face</h1>'
  iProovMe.appendChild(ready)

  const button = document.createElement("button")
  button.setAttribute("slot", "button")
  button.innerText = "Start face scan..."
  iProovMe.appendChild(button)

  document.getElementById("your-container-id").appendChild(iProovMe)
})
```

With [jQuery](https://jquery.com), the entire Web Component can be injected with slots using HTML syntax, for example:

```javascript
window.addEventListener("WebComponentsReady", function(event) {
  const iProovMe = $('<iproov-me token="***YOUR_TOKEN_HERE***"></iproov-me>')

  iProovMe.append('<div slot="ready"><h1 class="iproov-lang-heading">Register your face</h1></div>')
  iProovMe.append('<button type="button" slot="button">Start face scan...</button>')

  $("#your-container-id").append(iProovMe)
})
```

To allow language keys to be dynamically applied to slots, special class names must be applied to your slots when customising. Headings must have `.iproov-lang-heading` and terms (message, reason etc) must have `.iproov-lang-term`.

> ⚠️ The ability to use localized `h3` tags and the `div` elements without these special classes was removed in `2.1.0`.

```html
<div slot="passed">
  <h3 class="iproov-lang-heading">Passed</h3>
  <div class="iproov-lang-term">You have iProoved successfully</div>
</div>
```

> ⚠️ When customising any slots with button elements, the type must be set to button.

The following is the complete list of slots can be used with the `<iproov-me>` web component and have associated [events](#-events):

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

## 📆 Events

There are a set of [CustomEvents](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) that can be used to integrate bespoke functionality. Events are bound directly to the `<iproov-me>` element after the `WebComponentsReady` event is called on the `window`.

### Details

Every event has a [detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail) property which contains data relating to that event. The token is present for every event:

```json
{
  "token": "Your Generated Token"
}
```

The available events are detailed below with any extra properties that are supplied:

| Event                 | Extra Properties                 | Description                                                      |
| --------------------- | -------------------------------- | ---------------------------------------------------------------- |
| **ready**             | None                             | iProov has initialised successfully and has camera permission    |
| **started**           | None                             | User has started iProov by launching into fullscreen             |
| **aborted**           | _feedback, reason_               | User has aborted iProov by exiting fullscreen                    |
| **streamed**          | None                             | User has finished streaming and the client has exited fullscreen |
| **progress**          | _percentage, message_            | iProov has published a progress update for the authentication    |
| **passed**            | _type, passed_                   | Authentication was successful, the result can now be validated   |
| **failed**            | _type, passed, feedback, reason_ | Authentication was unsuccessful, the user needs to try again     |
| **error**             | _feedback, reason_               | iProov encountered an error while processing the authentication  |
| **unsupported**       | _feedback, reason_               | Browser does not support using iProov                            |
| **permission**        | None                             | Camera permission is unknown & not blocked, show permission      |
| **permission_denied** | None                             | User has blocked access to the camera                            |

All possible properties of the event's **detail** property are described below:

| Property             | Events                                | Description                                                |
| -------------------- | ------------------------------------- | ---------------------------------------------------------- |
| **token**            | All                                   | The token associated with the authentication attempt       |
| **type** (†)         | _passed, failed_                      | The type of authentication (enrol, verify or id_match)     |
| **passed**           | _passed, failed_                      | Boolean value whether the result passed or failed          |
| **percentage**       | _progress_                            | A percentage (between 0 and 100) representing the progress |
| **message**          | _progress_                            | A user-friendly description of the current progress stage  |
| **feedback**         | _aborted, failed, error, unsupported_ | A fixed feedback code for making logical decisions         |
| **reason**           | _aborted, failed, error, unsupported_ | An English description of the reason for the event         |
| **is_native_bridge** | All                                   | Boolean value if event originates from the native bridge   |

> † - The **type** property is not available when running in Native Bridge mode.

In the case of the **aborted**, **failed**, **error** and **unsupported** events, the _feedback_ code can be used for dealing with special cases and the _reason_ can be displayed to the user. The following are some of the possible responses:

| Feedback                              | Reason                                                        |         Event |
| ------------------------------------- | ------------------------------------------------------------- | ------------: |
| **client_browser**                    | The browser is not supported                                  | _unsupported_ |
| **fullscreen_change**                 | Exited fullscreen without completing iProov                   |     _aborted_ |
| **ambiguous_outcome**                 | Sorry, ambiguous outcome                                      |      _failed_ |
| **user_timeout**                      | Sorry, your session has timed out                             |      _failed_ |
| **lighting_flash_reflection_too_low** | Ambient light too strong or screen brightness too low         |      _failed_ |
| **lighting_backlit**                  | Strong light source detected behind you                       |      _failed_ |
| **lighting_too_dark**                 | Your environment appears too dark                             |      _failed_ |
| **lighting_face_too_bright**          | Too much light detected on your face                          |      _failed_ |
| **motion_too_much_movement**          | Please keep still                                             |      _failed_ |
| **motion_too_much_mouth_movement**    | Please do not talk while iProoving                            |      _failed_ |
| **client_config**                     | There was an error with the client configuration              |       _error_ |
| **client_api**                        | There was an error calling the API                            |       _error_ |
| **client_camera**                     | There was an error getting video from the camera              |       _error_ |
| **client_stream**                     | There was an error streaming the video                        |       _error_ |
| **client_error**                      | An unknown error occurred                                     |       _error_ |
| **server_abort**                      | The server aborted the claim before iProov completed          |       _error_ |
| **invalid_token**                     | The provided token has already been claimed                   |       _error_ |
| **network_problem**                   | Sorry, network problem                                        |       _error_ |
| **sdk_unsupported**                   | The SDK has passed end of life and is no longer supported     |       _error_ |
| **error_camera_in_use**               | The camera is currently already in use and cannot be accessed |       _error_ |

### Listeners

It is recommended that you listen for at least the **ready** and **unsupported** events as one of them will always be called so you can determine if iProov is supported or not:

```javascript
document.querySelector("iproov-me").addEventListener("ready", function(event) {
  console.log("iProov is ready")
})
document.querySelector("iproov-me").addEventListener("unsupported", function(event) {
  console.warn("iProov is not supported: " + event.detail.reason)
})
```

As all of the event **details** follow the same structure, they can be handled by a single function if desired:

```javascript
const iProovMe = document.querySelector("iproov-me")
iProovMe.addEventListener("ready", iProovEvent)
iProovMe.addEventListener("started", iProovEvent)
iProovMe.addEventListener("aborted", iProovEvent)
iProovMe.addEventListener("streamed", iProovEvent)
iProovMe.addEventListener("progress", iProovEvent)
iProovMe.addEventListener("passed", iProovEvent)
iProovMe.addEventListener("failed", iProovEvent)
iProovMe.addEventListener("error", iProovEvent)
iProovMe.addEventListener("unsupported", iProovEvent)
iProovMe.addEventListener("permission", iProovEvent)
iProovMe.addEventListener("permission_denied", iProovEvent)

function iProovEvent(event) {
  switch (event.type) {
    case "aborted":
    case "error":
    case "unsupported":
    case "permission":
    case "permission_denied":
      console.warn("iProov " + event.type + " - " + event.detail.reason)
      break
    case "progress":
      console.info(event.detail.message + " (" + event.detail.progress + "%)")
      break
    case "passed":
    case "failed":
      console.log("iProov " + event.detail.type + " " + event.type)
      break
    default:
      console.log("iProov " + event.type)
  }
}
```

If you're using [jQuery](https://jquery.com), you can attach to all the events in one go:

```javascript
$("iproov-me").on("ready started aborted streamed progress passed failed error unsupported", iProovEvent)
```

## 🌎 Localization

The Web SDK ships with English strings only. If you wish to customise the strings in the app or localize them into a different language, you can do this by supplying language overrides as JSON configurations. All language files have the same keys and only the values of those keys will be shown.

- [View the default language file with all keys and langauge striengs](https://github.com/iProov/web/blob/master/iproov-en.json)

You can customise the language by supplying the `language` key as an attribute to your iProov component. The keys value must be valid JSON and passed as a string. This is then converted and merged with the default language overriding any given keys. See below for some examples.

### Override language strings

```javascript
window.addEventListener("WebComponentsReady", event => {
  const iProovMe = document.createElement("iproov-me")
  iProovMe.setAttribute("token", "***YOUR_TOKEN_HERE***")

  const customLanguage = `{
    "passed": "You passed!",
    "prompt_connecting": "It's loading..."
  }`
  element.setAttribute("language", customLanguage)

  // inject iproov element into page
  document.getElementById("your-container-id").appendChild(iProovMe)
})
```

#### Load language file

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

There are also some framework specific examples on the [Angular](https://github.com/iProov/web/wiki/Angular-v10#local-language-file) and [React](https://github.com/iProov/web/wiki/React-v16#include-language-file) wiki pages.

## 🌐 Browser support

iProov's Web SDK makes use of the following technologies:

- [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)
- [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- [WebAssembly](https://webassembly.org/)
- [WebComponents](https://www.webcomponents.org/introduction)

iProov Web SDK requires access to a front facing camera, WebGL, WebAssembly and the ability to enter full screen. A network connection is required that allows WebSockets. Provided there's a suitable webcam available, most modern desktop browsers fall within these criteria.

Browsers that have rolling update schedules ("evergreen browsers") are generally supported back to the **last two releases**, such as Google Chrome, Mozilla Firefox and the Chromium based version of Microsoft Edge (Anaheim and later). Mobile browsers are more nuanced, because permissions and camera access vary depending on the browser and host operating system.

In iOS, **only Safari running as a standalone browser is supported** at this time. This is because `UIWebView` / `WKWebView` do not work correctly with respect to the Web Standard `getUserMedia`, which seems to be a deliberate decision in iOS's implementation. We are tracking the various issues and are waiting for this to change.

For known issues, [see here](#known-issues).

| <img src="https://avatars1.githubusercontent.com/u/4119093?s=200&v=4" alt="Safari" width="24px" height="24px" /><br/>Platform | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" /><br/>Safari | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" /><br/>Chrome | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" /><br/>Edge | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" /><br/>Firefox | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" /><br/>Opera | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" /><br/>Samsung |
| ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Windows**                                                                                                                   | N/A                                                                                                                                                       | :heavy_check_mark:                                                                                                                                        | :heavy_check_mark:                                                                                                                                     | :heavy_check_mark:                                                                                                                                            | :heavy_check_mark:                                                                                                                                    | N/A                                                                                                                                                                             |
| **MacOS**                                                                                                                     | :heavy_check_mark:                                                                                                                                        | :heavy_check_mark:                                                                                                                                        | :heavy_check_mark:                                                                                                                                     | :heavy_check_mark: \*                                                                                                                                         | :heavy_check_mark:                                                                                                                                    | N/A                                                                                                                                                                             |
| **iOS**                                                                                                                       | :heavy_check_mark:                                                                                                                                        | :x:                                                                                                                                                       | :x:                                                                                                                                                    | :x:                                                                                                                                                           | :x:                                                                                                                                                   | N/A                                                                                                                                                                             |
| **Android**                                                                                                                   | N/A                                                                                                                                                       | :heavy_check_mark:                                                                                                                                        | :heavy_check_mark:                                                                                                                                     | :heavy_check_mark: \*                                                                                                                                         | :heavy_check_mark:                                                                                                                                    | :heavy_check_mark:                                                                                                                                                              |

> \* See [known issues](#known-issues) for more details

> ℹ️ If the device attempting to iProov doesn't meet the minimum requirements, the `unsupported` event is emitted. See the [events](#-events) section for more details.

### Support checker

Developers can use the `IProovSupport` check component to ensure their users have the correct hardware and software to use the Web SDK before embedding the web component. If the user device is unsupported, the integrator can send the user down an alternative journey.

`IProovSupport` is a slim and separate component to the main `IProovMe` web component.

To benefit from tree-shaking in a module-based build environment you can use the named import:

```javascript
// Just load the support component:
import { IProovSupport } from "@iproov/web"
const optionalLogger = console
const supportChecker = new IProovSupport(optionalLogger)
```

For script tag integrations, `IProovSupport` is available on the window object once included:

```javascript
const supportChecker = new IProov.IProovSupport()
```

`IProovSupport` can check just for the required APIs on the user's browser, using either event or Promise based APIs:

```javascript
const supportChecker = new IProovSupport()
supportChecker.addEventListener("check", ({ supported, granted, is_native_bridge }) => {
  if (supported === false) {
    // go to fallback UX
  }
  if (supported && granted) {
    // full permission and granted, we can definitely iProov!
    if (is_native_bridge) {
      // if native bridge mode has been detected then permission checks have been circumvented as they aren't needed
    }
  }
  if (supported && granted === null) {
    // browser API support, but we haven't run a permission check (see checkWithPermission)
  }
  if (supported && granted === false) {
    // browser API support, but camera access denied - try again or advise user before proceeding
  }
})
const { supported, granted, is_native_bridge } = await supportChecker.check()
```

...or to carry out a complete lightweight check for camera access with user interaction, this can pre-set the required
permissions for iProoving, save some bandwidth, and provide a cleaner user journey if camera access isn't possible:

```javascript
const supportChecker = new IProovSupport()
document.querySelector("#check-button").addEventListener("click", async () => {
  const { supported, granted } = await supportChecker.checkWithPermission()
})
```

If `.checkWithPermission()` is executed when permission has already been granted and cached within the browser,
further permission checks are not required; we can tell if permission has been granted using a soft `.check()`.

Note that browsers have varying regimes to protect against device fingerprinting and to ensure user privacy. Repeated
calls to `getUserMedia` or the Permissions API can result in prompt blockage, or the redaction of media devices, which
can return inaccurate results. Our advice is therefore to avoid running multiple checks, in quick succession, on the
same page. Therefore, please avoid automatic or accidental repeat calls to `check` or `checkWithPermission`, especially
without user interaction.

The following events can be emitted from `IProovSupport`:

```javascript
const supportChecker = new IProovSupport()
function onCheckResult({
  /** @var boolean */
  supported,
  /** @var boolean */
  granted,
  /** @var array */
  tests,
  /** @var boolean|undefined */
  is_native_bridge,
}) {
  console.debug("Checks run:", tests)
  if (supported) {
    if (is_native_bridge) {
      console.debug("User can iProov with the Native SDK")
    } else {
      console.debug("User can iProov with the Web SDK")
    }
    if (granted) {
      console.debug("User has granted permission for camera access")
    } else {
      console.debug("Prompt the user for camera access permission")
    }
  } else {
    console.error("Browser does not support the Web SDK")
  }
}
const onUnsupported = ({ supported, tests }) => ({})
const onPermissionWasGranted = ({ tests }) => ({})
const onPermissionWasDenied = ({ tests }) => ({})
supportChecker.addEventListener("check", onCheckResult)
supportChecker.addEventListener("unsupported", onUnsupported)
supportChecker.addEventListener("granted", onPermissionWasGranted)
supportChecker.addEventListener("denied", onPermissionWasDenied)
// The `tests` object consists of the following options:
// null if unchecked, true if supported, false if not supported:
const possibleTests = {
  videoInput: null,
  wasm: null,
  userMedia: null,
  mediaStreamTrack: null,
  frontCamera: null,
  fullScreen: null,
  webgl: null,
}
```

The `is_native_bridge` property will be exposed on support checker events if the checker detects that `iProovNativeBridgeInfo` exists within the global scope. This variable is injected automatically by the native SDK. In this case, the browser support and permission checks are cast to `true` as we won't be using the browser to iProov.

Using the support checker is the best and canonical way to detect whether the user's browser supports the Web SDK.

## 🕸 WebViews

The iProov Web and Native SDKs can work with WebView based apps using the [Native Bridge](#native-bridge) feature. This allows the Web SDK to seamlessly launch the native SDKs embedded within the app.

You can enable this with one line of code in your mobile app; from that point, the Web/Native SDKs take care of the rest.

Note that:

- Native Bridge mode is _mandatory_ for iOS WebViews until Apple releases camera feed support, otherwise the unsupported event will fire.
- In Android WebViews apps, it _is_ possible to use the Web SDK directly provided that your app correctly allows fullscreen mode. This ensures the user interface is correctly rendered.

These WebView examples demonstrate how to ensure fullscreen is allowed and configured correctly inside your Android app:

- [Java Fullscreen WebView Example](https://github.com/iProov/android/wiki/Java-WebView)
- [Kotlin Fullscreen WebView Example](https://github.com/iProov/android/wiki/Kotlin-WebView)

## 🌉 Native bridge

If integrating iProov into a WebView based app, why not take advantage of our Native SDKs?

Native SDK integration is possible with one line of code in a single location in your app's codebase. The Web SDK then automatically detects and switches to Native Bridge mode if available.

### Native SDK integration guides

For more information on using iProov Web within a native WebView based app, see the following Wiki pages:

- [Android Native Bridge Integration Guide](https://github.com/iProov/android/wiki/Web-Native-Bridge)
- [iOS Native Bridge Integration Guide](https://github.com/iProov/ios/wiki/Native-Bridge)

### Customisation

The `native_sdk_options` setting accepts a base64 encoded JSON object of iProov Native SDK options as defined in the [iOS](https://github.com/iProov/ios#-options) and [Android](https://github.com/iProov/android#-options) documentation:

```js
iProovMe.setAttribute("native_sdk_options", btoa(JSON.stringify({ ui: { scanLineDisabled: true, filter: "classic" } })))
```

## ❓ Help & support

You may find your question answered on our [Wiki pages](https://github.com/iProov/web/wiki).

For further help with integrating the SDK, please contact [support@iproov.com](mailto:support@iproov.com).

### Known issues

- Title exceeds header on some small screens, a workaround is to use a Custom Title or hide the title completely.
- Microsoft Edge Mobile v42 on Android user interface not scaling to screen size correctly.
