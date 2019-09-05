# v-slider-toggle

---

## Install:

```
npm i -S v-slider-toggle
```

## Introduction

Like the jquery's `slideToggle()`.

![img](https://s2.ax1x.com/2019/09/05/nninln.gif)

## How to use

```js
<button v-st="{ ele: '#slideToggle', d: 150 }"></button>

<div id="slideToggle">
  ...
</div>


<script>
import { $slideToggle } from 'v-slide-toggle'

export default {
  directives: {
    st: $slideToggle
  },
}
</script>

// or global use
import slideToggle from 'v-slide-toggle'

Vue.use(slideToggle)
```

## Options

- ele: className or id
- d: the animation's duration (ms)
- fx: move's function, default is linear: (t, b, c, d) => c / d * t + b

Thanks to use!
