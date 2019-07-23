# ui-widgets

Build powerful form inputs/outputs with mithril and streams.

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
* [Font Awesome](https://fontawesome.com/)
* Signature drawing input requires [Signature Pad](https://github.com/szimek/signature_pad)
* Signature text input requires font [Caveat](https://fonts.googleapis.com/css?family=Caveat)

### Install with NPM

Clone ui-widgets and install dependencies:

```bash
git clone https://github.com/sdxmessaging/ui-widgets.git
cd ui-widgets
npm install
```

Add ui-widgets as node module dependency:

```json
{
  "dependencies": {
    "ui-widgets": "sdxmessaging/ui-widgets"
  }
}
```

### Quick-start with example page

A simple demonstration page is available from ui-widgets, open the example.html file:

```bash
npm run example
```

The example page shows how input widgets write to a given stream, which is read by a display widget. The examples also cover multiple inputs manipulating a stream, and the file streams.
