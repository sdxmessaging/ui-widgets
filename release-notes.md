# Release Notes

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
