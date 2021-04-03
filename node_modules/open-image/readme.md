# open-image

Open/view an image.


## Installation

You can install it locally to use the API:

```bash
npm install open-image
```

or globally to use the CLI:

```bash
npm install -g open-image
```


## Usage

```js
const openImage = require('open-image');

openImage('/path/or/url/to/image.png');
```


## API

- **`openImage(imagePath)`**
  - Opens the image at the given `imagePath`


## CLI

```bash
$ open-image --help

  Open/view an image

  Usage:
    $ open-image <image-path>

  <image-path> can be a filesystem path or url to the image

  Examples:
    $ open-image sample-image.jpg
    $ open-image http://site.com/image.jpg
```


## License

MIT License
