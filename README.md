# cdn-server
This is a basic cdn server built using node.js and express.js. For Images it features resizing and cropping. CSS Files are minified before they are sent to the client. JS Files are minified and compressed before they are sent to the client.

## Usage
Files must just be placed inside their specific folder inside the public folder

**Folders**<br />
Images -> img<br />
CSS Files -> css<br />
JS Files -> js<br />

If you are using the cache feature you have to delete the cache folder after every change in the public folder (adding/changing/deleting files) either by setting `clear_cache` to `true` in the config and restarting the server or by executing [this script](#cache) or by deleting it manually.

## Static Files
If you don't want to use the functions of the cdn-server just put `/static` before the filepath like this:
```html
<img src="<cdn-domain>/static/img/nature/field.jpg">
<link rel="stylesheet" href="<cdn-domain>/static/css/example.css">
<script src="<cdn-domain>/static/js/example.js"></script>
```

## Config
```javascript
const config = {
    //javascript minifier settings
    //find out more at https://terser.org/docs/options/
    minifier: {
        compress: {
            dead_code: false,
            drop_console: false,
            drop_debugger: true,
            keep_classnames: false,
            keep_fargs: true,
            keep_fnames: false,
            keep_infinity: false,
        },
        mangle: {
            eval: false,
            keep_classnames: false,
            keep_fnames: false,
            toplevel: false,
            safari10: false
        }
    },
    //server settings
    use_test_HTML: true, //when true index.html inside test folder is rendered when requesting '/'
    port: 3000, //port of the server
    cache: true, //when true minified css and js files are cached (recommended)
    clear_cache: true //when true the cache will be cleared on server restart (recommended)
}

module.exports = config;
```
Edit `config.js` to change the config for the server

## Cache
Minified CSS and JavaScript Files are cached inside the cache folder on the first request of the file. If `clear_cache` is set to `true` inside `config.js` the cache will be cleared on every server restard. So if you add, change or remove files from the public folder restart the server to clear the cache. This can also manually be done by running the following script.
```javascript
const cache = require('./utils/cache');

cache.clear();
```
The cache can be disabled in `config.js`.

## Images
### Resizing
```html
<img src="<cdn-domain>/img/nature/field.jpg?size=300">
```
### Cropping
```html
<img src='<cdn-domain>/img/nature/field.jpg?crop={"left": 100, "top": 0, "width": 300, "height": 500}'>
```
### Filters
**Blur**
```html
<img src="<cdn-domain>/img/nature/field.jpg?blur=6">
```
**Grayscale**
```html
<img src="<cdn-domain>/img/nature/field.jpg?grayscale=true">
```
**Flip**
```html
<img src="<cdn-domain>/img/nature/field.jpg?flip=true">
```
Mirror the image vertically (up-down) about the x-axis. <br />
**Flop**
```html
<img src="<cdn-domain>/img/nature/field.jpg?flop=true">
```
Mirror the image horizontally (left-right) about the y-axis.  <br />

### Combination
```html
<img src="<cdn-domain>/img/nature/field.jpg?size=300&blur=6&grayscale=true">
```
Like shown in the example above all propertys of an image can be combined.

### Placeholder
`<cdn-domain>/img/placeholder/<width>/<height>/<custom-text>`<br /><br />
**Square Placeholder Image**
```html
<img src='<cdn-domain>/img/placeholder/600'>
```
When you want to have a square placeholder image you can just use one value hich will also be used as the height.

**Rectangle Placeholder Image**
```html
<img src='<cdn-domain>/img/placeholder/600/200'>
```
**Placeholder Image with custom text**
```html
<img src='<cdn-domain>/img/placeholder/600/200/custom text'>
```

## CSS Files
```html
<link rel="stylesheet" href="<cdn-domain>/css/example.css">
<link rel="stylesheet" href="<cdn-domain>/css/subdirectory/example.css">
```
The css file is minified using `postcss`, `cssnano` and `autoprefixer`.
 
## JS Files
```html
<script src="<cdn-domain>/js/example.js"></script>
<script src="<cdn-domain>/js/subdirectory/example.js"></script>
```
The js file is minified and compressed using terser minifier. 
> [!TIP]
> The options for the minification can be changed inside `config.js`.