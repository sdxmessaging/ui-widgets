# ui-widgets [![](https://data.jsdelivr.com/v1/package/gh/sdxmessaging/ui-widgets/badge)](https://www.jsdelivr.com/package/gh/sdxmessaging/ui-widgets) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=sdxmessaging_ui-widgets&metric=alert_status&token=316dd863c9185ce988acd14efc1fdb66791b67ba)](https://sonarcloud.io/summary/new_code?id=sdxmessaging_ui-widgets)

Build powerful form inputs/outputs with mithril and streams.

[Open Example Page in Flems.io](https://flems.io/#0=N4IgzgpgNhDGAuEAmIBcIAW94AcyoHoDYkA7AOgCswloBLANwCdzSJ4CBzDAmgDwC2EMGACGnOqU4EArnQC0AdzpJO7MLIFICEPqIE4YVMCAA0IWAHtSYSzDQW7UUXmRnwsJk7QBtAAymfgC65gBmdDAmqD6gpPoQDuRYAlDuVqSIGQ4AOvAAPFCSANYABEzQALzZ4PAAnpEYEOzVJRjloVWY2HiEspDkodbwoorClkLkVgIE5TCikBoMAKzkAJzkfsQiBKJQUJMiLZKInEx0dZ1gGKIAzAAcACzydACMADIAiqQAYgBMN5xakUAI4AdQAGpwAGyUPgAYV+AC0AEZw5EAVQAsnxaoolpw3oiAJpQ9F0dEAZVWdzeRIAaksZKQBHcAOKggShIoASQpMOBAClQsiHgBRFqeSwiSxnCSkTqiUjWWoCSwyMDVAB82VIOryyMsSFqJVgzhEl0VYHkkDOoRKoUUv3tDxKSFETCK8lOolqWp1JRKeSQjBKKk6OHEEC1eQIwYY2tIMYNRs17kgMAQdGsURAD1QAHYQABfEIgQqkIpRGIgOJCBywEQAflC+gitQqcNEDAgong7hkTFS6CwuHwREGGTA5E4lksnDmODoU6mWzAzdbUHbne7vfcdRwCXQYDq9iLpli8Qcw1gGFq2fIAkkBxM5gHQ66o96JFI1EmUDVSChM45STOMOyUKIfAEIUyIaNet7ZgQDzkC8LwoQQ8F3jYD5Pg2L4gPuh41PUCRnhedboI+8BtBEOEUNQ-aDg4I49EQTI4EUnCgdMVE0VAAACvwbOQDwELxZz7I+9H4YRDhgJ4dA4H2ZE1peR7wOU+jGIx74sWOsikBxXEruJESCcJonHpp0xWT2AjaeYslHgpSnFueqkUWWhrzBgdEOSAb7Md0+nfr+poAUB7oQNx4GQdBdCwdB3lXMYSEofm5C-C8SVuilUn+U5HhnK5Km1kRYB0JwcTwAOEAAPoRkg5AyFofkMa+THDsFX5kMYtCFMwrDsAQhk2ZV1W1Q1ohIPxNzCX48jIuwogibGS4cBVVW9pNjXNa1+XtQRtQHnJLnKe5ZUOJItB8P5gVdZ+RDfn19CDWwHDcLwSCCMIYhytIchKCoajwBoLXaNdugFcd5VnW55FEbo+iGNFh33R+rHEL11D9YwLDvVwPD8EIIjiJIAMKMoqjqJo2hIwYRiHYV8nFcppaXeggNUyDYAlKKegMxAJTFkAA)

---

## Overview

ui-widgets is a simple collection of mithril components for generating rich form inputs or displaying values. These widgets use mithril streams to simplify avoid state management "boilerplate" and allow form complex interactions and validation.

---

## Installation

## 3rd Party Dependencies

ui-widgets has several lightweight dependencies for building and styling widgets:

* [mithril.js + streams](https://mithril.js.org/)
* [Lodash](https://lodash.com/)
* [Tachyons](https://tachyons.io/)
* We suggest using [Font Awesome](https://fontawesome.com/) for icons
* Signature drawing input requires [Signature Pad](https://github.com/szimek/signature_pad)
* Signature text/stamp input benefits from a custom font, we suggest [Caveat](https://fonts.googleapis.com/css?family=Caveat)
* IE 11 requires a polyfill to support Promises used by our file inputs, we recommend [Promise Polyfill](https://github.com/taylorhakes/promise-polyfill)

### Install with NPM

Register the GitHub Package Registry for @sdxmessaging in your .npmrc file:

```text
@sdxmessaging:registry=https://npm.pkg.github.com
```

Add @sdxmessaging/ui-widgets to your package:

```bash
npm i @sdxmessaging/ui-widgets
```

### From CDN

A umd version of the library is available via jsDelivr:

```html
<script crossorigin="anonymous" src="https://cdn.jsdelivr.net/gh/sdxmessaging/ui-widgets/umd/index.js"></script>
```

### Quick-start with example page

A simple demonstration page is available from ui-widgets, open the example.html file:

```bash
npm run example
```

The example page shows how widgets read/write shared streams and file streams. The page source can be found in the `umd` folder.

## Concepts

All widgets accept a "field" configuration and a "value" stream, the streams contain either a simple property or a file list. Any input/display widget that supports the same "value" can share a common stream.

### Properties

A property "value" consists of a stream of string, number, or boolean.

The SelectInput, RadioInput, and SelectText widgets require a list of options mapping the value to a label.

### Files

A file "value" consists of a stream of file objects. These objects are simple wrappers for standard browser files with extra fields:

* guid - Auto generated unique id
* name - The file name, may be modified by image inputs
* path - A path to the file, used by file display widgets
* dataUrl (optional) - Scaled image preview generated by image inputs
