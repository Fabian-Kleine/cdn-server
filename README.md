# cdn-server
This is a basic cdn server built using node.js and express.js. For Images it features resizing and cropping.

## Usage
Files must just be placed inside their specific folder inside the publich folder

**Folders**<br />
Images -> img

## Static Files
If you don't want to use the functions of the cdn-server just put `/static` before the filepath like this:
```html
<img src="<cdn-domain>/static/img/nature/field.jpg">
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
 
