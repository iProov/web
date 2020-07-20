# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

- Encoding corrupt images resulted in facial features going missing, causing liveness to fail.
- Face cropping logic improved to handle extremes in the camera's field of view without clipping.
- Huge memory management improvements to reduce device load.
- Fixed a missing missing `asset_url` domain prefix when loading Pico.
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
