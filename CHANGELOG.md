# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 25.07.2024 5.3.0

## Changed
- **Security**: Enhanced security.


## 08.07.2024 5.2.2

## Fixed
- **Bug**: Fixed a non-blocking bug in Dynamic Liveness (previously GPA) introduced in v5.2.1.


## 24.06.2024 5.2.1

## Changed
- **Security**: Enhanced security for Dynamic Liveness (previously GPA).

## Fixed
- **Browserlist**: `.browserlistrc` back in NPM package (it had been missing since v5.1.0).

## 30.05.2024 5.2.0

## Added
- Enhanced security for Dynamic Liveness (previously GPA).

## Fixed
- **FireFox Mobile**: Fixed an issue with Firefox Mobile not always accepting given camera video constraints.
- **Landscape Orientation**: Landscape Orientation: Fixed instances where streaming could start while the device was in landscape mode, even though landscape orientation was blocked.
- **Assets**: Fixed issue where double `//` was included in some assets fetched by the Web SDK.
- **Android Chrome Desktop Mode**: Fixed an issue where the SDK would not start in desktop mode with Chrome for Android.
- **iOS SVG Element** Fixed an issue where an SVG element was appended to the body with non-zero dimensions.

## 08.04.2024 5.1.1

## Fixed

- **Streaming**: Fixed an issue where streaming could rarely cause the SDK to crash in Express claims (previously Liveness)

## 20.02.2024 5.1.0

## Added
- **Video**
  - **Error Handling**: Video errors are now handled more gracefully to prevent users being in a frozen state and unable to progress the claim.
- **Security**: New security upgrades.

## Fixed
- **Imagery**: Fixed blue tone issue on some Android devices.
- **Support Checker**: Fixed an issue where the metadata endpoint wasn't called when a device is unsupported.
- **Telemetry**: Fixed an issue where some telemetry was passing incorrect values.

## Changed
- **UI**
  - **Canny**: New shaders to improve performance and visual consistency with the other iProov SDKs.
  - **Prompt**: Improved the prompt's initial styling to not appear empty on entering Canny.

## 19.10.2023 5.0.1

## Fixed

- **Device Assurance**: Restored support checker device assurance public methods.

## 27.09.2023 5.0.0

## Added

- **User Feedback Codes**: New User Feedback codes for Liveness Assurance, see upgrade guide for details.
- **UI**
  - **LA Background Cropping** LA with the clear or blur filter has a new cropping animation applied, in order to provide a more pleasing UX. Note the size/extent of this effect varies based on the claim.
  - **GPA animation** New get ready and progress animation for GPA.
  - **Alternate Camera Button** Now customizable. See readme for details.
- **Imagery Quality** In LA, higher quality imagery can be collected and returned via the validate frame. This feature can be toggled on - please reach out to Customer Success to enable this.

## Fixed

- **UI**
  - **Full screen failure** Layout issue when full screen fails has been fixed.
  - **Viewport resize** Video display issue when viewport is resized has been fixed.
  - **Liveness animation** Liveness Assurance complete animation on iOS/iPadOS has been fixed to align with other platforms.
- **Imagery**
  - **Imagery on rotation** Fix frames overlaying each other when device is rotated while scanning.
- **Error**
  - **Error code** Error codes are now correctly reported to the backend.

## Changed

- **Motion permission on GPA** Motion will be required on GPA.
- **Feedback codes** `user_timeout` and `not_supported` are now reported as errors (they were reported as failures before).
- **Security** The security of the SDK has been enhanced.
- **US Spelling** Changed API to U.S. English spelling of "Canceled".

## Removed

- **Iframe Bridge**: iOS/iPadOS 14 and lower are no longer supported within iframe integrations. The minimum supported version is now iOS 15.1. As a consequence Iframe Bridge has been removed from the SDK.

## 22.05.2023 4.2.1

## Fixed

- **Motion Permission**: Permission for motion collection is now requested for iOS and iPadOS after clicking the start `button` (it was moved to the `grant_button` in `v4.2.0`).

## 21.04.2023 4.2.0

## Added

- **UI**
  - **Color Customization**: New `header_background_color` option, transparent by default. [See color documentation](https://github.com/iProov/web#colors).
  - **Exterior Blur Customization**: New `disable_exterior_blur` option, disabled by default. [See disable exterior blur documentation](https://github.com/iProov/web#disable-exterior-blur).
- **Errors**
  - **Logging & Telemetry**: Improved logging and telemetry to better understand errors we previously didn't have visibility of.

## Changed

- **Motion Permission**: Permission for motion collection is now requested for iOS or iPadOS after the `grant_permission` slot. [See upgrade guide for more details](https://github.com/iProov/web/wiki/Upgrade-Guide#upgrading-from-v4xx-to-v420)

## Fixed

- **UI**
  - **Feedback Prompt**: Fixed prompt not expanding and forcing feedback messages onto 2 lines.
  - **Progress Bar**: Fixed GPA progress bar not reaching 100%.
  - **Landscape Orientation**: Fixed an issue where `allow_landscape` option was allowing LA claims to start in landscape on mobiles. [See behavior documentation](https://github.com/iProov/web#allow-landscape).
  - **Android Tablet**: Fixed an issue to allow LA claims in landscape orientation on Android tablets (although this orientation is not recommended).
  - **iPad's Version Reporting**: Fixed an issue where iPad's were reporting the wrong iOS version which triggered iframe bridge unnecessarily.
  - **Event Details**: Fixed missing `type` in details + updated docs to correctly reflect expected data.

## 27.02.2023 4.1.1

## Fixed

- **Supplementary Imagery**: Fixed issue with imagery not being returned.

## 13.02.2023 4.1.0

## Added

- **Support Checker**: New `localStorage` test to handle when `localStorage` is not supported and edge cases such as iframed integrations while using Chrome's incognito mode.

## Changed

- **UI**
  - **Optimisation**: We replaced ThreeJS with a custom WebGL implementation.
    - **Android**: Upto `20%` performance improvement with low-end Android devices.
    - **Bundle Size**: `200kb` removed from the overall bundle size!

## Fixed

- **SDK Options**: Fixed `base_url` option not accepting URLs which include a path name.
- **Failed Event**: `ambiguous_outcome` not being replaced with `unknown` in the failed event data.
- **Video Feed**: The camera feed not being visible after cancelling a claim and then when a new `iproov-me` element is loaded into the page the camera feed wouldn't be visible.
- **Frozen Video Feed on macOS/Safari**: The camera feed froze shortly after starting a claim on the first attempt.
- **Token Timeout**: When the server applies a `10` minute timeout to the token being claimed, this is now handled with the appropriate error `error_token_timeout`.
- **Iframe Bridge Safari prior to iOS 15**: Broken in `v4.0.0` due to being unable to fetch an asset.

## 17.11.2022 4.0.0

## Added

- **User Feedback Codes**: Several User Feedback codes added to provide more granular instructions to users:
  - **misaligned_face**
  - **eyes_closed**
  - **face_too_far**
  - **face_too_close**
  - **sunglasses**
  - **obscured_face**
- **UI** We've added two new filters: `clear` and `blur`
- **Languages** Support for additional languages\*\* - The SDK now ships with support for 9 additional languages alongside English.

## Changed

- **Native SDK**: The schema for Native SDK integrations has been updated. Please refer to the following documentation for [iOS](https://github.com/iProov/ios#-options) and [Android](https://github.com/iProov/android#-options)
- **Networking**: SocketIO has been replaced with a more secure in-house solution directly based on WebSockets
- **Networking**: Default network timeout has been increased to 20 seconds
- **Events**: Removed `Interrupted` Event
- **UI**: Introduced a new UI for the Web SDK (Kiosk Mode is unaffected from all the following UI related changes)
- **UI**: The centre prompt can now take a string of any length
- **UI**: Introduced the following options for new UI features:
  - `csp_nonce`: This can be set to a random string to avoid requiring `unsafe-inline` in your style-src CSP.
  - `floating_prompt_rounded_corners` has been renamed to `prompt_rounded_corners`
  - Removed `enable_floating_prompt`
- **UI**: When not using Kiosk mode the following changes to SDK options are in effect:
  - `title_text_color`: Controls the colour of the text that can be added to the top of the UI with `custom_title`
  - `surround_color`: Controls the colour of the UI around the centre oval
  - `prompt_background_color`: Controls the background colour of the centre prompt for both GPA and Liveness
  - `prompt_text_color`: Controls the background colour of the centre prompt for both GPA and Liveness
  - `gpa_not_ready_oval_stroke_color`: Colour for oval stroke when in the GPA "not ready" state
  - `gpa_ready_oval_stroke_color`: Colour for oval stroke when in the GPA "ready" state
  - `liveness_oval_stroke_color`: Colour for the oval stroke during Liveness
  - `liveness_completed_oval_stroke_color`: Colour for the oval stroke after the user has finished iProov-ing using Liveness
  - Removed `background_color`
  - Removed `header_background_color`
  - Removed `header_text_color`
  - Removed `line_color`
  - Removed `loading_tint_color`
  - Removed `no_face_found_color`
  - Removed `not_ready_tint_color`
  - Removed `oval_scanning_color`
  - Removed `ready_tint_color`
  - Removed `gpa_not_ready_overlay_stroke_color`
  - Removed `gpa_ready_overlay_stroke_color`
  - Removed `gpa_not_ready_floating_prompt_background_color`
  - Removed `gpa_ready_floating_prompt_background_color`
  - Removed `liveness_scanning_tint_color`
  - Removed `liveness_tint_color`
  - Removed `liveness_floating_prompt_background_color`
- **RSE**: Reflection Strength Estimator has been removed
- **Errors** `not_supported` is not treated as a failure rather than an error

## Fixed

- **Stability**: Fixed an issue where source maps generation from our obfuscator could cause crashes
- **Device detection**: Fixed an issue where mobile devices where sometimes reported as desktop devices
- **Landscape** Fixed an issue where the pipeline isn't paused when in landscape orientation whilst landscape is not permitted

## 08.07.2022 3.6.1

## Changed

- **UI**: The new color options are now WCAG 2.1 AA compliant by default:
  - `gpa_not_ready_overlay_stroke_color`: `#904300`
  - `gpa_ready_overlay_stroke_color`: `#006625`
  - `gpa_not_ready_floating_prompt_background_color`: `#F06F00`
  - `gpa_ready_floating_prompt_background_color`: `#01AC41`
    `liveness_overlay_stroke_color`: `#1756e5`,
    `liveness_floating_prompt_background_color`: `#1756e5`,

## Fixed

- **UI**: We fixed an issue where the new Liveness Assurance colors were being applied during loading.

## 30.06.2022 3.6.0

## Added

- **Accessibility**:
  - Achieves WCAG 2.1 AA certification.
  - [New option](https://github.com/iProov/web#aria-live) `aria_live` to control the priority of screen reader messages. [See official documentation here](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions).
- **Claim Management**: Ability to cancel a claim manually with `iProovMe.cancelTransaction()` which will emit the `integration_cancelled` error.
- **UI**: Added support for right-to-left languages.
- **UI**: Users can now choose their webcam in full screen with a new camera selection button.
- **UI**: We've added a set of options for controlling overlay colours, styles, and the floating prompt:
  - `floating_prompt_rounded_corners` controls corners of floating prompt. Use `false` to remove border radius (default: true).
  - `liveness_overlay_stroke_color` controls color of the overlay in Liveness (default: null).
  - `liveness_floating_prompt_background_color` controls color of floating prompt background in Liveness (default: null).
  - `gpa_not_ready_overlay_stroke_color` controls color of overlay in GPA in not ready state (default: null).
  - `gpa_ready_overlay_stroke_color` controls color of overlay in GPA in ready state (default: null).
  - `gpa_not_ready_floating_prompt_background_color` controls color of floating prompt background in GPA in not ready state (default: null).
  - `gpa_ready_floating_prompt_background_color` controls color of floating prompt background in GPA in ready state (default: null).

## Changed

- **UI - accessibility**: We've changed the default values for `not_ready_tint_color` and `ready_tint_color` to ensure a minimum contrast satisfying WCAG 2.1.
- **Title**: We've removed the default title - by default no content will be shown. A `custom_title` can still be set in SDK options.

## Removed

- Removed `failure_network_problem` from [iproov-en.json](https://github.com/iProov/web/blob/master/iproov-en.json) as its never used.

## Fixed

- In version `3.3.2` we added a `user_cancelled` feedback code for when the user cancels their transaction on their own while pressing the 'Esc' key. That was missed in the Changelog at the time so we're surfacing that now.
- Fetch-retry was no longer retrying when failing, this has been fixed.
- Fixed countdown timer display in Kiosk Mode.
- Fixed the `close_button` not being sized correctly in Safari.

## Enhancements

- Disabled RSE while in Kiosk Mode.
- Allow LA to function while in Kiosk Mode.

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
