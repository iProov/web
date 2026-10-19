![iProov: Biometric Face Verification for Remote Identity Assurance](https://github.com/iProov/web/raw/master/images/banner.png)

# iProov Face SDK v7.0.0

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
  - [User activation](#user-activation)
  - [Fullscreen](#fullscreen)
- [WebViews](#-webviews)
- [Native bridge](#-native-bridge)
- [Iframe Integrations](#-iframe-integrations)
- [Iframe Bridge](#-iframe-bridge)
- [Manually canceling a transaction](#-manually-canceling-a-transaction)
- [Accessibility](#-accessibility)
- [Help & support](#-help--support)

## 🤳 Introduction

This guide describes how to integrate iProov biometric assurance technologies into your Web app, or SDK.

iProov offers two powerful authentication solutions:

- **Dynamic Liveness™** technology (our **Genuine Presence Assurance™** solution) verifies that an online remote user is the right person, a real person, and that they are authenticating right now, for purposes of access control and security.
- **Express Liveness™** technology (our **Liveness Assurance™** solution) verifies that a remote online user is the right person and a real person for access control and security.

### Software Download & Installation

The SDK can be downloaded and installed directly into your Web application, or incorporated into your own SDK.

Our downloadable software components implementing **Dynamic Liveness™** and **Express Liveness™** technologies integrate seamlessly with your existing user journeys.

### Web Services & API Access

In addition to our downloadable software components, iProov provides identity authentication services through our secure API and web-based administration portal.
These services enable organizations to implement **Dynamic Liveness™** and **Express Liveness™** verification capabilities across their digital platforms.

Find out more about how to use iProov in your user journeys in the [Implementation Guide](https://docs.iproov.com/implementation/architecture).

iProov also supports [Android](https://github.com/iproov/android), [iOS](https://github.com/iproov/ios), [Flutter](https://github.com/iproov/flutter), [MAUI](https://github.com/iProov/dotnet-maui), and [React Native](https://github.com/iproov/react-native).

### Upgrading from a previous version?

For more information on the changes made between versions of the SDK, please refer to our [Upgrade Guide](https://github.com/iProov/web/wiki/Upgrade-Guide)

> ### ⚠️ Breaking changes in v7.0.0
>
> - The SDK is **ESM-only**. A classic `<script src="…iProovMe.js">` no longer executes — use `<script type="module">`, or a bundler. There is no CommonJS/UMD build; `require()` is unsupported.
> - `window.IProov` and `window.IProov.IProovSupport` are **removed**. Import the element from the package root, and the support checker from the `@iproov/web-sdk/iProovSupport.js` subpath — the extension is required, because `exports` subpaths are matched exactly.
> - `iProovSupport.js` is now an ES module and no longer sets a `window.iProovSupport` global.
>
> Chunk delivery is unchanged: `assets_url` still decides where split chunks load from at runtime.

## ✍ Registration

You can obtain API credentials by registering on the [iProov Portal](https://portal.iproov.com/).

## 📲 Installation

The NPM package [@iproov/web-sdk](https://www.npmjs.com/package/@iproov/web-sdk) allows for integration of the SDK. It makes use of the [Web Components](https://www.webcomponents.org/introduction) APIs which are supported by most modern browsers and uses the [Polymer Project](https://www.polymer-project.org) to add support where they are not yet available.

### NPM Package

Using the `@iproov/web-sdk` package is the recommended way of using the SDK in production. The package is an ES module. The SDK is held in a private NPM registry, to gain access, please contact [support@iproov.com](mailto:support@iproov.com) sharing your NPM username and you will be given instructions on usage.

> ⚠️ **Ship `iProovMe.js` as published.** Your bundler may resolve and import it, but it must not run it through a further minification, obfuscation or transpilation pass — the published file is already optimised, and re-transforming it can cause unexpected errors or degrade performance. If your build would otherwise transform it, mark `@iproov/web-sdk` as external.

> ⚠️ When you have been granted access, to use the `@iproov/web-sdk` via your CLI, you will need to authenticate with [NPM Login](https://docs.npmjs.com/cli/v9/commands/npm-login) or [YARN login](https://classic.yarnpkg.com/lang/en/docs/cli/login/).

#### Setup

Install the package as a dependency. You can use [Yarn](https://yarnpkg.com/lang/en/) or [NPM](https://www.npmjs.com/get-npm) to do this.

```sh
yarn add @iproov/web-sdk
```

```sh
npm i @iproov/web-sdk --save
```

After you have installed the `@iproov/web-sdk` package, import it into your codebase. The package is a standard **ES module** (ESM-only), resolved through the `import` condition, and it can also be loaded directly with `<script type="module">`. There is no CommonJS/UMD build — `require()` is not supported.

```javascript
// ESM / module bundler — the side-effect import registers the <iproov-me> element:
import "@iproov/web-sdk"

// ESM — the element class is also the default (and named) export, for programmatic access:
import IProovMe from "@iproov/web-sdk"
```

It's as simple as that to include the SDK with your project.
Now you can inject the web component where you need it using one of the [integration methods](#frontend) shown below.

> 🔒 A secure context is required when using the SDK. This means that the page must be served over https including when using localhost. If you are using localhost, you can use a self-signed certificate.

## 🚀 Get started

### Backend

To make use of this SDK you will require integration with the iProov backend service. You can obtain platform credentials and read our integration guide on [portal.iproov.com](https://portal.iproov.com).

When starting an iProov transaction (or claim), you first need to generate an [enrolment](https://secure.iproov.me/docs.html#operation/userEnrolServerToken) or [verification](https://secure.iproov.me/docs.html#operation/userVerifyServerToken) token, which can be passed on page load or fetched with AJAX, then used to initialise the SDK on the frontend.

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

There are also framework specific example integrations available on the wiki. We support any framework version that is still receiving security patches from its maintainers, so where a framework publishes a support policy that policy is the reference rather than the version named here.

| Framework                                             | Supported versions                                                                                                                          | What the guide covers                                 |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| [Angular](https://github.com/iProov/web/wiki/Angular) | Any [actively supported version](https://angular.dev/reference/releases#actively-supported-versions) — v20 and above at the time of writing | Standalone components and zoneless change detection   |
| [React](https://github.com/iProov/web/wiki/React)     | 19 and above — React publishes no policy and [patches only the latest major](https://react.dev/versions)                                    | Functional components and hooks                       |
| [Next.js](https://github.com/iProov/web/wiki/NextJS)  | Active or Maintenance LTS under the [support policy](https://nextjs.org/support-policy) — v15 and above at the time of writing              | The dynamic import required for server-side rendering |
| [Vue](https://github.com/iProov/web/wiki/Vue)         | 3 and above — [Vue 2 reached end of life](https://v2.vuejs.org/eol/) in December 2023                                                       | ES module imports and Vite                            |

> ℹ️ JavaScript methods are run after the **WebComponentsReady** event to ensure that the SDK is ready to be injected.

## ⚙ Options

The behavior of the SDK can be altered by setting the following options as attributes of the `<iproov-me>` tag in the same way as the token.

#### Network Timeout

Time in seconds for the backend to ack a message we send. In the event of the timeout being exceeded, the error event will fire with the feedback code [error_network](#details).

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
<iproov-me token="***YOUR_TOKEN_HERE***" close_button="https://example.com/path-to-close-button.png"></iproov-me>
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

Specify a custom title to be shown. Unset by default, which hides the message entirely; the values `""`, `"false"` and `"null"` also hide it. You can also pass in `%@` characters which will be mapped in this order to `type` (Enrol or Verify), `user_name` (the user_name you passed when generating the token), `sp_name` (the service provider you used to generate the token).

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

You can customize the look and feel of the main layout by changing the following options. Each is set as its own attribute on `<iproov-me>`; the values below are examples. You can pass a literal value `red`, RGB `rgb(230, 245, 66)`, a hex value `#e6f542` or an RGBA value `rgba(230, 245, 66, 0.8)`.

```javascript
const colorOptions = {
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
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **title_text_color**                     | Adjusts the color of the text that can be added above the oval (by default there is no text here - see the custom_title option for more information) |
| **surround_color**                       | Adjusts the color of the surroundings to the centre oval. It also affects the color of the mask in Express with `clear` or `blur` filter.            |
| **prompt_text_color**                    | Adjusts the color of the text visible in the centre prompt of the screen                                                                             |
| **prompt_background_color**              | Adjusts the color of the background visible in the centre prompt of the screen                                                                       |
| **header_background_color**              | Adjusts the color of the background visible in the top bar of the application (transparent by default)                                               |
| **gpa_not_ready_oval_stroke_color**      | Stroke color for the centre oval whilst the SDK is in a "Not Ready" state in Dynamic                                                                 |
| **gpa_ready_oval_stroke_color**          | Stroke color for the centre oval whilst the SDK is in a "Ready" state in Dynamic                                                                     |
| **liveness_oval_stroke_color**           | Stroke color for the centre oval whilst the SDK before iProov-ing in Express                                                                         |
| **liveness_completed_oval_stroke_color** | Stroke color for the centre oval whilst the SDK after iProov-ing in Express                                                                          |

#### Accessibility Guidance Color

When `accessibility_color` is set to `true`, and only for Dynamic, the surround outside the oval sweeps from orange through yellow to green as the user's alignment improves, giving a continuous high-contrast signal that does not depend on reading text.

```html
<iproov-me token="***YOUR_TOKEN_HERE***" accessibility_color="true"></iproov-me>
```

This option is disabled by default. Note that while it is enabled it takes over the surround from the moment the camera preview starts, overriding any `surround_color` you have configured; the color returns to your own branding as soon as the scan itself begins.

#### Accessibility Guidance Sound

The same signal through hearing rather than sight, for users who cannot see the surround at all. When `accessibility_sound` is set to `true`, and only for Dynamic, the SDK plays a short click that speeds up as the user's alignment improves. Once the scan itself starts the clicking is replaced by a single sustained tone, meaning "hold still".

```html
<iproov-me token="***YOUR_TOKEN_HERE***" accessibility_sound="true"></iproov-me>
```

This option is disabled by default, and is independent of `accessibility_color`. 

**The SDK cannot control device volume.** Nothing is audible if the device is muted or turned right down, and no web API allows an application to raise it. If you enable this option, tell your users what to expect.

#### Accessibility Guidance Vibration

The same signal again, through touch. When `accessibility_vibration` is set to `true`, and only for Dynamic, the device taps out the same rhythm as the guidance sound: the taps speed up and firm up as the user's alignment improves, and are replaced by a single sustained vibration once the scan starts, meaning "hold still".

```html
<iproov-me token="***YOUR_TOKEN_HERE***" accessibility_vibration="true"></iproov-me>
```

This option is disabled by default, and is independent of `accessibility_color` and `accessibility_sound`.

**Vibration is only available in Android Chromium browsers**, such as Chrome and Samsung Internet. No browser on iOS or iPadOS implements vibration at all, desktop browsers do not implement it either, and Firefox for Android is excluded because it prompts the user for permission. Everywhere else this option is accepted and simply has no effect, so it is safe to enable for all users — but it must not be the only guidance you rely on. Enable `accessibility_sound` alongside it if you need a non-visual signal that works everywhere.

Note also that the browser offers no control over vibration strength, only over how long each vibration lasts, so strength is conveyed by the length of each tap.

#### Aria Live

Control screen reader priority of messages being read out. By default, this is set to `assertive`, this can be disabled by passing `off` or you can set this to `polite` to not override anything that's currently being read out. [See official documentation here.](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)

```html
<iproov-me token="***YOUR_TOKEN_HERE***" aria_live="assertive"></iproov-me>
```

#### Filter

This setting controls the filter for the camera preview. There are two families:

| Filter        | Family       | Description                                                            | Dynamic | Express |
| ------------- | ------------ | ---------------------------------------------------------------------- | ------- | ------- |
| **`clear`**   | Clear        | No filter — the camera image itself. **The default.**                  | ✅      | ✅      |
| **`blur`**    | Clear        | Starts blurred; the blur is removed as the claim progresses            | ❌      | ✅      |
| **`shaded`**  | Line drawing | Line drawing with additional detail                                    | ✅      | ✅      |
| **`classic`** | Line drawing | iProov's traditional line drawing                                      | ✅      | ✅      |
| **`vibrant`** | Line drawing | Line drawing in full color                                             | ✅      | ✅      |

```html
<iproov-me token="***YOUR_TOKEN_HERE***" filter="clear"></iproov-me>
```

> ⚠️ **Upgrading:** `clear` became the default in v7.0.0. A claim that does not set `filter` now
> renders the camera image instead of the `shaded` line drawing. Set `filter="shaded"` explicitly to
> keep the previous appearance.

`blur` is an Express-only filter. Requesting it on a Dynamic claim raises
`error_unexpected_filter_in_GPA` rather than falling back, and combining it with
`disable_exterior_blur` raises `error_disable_blur_with_blur_filter`. `clear` needs no per-service-provider
enablement — Dynamic claims accept it from any integrator.

> ℹ️ The "Secured by iProov" logo follows the filter, not an integrator option. It appears on a
> Dynamic claim rendering a Clear-family filter, and never on a line-drawing render or an Express
> claim. iProov can suppress it for a given service provider; there is no SDK option that governs it.

For the Clear-family filters, if the camera feed does not cover the full screen, an opaque "mask" with rounded corners will be applied around the camera preview.
The mask takes the color except transparency (it will always be opaque) from `surround_color` (see above).

#### Floating Prompt Rounded Corners

The floating prompt has an option to control rounded corners. Rounded corners are enabled by default (set to `true`); to disable rounded corners set `prompt_rounded_corners` to `false`.

```html
<iproov-me token="***YOUR_TOKEN_HERE***" prompt_rounded_corners="false"></iproov-me>
```

#### Accessibility Scanning Prompts for Dynamic Liveness

When `scanning_prompts` is set to `true` and only for Dynamic Liveness, the iProov component will display two additional prompts to the user: `prompt_scanning` during the scan and `prompt_genuine_presence_scan_completed` after the scan completes. These prompts will be read out by screen readers.

```html
<iproov-me token="***YOUR_TOKEN_HERE***" scanning_prompts="true"></iproov-me>
```

#### CSP Nonce

Set the `csp_nonce` option to a random string to avoid requiring `unsafe-inline` in your style-src CSP.

Note that inline CSS _is_ needed to provide critical styles for `<iproov-me>` for immediate user interaction.

```html
<iproov-me token="***YOUR_TOKEN_HERE***" csp_nonce="P5wB82PFZt"></iproov-me>
```

> ℹ️ For a full policy, including the `wasm-unsafe-eval` directive the SDK requires and the fallback needed for macOS Safari 15, see the [Content Security Policy](https://github.com/iProov/web/wiki/Content-Security-Policy) wiki page.

#### Allow Landscape for Dynamic Liveness

`allow_landscape` controls whether a device may **start** a Dynamic Liveness transaction in landscape orientation.

> ⚠️ `allow_landscape` only applies to Dynamic Liveness on Android mobile devices, iOS mobile devices, and iPads. Desktops and Android tablets always permit landscape, and Express transactions on mobile devices and iPads always require portrait.

Once scanning has started, **any** rotation will result in the error [`error_do_not_rotate`](#error-feedback-codes), regardless of direction.

When `allow_landscape` does not apply (or is left unset) and the device starts in landscape orientation, the iProov component will display the `rotate_portrait` slot.

See [slots](#-slots) for details on how to override the `rotate_portrait` slot.

```html
<iproov-me token="***YOUR_TOKEN_HERE***" allow_landscape="true"></iproov-me>
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

| Slot                       | Description                                                                                   |
| -------------------------- | --------------------------------------------------------------------------------------------- |
| **button** \*              | Element that a user taps or clicks on to launch into fullscreen and start iProov              |
| **camera_selector** \*\*   | Label and dropdown populated with available cameras, if multiple cameras are detected.        |
| **canceled**               | State displayed to the user when they exit fullscreen before iProoving                        |
| **error**                  | State displayed to the user in the event of an error                                          |
| **failed**                 | State displayed to the user when the user failed iProov                                       |
| **grant_button** \*        | Element that user taps or clicks to grant camera permission                                   |
| **grant_permission**       | State displayed to the user when camera or motion permission is unknown and not blocked       |
| **iframe_bridge_button** \* | Element that user taps or clicks to open the [Iframe Bridge](#-iframe-bridge) window          |
| **iframe_bridge_title**    | State displayed to the user when the [Iframe Bridge](#-iframe-bridge) is required              |
| **no_camera**              | State displayed to the user when there is no camera                                           |
| **passed**                 | State displayed to the user when the user passed iProov                                       |
| **permission_denied**      | State displayed to the user when camera permission has been blocked                           |
| **progress**               | State displayed to the user when streaming has completed and iProov is processing the result  |
| **ready**                  | State displayed to the user when the component is ready to start the main iProov user journey |
| **rotate_portrait** \*\*\* | State displayed to the user when a handheld device is not in portrait orientation             |
| **unsupported**            | State displayed to the user when their browser is not supported                               |

> \* Interactive elements such as buttons that start full screen and cameras require a user gesture enforced by the browser. Using JavaScript to apply clicks is not recommended within your user journey and may cause unexpected errors or performance degradation.
> See [User activation](#user-activation) for more details.

> \*\* Visible and managed when [camera selection](#enable-camera-selector) is enabled. A select menu with the class `iproov-camera-selector` must be present within your slots markup. An error will be thrown if this cannot be found.

> \*\*\* See [allow landscape](#allow-landscape-for-dynamic-liveness) option which controls the behaviour of the `rotate_portrait` slot and details on how to override.

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
| **canceled**            | _reasons_                               | User has canceled iProov by exiting fullscreen                                                                                                                                                                                  |
| **connecting**          | None                                    | The SDK is connecting to the server. You should provide an indeterminate progress indicator to let the user know that the connection is taking place.                                                                           |
| **connected**           | None                                    | The SDK has connected. You should hide any progress indication at this point.                                                                                                                                                   |
| **error**               | _reasons_                               | iProov encountered an error while processing the authentication                                                                                                                                                                 |
| **failed**              | _type, passed, reasons_                 | Authentication was unsuccessful, the user needs to try again                                                                                                                                                                    |
| **multiple_cameras** \* | _devices, device_selector, slot, label_ | If `enable_camera_selector` is `true` returns an array of devices if more than 1 video device is detected                                                                                                                       |
| **no_camera**           | _reasons_                               | No video input was detected on the user's device                                                                                                                                                                                |
| **passed**              | _type, reasons, passed_                 | Authentication was successful, the result can now be validated                                                                                                                                                                  |
| **permission**          | _reasons_                               | Camera permission is unknown & not blocked, show permission                                                                                                                                                                     |
| **permission_denied**   | _reasons_                               | User has blocked access to the camera                                                                                                                                                                                           |
| **progress**            | _progress, message_                     | iProov has published a progress update for the authentication                                                                                                                                                                   |
| **ready**               | None                                    | iProov has initialized successfully and has camera permission                                                                                                                                                                   |
| **started**             | None                                    | User has started iProov by launching into fullscreen                                                                                                                                                                            |
| **streaming**           | None                                    | User has started streaming. The client remains in fullscreen.                                                                                                                                                                   |
| **streamed**            | None                                    | User has finished streaming and the client has exited fullscreen _(Not guaranteed to fire every time due to a possible fast failure or any errors that can occur and should be handled within your event handlers accordingly)_ |
| **unsupported**         | _reasons_                               | Browser does not support using iProov                                                                                                                                                                                           |

> \* See [Multiple Camera Example](https://github.com/iProov/web/wiki/Camera-Selection-Example) for an example demonstrating how a camera selection feature could be implemented.

Properties of the event's **detail** payload:

| Property             | Events                                 | Description                                                                                                                 |
| -------------------- | -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **token**            | All                                    | The token associated with the authentication attempt                                                                        |
| **type** (†)         | _passed, failed_                       | The type of authentication (`enrol` or `verify`)                                                                            |
| **passed**           | _passed, failed_                       | Boolean value whether the result passed or failed                                                                           |
| **progress**         | _progress_                             | A percentage (between 0 and 100) representing the progress                                                                  |
| **message**          | _progress_                             | A user-friendly description of the current progress stage                                                                   |
| **reasons**          | _canceled, error, failed, no_camera, passed, permission, permission_denied, unsupported_ | A list of English reasons (`localized_description`) and fixed feedback codes when applicable (`feedback_code`) for an event |
| **slot**             | _multiple_cameras_                     | The relevant slot for the event, for ease of use                                                                            |
| **devices**          | _multiple_cameras_                     | Array of suitable `InputDevice`s for imagery capture                                                                        |
| **device_selector**  | _multiple_cameras_                     | The multiple camera selection `<select>` element                                                                            |
| **is_native_bridge** | All except _iframe_bridge_             | Boolean value if event originates from the native bridge                                                                    |

> - The **type** property is not available when running in Native Bridge mode.

### Feedback Codes

When the SDK exits, we use a set of feedback codes to expose more information about the exit reason for internal tracking.

These codes can be used to tailor guidance for the user to try again in the case of `permission_denied`, `canceled` and `failed` events.

We always store the SDK exit feedback code against the transaction for reporting and quality improvement purposes.

In all events, corresponding _reason_ field can be displayed to the user.

### Failure Feedback Codes

The following table lists all failure feedback codes with their corresponding reasons and indicates which assurance type supports each code.

| Feedback              | Reason                                                 | Dynamic | Express |
| --------------------- | ------------------------------------------------------ | ------- | ------- |
| **unknown**           | Try again                                              | ✅       | ✅       |
| **too_much_movement** | Please keep still                                      | ✅       | ❌       |
| **too_bright**        | Ambient light too strong or screen brightness too low  | ✅       | ❌       |
| **too_dark**          | Your environment appears too dark                      | ✅       | ❌       |
| **misaligned_face**   | Keep your face in the oval                             | ✅       | ❌       |
| **face_too_far**      | Move your face closer to the screen                    | ✅       | ❌       |
| **face_too_close**    | Move your face farther from the screen                 | ✅       | ❌       |
| **sunglasses**        | Remove sunglasses                                      | ✅       | ❌       |
| **obscured_face**     | Remove any face coverings                              | ✅       | ✅       |
| **eyes_closed**       | Keep your eyes open                                    | ✅       | ✅       |
| **multiple_faces**    | Ensure only one person is visible                      | ✅       | ✅       |
| **background_issue**  | Move to a different location with a neutral background | ✅       | ✅       |
| **device_issue**      | Try a different device or browser.                     | ✅       | ✅       |
| **eyewear**           | Remove your eyewear                                    | ✅       | ✅       |
| **face_not_found**    | Align your face in the oval and then try to keep still | ✅       | ✅       |
| **frames_blurry**     | Align your face in the oval and then try to keep still | ✅       | ✅       |
| **motion_issue**      | Try a different device or browser.                     | ✅       | ✅       |
| **lighting_issues**   | Make sure your face is well lit and free from glare.   | ✅       | ✅       |
| **rejected**          | Transaction could not be completed.                    | ✅       | ✅       |
| **system_error**      | System error.                                          | ✅       | ✅       |
| **timeout**           | System timeout.                                        | ✅       | ✅       |
| **user_not_found**    | Transaction could not be completed.                    | ✅       | ✅       |
| **device_restart**    | Please restart your device and try again.              | ✅       | ✅       |
| **processing_fault**  | Please try again.                                      | ✅       | ✅       |

Key: ✅ = will be returned, ❌ = will not be returned

> ⚠️ These are not an indication of tests being performed but only whether reasons of failure are reported.

### Error Feedback Codes

Error feedback codes apply to both Dynamic and Express. The **Event** column gives the event the code arrives on, in the `reasons` array of its `detail`. Most arrive on `error`, but four other events carry feedback codes, and they need different handling — `permission_denied` and `no_camera` are recoverable by the user, whereas `unsupported` means the journey cannot proceed in this browser.

| Feedback                                | Reason                                                                                                        | Event                    |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **error_asset_fetch**                   | Unable to fetch assets                                                                                        | `error`                  |
| **error_camera**                        | The camera cannot be started for unknown reasons                                                              | `error`                  |
| **error_camera_in_use**                 | The camera is already in use and cannot be accessed                                                           | `error`                  |
| **error_camera_not_supported**          | The camera resolution is too small                                                                            | `error`                  |
| **error_camera_permission_denied**      | The user denied our camera permission request                                                                 | `permission_denied`      |
| **error_client**                        | An unknown error occurred                                                                                     | `error`                  |
| **error_client_camera**                 | There was an error getting video from the camera                                                              | `error`                  |
| **error_consent**                       | The user did not give the consent required to proceed                                                         | `error`                  |
| **error_device_motion_denied**          | The user denied our device motion permission request                                                          | `permission_denied`      |
| **error_device_motion_unsupported**     | Your device does not seem to fully report device motion                                                       | `error`                  |
| **error_disable_blur_with_blur_filter** | `disable_exterior_blur` was combined with the `blur` filter                                                   | `error`                  |
| **error_do_not_rotate**                 | The user rotated mid-transaction. Please note that `allow_landscape` does not allow mid-transaction rotations | `error`                  |
| **error_fullscreen_change**             | Exited fullscreen without completing iProov                                                                   | `error` or `canceled` \* |
| **error_integration_unloaded**          | The SDK was unmounted from the DOM before it finished                                                         | `error`                  |
| **error_invalid_token**                 | The token is invalid                                                                                          | `error`                  |
| **error_network**                       | Network error                                                                                                 | `error`                  |
| **error_no_camera**                     | No camera is connected to the device                                                                          | `no_camera`              |
| **error_no_face_found**                 | No face could be found                                                                                        | `error`                  |
| **error_not_supported**                 | The support checker found this device or integration can't run the Web SDK. Do not retry.                     | `unsupported`            |
| **error_server**                        | An error occurred when communicating with iProov's servers                                                    | `error`                  |
| **error_token_timeout**                 | The token was claimed too long after being created                                                            | `error`                  |
| **error_too_many_requests**             | The service is under high load and the user must try again                                                    | `error`                  |
| **error_transaction_canceled**          | The integration called `cancelTransaction()`                                                                  | `error`                  |
| **error_unexpected_filter**             | The `filter` option was not one of the supported values                                                       | `error`                  |
| **error_unexpected_filter_in_GPA**      | The `blur` filter was requested on a Dynamic claim, where it is not supported                                 | `error`                  |
| **error_unsupported_device**            | iProov's servers rejected this device. Do not retry.                                                          | `error`                  |
| **error_unsupported_version_os**        | The operating system version is not supported. Do not retry.                                                  | `error`                  |
| **error_unsupported_version_sdk**       | The SDK version is not supported. Do not retry.                                                               | `error`                  |
| **error_user_timeout**                  | The user started the claim but did not stream in time                                                         | `error`                  |
| **error_ws_error**                      | The WebSocket connection failed                                                                               | `error`                  |
| **error_wshs_failed**                   | The WebSocket handshake was rejected                                                                          | `error`                  |
| **error_wshs_unknown**                  | The WebSocket handshake failed for an unknown reason                                                          | `error`                  |

> \* `error_fullscreen_change` arrives on `canceled` when the user themselves exits fullscreen mid-claim, and on `error` when fullscreen is lost for any other reason. Both carry the same feedback code, so branch on the event rather than the code.

### Listeners

We recommend the integrator listens for at least the **ready** and **unsupported** events because one of them will always be called, so you can determine if iProov is supported or not:

```javascript
document.querySelector("iproov-me").addEventListener("ready", function (event) {
  console.log("iProov is ready")
})
document.querySelector("iproov-me").addEventListener("unsupported", function (event) {
  console.warn("iProov is not supported: " + event.detail.reasons[0].localized_description)
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
      console.warn("iProov " + event.type + " - " + event.detail.reasons[0].localized_description)
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

You can customize the language by supplying the `language` attribute to your iProov component. The `language` value must be valid JSON and passed as a string, and every key and value in it is validated; see [Language validation](#language-validation).

Any value not supplied will fall back to the English default.

The `language` attribute is **reactive**: you can update it at any time during an active session, and all visible UI text will update immediately without requiring a new token or re-initialization. This enables runtime language switching.

> **Note:** Language updates are applied for as long as the `<iproov-me>` element is in the DOM, including on terminal screens (`passed`, `failed`, `error`). Once the element is removed, further updates have no effect.

### Switching language at runtime

```javascript
const iProovMe = document.querySelector("iproov-me")

// Switch to French translations mid-session:
const frenchTranslations = {
  iproov_ready_title: "Prêt à vérifier",
  iproov_ready_button: "Scanner le visage",
  prompt_loading: "Veuillez patienter…",
  language_file: "fr",
}
iProovMe.setAttribute("language", JSON.stringify(frenchTranslations))
```

### Slots and runtime language switching

The `language` attribute controls the SDK's internal UI text (prompts, status messages, ARIA labels, etc.). It does **not** update any custom content you have provided via [slots](#-slots), because slot content lives in your own DOM and is outside the SDK's control.

If you are using custom slots with translated text, you must update those elements separately when switching language. We recommend creating a helper function that handles both at the same time:

```javascript
function switchLanguage(iProovMe, translations) {
  // 1. Update the SDK's internal language
  iProovMe.setAttribute("language", JSON.stringify(translations))

  // 2. Update your own slot content
  const readyHeading = iProovMe.querySelector('[slot="ready"] .iproov-lang-heading')
  if (readyHeading) {
    readyHeading.textContent = translations.iproov_ready_title
  }

  const passedHeading = iProovMe.querySelector('[slot="passed"] .iproov-lang-heading')
  if (passedHeading) {
    passedHeading.textContent = translations.passed
  }

  // ... repeat for any other slots you have customised
}

// Usage:
const frenchTranslations = await fetch("/languages/iproov-fr.json").then(r => r.json())
switchLanguage(document.querySelector("iproov-me"), frenchTranslations)
```

> ℹ️ The translation keys used in your helper (e.g. `iproov_ready_title`, `passed`) should match those in the [language files](https://github.com/iProov/web/blob/master/languages/) so you can use a single translations object for both the SDK and your slots.

### Override language strings

```javascript
window.addEventListener("WebComponentsReady", event => {
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

### Language validation

The SDK is strict about the `language` JSON. It is rejected as a whole if:

- it is not valid JSON
- it contains a key that is not in [`iproov-en.json`](https://github.com/iProov/web/blob/master/languages/iproov-en.json); keys are matched exactly, and keys removed in a release are rejected too, so review your language files on every upgrade
- any value is not a plain-text string (no HTML or other markup)

A rejected `language` ends the claim, whether it was supplied before the claim started or during it. The `error` event reports the feedback code `error_client`, which is all the user sees. The specific reason is reported to iProov's backend and is available to you there:

| Reason                         | Cause                                  |
| ------------------------------ | -------------------------------------- |
| `error_invalid_language_json`  | The value is not valid JSON            |
| `error_invalid_language_key`   | A key is not a recognised language key |
| `error_invalid_language_value` | A value is not a plain-text string     |

> ⚠️ A runtime update is validated the same way as the initial value, so an invalid `language` set mid-session ends that session rather than leaving the previous strings in place. Validate your language files before shipping them.

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

The SDK makes use of the following technologies:

- [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)
- [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- [WebAssembly](https://webassembly.org/)
- [WebComponents](https://www.webcomponents.org/introduction)

The SDK requires access to a front facing camera, WebGL, WebAssembly and the ability to enter full screen. A network connection is required that allows WebSockets. Provided there's a suitable webcam available, most modern desktop browsers fall within these criteria.

Of the mainstream browsers that support the above technologies, we support the **last two releases**. We support iOS and iPadOS **16 and above**, and macOS Safari **15.2 and above**. We feature detect capabilities and provide support for Web Components through polyfills. If we're sure our experience won't work well, due to misconfigured permissions policy or iframe settings, we mark the device as `unsupported`.

For known issues, [see here](#known-issues).

We officially support only the following browsers. Please note that browsers not included in the list may not guarantee an optimal experience when utilizing the SDK.

| <img src="https://avatars1.githubusercontent.com/u/4119093?s=200&v=4" alt="Safari" width="24px" height="24px" /><br/>Platform | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" /><br/>Safari | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" /><br/>Chrome | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" /><br/>Edge | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" /><br/>Firefox | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" /><br/>Opera | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" /><br/>Samsung |
| ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Windows**                                                                                                                   | N/A                                                                                                                                                       | :heavy_check_mark:                                                                                                                                        | :heavy_check_mark:                                                                                                                                     | :heavy_check_mark:                                                                                                                                            | :heavy_check_mark:                                                                                                                                    | N/A                                                                                                                                                                             |
| **MacOS**                                                                                                                     | :heavy_check_mark: \*                                                                                                                                     | :heavy_check_mark:                                                                                                                                        | :heavy_check_mark:                                                                                                                                     | :heavy_check_mark: \*                                                                                                                                         | :heavy_check_mark:                                                                                                                                    | N/A                                                                                                                                                                             |
| **iOS**                                                                                                                       | :heavy_check_mark:                                                                                                                                        | :heavy_check_mark:                                                                                                                                        | :heavy_check_mark:                                                                                                                                     | :heavy_check_mark: \*                                                                                                                                         | :heavy_check_mark:                                                                                                                                    | N/A                                                                                                                                                                             |
| **Android**                                                                                                                   | N/A                                                                                                                                                       | :heavy_check_mark:                                                                                                                                        | :heavy_check_mark:                                                                                                                                     | :heavy_check_mark: \*                                                                                                                                         | :heavy_check_mark:                                                                                                                                    | :heavy_check_mark:                                                                                                                                                              |

> \* See [known issues](#known-issues) for more details

> ℹ️ If the device attempting to iProov doesn't meet the minimum requirements, the `unsupported` event is emitted. See the [events](#-events) section for more details.

> ⚠️ **Device-vendor default browsers.** Several Android manufacturers ship an own-brand browser as the system default. In our testing the pre-installed default browser on Xiaomi, Oppo and realme devices does not grant camera access, so the SDK cannot run in it. Direct users on these devices to one of the browsers listed above. Mi Browser installed from the Play Store does grant camera access, subject to the fullscreen limitation noted below.

### User activation

Several browser capabilities are gated behind [user activation](https://developer.mozilla.org/en-US/docs/Web/Security/User_activation) — they can only be used while the browser is still holding the credit from a real user gesture, such as the user pressing the start button.

If your integration starts a claim programmatically, by calling `.click()` on the start button rather than letting the user press it, there is no activation to spend. The claim itself proceeds normally, which is what makes this hard to diagnose, but every gated capability silently becomes unavailable:

- **Fullscreen is refused.** The SDK continues without it, at some cost to pass rates — see [Fullscreen](#fullscreen) below.
- **Device motion permission cannot be requested** on iOS and iPadOS, where the prompt is bound to a gesture.
- **The [accessibility guidance sound](#accessibility-guidance-sound) stays silent.** Browsers will not let the SDK open an audio output from a programmatic click, and Safari will not honour a later attempt to resume one.

Start claims from a genuine user gesture. See our [User Gestures Wiki](https://github.com/iProov/web/wiki/User-Gestures) page for more detail.

### Fullscreen

When the user taps the start button, the SDK automatically enters fullscreen mode using the browser's [Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API). This is not configurable via attributes — it is managed entirely by the SDK.

Fullscreen is enabled by default on most desktop and Android browsers. It is **automatically disabled** on:

| Platform / Browser              | Reason                                                    |
| ------------------------------- | --------------------------------------------------------- |
| **iOS / iPadOS** (all browsers) | The Fullscreen API is only partially supported by WebKit              |
| **Mi Browser**                  | Entering fullscreen causes an unintended landscape switch  |

When fullscreen is unavailable or the browser denies the request, the SDK continues normally — no action is required from the integrator. However, we recommend ensuring fullscreen is available where possible for better pass rates. One common cause of a denied request is starting the claim without [user activation](#user-activation).

When embedding the SDK in an **iframe**, you must explicitly grant fullscreen permissions. See the [Iframe Integrations](#-iframe-integrations) section for details.

For **Android WebView** apps, fullscreen must be allowed in your native code. See the [WebViews](#-webviews) section for examples.

### Support checker

For complex use cases, we recommend separately deploying the lightweight `iProovSupport` support checker component ahead
of the iProov user journey to ensure that users have the correct hardware and software to use the Web SDK successfully.

Key points:

- You don't need to create a token to use the support checker, or to configure it — the same checks run for every assurance type.
- The checker tests the user's device software, hardware and optionally permissions, but also the feature policy of the webpage containing the Web SDK.
- If the user device is unsupported, the integrator can send the user down an alternative journey.

Integrators can and should code split their bundle so that users don't need to download an entrypoint that contains the
full component until device support has been established, so that the Web SDK only is downloaded when necessary.

The support checker is its own ES module, imported from the `@iproov/web-sdk/iProovSupport.js` subpath. The `.js` extension is required, because `exports` subpaths are matched exactly.

**With a bundler:**

```javascript
import { iProovSupport } from "@iproov/web-sdk/iProovSupport.js"
const optionalLogger = console
const supportChecker = new iProovSupport(optionalLogger)
```

**Without a bundler**, import it by URL — serving the installed file from your own origin, as the
bundled demo applications do. A bare specifier will not work here: `exports` is resolved by Node and
bundlers, not by browsers, so a browser needs a real URL (or an
[import map](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap)).

```html
<script type="module">
  import { iProovSupport } from "/node_modules/@iproov/web-sdk/iProovSupport.js"
  const supportChecker = new iProovSupport(console)
</script>
```

The SDK is ESM-only: the old `window.IProov` / `window.IProov.IProovSupport` globals are no longer set, so pages that used them should switch to one of the imports above.

`iProovSupport` can check for the required APIs on the user's browser, using either event or Promise based APIs:

#### How to use iProovSupport:

> ⚠️ The Support Checker has no assurance-type configuration. Motion permissions are required for
> all assurance types since v5, so the same checks run either way. An `assuranceType` value passed
> to the constructor is accepted but ignored.

```javascript
const logger = console // optionally pass in a logger conforming to JS console API
const supportChecker = new iProovSupport(logger)
// Event based:
supportChecker.addEventListener("check", event => {
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
  frontCamera: null,
  fullscreen: null,
  browser: null,
  gyro: null,
  localStorage: null,
}
```

Alongside `tests`, every result also carries a `flags` object describing the framing of the page the
checker ran in. These are not pass/fail tests — they report context the integrator may need to act
on:

- `in_iframe` — the checker ran inside an iframe.
- `cross_origin_iframe` — the containing frame is on a different origin. This is distinct from
  `in_iframe` because a same-origin frame keeps sensor access on every engine, whereas a
  cross-origin one does not on Gecko.
- `requires_iframe_bridge` — device motion cannot be delivered to this frame, so the claim must be
  handed to a top-level tab. See [Iframe Bridge](#-iframe-bridge).

The `is_native_bridge` property will be exposed on support checker events if the checker detects that `iProovNativeBridgeInfo` exists within the global scope. This variable is injected automatically by the native SDK. In this case, the browser support and permission checks are cast to `true` as we won't be using the browser to iProov.

Using the support checker is the best and canonical way to detect whether the user's browser supports the SDK.

## 🕸 WebViews

Web Views are compatible with the SDK. However, there are some considerations to take into account when integrating iProov into a WebView based app.

- [Native Bridge](#-native-bridge) mode is _mandatory_ for iOS `WKWebView` based apps until iOS `14.3`, when Apple enabled support for `getUserMedia`. In all other cases, the `unsupported` event fires. All iOS versions after this are supported.
- In Android WebView apps, it _is_ possible to use the SDK directly provided that your app correctly allows fullscreen mode. This ensures the user interface is correctly rendered.

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

> Please note: Web SDK v6 and onwards is only compatible with iOS SDK v13 and Android SDK v11.

### Customization

The `native_sdk_options` setting accepts a base64 encoded JSON object of iProov Native SDK options as defined in the [iOS](https://github.com/iProov/ios#-options) and [Android](https://github.com/iProov/android#-options) documentation:

```js
// Example shows passing title_text_color and a title to the Native SDK
iProovMe.setAttribute("native_sdk_options", btoa(JSON.stringify({ title_text_color: "#2D2D2D", title: "NB Test" })))
```

Note: Native SDK implementations can only accept colour values in `#RRGGBB` and `#AARRGGBB` formats.

#### Filters

When configuring the `filter` options, you will need to pass these in as objects via the `native_sdk_options` option. See the related [Android SDK filter docs](https://github.com/iProov/android#general-options) or [iOS SDK filter docs](https://github.com/iProov/ios#filter-options) for more details on configuring filters.

```js
// Example shows passing a filter to the Native SDK as natural and clear
iProovMe.setAttribute("native_sdk_options", btoa(JSON.stringify({ filter: { name: "natural", style: "clear" } })))
```

## 🔳 Iframe integrations

Integrations via iframes are supported by the SDK but please note that you must declare that camera and fullscreen permissions are allowed. Any additional permissions you may require must be separated by a semi-colon `;`. Permissions `accelerometer;gyroscope;magnetometer;` are required.

**Please note the following:**

- Iframe integrations are not supported in iOS versions `14` and lower due to iOS not supporting motion permissions in iframes. All devices attempting to run iProov will be marked as `unsupported`.
- Some browsers withhold device motion from an embedded page regardless of the permissions you declare. The SDK handles those automatically — see [Iframe Bridge](#-iframe-bridge).
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

## 🌉 Iframe Bridge

Some browsers will not give an embedded page everything a claim needs, no matter how the embedding
is configured. Dynamic Liveness requires device motion, and a browser that withholds motion data
from a nested document leaves the SDK with nothing to work with — the claim would fail with
`error_device_motion_unsupported` however carefully you set your `allow` attribute.

The **Iframe Bridge** is the SDK's answer to that. Rather than failing, it opens a basic web page
with a second Web SDK in a fresh tab, escaping the iframe's constraints. The journey continues in
this second SDK, which still relays SDK events back to the first, iframed SDK. At the end of the
claim, the tab closes automatically and the user is returned to the first web page.

```
your page
└── <iframe>                            ← device motion withheld here
    └── <iproov-me>                     shows the hand-off prompt
            user taps  →  new tab
                             │
                    ┌────────▼─────────────────────────┐
                    │  top-level tab                   │
                    │  second Web SDK runs the claim   │
                    └────────┬─────────────────────────┘
                             │  events relayed back
            <iproov-me> ◄────┘  tab closes on completion
```

**Your integration does not change.** The same events arrive on the same `<iproov-me>` element in
the same order, so existing handlers keep working. The only difference your users see is one extra
tap on a button before the scan begins.

### When it activates

The SDK decides on its own; there is no option to set. It activates only when the browser genuinely
cannot deliver motion to the embedded document, which today means:

| Configuration | Why |
| --- | --- |
| **Firefox on Android, in a cross-origin iframe** | Gecko restricts `devicemotion` / `deviceorientation` to the top-level document and frames same-origin with it, and — unlike WebKit — offers no Permissions-Policy opt-in. Declaring `accelerometer;gyroscope;magnetometer` has no effect. |

Other engines are unaffected, and this list may grow or shrink as browsers change. Two cases are
deliberately excluded:

- **Same-origin iframes**, which receive motion on every engine and are never bridged.
- **Firefox on iOS**, which is WebKit underneath and behaves like Safari here despite the name.

You can check ahead of a claim: `iProovSupport.check()` returns `flags.requires_iframe_bridge`,
alongside `flags.in_iframe` and `flags.cross_origin_iframe`.

### What you need to allow

The tab is opened from a user gesture, so it is not treated as a pop-up under normal circumstances.
If your iframe uses the `sandbox` attribute you **must** include `allow-popups`; without it the SDK
cannot reach device motion by any route and will report the device as `unsupported`.

```html
<iframe
  style="width: 100vw; height: 100vh; border: 0"
  src="https://your-iframe-target.example"
  allow="camera;fullscreen;accelerometer;gyroscope;magnetometer;"
  allowfullscreen="true"
  sandbox="allow-scripts allow-same-origin allow-popups"
></iframe>
```

### Customizing the hand-off

Two slots control the prompt shown before the tab opens: `iframe_bridge_title` and
`iframe_bridge_button`. Both are localizable, like any other slot.

To make the tab itself match your branding, listen for the `iframe_bridge` event and add what you
need to `event.detail` **synchronously** — the SDK reads the same object back immediately after
dispatch, so anything set asynchronously arrives too late:

```js
iProovMe.addEventListener("iframe_bridge", event => {
  Object.assign(event.detail, {
    title: "Verify your identity",
    bodyTemplate: `<main><div id="iproov-container"></div></main>`,
    css: Array.from(document.querySelectorAll("link[rel=stylesheet]")).map(link => link.href),
    js: [],
  })
})
```

| Field | Purpose |
| --- | --- |
| `title` | The tab's `<title>` |
| `bodyTemplate` | Replaces the tab's `<body>`. Must contain an element with `id="iproov-container"` |
| `css` | Stylesheet URLs to load into the tab |
| `criticalCSS` | Inline CSS. See the CSP note below |
| `js` | Additional scripts, loaded deferred |
| `sdk` | Override the SDK bundle, if you host your own copy. An array of URLs, each loaded as a module script |

The tab loads the SDK from your configured `assets_url`, so a custom CDN is honoured automatically.

> **CSP note.** The bridge page and its boot script are static files containing no inline script or
> style, so they load under `script-src 'self'` with no policy changes on the origin serving your
> assets. `criticalCSS` is the one exception: injecting a `<style>` element counts as inline
> styling, so on an origin with a strict `style-src` it is dropped and a warning is logged. Prefer
> `css`, which is CSP-safe everywhere.

## ❌ Manually canceling a transaction

Transactions can be manually canceled by calling the `cancelTransaction` function on the `iproov-me` component. This feature is useful when integrators want to abort the user journey without waiting for the transaction to timeout. This must be called before removing the `iproov-me` element from the page.

```javascript
// an example showing how to cancel a transaction 20 seconds after the connected event is fired
const iProovMe = document.createElement("iproov-me")
// add token and other options...
const cancelAfterTimeoutFromConnected = event => {
  setTimeout(function () {
    iProovMe.cancelTransaction() // error_transaction_canceled will be triggered
  }, 20 * 1000)
}
iProovMe.addEventListener("connected", cancelAfterTimeoutFromConnected)
// inject element into page...
```

## 🚹 Accessibility

### Guidance color

For users with low vision, the [Accessibility Guidance Color](#accessibility-guidance-color) option adds a continuous, text-free indication of how close the user is to being correctly positioned.

### Guidance sound

For users who cannot see the screen at all, the [Accessibility Guidance Sound](#accessibility-guidance-sound) option carries the same indication through hearing: a click that speeds up as the user approaches the correct position, becoming a single sustained tone during the scan.

Consider pairing it with `aria_live` set to `polite` or `off`. By default the SDK announces its prompts assertively, which interrupts whatever the screen reader is currently saying, and a user relying on the guidance sound will be listening past those announcements rather than to them.

### Guidance vibration

The [Accessibility Guidance Vibration](#accessibility-guidance-vibration) option carries the same indication through touch, in the same rhythm as the guidance sound. It is useful where sound is impractical — a noisy or quiet environment, or a user who is also hard of hearing — and it reaches Android Chromium browsers only, so treat it as an addition to the other two channels rather than a replacement for them.

All three channels are independent, and can be enabled in any combination.

### Screen reader

For a better experience with screen readers, all elements in the integration page other than iProov should be temporarily hidden from accessibility tools during the scan.

The following code is an example to manage the visibility of HTML elements outside iProov.
In this example, elements to hide during iProov scan are identified with the CSS class `.hide-in-fs`:

```javascript
const ELEMENTS_TO_HIDE_IN_FS = document.querySelectorAll(".hide-in-fs")
iProov.addEventListener("started", () => {
  ELEMENTS_TO_HIDE_IN_FS.forEach(el => el.setAttribute("aria-hidden", "true"))
})
const EXIT_EVENTS = ["canceled", "error", "failed", "passed"]
EXIT_EVENTS.forEach(eventName => {
  iProov.addEventListener(eventName, () => {
    ELEMENTS_TO_HIDE_IN_FS.forEach(el => el.removeAttribute("aria-hidden"))
  })
})
```

## ❓ Help & support

You may find your question answered on our [Wiki pages](https://github.com/iProov/web/wiki), and in particular the [Frequently Asked Questions](https://github.com/iProov/web/wiki/Frequently-Asked-Questions).

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
