## tip.js
### A lightweight JavaScript library for overriding default browser tooltip.

Load particles.js and configure the particles:

**index.html**
```html
<link href="tip.css" rel="stylesheet" />
<script src="tip.js"></script>
```

```javascript
/* tipJs(options);
/* config options (optional) + config tip.js params */
var obj  = new tipJs({
  offsetX : 50,
  offsetY : 50
});
```

```css
/*Custom theme*/
.tip-blue .tip-js-title{
    background-color: blue;
}

```

