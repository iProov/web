# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 01.04.2022 3.5.3

## Fixed

- **UI**: We've fixed an issue where the reflection strength estimator hung indefinitely when end users moved out of frame.
- **UI**: In kiosk mode, we've fixed an issue where instructions don't appear when `enable_floating_prompt` isn't enabled.

## 22.03.2022 3.5.2

## Fixes

- **UI**: We've fixed regressions introduced in 3.5.1 relating to `logo` and `close_button`. Sorry.
- **Native Bridge**: We've fixed cases where `native_bridge_options` were not being passed to the native SDKs.

## 04.03.2022 3.5.1

## Additions

- **UI**: We've added a new presentation mode which places alignment instructions over the user's face.
  - This is called `enable_floating_prompt`; you can opt-in to this by setting it to `true`.
  - It defaults to `false`.
- **UI**: We've added a new `filter` option which lets integrators specify different styles for the Canny face abstraction:
  - Available options are `classic`, `shaded` and `vibrant`.
  - The default is `shaded`.
- We've added a few new accessibility oriented language strings:
  - `close_button_aria` provides ARIA text for the close button icon.
  - `face_scan_aria` provides ARIA text for our main UI, if it is tabbed into.
- We've added `prompt_text_color` which will replace `footer_text_color` in an upcoming release. See deprecations.
- We've changed `iProovSupport.checkWithPermission()` to also return `tests` and `flags`, just like `.check()` does.
- When the Web SDK's `<iproov-me>` component is removed from the DOM:
  - we now clean up any open resources such as WebGL render loops and video feeds;
  - if this happens _before_ an error or result event (i.e. before the user completes), the SDK now emits an error and invalidates the transaction with the error code `integration_unloaded`
- We've added an `integration_unloaded` error code to handle the above unmounting case for our customers tracking.

## Changes

- **UI**: Our UI has been rewritten so that it's more accessible, and scales better according to browser settings.
  - This replaces our old SVG based UI and uses the latest cutting edge technologies, HTML and CSS.
- **Internal**: Our team has started migration to TypeScript in order to reduce integration issues for our customers.

## Fixes

- **UI**: We've found and replaced the missing scan line in iOS 15.
- **Cameras**: We've fixed an issue where cameras not providing a feed crashed the Web SDK.

## Deprecations

- The option `footer_text_color` is now deprecated, please use `prompt_text_color` instead.

## 01.02.2022 3.4.0

## Fixed

- **UI** - Fixed an issue where the UI scaled incorrectly when shifting between orientations and resizing the window
- **UI** - We've reduced the "page jank" when resizing the UI, when the window resizes change or the phone rotates

## Changes

- **UI** - We've smoothed out the "move closer" prompt to avoid toggling between two UI states.
- **Timeouts** - We now handle timeout logic in a much clearer way:
  - The SDK emits an error event with feedback code `error_token_timeout` if the user starts the iProov session too late.
  - As before, if the user starts iProoving but doesn't stream imagery in time, the SDK emits a failure event with the
    feedback code `failure_user_timeout`.
- **Error messaging** and **language** - We've increased the level of detail, see `iproov-en.json` for the new strings:
  - When the SDK runs any of the following callbacks: `error`, `cancelled`, `interrupted`, `permission_denied`, `no_camera` or `unsupported`:
    - The language string mapping to the `feedback` event property is now displayed as the heading.
    - A new language string has been added for each `feedback` code, suffixed with `_message`.
    - Example: `error_no_camera` is the heading term, defaulting to "We couldn't find a camera connected to your device"
    - Example: `error_no_camera_message` is the text term displayed beneath the heading, defaulting to "A camera must be available to use iProov"
  - If your integration specifies language strings but doesn't implement the new `_message` suffix, then we fall back to the old behaviour:
    - Heading using the "error" language term, and text using the corresponding feedback code's language term.

## Added

- **Genuine Presence Assurance** - added reflection strength estimation capabilities
- **Language strings**:
  - `error_token_timeout` and `error_token_timeout_message` when sessions don't start within 10 minutes of token create
  - `iproov_ready_title` to allow internationalisation of "Ready to iProov" on the ready callback
  - `iproov_ready_button` to allow internationalisation of "Scan face" for the ready callback button

## 14.01.2022 3.3.8

## Fixed

- **Support** - We've improved support logic where our partners embed the Web SDK into webpages which might lack the required feature policies to run properly.
- **client_error** - We've fixed a large proportion, if not all, of video `NotAllowedError` and fullscreen related `TypeError` in browsers that use different user activation paradigms.
- **server_error** - Some cases where tokens expired after 10 minutes were being classified as `server_error`. These are now correctly thrown as `error_expired_token`.

## Internal changes

- **Start button** - After the user clicks the start button, we now briefly set the start button innerHTML to the prompt_loading language term while the video starts.
- **Support checker** - We've made a few changes that help give users a better experience:
  - Where possible in Liveness, we now check `document.featurePolicy` for `accelerometer`, `gyroscope` and `magnetometer`. If these aren't allowed, instead of starting the SDK and erroring, we now run the unsupported callback.
  - We no longer use the Permissions API to establish camera support due to its poor support and unreliable behaviour.

## 22.12.2021 3.3.7

## Fixed

- **Native bridge** - fixed an issue with possible interplay with Zone.js

## 22.12.2021 3.3.7

## Fixed

- **Native bridge** - fixed an issue with possible interplay with Zone.js

## 09.12.2021 3.3.6

## Fixed

- **Client errors** - We've fixed some, if not all, instances of `NotAllowedError` occurring when we get a video stream.
- **WebGL** - We now gracefully handle `webglcontextlost` events which might happen when devices are under high load.
- **Iframe Bridge + Native Bridge** - We fixed a regression introduced in 3.3.5. Sorry about that.

## 26.11.2021 3.3.5

## Fixed

- **Supported Devices** - Block custom webview user agents where we can't test if supported.
  - [More info here.](https://github.com/iProov/web/wiki/Frequently-Asked-Questions#can-i-customise-my-webview-apps-useragent)
- **Interrupted Event** - If exiting fullscreen, handle when there's no video feed.
- **Unsupported video feeds** - Further improve handling of very low resolutions.
- **Permission button** - the grant button delay has been fixed

## Internal Additions

- **Telemetry** - Collects state of the SDK during various events, and in the case of incomplete transactions.
- **Socket.io dependency** - We've upgraded our socket.io client dependency to version 4 to match the server.

## 10.11.2021 3.3.4

## Fixed

- **a11y** - Improve text to speech order while using some screen readers.
- **No Face Timeouts** - Only start detecting faces when ready is clicked.
- **Error Handling** - Ensure error messages are always present.

## 11.10.2021 3.3.3

## Fixed

- **Safari fullscreen issues** - Handle `Safari 13-14.1` not reporting fullscreen enter/exit events correctly.
- **Safari permission issues** - We fixed an issue where permission could be blocked on certain devices.
- **Progress event** - Progress event returned messages weren't being localised.

## Changes

- **Unsupported video feeds** - Detect very low resolutions and attempt to use a different video device if possible.
- **Safari 15.0 desktop** - Regrettably, this browser is now blocked until Apple releases a version that fixes various regressions.
- **Native Bridge** - Inside iframes, iOS Native Bridge now works on iOS versions <= 14.0. Older versions are unsupported.
- **WebGL** - THREE.js upgraded to 0.133.1.

## 17.08.2021 3.3.2

## Fixed

- **Liveness** - We have worked around instances where devices do not send orientation events. These previously triggered `device_motion_unsupported` errors.

## Changes

- **Performance analysis** - We have further tweaked our logging to enhance performance analysis in the long term.

## 12.08.2021 3.3.1

## Fixed

- **Safari on iOS** - Worked around circumstances when Safari provides corrupt imagery.
- **Safari on iOS** - Liveness is now supported in an iframe on iOS 15 without the use of Iframe Bridge.

## Changes

- **Face detection** - Blazeface + TFJS upgraded to 0.0.7 and 3.8.0 respectively, enabling SIMD support, making things faster.
- **UI** - Minor optimisations and simplified our shaders to reduce the WebGL load where possible.
- **UI** - Low FPS Mode no longer presents an overpixellated UI. This should improve completion rates.
- **Crash handling** - Improved detection of face detector crashes.
- **Performance Analysis** - Improved distinction between the user clicking the exit button or exiting fullscreen.

## 04.08.2021 3.3.0

## New

- **Camera selection** - in multi camera environments, where browser support allows it, we have improved camera selection logic to prioritise user facing and higher resolution devices.

## Fixed

- **Camera selection** - multiple camera selection no longer blocks fullscreen.
- **Camera selection** - we have fixed a regression where programmatically setting the camera device in slotted content failed.
- **Safari on macOS Catalina** - we have worked around Safari's lack of fullscreen event support for this OS.

Please note our Browserslist database has been updated to `1.0.30001248`.
