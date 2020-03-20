# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
