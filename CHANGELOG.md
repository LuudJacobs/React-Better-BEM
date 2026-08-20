# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

- Ship README, LICENSE and CHANGELOG with the published package
- Update `better-bem` to `^2.0.4`
- Update development dependencies, including webpack 4 to 5
- Publish to npm from GitHub Actions using OIDC

## [2.2.3] - 2023-02-09

### Changed

- Update `better-bem` to `^2.0.3`
- Update development dependencies

## [2.2.2] - 2021-04-06

### Changed

- Update development dependencies

## [2.2.1] - 2021-03-15

### Changed

- Update development dependencies

## [2.2.0] - 2021-02-24

### Changed

- Widen `react` and `react-dom` peer dependencies to `>=15`

## [2.1.1] - 2020-12-16

### Fixed

- Unset the `el` and `mod` props on cloned elements so they no longer leak into the rendered DOM

## [2.1.0] - 2020-12-14

### Changed

- Clone child elements with `React.cloneElement` instead of recreating them with `React.createElement`, preserving all original props

## [2.0.1] - 2020-12-14

### Fixed

- Preserve `key` and `ref` on recreated child elements

## [2.0.0] - 2020-12-03

### Added

- `glue` prop, passed through to better-bem
- `mod` prop on `<Bem>` for block level modifiers

### Changed

- Upgrade to better-bem 2, which changes the generated classname behaviour
- Only DOM elements are bemified; nested components are left untouched
- Element base classname falls back to the element type when `el` is not set
- Generated classname is prepended to an existing `className` instead of appended
- Publish from `dist` instead of `build`, and expose `src/Bem.js` as `module`

### Removed

- `isBlock` prop, no longer needed now that the block classname is applied automatically

## [1.0.5] - 2020-08-12

### Security

- Update development dependencies

## [1.0.4] - 2019-11-25

### Changed

- Reformat README code examples
