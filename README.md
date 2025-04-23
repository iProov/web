![iProov: Biometric Face Verification for Remote Identity Assurance](https://github.com/iProov/web/raw/master/images/banner.png)

# iProov Biometrics Web SDK v5.4.3

## 📖 Table of contents

- [Introduction](#-introduction)
- [Registration](#-registration)
- [Installation](#-installation)
- [Get started](#-get-started)
- [Options](#-options)
- [Slots](#-slots)
- [Events](#-events)
  - [Feedback Codes](#feedback-codes)
- [Localization](#-localization)
- [Browser support](#-browser-support)
- [WebViews](#-webviews)
- [Native bridge](#-native-bridge)
- [Iframe Integrations](#-iframe-integrations)
- [Accessibility](#-accessibility)
- [Image Quality Enhancement](#-image-quality-enhancement)
- [Help & support](#-help--support)

## 🤳 Introduction

The iProov Biometrics Web SDK is the client for web browser based authentication. It can be integrated in a number of ways to support your web journeys for onboarding and authentication. You can find out more about how to use iProov Web in your [User Journeys](https://portal.iproov.com/documentation) and create [API Keys](https://portal.iproov.com/service-providers/create) on the [iProov Portal](https://portal.iproov.com/).

You will need to generate a token from your back-end to use with the iProov Biometrics Web SDK. You can use the [REST API](https://eu.rp.secure.iproov.me/docs.html) to make the relevant calls and return the token to your front-end. See the [backend section](#backend) for more details.

Check out our [example](./demo), which can be spun up with a single command, which demonstrates an example backend/frontend integration.

iProov offers Genuine Presence Assurance&trade; technology (also known as "Dynamic Liveness") and Liveness Assurance&trade; technology (also known as "Express Liveness"):

- [Genuine Presence Assurance](https://www.iproov.com/iproov-system/technology/genuine-presence-assurance) verifies that an online remote user is the right person, a real person and that they are authenticating right now, for purposes of access control and security.
- [Liveness Assurance](https://www.iproov.com/iproov-system/technology/liveness-assurance) verifies a remote online user is the right person and a real person for access control and security.

## ✍ Registration

You can obtain API credentials by registering on the [iProov Portal](https://portal.iproov.com/).

## 📲 Installation

The NPM package [@iproov/web-sdk](https://www.npmjs.com/package/@iproov/web-sdk) allows for integration of the iProov Biometrics Web SDK. It makes use of the [Web Components](https://www.webcomponents.org/introduction) APIs which are supported by most modern browsers and uses the [Polymer Project](https://www.polymer-project.org) to add support where they are not yet available.

### NPM Package

Using the `@iproov/web-sdk` package is the recommended way of using the iProov Web SDK in production, and works best with a bundler like Webpack, Parcel or Rollup. The iProov Web SDK is held in a private NPM registry, to gain access, please contact [support@iproov.com](mailto:support@iproov.com) sharing your NPM username and you will be given instructions on usage.

> ⚠️ The iProov Web SDK shouldn't be included in any bundling, obfuscation, or minification processes. We have taken all necessary steps to ensure the SDK is as small as possible. Including the SDK in any of these processes may cause unexpected errors or performance degradation.

> ⚠️ When you have been granted access, to use the `@iproov/web-sdk` via your CLI, you will need to authenticate with [NPM Login](https://docs.npmjs.com/cli/v9/commands/npm-login) or [YARN login](https://classic.yarnpkg.com/lang/en/docs/cli/login/).

#### Setup

Install the package as a dependency. You can use [Yarn](https://yarnpkg.com/lang/en/) or [NPM](https://www.npmjs.com/get-npm) to do this.

```sh
yarn add @iproov/web-sdk
```

```sh
npm i @iproov/web-sdk --save
```

After you have installed the `@iproov/web-sdk` package, you can require or import it into your codebase:

```javascript
// ESM or Module Bundler:
import "@iproov/web-sdk"

// CJS style:
require("@iproov/web-sdk")
```

It's as simple as that to include the iProov Biometrics Web SDK with your project.
Now you can inject the web component where you need it using one of the [integration methods](#frontend) shown below.

> 🔒 A secure context is required when using the iProov Web SDK. This means that the page must be served over https including when using localhost. If you are using localhost, you can use a self-signed certificate.

## 🚀 Get started

### Backend

To make use of this SDK you will require integration with the iProov backend service. You can obtain platform credentials and read our integration guide on [portal.iproov.com](https://portal.iproov.com).

When starting an iProov transaction (or claim), you first need to generate an [enrolment](https://secure.iproov.me/docs.html#operation/userEnrolServerToken) or [verification](https://secure.iproov.me/docs.html#operation/userVerifyServerToken) token, which can be passed on page load or fetched with AJAX, then used to initialise the iProov Biometrics Web SDK on the frontend.

After receiving the result from the SDK, you must then confirm its authenticity by validating the [enrolment](https://secure.iproov.me/docs.html#operation/userEnrolValidate) or [verification](https://secure.iproov.me/docs.html#operation/userVerifyValidate) token _before_ escalating the user's privileges. This must be done from your backend and is typically invoked with a redirect, form submission or AJAX call triggered by the `passed` [event](#-events).

> ⚠️ The REST API should always be called from your backend so as to never expose your secret to your client application.
> Always call the validate API from your backend after receiving a result; never trust the result provided by the web client.

### Frontend

Once an iProov token has been generated by your backend, you should pass it as an attribute to the `<iproov-me>` element using one of the integration methods described below. After a successful iProov, the result must be validated by the backend before granting the user any privileges.

#### HTML

The simplest way to pass the token to iProov is to include it as an attribute to the `<iproov-me>` HTML tag as shown here:

```html
<iproov-me token="***YOUR_TOKEN_HERE***" base_url="***IPROOV_PLATFORM_URL_HERE***"></iproov-me>
```

#### JavaScript

The `<iproov-me>` element can also be injected into the page with the token:

```javascript
window.addEventListener("WebComponentsReady", function (event) {
  const iProovMe = document.createElement("iproov-me")
  iProovMe.setAttribute("token", "***YOUR_TOKEN_HERE***")
  document.getElementById("your-container-id").appendChild(iProovMe)
})
```

#### jQuery

The HTML can also be injected directly onto the page as in this jQuery example:

```javascript
window.addEventListener("WebComponentsReady", function (event) {
  $("#your-container-id").append($('<iproov-me token="***YOUR_TOKEN_HERE***"></iproov-me>'))
})
```

There are also the following framework specific example integrations available on the wiki:

- [Angular v15](https://github.com/iProov/web/wiki/Angular-v15)
- [React v16](https://github.com/iProov/web/wiki/React-v16)
- [Vue v2](https://github.com/iProov/web/wiki/Vue-v2)

> ℹ️ JavaScript methods are run after the **WebComponentsReady** event to ensure that the SDK is ready to be injected.

## ⚙ Options

The behavior of the iProov Biometrics Web SDK can be altered by setting the following options as attributes of the `<iproov-me>` tag in the same way as the token.

#### Network Timeout

Time in seconds for the backend to ack a message we send. In the event of the timeout being exceeded, the error event will fire with the feedback code [error_network](#Details).

The minimum, default value is **_20 seconds_**. To set the timeout to 25 seconds you would pass the following option:

```html
<iproov-me token="***YOUR_TOKEN_HERE***" network_timeout="25"></iproov-me>
```

Setting this option lower than the defaults may increase error rates, so please be mindful when changing this.

#### Base URL

You can change the backend server you are attempting to iProov against by passing the `base_url` property. This needs to point to the same platform used for generating tokens (defaults to the EU platform if not defined). Reverse proxies are supported and a custom path to the WebSocket endpoint can be used, for example: `https://example.com/custom-path/ws/v2/`

```html
<iproov-me token="***YOUR_TOKEN_HERE***" base_url="https://eu.rp.secure.iproov.me"></iproov-me>
```

#### Assets URL

Critical dependencies are loaded from our CDN at cdn.iproov.app. We recommend in production that you self-host these, and set the assets_url to reflect this:

```html
<iproov-me token="***YOUR_TOKEN_HERE***" assets_url="https://cdn.iproov.app/assets"></iproov-me>
```

> ℹ️ [Full wiki page on assets_url and hosting assets](https://github.com/iProov/web/wiki/Serving-Assets-And-CORS)

#### Logo

You can use a custom logo by simply passing a relative link, absolute path or data URI to your logo. We recommend providing a logo in SVG format, but any web format is supported. If you don't pass a logo, the iProov logo will be shown by default. If you do not want a logo to show pass the `logo` attribute as `null`.

```html
<iproov-me token="***YOUR_TOKEN_HERE***" logo="https://example.com/path-to-logo.png"></iproov-me>
```

#### Close Button

You can use a custom button image by simply passing a relative link, an absolute path or a data URI to your image. We recommend providing an image in SVG format, but any web format is supported. If you don't pass an image, the default close button image will be shown.

```html
<iproov-me
  token="***YOUR_TOKEN_HERE***"
  close_button="https://example.com/path-to-close-button.png"
></iproov-me>
```

SVG is recommended.

#### Switch Camera Button

You can use a custom camera switch button by simply passing a relative link, an absolute path or a data URI to your button. SVG is the recommended format but all web-safe image formats are supported.

```html
<iproov-me
  token="***YOUR_TOKEN_HERE***"
  switch_camera_button="https://example.com/camera-switch-button.svg"
></iproov-me>
```


#### Custom Title

Specify a custom title to be shown. Defaults to empty string "" - hide the message entirely. You can also pass in `%@` characters which will be mapped in this order to `type` (Enrol or Verify), `user_name` (the user_name you passed when generating the token), `sp_name` (the service provider you used to generate the token).

> ⚠️ iProov-generated messages are passed through our translators. If you pass a custom title, you must provide the translated version.

```html
<!-- Set the title to a plain string -->
<iproov-me token="***YOUR_TOKEN_HERE***" custom_title="iProov Ltd" />

<!-- Hide the title, empty string, "null" or "false" can be used. Must be a string! -->
<iproov-me token="***YOUR_TOKEN_HERE***" custom_title="" />

<!-- Build dynamic string with type, user_name and sp_name-->
<!-- i.e. Below would generate "Enrol AS andrew@iproov.com TO iProov" -->
<iproov-me token="***YOUR_TOKEN_HERE***" custom_title="%@ AS %@ TO %@" />
```

#### Colors

You can customize the look and feel of the main layout by changing the following options. You can pass a literal value `red`, RGB `rgb(230, 245, 66)`, a hex value `#e6f542` or an RGBA value `rgba(230, 245, 66, 0.8)`.

```javascript
{
  title_text_color: "#fff",
  surround_color: "rgba(0, 0, 0, 0.4)",
  prompt_background_color: "rgba(0, 0, 0, 0.8)",
  prompt_text_color: "#ffffff",
  header_background_color: "rgba(255, 0, 0, 0.8)",
  gpa_not_ready_oval_stroke_color: "#ffffff",
  gpa_ready_oval_stroke_color: "#01ac41",
  liveness_oval_stroke_color: "#ffffff",
  liveness_completed_oval_stroke_color: "#01ac41",
}
```

Color option changes introduced in [v4.0.0](https://github.com/iProov/web/releases/tag/v4.0.0):

| Color Option                             | Description                                                                                                                                          |
| ---------------------------------------- |------------------------------------------------------------------------------------------------------------------------------------------------------|
| **title_text_color**                     | Adjusts the color of the text that can be added above the oval (by default there is no text here - see the custom_title option for more information) |
| **surround_color**                       | Adjusts the color of the surroundings to the centre oval. It also affects the color of the mask in Liveness with `clear` or `blur` filter.           |
| **prompt_text_color**                    | Adjusts the color of the text visible in the centre prompt of the screen                                                                             |
| **prompt_background_color**              | Adjusts the color of the background visible in the centre prompt of the screen                                                                       |
| **header_background_color**              | Adjusts the color of the background visible in the top bar of the application (transparent by default)                                               |
| **gpa_not_ready_oval_stroke_color**      | Stroke color for the centre oval whilst the SDK is in a "Not Ready" state in GPA                                                                     |
| **gpa_ready_oval_stroke_color**          | Stroke color for the centre oval whilst the SDK is in a "Ready" state in GPA                                                                         |
| **liveness_oval_stroke_color**           | Stroke color for the centre oval whilst the SDK before iProov-ing in Liveness                                                                        |
| **liveness_completed_oval_stroke_color** | Stroke color for the centre oval whilst the SDK after iProov-ing in Liveness                                                                         |

Kiosk mode is unaffected from these changes to color options. The same color options passed through from 3.6.1 and prior should be utilized instead.

#### Aria Live

Control screen reader priority of messages being read out. By default, this is set to `assertive`, this can be disabled by passing `off` or you can set this to `polite` to not override anything that's currently being read out. [See official documentation here.](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)

```html
<iproov-me token="***YOUR_TOKEN_HERE***" aria_live="assertive"></iproov-me>
```

#### Filter

This setting controls the filter for camera preview. Can be `classic`, `shaded` (additional detail, the default), `vibrant` (full color).

For Liveness Assurance, two additional filters are provided: `clear` (no filter) and `blur` (starts blurred, this filter is removed when the claim progresses).

```html
<iproov-me token="***YOUR_TOKEN_HERE***" filter="shaded"></iproov-me>
```

For filters `clear` and `blur`, if the camera feed does not cover the full screen, an opaque "mask" with rounded corners will be applied around the camera preview.
The mask takes the color except transparency (it will always be opaque) from `surround_color` (see above).

#### Floating Prompt Rounded Corners

The floating prompt has an option to control rounded corners. Rounded corners are enabled by default (set to `true`); to disable rounded corners set `prompt_rounded_corners` to `false`.

```html
<iproov-me token="***YOUR_TOKEN_HERE***" prompt_rounded_corners="false"></iproov-me>
```

#### CSP Nonce

Set the `csp_nonce` option to a random string to avoid requiring `unsafe-inline` in your style-src CSP.

Note that inline CSS _is_ needed to provide critical styles for `<iproov-me>` for immediate user interaction.

```html
<iproov-me token="***YOUR_TOKEN_HERE***" csp_nonce="P5wB82PFZt"></iproov-me>
```

#### Allow Landscape

When `allow_landscape` is set to `true`, handheld devices will be able to start in landscape orientation.

Here is the behavior:

- For GPA and Liveness Assurance, landscape orientation is blocked in most handheld devices.
- For Liveness Assurance, no handheld device will be able to start in landscape mode, regardless of this setting.
- This blocking behavior is not enforced on Android tablets due to the varying position of their camera.
- When in landscape mode in an affected UX, the iProov component will display the `rotate_portrait` slot.
- Desktop devices are unaffected by `allow_landscape`.

See [slots](#-slots) for details on how to override the `rotate_portrait` slot.

```html
<iproov-me token="***YOUR_TOKEN_HERE***" allow_landscape="true"></iproov-me>
```

#### Show Countdown

This option only works with kiosk mode.

By setting `show_countdown` to `true`, a countdown will be shown to the user before scanning actually starts. If this is set to `false`, when the users face becomes properly aligned the scanner will start in 2 seconds as long as the users face is still properly aligned. By default, `show_countdown` is `false`. The example below shows how to enable the countdown.

```html
<iproov-me token="***YOUR_TOKEN_HERE***" show_countdown="true"></iproov-me>
```

#### Enable Camera Selector

Support multiple camera selection on desktop devices by setting `enable_camera_selector` to `true`.

When enabled, the `camera_selector` slot, `multiple_cameras` event will be exposed. See [Camera Selector](#-slots) slot for customization options. This feature is only available on desktop devices (laptops, PCs etc).

Regardless of `enable_camera_selector` value, if more than one camera is available and if the browser is not Firefox, a button to switch camera will be available in the application.

```html
<iproov-me token="***YOUR_TOKEN_HERE***" enable_camera_selector="true"></iproov-me>
```

#### Disable Exterior Blur

Disables the blur and vignette around the centre oval available by default. This option is disabled by default.

This option is not compatible with the `blur` filter.

```html
<iproov-me token="***YOUR_TOKEN_HERE***" disable_exterior_blur="true"></iproov-me>
```

#### Debug Logs

Logs at level info or lower are hidden, but can be exposed to the console by setting `debug` to `true`.
Warnings and errors will always be emitted to the console.

```html
<iproov-me token="***YOUR_TOKEN_HERE***" debug="true"></iproov-me>
```

This setting has no effect on any `iProovSupport` instance that's been initialized separately to the main component.

The checker itself accepts a logger argument which could be `console`, or any common logging library which you are free to configure to your own requirements.

#### Kiosk Mode

Kiosk mode still utilizes the same UX as prior SDK versions - this also applies to SDK and color options.

When deploying iProov on physically secured hardware such as laptops and desktop devices, you can enable the kiosk mode UI.

```html
<iproov-me token="***YOUR_TOKEN_HERE***" kiosk_mode="true"></iproov-me>
```

> ℹ️ Kiosk mode will only activate on tablets and desktops. It is automatically disabled on mobile devices.

## 📥 Slots

Customise the markup, styling and automatically inherit your app's styles by [using slots](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots).
You can customize the preparation and result stages of iProov to seamlessly integrate it into your application.

The following examples show different ways to customize some commonly used slots.

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

You can also build up the slots with the `<template>` element and JavaScript before injecting the Web Component:

Template to be placed anywhere in your page:

```html
<template id="iproov_template">
  <div slot="ready">
    <h1 class="iproov-lang-heading">Register your face</h1>
  </div>
  <div slot="button">
    <button>Start face scan...</button>
  </div>
</template>
```

JavaScript:

```javascript
window.addEventListener("WebComponentsReady", function (event) {
  const iProovMe = document.createElement("iproov-me")
  iProovMe.setAttribute("token", "***YOUR_TOKEN_HERE***")
  const templateContent = document.querySelector("#iproov_template").content.cloneNode(true)
  iProovMe.append(templateContent)
  document.getElementById("your-container-id").appendChild(iProovMe)
})
```

With [jQuery](https://jquery.com), the entire Web Component can be injected with slots using HTML syntax, for example:

```javascript
window.addEventListener("WebComponentsReady", function (event) {
  const iProovMe = $('<iproov-me token="***YOUR_TOKEN_HERE***"></iproov-me>')

  iProovMe.append('<div slot="ready"><h1 class="iproov-lang-heading">Register your face</h1></div>')
  iProovMe.append('<button type="button" slot="button">Start face scan...</button>')

  $("#your-container-id").append(iProovMe)
})
```

To integrate with our localization feature, use special class names in your slotted content:

- Headings must use `.iproov-lang-heading`
- Supplementary terms (message, reason etc) must have `.iproov-lang-term`

**Example:** The below text will be swapped with the correctly localized strings when displayed:

```html
<div slot="passed">
  <h3 class="iproov-lang-heading">Passed</h3>
  <div class="iproov-lang-term">You have iProoved successfully</div>
</div>
```

> ⚠️ When customizing any the `button` and `grant_button` slots, the slot must contain a `<button>` element to ensure interactivity. These buttons may be disabled by the SDK on component load while we configure according to the passed in token.

The following is the complete list of slots can be used with the `<iproov-me>` web component and have associated [events](#-events):

| Slot                     | Description                                                                                                |
| ------------------------ | ---------------------------------------------------------------------------------------------------------- |
| **button** \*               | Element that a user taps or clicks on to launch into fullscreen and start iProov                           |
| **camera_selector** \*\*   | Label and dropdown populated with available cameras, if multiple cameras are detected.                     |
| **canceled**            | State displayed to the user when they exit fullscreen before iProoving                                     |
| **error**                | State displayed to the user in the event of an error                                                       |
| **failed**               | State displayed to the user when the user failed iProov                                                    |
| **grant_button** \*        | Element that user taps or clicks to grant camera permission                                                |
| **grant_permission**     | State displayed to the user when camera or motion permission is unknown and not blocked                    |
| **no_camera**            | State displayed to the user when there is no camera                                                        |
| **passed**               | State displayed to the user when the user passed iProov                                                    |
| **permission_denied**    | State displayed to the user when camera permission has been blocked                                        |
| **progress**             | State displayed to the user when streaming has completed and iProov is processing the result               |
| **ready**                | State displayed to the user when the component is ready to start the main iProov user journey              |
| **rotate_portrait** \*\*\* | State displayed to the user when a handheld device is not in portrait orientation                          |
| **unsupported**          | State displayed to the user when their browser is not supported                                            |

> \* Interactive elements such as buttons that start full screen and cameras require a user gesture enforced by the browser. Using JavaScript to apply clicks is not recommended within your user journey and may cause unexpected errors or performance degradation.
> See our [User Gestures Wiki](https://github.com/iProov/web/wiki/User-Gestures) for more details.

> \*\* Visible and managed when [camera selection](#enable-camera-selector) is enabled. A select menu with the class `iproov-camera-selector` must be present within your slots markup. An error will be thrown if this cannot be found.

> \*\*\* See [allow landscape](#allow-landscape) option which controls the behaviour of the `rotate_portrait` slot and details on how to override.

## 📆 Events

There are a set of [CustomEvents](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) that can be used to integrate bespoke functionality. Events are bound directly to the `<iproov-me>` element after the `WebComponentsReady` event is called on the `window`.

### Details

Every event has a [detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail) property which contains data relating to that event. The token is present for every event:

```json
{
  "token": "Your Generated Token",
  "is_native_bridge": boolean
}
```

The available events are detailed below with any extra properties that are supplied:

| Event                   | Extra Properties                        | Description                                                                                                                                                                                                                     |
| ----------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **canceled**            | _feedback, reason_                      | User has canceled iProov by exiting fullscreen |
| **connecting**          | None                                    | The SDK is connecting to the server. You should provide an indeterminate progress indicator to let the user know that the connection is taking place.                                                                           |
| **connected**           | None                                    | The SDK has connected. You should hide any progress indication at this point.                                                                                                                                                   |
| **error**               | _feedback, reason_                      | iProov encountered an error while processing the authentication                                                                                                                                                                 |
| **failed**              | _type, passed, feedback, reason_        | Authentication was unsuccessful, the user needs to try again                                                                                                                                                                    |
| **multiple_cameras** \* | _devices, device_selector, slot, label_ | If `enable_camera_selector` is `true` returns an array of devices if more than 1 video device is detected                                                                                                                       |
| **no_camera**            | _feedback, reason_                      | No video input was detected on the user's device |
| **passed**              | _type, feedback, reason, passed_        | Authentication was successful, the result can now be validated                                                                                                                                                                  |
| **permission**          | _reason_                                | Camera permission is unknown & not blocked, show permission                                                                                                                                                                     |
| **permission_denied**   | _feedback, reason_                      | User has blocked access to the camera                                                                                                                                                                                           |
| **progress**            | _progress, message_                     | iProov has published a progress update for the authentication                                                                                                                                                                   |
| **ready**               | None                                    | iProov has initialized successfully and has camera permission                                                                                                                                                                   |
| **started**             | None                                    | User has started iProov by launching into fullscreen                                                                                                                                                                            |
| **streaming**           | None                                    | User has started streaming. The client remains in fullscreen.                                                                                                                                                                   |
| **streamed**            | None                                    | User has finished streaming and the client has exited fullscreen _(Not guaranteed to fire every time due to a possible fast failure or any errors that can occur and should be handled within your event handlers accordingly)_ |
| **unsupported**         | _feedback, reason_                      | Browser does not support using iProov                                                                                                                                                                                           |

> \* See [Multiple Camera Example](https://github.com/iProov/web/wiki/Camera-Selection-Example) for an example demonstrating how a camera selection feature could be implemented.

Properties of the event's **detail** payload:

| Property             | Events                                  | Description                                                |
| -------------------- | --------------------------------------- | ---------------------------------------------------------- |
| **token**            | All                                     | The token associated with the authentication attempt       |
| **type** (†)         | _passed, failed_                        | The type of authentication (`enrol` or `verify`)           |
| **passed**           | _passed, failed_                        | Boolean value whether the result passed or failed          |
| **frame** (†) (\*)   | _passed, failed_                        | An `ImageData` from the scanning process                   |
| **progress**         | _progress_                              | A percentage (between 0 and 100) representing the progress |
| **message**          | _progress_                              | A user-friendly description of the current progress stage  |
| **feedback**         | _canceled, failed, error, unsupported_ | A fixed feedback code for making logical decisions         |
| **reason**           | _canceled, failed, error, unsupported_ | An English description of the reason for the event         |
| **slot**             | _multiple_cameras_                      | The relevant slot for the event, for ease of use           |
| **devices**          | _multiple_cameras_                      | Array of suitable `InputDevice`s for imagery capture       |
| **device_selector**  | _multiple_cameras_                      | The multiple camera selection `<select>` element           |
| **is_native_bridge** | All                                     | Boolean value if event originates from the native bridge   |

> - The `frame` property is for UI/UX purposes only and is only available if enabled on your service provider and token configuration. Imagery upon which authentication may later rely must be obtained from the token validate endpoint by a secure server-to-server call.
> - The **type** and **frame** properties are not available when running in Native Bridge mode.

### Feedback Codes

When the SDK exits, we use a set of feedback codes to expose more information about the exit reason for internal tracking.

These codes can be used to tailor guidance for the user to try again in the case of `permission_denied`, `canceled` and `failure` events.

We always store the SDK exit feedback code against the transaction for reporting and quality improvement purposes.

In all events, corresponding _reason_ field can be displayed to the user.

### Failure Feedback Codes for Genuine Presence Assurance

| Feedback              | Reason                                                |
| --------------------- | ----------------------------------------------------- |
| **eyes_closed**       | Keep your eyes open                                   |
| **face_too_far**      | Move your face closer to the screen                   |
| **face_too_close**    | Move your face farther from the screen                |
| **misaligned_face**   | Keep your face in the oval                            |
| **multiple_faces**    | Ensure only one person is visible                     |
| **obscured_face**     | Remove any face coverings                             |
| **sunglasses**        | Remove sunglasses                                     |
| **too_bright**        | Ambient light too strong or screen brightness too low |
| **too_dark**          | Your environment appears too dark                     |
| **too_much_movement** | Please keep still                                     |
| **unknown**           | Try again                                             |


### Failure Feedback Codes for Liveness Assurance

> ⚠️ This declares support for the new codes in the SDK. It does NOT define when the new codes will be produced by our servers.
> This capability will be delivered in the future for Liveness Assurance.

| Feedback          | Reason                                                |
| ----------------- | ----------------------------------------------------- |
| **eyes_closed**   | Keep your eyes open                                   |
| **multiple_faces**| Ensure only one person is visible                     |
| **obscured_face** | Remove any face coverings                             |
| **sunglasses**    | Remove sunglasses                                     |
| **too_bright**        | Ambient light too strong or screen brightness too low |
| **too_dark**          | Your environment appears too dark                     |
| **unknown**       | Try again                                             |

### Error Feedback Codes

Error feedback codes apply for both GPA and Liveness Assurance

| Feedback                            | Reason                                                     |
| ----------------------------------- | ---------------------------------------------------------- |
| **unknown**                         | Try again                                                  |
| **client_camera**                   | There was an error getting video from the camera           |
| **client_error**                    | An unknown error occurred                                  |
| **error_asset_fetch**               | Unable to fetch assets                                     |
| **error_camera**                    | The camera cannot be started for unknown reasons           |
| **error_camera_in_use**             | The camera is already in use and cannot be accessed        |
| **error_camera_not_supported**      | The camera resolution is too small                         |
| **error_camera_permission_denied**  | The user denied our camera permission request              |
| **error_device_motion_denied**      | The user denied our device motion permission request       |
| **error_device_motion_unsupported** | Your device does not seem to fully report device motion    |
| **error_fullscreen_change**         | Exited fullscreen without completing iProov                |
| **error_invalid_token**             | The token is invalid                                       |
| **error_network**                   | Network error                                              |
| **error_no_face_found**             | No face could be found                                     |
| **error_not_supported**             | The device or integration isn't able to run the Web SDK    |
| **error_server**                    | An error occurred when communicating with iProov's servers |
| **error_token_timeout**             | The token was claimed too long after being created         |
| **error_too_many_requests**         | The service is under high load and the user must try again |
| **error_user_timeout**              | The user started the claim but did not stream in time      |
| **integration_unloaded**            | The SDK was unmounted from the DOM before it finished      |
| **sdk_unsupported**                 | The SDK has passed end of life and is no longer supported  |

### Listeners

We recommend the integrator listens for at least the **ready** and **unsupported** events because one of them will always be called, so you can determine if iProov is supported or not:

```javascript
document.querySelector("iproov-me").addEventListener("ready", function (event) {
  console.log("iProov is ready")
})
document.querySelector("iproov-me").addEventListener("unsupported", function (event) {
  console.warn("iProov is not supported: " + event.detail.reason)
})
```

Because all event **details** share the same structure, they can be handled by a single function if desired:

```javascript
const iProovMe = document.querySelector("iproov-me")
iProovMe.addEventListener("ready", iProovEvent)
iProovMe.addEventListener("started", iProovEvent)
iProovMe.addEventListener("canceled", iProovEvent)
iProovMe.addEventListener("streaming", iProovEvent)
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
    case "canceled":
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
$("iproov-me").on("ready started canceled streamed progress passed failed error unsupported", iProovEvent)
```

## 🌎 Localization

The Web SDK supports a [multitude of languages](https://github.com/iProov/web/blob/master/languages/) with [English](https://github.com/iProov/web/blob/master/languages/iproov-en.json) being the default. To provide strings in another language, you can supply `language` overrides as JSON. Language files use the same structure.

You can customize the language by supplying the `language` attribute to your iProov component. The `language` value must be valid JSON and passed as a string.

Any value not supplied will fall back to the English default.

### Override language strings

```javascript
window.addEventListener("WebComponentsReady", (event) => {
  const iProovMe = document.createElement("iproov-me")
  iProovMe.setAttribute("token", "***YOUR_TOKEN_HERE***")

  const customLanguage = {
    passed: "You passed!",
    prompt_connecting: "It's loading...",
  }
  element.setAttribute("language", JSON.stringify(customLanguage))

  // inject iproov element into page
  document.getElementById("your-container-id").appendChild(iProovMe)
})
```

#### Load language file

```javascript
window.addEventListener("WebComponentsReady", async (event) => {
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

### Right-to-left direction

A language ISO code is read from the value of the key `language_file` in the language file (e.g. ISO code `en` for `language_file` value `en-GB`).

If the ISO code corresponds to one of the following languages, the right-to-left direction will be automatically applied.

| ISO Language Code | Language Name |
| ----------------- | ------------- |
| ar                | Arabic        |
| arc               | Aramaic       |
| dv                | Divehi        |
| fa                | Persian       |
| ha                | Hausa         |
| he                | Hebrew        |
| khw               | Khowar        |
| ks                | Kashmiri      |
| ku                | Kurdish       |
| ps                | Pashto        |
| ur                | Urdu          |
| yi                | Yiddish       |

## 🌐 Browser support

iProov's Web SDK makes use of the following technologies:

- [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)
- [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- [WebAssembly](https://webassembly.org/)
- [WebComponents](https://www.webcomponents.org/introduction)

iProov Biometrics Web SDK requires access to a front facing camera, WebGL, WebAssembly and the ability to enter full screen. A network connection is required that allows WebSockets. Provided there's a suitable webcam available, most modern desktop browsers fall within these criteria.

Of the mainstream browsers that support the above technologies, we support the **last two releases**. We feature detect capabilities and provide support for Web Components through polyfills. If we're sure our experience won't work well, due to misconfigured permissions policy or iframe settings, we mark the device as `unsupported`.

For known issues, [see here](#known-issues).

We officially support only the following browsers. Please note that browsers not included in the list may not guarantee an optimal experience when utilizing the iProov Biometrics Web SDK.

| <img src="https://avatars1.githubusercontent.com/u/4119093?s=200&v=4" alt="Safari" width="24px" height="24px" /><br/>Platform | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" /><br/>Safari | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" /><br/>Chrome | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" /><br/>Edge | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" /><br/>Firefox | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" /><br/>Opera | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" /><br/>Samsung |
| ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Windows**                                                                                                                   | N/A                                                                                                                                                       | :heavy_check_mark:                                                                                                                                        | :heavy_check_mark:                                                                                                                                     | :heavy_check_mark:                                                                                                                                            | :heavy_check_mark:                                                                                                                                    | N/A                                                                                                                                                                             |
| **MacOS**                                                                                                                     | :heavy_check_mark: \*                                                                                                                                     | :heavy_check_mark:                                                                                                                                        | :heavy_check_mark:                                                                                                                                     | :heavy_check_mark: \*                                                                                                                                         | :heavy_check_mark:                                                                                                                                    | N/A                                                                                                                                                                             |
| **iOS**                                                                                                                       | :heavy_check_mark:                                                                                                                                        | :heavy_check_mark:                                                                                                                                        | :heavy_check_mark:                                                                                                                                     | :heavy_check_mark: \*                                                                                                                                         | :heavy_check_mark:                                                                                                                                    | N/A                                                                                                                                                                             |
| **Android**                                                                                                                   | N/A                                                                                                                                                       | :heavy_check_mark:                                                                                                                                        | :heavy_check_mark:                                                                                                                                     | :heavy_check_mark: \*                                                                                                                                         | :heavy_check_mark:                                                                                                                                    | :heavy_check_mark:                                                                                                                                                              |

> \* See [known issues](#known-issues) for more details

> ℹ️ If the device attempting to iProov doesn't meet the minimum requirements, the `unsupported` event is emitted. See the [events](#-events) section for more details.

### Support checker

For complex use cases, we recommend separately deploying the lightweight `iProovSupport` support checker component ahead
of the iProov user journey to ensure that users have the correct hardware and software to use the Web SDK successfully.

Key points:

- You don't need to create a token to use the support checker, you just need to choose the assurance type.
- The checker tests the user's device software, hardware and optionally permissions, but also the feature policy of the webpage containing the Web SDK.
- If the user device is unsupported, the integrator can send the user down an alternative journey.

Integrators can and should code split their bundle so that users don't need to download an entrypoint that contains the
full component until device support has been established, so that the Web SDK only is downloaded when necessary.

**Example usage when using a bundler that treats UMD like ESM:**

```javascript
import { iProovSupport } from "@iproov/web-sdk/iProovSupport.js"
const optionalLogger = console
const supportChecker = new iProovSupport(optionalLogger)
```

**Example usage without a bundler, inside a vanilla ES6 / ESM environment:**

```javascript
// ESM without a bundler:
import "@iproov/web-sdk/iProovSupport.js
const supportChecker = new window.iProovSupport.default()
```

**Example usage for script tag integrators in test:**

`iProovSupport` is available on the window object via `window.IProov` once included:

```javascript
const supportChecker = new window.IProov.IProovSupport()
```

`iProovSupport` can check for the required APIs on the user's browser, using either event or Promise based APIs:

#### How to use iProovSupport:

> ⚠️ The `assurance_type` config option was removed from the Support Checker in v5 as motion permissions are now required for all assurance types.

```javascript
const loggger = console // optionally pass in a logger conforming to JS console API
const supportChecker = new iProovSupport(loggger)
// Event based:
supportChecker.addEventListener("check", (event) => {
  const { supported, granted, is_native_bridge } = event.detail
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

// Promise based:
const { supported, granted, is_native_bridge } = await supportChecker.check()
```

...or to carry out a complete lightweight check for camera access with user interaction, this can pre-set the required
permissions for iProoving, save some bandwidth, and provide a cleaner user journey if camera access isn't possible:

```javascript
const supportChecker = new iProovSupport()
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

The following events can be emitted from `iProovSupport`:

```javascript
const supportChecker = new iProovSupport()
function onCheckResult(event) {
  const {
    /** @var boolean */
    supported,
    /** @var boolean */
    granted,
    /** @var array */
    tests,
    /** @var boolean|undefined */
    is_native_bridge,
  } = event.detail
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
  localStorage: null,
}
```

The `is_native_bridge` property will be exposed on support checker events if the checker detects that `iProovNativeBridgeInfo` exists within the global scope. This variable is injected automatically by the native SDK. In this case, the browser support and permission checks are cast to `true` as we won't be using the browser to iProov.

Using the support checker is the best and canonical way to detect whether the user's browser supports the Web SDK.

## 🕸 WebViews

Web Views are compatible with the iProov Web SDK. However, there are some considerations to take into account when integrating iProov into a WebView based app.

- [Native Bridge](#native-bridge) mode is _mandatory_ for iOS `WKWebView` based apps until iOS `14.3`, when Apple enabled support for `getUserMedia`. In all other cases, the `unsupported` event fires. All iOS versions after this are supported.
- In Android WebView apps, it _is_ possible to use the Web SDK directly provided that your app correctly allows fullscreen mode. This ensures the user interface is correctly rendered.

### Android WebView

These WebView examples demonstrate how to ensure fullscreen is allowed and configured correctly inside your Android app:

- [Java Fullscreen WebView Example](https://github.com/iProov/android/wiki/Java-WebView)
- [Kotlin Fullscreen WebView Example](https://github.com/iProov/android/wiki/Kotlin-WebView)

### iOS WebView

For iOS, the `WKWebView` is the recommended Web View to use. Below is an example but please be aware the code is a simple example and has not been tested thoroughly.

```swift
import UIKit
import WebKit

final class WKWebViewViewController: UIViewController, WKUIDelegate {
    var webView: WKWebView!

    override func loadView() {
        let webConfiguration = WKWebViewConfiguration()
        webConfiguration.allowsInlineMediaPlayback = true
        webView = WKWebView(frame: .zero, configuration: webConfiguration)
        webView.uiDelegate = self
        view = webView
    }

    override func viewDidLoad() {
        super.viewDidLoad()

        let myURL = URL(string: "ENTER_YOUR_URL_HERE")
        let myRequest = URLRequest(url: myURL!)
        webView.load(myRequest)
    }
}
```

## 🌉 Native bridge

If integrating iProov into a WebView based app, why not take advantage of our Native SDKs?

Native SDK integration is possible with one line of code in a single location in your app's codebase. The Web SDK then automatically detects and switches to Native Bridge mode if available.

### Native SDK integration guides

For more information on using iProov Web within a native WebView based app, see the following Wiki pages:

- [Android Native Bridge Integration Guide](https://github.com/iProov/android/wiki/Web-Native-Bridge)
- [iOS Native Bridge Integration Guide](https://github.com/iProov/ios/wiki/Native-Bridge)

> Please note: Web SDK v5 and onwards is only compatible with iOS SDK v11 and Android SDK v9.

### Customization

The `native_sdk_options` setting accepts a base64 encoded JSON object of iProov Native SDK options as defined in the [iOS](https://github.com/iProov/ios#-options) and [Android](https://github.com/iProov/android#-options) documentation:

```js
// Example shows passing title_text_color and a title to the Native SDK
iProovMe.setAttribute("native_sdk_options", btoa(JSON.stringify({ title_text_color: "#2D2D2D", title: "NB Test" })))
```

Note: Native SDK implementations can only accept colour values in `#RRGGBB` and `#AARRGGBB` formats.

#### Filters
When configuring the `filter` options, you will need to pass these in as objects via the `native_sdk_options` option. See the related [Android SDK filter docs]([#-filter-options](https://docs.iproov.com/docs/Content/ImplementationGuide/biometric-sdk/android/sdk-android-customize-ui.htm?Highlight=filter)) or [iOS SDK filter docs](https://docs.iproov.com/docs/Content/ImplementationGuide/biometric-sdk/ios/sdk-ios-customize-ui.htm?Highlight=filter) for more details on configuring filters.

```js
// Example shows passing a filter to the Native SDK as natural and clear
iProovMe.setAttribute("native_sdk_options", btoa(JSON.stringify({ filter: { name: "natural", style: "clear" }})))
```

## 🔳 Iframe integrations

Integrations via iframes are supported by the Web SDK but please note that you must declare that camera and fullscreen permissions are allowed. Any additional permissions you may require must be separated by a semi-colon `;`. Permissions `accelerometer;gyroscope;magnetometer;` are required.

**Please note the following:**
- Iframe integrations are not supported in iOS versions `14` and lower due to iOS not supporting motion permissions in iframes. All devices attempting to run iProov will be marked as `unsupported`.
- Due to browser policies, it is also required to pass `allowfullscreen="true"` as well as the `allow` attribute.
- Its important to ensure the iframe is expanded to 100% width and height. See an example of this below.

```html
<iframe
  style="width: 100vw; height: 100vh; border: 0"
  src="https://your-iframe-target.example"
  allow="camera;fullscreen;accelerometer;gyroscope;magnetometer;"
  allowfullscreen="true"
></iframe>
```

## ❌ Manually canceling a transaction

Transactions can be manually canceled by calling the `cancelTransaction` function on the `iproov-me` component. This feature is useful when integrators want to abort the user journey without waiting for the transaction to timeout. This must be called before removing the `iproov-me` element from the page.

```javascript
// an example showing how to cancel a transaction 20 seconds after the connected event is fired
const iProovMe = document.createElement("iproov-me")
// add token and other options...
const cancelAfterTimeoutFromConnected = (event) => {
  setTimeout(function () {
    iProovMe.cancelTransaction() // error_transaction_canceled will be triggered
  }, 20 * 1000)
}
iProovMe.addEventListener("connected", cancelAfterTimeoutFromConnected)
// inject element into page...
```

## 🚹 Accessibility

### Screen reader

For a better experience with screen readers, all elements in the integration page other than iProov should be temporarily hidden from accessibility tools during the scan.

The following code is an example to manage the visibility of HTML elements outside iProov.
In this example, elements to hide during iProov scan are identified with the CSS class `.hide-in-fs`:

```javascript
const ELEMENTS_TO_HIDE_IN_FS = document.querySelectorAll(".hide-in-fs")
iProov.addEventListener("started", () => {
  ELEMENTS_TO_HIDE_IN_FS.forEach((el) => el.setAttribute("aria-hidden", "true"))
})
const EXIT_EVENTS = ["canceled", "error", "failed", "passed"]
EXIT_EVENTS.forEach((eventName) => {
  iProov.addEventListener(eventName, () => {
    ELEMENTS_TO_HIDE_IN_FS.forEach((el) => el.removeAttribute("aria-hidden"))
  })
})
```

## ✨ Image Quality Enhancement
In Liveness Assurance, higher quality imagery can be collected and returned via the validate frame.
This feature can be toggled on - please reach out to Customer Success to enable this.

## ❓ Help & support

You may find your question answered on our [Wiki pages](https://github.com/iProov/web/wiki).

For further help with integrating the SDK, please contact [support@iproov.com](mailto:support@iproov.com).

### Known issues

- We do not support tiny video feeds, and will re-prompt the user to provide a different camera
  - In Firefox this will present the user with the camera prompt again without any further guidance
- When multiple video devices are attached using Firefox on desktop, permission is requested on each button click
- iOS WebView based browser support is currently whitelisted to those with the most support
- MacOS Safari 15.0 is marked as unsupported until further notice due to several regressions out of our control:
  - [Safari 15.0 tab crashes when requesting WebGL context](https://bugs.webkit.org/show_bug.cgi?id=231423)
  - [Safari 15.0 unable to render webcam to canvas context](https://github.com/mrdoob/three.js/issues/22582#issuecomment-938710902)
- Flickering can occur while cropping with `clear` and `blur` SDK filters (only observed on MacBook Pro M2 with an external monitor)
- Native Bridge integrations can only accept colour inputs in `#RRGGBB` and `#AARRGGBB` formats

