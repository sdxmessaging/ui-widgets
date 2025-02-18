# Release Notes

## 1.8.43

- Fix `CheckList`/`CheckListGroup` not reflecting changes to options when list has same length

## 1.8.42

- Move `CheckList` input styling to inner-most placeholder/selection element
- Fix `CheckList` not showing single selection if stream value is updated with non-string value

## 1.8.41

- Fix `CheckListGroup` - don't add group keys to stream value
- `CheckList` and `CheckListGroup` now emit change events on interaction

## 1.8.40

- `CheckListGroup` single item selected bug fix

## 1.8.39

- `CheckListGroup`

## 1.8.38

- Fix `CheckList` not reacting to changes in option list

## 1.8.37

- `CheckList` keyboard navigation reworked to filter list on type

## 1.8.36

- Fix `ToggleInput` showing focus
- Improve layout & validation state reporting in `DateInput` and `CardDateInput` widgets
- Fix `DateInput` ordering of literals from rtl text locales

## 1.8.35

- Fix `DateInput` and `CardDateInput` not passing HTML form validation when valid
- Don't show invalid/focus wrapper class on `CheckboxInput`, `ToggleInput`, or `RadioInput` widgets

## 1.8.34

- Revert: BREAKING Widget `invalidInputWrapper` class is now only applied after first user interaction or when value stream has a value set (from 1.8.29)
- Theme support for widget input wrapper when in focus
- Fix `SelectInput` not disabling empty option values in the same manner as a placeholder value
- `SelectInput` and `CheckList` to use placeholder label class if no value is set

## 1.8.33

- `DateInput` to respect min/max field attributes for text entry

## 1.8.32

- Fix `CheckList` option selection issue introduced in Chrome 127 builds

## 1.8.31

- BREAKING `List` will no longer apply "overflow-y-auto" class if you provide a `classes` attribute

## 1.8.30

- `CurrencyInput` and `TimeInput` validation now respects readonly/disabled attributes
- Fix `CurrencyInput` not marking invalid after "blur" event
- Fix `TimeInput` not showing validation messages under widget
- BREAKING `CurrencyInput` changes to name/value when serializing parent form
  - Currency unit set to widget name
  - Formatted currency string set to widget name + "-currency"
  - e.g. Widget named "test" with a value of $-1.23 will serialize to:
    - "test" -> "123"
    - "test-currency" -> "-1.23" by default
    - "test-currency" -> "(1.23)" if configured with `{ "negativeStyle": "parentheses" }`

## 1.8.29

- BREAKING Widget `invalidInputWrapper` class is now only applied after first user interaction or when value stream has a value set
- Added theme support for `requiredInputWrapper`, `readonlyInputWrapper`, and `disabledInputWrapper`, applied to widgets when field has these attributes
- Added theme support for `checkListOptionLabel` and `checkListOptionIcon`, defaulting to stock margins

## 1.8.28

- `checkList` component back out of support removing margin around icon in multi select: remove config option `checkListNoMargin`

## 1.8.27

- `checkList` component and `dateInput` component align icons and text in center of dropdown input
- `checkList` component support removing margin around icon in multi select to tighten spacing through config option `checkListNoMargin`

## 1.8.26

- `chekList` component support for icon rotation
  - `checkListIcn` is rotated 180deg when the dropdown list is open

## 1.8.25

- `List` component support for `keyBy` method
  - Support seting a `key` attribute for each list row
  - `key` is set on a Mithril fragment containing the row

## 1.8.24

- Reduced width of inputs in `TimeInput`
- Changed `TimeInput` placeholders to "--" instead of "hh" and "mm"

## 1.8.23

- `PageController::blockStride` method to update the "block stride"
- Fix `CheckList` opening on click or focus when disabled or readonly

## 1.8.22

- `Currency.numtoStr` additional optional argument to enable formatting of large numbers
- BREAKING `Currency.numtoStr` default behaviour changed to not format large numbers

## 1.8.21

- `PageController` methods for next/previous page, page bounds checking, and number of pages
- Fix `ListController` drawing an additional "block" of rows at the bottom of visible range
- New `PageController` class, `ListController` variant that displays items in "pages"
- `CurrencyInput` now formats large numbers with group separators (based on system locale)
- Fix `CurrencyInput` incorrectly handling negative pence amounts after input
- New `Currency` static class with currency conversion util methods
- Deprecate `formatCurrency`, `currencyStrToNumber`, `numberToCurrencyStr`, `numberToCurrencyTuple` methods in favour of `Currency`

## 1.8.20

- `CheckList` support for toggle open/closed on click or space/enter with no selection

## 1.8.19

- `CheckList` displays single selection without checkboxes
- Drop-down `CheckList` now attaches list to the bottom of input
- Single selection `CheckList` closes on selection
- Added `checkListOption` and `checkListOptionSingleSelected`/`checkListOptionMultiSelected` theme options
- Fixed `CheckList` keyboard selection using value and not lables

## 1.8.18

- Fix `TimeInput` not showing stream value on first draw
- `ListController` to enforce readonly arrays for sort/filter methods
- BREAKING `ListController::isLoading` member made private, use `ListController::loading` getter

## 1.8.17

- Fix `ListController` calls to `reload` being ignored if the list is loading

## 1.8.16

- Fix `CheckList` text content not handling number/boolean option values
- Replace "--- Select one ---" default placeholder for `SelectInput`/`CheckList` with "Select"

## 1.8.15

- `DateInput` date picker drop-down alignment respects input position on screen, avoid picker opening with parts "off screen"
- `TimePicker` pads hour/min inputs with leading zeros
- `CheckList` support for "open" icon
- BREAKING config option `selectDropUp` renamed `checkListDropUp`

## 1.8.14

- Added invert option to formatCurrency

## 1.8.13

- Fix `TimeInput` minutes limit - from 55 to 59
- Reworked `TimeInput` picker step handling - step is not applied if result exceeds min/s
- Fix `CheckList` potentially not showing value stream state on first draw
- `CheckList` ignores key presses with modifiers
- `CheckList` support for closing via Tab key, reopen on navigation key press

## 1.8.12

- Added new `CheckList` widget, alternative to `SelectInput` displaying checkboxes for options
- Added new `TimeInput` widget, alternative to `BaseInput` of type `time`
- Added support for `multi` attribute on `SelectInput` and `CheckList` widgets

## 1.8.11

- dim class removed from show/hide password toggle
- Added `time` to `BaseInput` types that should always use a fixed label position

## 1.8.10

- `CurrencyInput` "hidden" input element now has no padding and a very small width, should fix cases where input escapes container for large elements

## 1.8.9

- `CurrencyInput` now supports number validation properties
- Fix `ListController.single` not applying sort/filter on load if sort/filter is set

## 1.8.8

- `Toggle` to support `layout` field attribute (`LayoutType.default` or `LayoutType.floatAlways` recommended)
- Export `formatCurrency` funciton

## 1.8.7

- Update luxon to `3.4.0`

## 1.8.6

- Expand references to registered functions for icons: `showPassIcn`, `hidePassIcn`, `uploadIcn`, `downloadIcn`, and `deleteIcn`

## 1.8.5

- Extend references to registered functions for checkboxes, signature options, datepicker, toggle icon
- Updated registered function interface to be more flexible (`Children` instead of `Vnode`)

## 1.8.4

- `registerFunction` utils, add custom methods to build mithril elements for use by widgets
- Radio button, button, and label icons can now reference registered functions

## 1.8.3

- Fix `List` sometimes appearing blank after reload

## 1.8.2

- Minor performance improvement to `List` buffering
- Added support for sorting and filtering on `List` data

## 1.8.1

- Update TypeScript to 5.0
- Support field range option "any"
- Added `List` component and `ListController` class, more info in example page

## 1.8.0

- Config support for `optionalLblPost`, append text to labels on widgets when not required
- BREAKING: Reworked toggle control, icons are now set in the "slider" part of an animated toggle
- Added `toggleOnWrapper` and `toggleOffWrapper` config classes
- Added `--ui-widgets-toggle-height` CSS variable for controlling toggle size (default 32px)

## 1.7.15

- Change tooltip message to ReadonlyArray

## 1.7.14

- Tooltip minor review

## 1.7.13

- Tooltip component accepts array of messages

## 1.7.12

- Update TypeScript to 4.9
- Minor cleanup

## 1.7.11

- Fix widgets not redrawing to reflect validation changes from attributes

## 1.7.10

- Rework widget "floating labels" - improved performance & reliability
- Rework input validation to use primarily depend on input element `checkValidity`

## 1.7.9

- Update selectionInner for radio and checkboxes to align centrally

## 1.7.8

- BREAKING: `uiClass` options set in widgets will have theme class applied as default value, irregardless of `merge` flag value

## 1.7.7

- Minor fix: Flatpickr will not show when date input is readonly or disabled

## 1.7.6

- Minor fix to floatLabel floating with undefined value

## 1.7.5

- Minor fix to date picker icon positioning subject to display config

## 1.7.4

- Added flatpickr as date input option for `DateInput` widget
- Added `datePickerIcn` config option

## 1.7.3

- Update to Font Awesome 6.2
- Readonly will disable radio & select inputs
- Percentage Input type is changed from text to number
- Added `tooltipIcon` to config
- BREAKING: ToolTip widget and config renamed to Tooltip

## 1.7.2

- Stricter typings for checkbox, radio, select, sign, toggle widgets
- Stricter field `type` property must now match `FieldType` enum or string equivalent value

## 1.7.1

- Fix error when DateInput is given an invalid date value, reset widget instead
- Added `dateLocale` config option
- BREAKING: Removed `dateOpts` config, use `dateLocale` instead
- BREAKING: DateInput no longer supports locale setting in `options` list
- BREAKING: Simplified `signOpts` config option to accept a list of `SignTypes` only
- NOTE: Signature widget supports `options` list and will convert to the simplified `signOpts`, but this will be deprecated in a future release

## 1.7.0

- Fixed `[object Object]` title attribute on widgets with object label config
- Checkbox, Toggle, Radio widgets have unified implementation for label/icon "inner" parts
- Added `selection...` config options for Checkbox, Toggle, and Radio widgets
  - `...Layout` - list of parts for "inner part" of widget - `label`, `icon`, `on`, `off`
  - `...OnLabel`
  - `...OffLabel`
  - `...OnActive` - Class applied to "on" part when "checked"
  - `...OnInactive` - Class applied to "on" part when "unchecked"
  - `...OffActive`
  - `...OffInactive`
- Added `currencySymbol` config option
- BREAKING: Check/Toggle `options` support removed, use config `selectionLayout`
- BREAKING: Config `toggleFormat` support removed, use config `selectionLayout` and appropriate on/off icons
- BREAKING: Radio `labelSide` support removed, use config `selectionLayout`
- BREAKING: Currency input no longer supports symbol in `options` list, use `currencySymbol` config

## 1.6.1

- Support `badgePosition` in currency/percentage widgets, "left"/"right" options locate symbol relative to input
- Currency input always applies theme input class
- Fix example page currency widget config

## 1.6.0

- BREAKING: currencyFormat renamed to negativeStyle
- Removed instant mode support from CurrencyInput
- Expanded CurrencyInput negative styles ("default" | "parentheses" | "redParentheses" | "red")
- BREAKING: negativeStyle type "accounting" changed to "parentheses"
