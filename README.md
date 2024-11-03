# Installation

With `npm`:

```
npm install @rnacanvas/code.url-params
```

# Usage

All exports of this package can be accessed as named imports.

```javascript
// an example import
import { URLParamsHandler } from '@rnacanvas/code.url-params';
```

## `URLParamsHandler`

The `URLParamsHandler` class handles URL parameters for a target RNAcanvas app
(see [@rnacanvas/app-object](https://pzhaojohnson.github.io/rnacanvas.app-object/)).

```javascript
targetApp; // an RNAcanvas app object

var urlParamsHandler = new URLParamsHandler(targetApp);

// a URL specifying a structure to be drawn with dot-bracket notation
var url = new URL('https://code.rnacanvas.app?sequence=GCGCAAAAGCGC&dot_bracket=((((....))))');

// draws the specified dot-bracket structure in the target app
urlParamsHander.handle(url.searchParams);
```
