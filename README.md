# cdn-server
This is a basic cdn server built using node.js and express.js. For Images it features resizing and cropping. CSS Files are minified before they are sent to the client.

## Usage
Files must just be placed inside their specific folder inside the public folder

**Folders**<br />
Images -> img<br />
CSS Files -> css

## Static Files
If you don't want to use the functions of the cdn-server just put `/static` before the filepath like this:
```html
<img src="<cdn-domain>/static/img/nature/field.jpg">
<link rel="stylesheet" href="<cdn-domain>/static/css/example.css">
```

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

### Placeholder
`<cdn-domain>/img/placeholder/<width>/<height>`<br />
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
 
