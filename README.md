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

## `class URLParamsHandler`

The `URLParamsHandler` class handles URL parameters for a target RNAcanvas app
(see [@rnacanvas/app-object](https://pzhaojohnson.github.io/rnacanvas.app-object/)).

The below example draws a structure specified in dot-bracket notation
using the `sequence` and `dot_bracket` URL parameters.

```javascript
targetApp; // an RNAcanvas app object

var urlParamsHandler = new URLParamsHandler(targetApp);

// a URL specifying a structure to be drawn with dot-bracket notation
var url = new URL('https://code.rnacanvas.app?sequence=GCGCAAAAGCGC&dot_bracket=((((....))))');

// draws the specified structure in the target app
urlParamsHander.handle(url.searchParams);
```

Schemas can also be drawn using the `schema` URL parameter.

```javascript
// the schema to be drawn is to be accessed at this URL
var schemaURL = 'https://www.ebi.ac.uk/Tools/services/rest/r2dt/result/r2dt-R20240905-135809-0737-54467708-p1m/json';

var url = new URL(`https://code.rnacanvas.app?schema=${schemaURL}`);

// draws the schema
urlParamsHandler.handle(url.searchParams);
```
