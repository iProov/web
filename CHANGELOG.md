# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

## 14.07.2021 3.2.2

## Fixed

- Fixed crashing issue found in some JavaScript libraries.
- Fixed missing `connecting` event.
- Fixed missing `feedback` property from `interrupted` and `cancelled` events.

## Deprecation Notice

The `code` property which is returned within `event.details` has been deprecated and will be removed in future versions. This was unintentionally added. If you are using `code` please switch to the `feedback` property. For more details on the correct way to use event data please see our [docs](https://github.com/iProov/web#-events).

## 18.06.2021 3.2.1

## Fixed

- Fixed `cancelled` or `interrupted` events not firing if the back button is pressed on single page apps using popstate.
- Fixed bug in how the UI scales in size to fit the whole screen.
- Fixed cases when `abort` events were fired twice due to an internal API race condition.

## Added

- Added `error_too_many_requests` language string which is displayed when rate limiting is enforced at the client side.

## Removed

- Removed face positional alignment instructions `Move Left` and `Move Right` on mobile devices.

## 10.06.2021 3.2.0

## Fixed

- Fixed "Keep still" message from disappearing while streaming when `show_countdown` is set to `true`.
- Fix rotate portrait issues on Android devices.
- Fix various fullscreen flicker issues.
- Fix race condition when exiting fullscreen where the UI may not hand control back to the host page.

## Added

**UI Customisation**

- New options have been added to customise the UI colours:
  - `header_background_color`
  - `header_text_color`
  - `footer_background_color`
  - `footer_text_color`
  - `progress_bar_color`
  - `loading_tint_color`
  - `not_ready_tint_color`
  - `ready_tint_color`
  - `oval_scanning_color`
  - `liveness_tint_color`
  - `liveness_scanning_tint_color`
- A new `close_button` URL option has been added to customise the close button.

**Timeout Logic**

- The `network_timeout` option has been added, defaulting to 10 seconds. See the docs for more details.
- If we don't receive a response from our backend in this time, we error with `error_network`.

**Iframe Bridge**

- Iframe Bridge for Mobile Safari has been added in order to support Liveness transactions, where the device would otherwise report `unsupported`.
  - New events:
    - `iframe_bridge`
  - New slots:
    - `iframe_bridge_title`
    - `iframe_bridge_button`
  - New language strings:
    - `iframe_bridge_title`
    - `iframe_bridge_button`

**General**

- Added missing errors `error_asset_fetch` and `error_device_motion_unsupported` to readme.
- Added `client_camera` and `sdk_unsupported` to default English language file: https://github.com/iProov/web/blob/master/iproov-en.json.

## Changed

- Various changes have been made to _feedback_ and _reason_ values within the `error` and `failure` event details that are passed back to match the documentation.
  - `user_timeout` is now `failure_user_timeout` and only passed within the `failed` event. This was being triggered as an `error` event when the token had been used before or was invalid which has now been replaced with `error_expired_token`.
  - `error_camera` is now `client_camera` which is fired when the device camera does not provide video for 8 seconds.
- The SDK has been split out into constituent chunks which are lazy loaded on demand. This increases page speed.

## 14.5.2021 3.1.10

## Fixed

- Stability: internal resource lifecycle management has been improved to reduce crashes due to memory leakage.
- UX: touch scrolling is now blocked between the started event and exiting fullscreen.
- UX: Page jank when entering fullscreen, particularly in Chrome, has been fixed - see _changes_.
- Allow landscape: an issue causing broken images in the rotate slot has been fixed.
- Cameras: An issue where mobile devices could choose the environment facing camera has been fixed.
- Safari Desktop: `AbortError` is now handled. These cases remain subject to video data timeout checks.

## Changed

- `started` event behaviour has been changed in a BC-safe way to reduce page jank:
  - The `started` event is now sent _after_ entering fullscreen rather than in parallel
  - The `started` slot manager callback no longer hides all slots when entering fullscreen.
  - The `streaming` event is the soonest event that all slots are hidden.
- Internal UI lifecycle management has been tidied which may yield a slight improvement in UI performance.

## 4.5.2021 3.1.9

## Fixed

- Problems entering fullscreen will no longer abort the transaction. In these rare cases, transactions will be allowed to continue.
- Opera Touch is now a supported browser after working around a WebKit issue.
- When running Web SDK inside a react-native-webview, it no longer flags the environment as unsupported.

## Internals

- The following are now sent to the backend to improve telemetry and customer support:
  - When Web SDK detects it's within an iframe, the window innerWidth and innerHeight are sent.
  - Fullscreen status is sent.

## 20.4.2021 3.1.8

## Fixed

- Native bridge cancelled event now correctly cancels the SDK
- UI text overflow is now elegantly managed, rather than clipping
- Speculative fix to some Android webview environments crashing due to an undefined browser name
- Invalid tokens passed to the SDK now throw an InvalidTokenError rather than ServerError
- Liveness transactions no longer break when rotating the device back to portrait

## 14.4.2021 3.1.7

## Fixed

- `is_native_bridge` property restored to event payloads. Previously this was only present during native bridge claims.
- Fixed `streamed` event to fire when all video frames have streamed. Previously this erroneously fired after encoding.

## 5.3.2021 3.1.6

## Fixed

- Fixed UI animation loop not always stopping
- Improve scanline synchronisation with flashing
- Various performance improvements

## Changed

- Optimised UI opening / rotation experience

## 4.3.2021 3.1.5

## Fixed

- Fixed starting in landscape orientation then rotating to portrait UI issues
- Improved GPA flash timing, particularly on Android
- Improved low FPS detection
- Added missing `feedback` property from some error events
- Fixed documentation to correctly reflect `error_fullscreen_change` and `error_no_face_found` event names
- Fixed instances when rare Android Native SDK crashes may take the Web SDK with them, too
- Fixed occasional `.emit` function not found errors
- Fixed issues when lower end Android cameras were unable to request a video feed in a useful aspect ratio

## Added

- Added `error_no_face_found` to public documentation

## 12.2.2021 3.1.4

## Fixed

- Fixed an issue where the progress bar would not display if `show_countdown` is enabled.
- Fixed `kiosk_mode` issue on iPads where the camera is drawn partly off screen.
- Fixed an issue where the camera remains active after a timeout occurs.
- Fixed an issue where multiple cameras broadcasts multiple times. It now broadcasts once.
- Fixed an issue where slot encapsulation was broken and events may be bound to slots outside the component.
- Fixed iPads on iOS < 14 showing as unsupported in 3.1.x.
- Fixed an issue where specifying a path with base_url was not respected.
- Fixed an issue where iframed Web SDK components time out waiting for gyro information in mobile Safari.
  - This is a WebKit issue: https://bugs.webkit.org/show_bug.cgi?id=221399
  - Until this is fixed, iframed components in mobile Safari will immediately fire the unsupported event when using Liveness.

## Changed

- Internals: changed Web Component attachment mode to closed.
- Internals: the Web SDK will now connect and emit console warnings and errors to our Socket.IO server for quality improvement and crash analysis.
- Bundle size: the main Web SDK entrypoint no longer includes Baidu and KaiOS build targets
  - These browsers currently do not support our minimum requirements
  - The iProovSupport component is still built to target these browsers so you can still establish support
  - The main package size has reduced by 18% with no material change to browser support

## Added

- 20% more π

## 6.1.2021 3.1.3

## Fixed

- Fixed desktop Safari issue when starting in certain camera resolutions.

## 1.1.2021 3.1.2

## Fixed

- The console object is no longer overridden. Sorry about that.
- Documentation updates and inaccuracies:
  - Various iProovSupport documentation relating to payloads and availability on the global object
  - Documentation relating to the payload of the progress event has been corrected.
- iProovSupport can now be loaded standalone without a bundler; regeneratorRuntime is now defined.
- Language strings can now be customised on slotted elements. Previously this didn't work.
- Fixed double checking for videoInput. Just once is enough.
- iProovSupport prompting in Chrome prompts instantly, previously it delayed.
- Fixed SDK crashing if passing a token not associated with a `user_id`. Unlikely, but displays a clean error instead.

## 24.12.2020 3.1.1

## Fixed

- Assets which contained `//` caused 403 issues when hosting assets on Amazon S3. The paths have now been fixed.
- When starting iProov on a bezel-free phone, the layout appeared misaligned. This has now been fixed.
- Disabled underlying TensorflowJS WASM threads due to instability. SIMD remains available.

## 23.12.2020 3.1.0

## Added

- Desktop device support for Liveness. We no longer require a mobile device for Liveness transactions.
- The SDK can now optionally return a selfie frame from the scanning process for both GPA and Liveness transactions.
  - If this is enabled for your service provider, this will be present in the passed and failed callback payloads.
- `iProovSupport` is a separate export to facilitate a smaller critical bundle size for integrators.
  - Using a module bundler you can run `import { iProovSupport } from "@iproov/web/iProovSupport"`
  - Script tag integrations can still access `window.IProov.IProovSupport` for the time being.
- `version` property on the `iProovMe` component.
  - This is also accessible on `window.IProov.version`.
- Multiple camera device support on desktop, including ability to customise.
- Added the `csp_nonce` option. See [Content Security Policy](https://github.com/iProov/web/wiki/Content-Security-Policy).
- External dependencies are now loaded with `<link rel=preload>` for non-blocking parallel loading.
- Our feature detector now runs the latest Tensorflow release which includes support for WebAssembly threads and SIMD.
- New `streamed` event to accommodate the original documented functionality.
- Support added from iOS 14.3 for WKWebView based browsers on iOS such as Chrome, Firefox, MS Edge, etc.

## Fixed

- Various CSP warnings have been resolved. See [Content Security Policy](https://github.com/iProov/web/wiki/Content-Security-Policy).
- Firefox and Safari no longer display the grant button unless required.
- Further performance improvements targeted at lower end machines which have a net-positive effect across the board.
- UX improvements for Liveness on mobile devices
- Kiosk mode performance issues on Safari
- Progress bar animation

## Changed

- Bundling and modularisation upgrades.
  - Dependencies are once again modular, and will be loaded as needed.
  - This reduces the bundle size from 4MB (plus dependencies) to around 1.3MB gzipped (including dependencies).
  - With the iProovSupport change, the pre-gzip impact to an integration's critical bundle is 16KB raw (was 4MB).
  - With that, `assets_url`'s meaning is changing again, we're afraid...
  - Customers now have a choice to either serve Web SDK assets "on premises", use our CDN, or reverse proxy.
  - This affects CDN and reverse proxy configurations; we do hope this is the last change to asset loading for a long time.
  - Please see the upgrade guide for steps needed.
- The main entry file for the npm package is now `iProovMe.js`.
- Language files have been updated to be brought into line with native SDKs.
- Minor tweaks to UI to bring the UI experience inline with native SDKs.
- Improved resolution management for less capable or hardware constrained devices.
- Improved our encoder for better speed and the latest bugfixes.
- Bandwidth usage reduced
- The `streamed` event now emits at the correct time, which may break integrations that rely upon it.
  - To upgrade, replace `streamed` with `streaming` which takes its place.

## Removed

- Bundled Web Component support. Polyfills are now loaded on an as-needed basis.
- Automatic transpilation for the following outdated browsers:
  - Blackberry < 10
  - Edge < 85
  - Firefox < 82
  - IE < 11
  - IE Mobile (all)
  - iOS Safari < 13.4
  - Opera < 70
  - Safari < 13.1
  - Please see `.browserslistrc` for the current targeted browsers.
  - If your app must support older browsers, simply transpile the standalone `iProovSupport.js` checker as needed.

## 19.11.2020 3.0.4

## Fixed

- Kiosk mode feature detection and alignment is now even smoother

## 23.10.2020 3.0.3

## Fixed

- Liveness: UX issues with Android devices
- Interrupted event: occasional issues when retrying when the interrupted event was fired have been resolved.
- Kiosk mode: Missing overlay during scanning has been restored.

## Changed

- Kiosk mode: face position smoothing is slightly faster.
- Alignment experience: rendering is no longer limited to 30 FPS across all browsers.
- Imagery quality: Safari now sends 720p if available, falling back to VGA.
- Dependencies: we no longer list dependencies in our distributed package.json, as they are already bundled and optimized as part of the build.

## 01.10.2020 3.0.2

## Fixed

- Kiosk mode feature detection and alignment is now smoother

## 25.09.2020 3.0.1

## Fixed

- Delay in camera starting after grant permission button clicked.
- Fullscreen prompts in iPad.
- Console errors on completion of a claim.
- Camera not turning off in Safari after a claim.
- Smoothing in snap to face.
- Support checker events now contain the correct detail payload.

## Changed

- We now request 1080p or 720p video on desktops if available. This gives better biometric performance.

## 16.09.2020 3.0.0

## Fixed

- Kiosk mode can now be localised using the standard Web SDK localization feature.
- Add missing `client_error` key to language file.
- Firefox performance issues.

## Changed

- The "aborted" event has been removed, and replaced with "cancelled" in line with the native SDKs.
- WASM and Worker files are now bundled within the Web SDK package instead of being fetched via the CDN.

## Added

- Liveness transaction support for mobile devices.
- Language strings for Liveness transactions:
  - `progress_assessing_liveness`
  - `prompt_liveness_align_face`
  - `prompt_liveness_no_face`
  - `prompt_liveness_scan_completed`
- The "interrupted" event and slot have been added, which allow users to retry should a fast exit from fullscreen occur.
  This rarely happens but can be caused by software launched automatically as a result of webcam usage.
- Two new language strings, `prompt_kiosk_align_face` and `prompt_kiosk_keep_still` have been added. See iproov-en.json for English translations.

## Removed

- Legacy native bridge mode has been removed
- The "aborted" event and associated slots
- PicoJS face detector

## 20.07.2020 2.2.1

## Fixed

- Handheld devices are able to take advantage of low FPS mode correctly
- Camera permission checks are now correctly performed on Firefox Android

## 22.06.2020 2.2.0

## Removed

- h3 and div tag support from slots without `.iproov-lang-heading` and `.iproov-lang-term` classes

## 22.06.2020 2.1.1

## Fixed

- Unsupported slot not displaying even though the event was firing correctly.

## 22.05.2020 2.1.0

## Fixed

- Kiosk mode: face centering on the y-axis has been correctly aligned.
- Kiosk mode: custom logo positioning has been fixed.
- Product performance: timing issues when starting in landscape causing occasional errors have been resolved.
- Product performance: issues where iMacs were unable to obtain a camera feed have been resolved.
- Native bridge: In Native Bridge mode, the support checker would return unsupported which is not always the case.
- CJS/ESM/UMD: Support has been ensured as per the docs. Previously imports would not work correctly.

## Changed

- The `base_url` option now requires a URL using `https://`; the deprecated functionality of prepending the secure protocol has been removed.
- Native bridge mode has been radically overhauled to make native integration possible with one line of code in a single location.
  - Web automatically detects this simple, one-line Native Bridge integration and switches to Native Bridge mode if applicable.
  - Breaking change: `prefer_app` has been removed in favour of this automatic integration.
  - Breaking change: `prefer_app_options` has been renamed to `native_sdk_options`
  - Breaking change: Native bridge mode now requires the following SDK minimum versions:
    - iOS SDK 7.5.0
    - Android SDK 5.3.0 (to be released and confirmed - if you urgently require this feature please get in touch: support@iproov.com)
- Improved error handling around fetching and loading external assets to help debug integration issues easier
- Improved error handling with cameras

## Added

- Added the capability for `sdk_unsupported` errors to be gracefully displayed to users, should a particular version of the Web SDK remain in production past its EOL.
- Added capability to provide early deprecation warnings to integrator developers via the console.

## 01.05.2020 2.0.6

## Fixed

- Safari 13.1 iMac camera failing due to getUserMedia invalid constraints

## 22.04.2020 2.0.5

## Fixed

- Scanning running twice if double clicking

## Changed

- Block landscape orientation on iOS due to camera position
- Disabled vibration in Firefox due to permissions issue

## 20.04.2020 2.0.4

## Fixed

- Zooming in Chrome no longer causes a distorted view of the alignment phase
- WebGL initiation now performs less layout thrashing when adjusting screen resolution and entering into full screen

## Changed

- Face detector performance logging has been tweaked to use aggregates rather than bombarding the log stream

## 17.04.2020 2.0.3

## Fixed

- Invalidate events in from native bridge in iOS are now correctly proxied back to the Web SDK.

## 16.04.2020 2.0.2

## Fixed

- When using a custom slot for the button in native bridge mode, the app would fail to start
- Fix custom logo position in SVG

## 15.04.2020 2.0.0

## Added

- Face detector changed to Blazeface
- Standalone support checker component
- Assets have been moved to cdn.iproov.app for better load speed

## Fixed

- Timing regularity restored
- We now wait for WASM modules to fully load before interacting with them (stops crashing)
- SVG repositioning has been tweaked to remove jank
- Video feeds that change resolution, particularly on iMacs, no longer cause face alignment issues
- Bundle size has been reduced as part of an ongoing initiative to reduce page load weight
- King Kong has been tamed 🍌

## Changed

- `@iproov/html5` is now the iProov Web SDK, and so has been renamed to `@iproov/web`
- Class names are now used to identify language text elements rather than blanket tags
- The rotate animation has been switched from lottie to gif (saves bundle size)
- Support is now checked by the support checker component rather than a whitelist of browsers and devices
- Alignment feedback frequency has been tweaked to work better with a new face detector in a future release
- Face detection lifecycle has been tidied to facilitate a new face detector in a future release
- PicoJS's face detector memory allocation and maxFaces have been reduced for performance on lower end/swapping devices
- Various telemetry improvements around face detection: accuracy, reduction in performance cost, etc

## Removed

- Option `screen_brightness` removed; due to lossless encoding and improved adaptive screen brightness, it is no longer needed. Removing it saves around 300kB from the bundle.

## Deprecated

- The screen_brightness animations and usage in older clients have been deprecated and will be removed in a later release.
- Loading assets from the iproov.app domain have been deprecated in favour of using the CDN.

## 14.04.2020 2.0.0-beta-5.6

## Added

- Standalone support checker component
- Assets have been moved to cdn.iproov.app for better load speed

## Fixed

- We now wait for WASM modules to fully load before interacting with them (stops crashing)
- SVG repositioning has been tweaked to remove jank
- Video feeds that change resolution, particularly on iMacs, no longer cause face alignment issues
- King Kong has been tamed 🍌

## Changed

- Class names are now used to identify language text elements rather than blanket tags
- The rotate animation has been switched from lottie to gif (saves bundle size)
- Support is now checked by the support checker component rather than a whitelist of browsers and devices
- Alignment feedback frequency has been tweaked to work better with a new face detector in a future release
- Face detection lifecycle has been tidied to facilitate a new face detector in a future release
- PicoJS's face detector memory allocation and maxFaces have been reduced for performance on lower end/swapping devices
- Various telemetry improvements around face detection: accuracy, reduction in performance cost, etc

## Removed

- Option `screen_brightness` removed; due to lossless encoding and improved adaptive screen brightness, it is no longer needed. Removing it saves around 300kB from the bundle.

## Deprecated

- The screen_brightness animations and usage in older clients have been deprecated and will be removed in a later release.
- Loading assets from the iproov.app domain have been deprecated in favour of using the CDN.

## 03.04.2020 2.0.0-beta-5.4.5

## Changed

- Face alignment envelopes have been tweaked to improve user experience.
- The ability to set alignment envelopes from your service provider has been added.

## Added

- If no face is found by the face finder for 50% of the time, we time out after 30 seconds. This is configurable from your service provider.

## 01.04.2020 2.0.0-beta-5.4.4

## Fixed

- Preventative measures added to ensure screen flashing _never_ violates safe parameters for photosensitive epilepsy.
- Measures added to partially mitigate crashing when started too quickly.

## 25.03.2020 2.0.0-beta-5.4.2

## Fixed

- `show_countdown` option fixed in default mode, was previously causing `streaming_error`

## 19.03.2020 2.0.0-beta-5.4.1

## Fixed

- `show_countdown` option respected when in `kiosk_mode`
- `custom_title` and `custom_logo` support added to kiosk mode

## 12.03.2020 2.0.0-beta-5.4

## Fixed

- Encoding corrupt images resulted in facial features going missing, causing transactions to fail.
- Face cropping logic improved to handle extremes in the camera's field of view without clipping.
- Huge memory management improvements to reduce device load.
- Fixed a missing `asset_url` domain prefix when loading Pico.
- Scaling issues relating to face alignment on non-retina iOS devices have been resolved (`devicePixelRatio` interpretation)
- Various moves to align the HTML5 web SDK with the iOS and Android SDKs which make performance analysis easier, resulting in even better service for our customers!

## Added

- Kiosk mode has landed in alpha, with a new and improved UI design for this particular mode.
- Ability to configure face finder and face alignment envelope from a service provider.
- New language term `error_exited_native_bridge`, used when exiting a native SDK using the `prefer_app` setting.

## Changed

- Only crop face on desktop/kiosk or mobile landscape orientation
- Increased overall crop size of a face on desktop and mobile landscape
- Native bridge mode replaces the previous `prefer_app` functionality. The Web SDK now listens directly to the iProov native SDK for better UX.

## Removed

- The `type` (verify/enrol) event detail property has been removed. The type of authentication is known to the integrator before SDK instantiation and is handled internally in native SDKs.

## 26.02.2020 2.0.0-beta-5.3

## Added

- Assets URL flag `assets_url`
- Kiosk mode flag `kiosk_mode`
- Allow backend to configure snap to face behaviour
- Allow backend to modify face position feedback configuration

## Fixed

- Streaming starting without a socket connection
- Face detector crashing if called too early
- Final frame was null

## Changed

- Lowered threshold of move closer to bring the user closer
- Snap to face is disabled by default

## 13.02.2020 2.0.0-beta-5.2

## Fixed

- Pico WASM not properly init on some occasions causing face detection to crash

## 10.02.2020 2.0.0-beta-5

### Added

- Detect LOW FPS and downscale canvas to support lower end devices
- Send telemetry data from face detector
- Snap to face canny to improve UX while aligning face
- Improve Pico face detectors scoring mechanism
- Edge 15+ back to supported browsers

## Fixed

- iOS UI getting stuck when streaming starts
- Handle when WebGL fails as an error event

### Removed

- WebRTC, WASM encoding now only supported

## 14.01.2020 2.0.0-beta-4.6

### Fixed

- WASM face detector crashing browser when toggled

## 12.12.2019 2.0.0-beta-4.5

### Fixed

- WASM encoder not releasing VM on completion or exiting
- Safari not releasing WASM face detector memory on exiting

## 4.12.2019 2.0.0-beta-4.4

### Fixed

- WASM not always releasing memory

## 29.11.2019 2.0.0-beta-4.3

### Fixed

- Logo not hiding when set as null
- Exit fullscreen button dead spots
- Camera not restarting after exit button click and reopening
- Canvas duplication when recalculating layout

## 15.11.2019 2.0.0-beta-4.2

### Added

- Support for tablets in landscape
- Give a better error message when using an old token

### Fixed

- Type (enrol, verify or id_match) missing from event.details on pass/fail
- Scanning line and flashing timing issues
- Issue with canny canvas not resizing (responsive)
- iOS not closing screen brightness prompts when denying camera permission
- Decrease visibility and set oval to grey while scanning
- Firefox without prior camera permission error on start
- Add missing feedback_code in failed event

### Removed

- Feedback event and handle internally inside iproov component

## 30.10.2019 2.0.0-beta-4.1

# Fixed

- Progress bar accuracy and performance
- Camera and video error messages

## 28.10.2019 2.0.0-beta-4

### Added

- `allow_landscape` option, see [https://github.com/iProov/html5/#allow-landscape](https://github.com/iProov/html5/#allow-landscape)
- `base_url` option see [https://github.com/iProov/html5/#base-url](https://github.com/iProov/html5/#base-url).
- `locale` option see [https://github.com/iProov/html5/#locale](https://github.com/iProov/html5/#locale)
- Various theme colour options see: [https://github.com/iProov/html5/#colours](https://github.com/iProov/html5/#colours)
- `logo` option see [https://github.com/iProov/html5/#logo](https://github.com/iProov/html5/#logo)
- `custom_title` option see [https://github.com/iProov/html5/#custom-title](https://github.com/iProov/html5/#custom-title)
- Animation to face position feedback messages if feedback does not change in `5` seconds.
- Click or spacebar to start when face correctly aligned

### Fixed

- Camera name not being passed to the backend
- Canny fade when a device has low FPS
- UI trying to resize when app not running
- Handling UI changes when not in fullscreen

### Removed

- Flashing from WebRTC and to allow for 1 or 2 frames per flash depending on service provider configuration
