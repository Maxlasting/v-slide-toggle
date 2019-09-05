import Vue from 'vue'

const eventType = 'touchstart' in window ? 'touchstart' : 'click'

const _exec = Symbol('_exec')

const $slideToggle =  {
  bind (el, binding) {
    el[_exec] = (binding) => {
      const data = binding.value
      const { ele, d = 150, fx } = data
      if (!data || typeof ele !== 'string') return false
      const dom = document.querySelector(ele)
      return async function () {
        if (startMove.timer) return
        dom.style.overflow = 'hidden'
        if (!dom.offsetHeight) {
          dom.style.display = 'block'
          const target = dom.offsetHeight
          dom.style.height = 0
          await startMove(dom, target, d, fx)
        } else {
          await startMove(dom, 0, d, fx)
          dom.style.display = ''
        }
        dom.style.height = ''
        dom.style.overflow = ''
      }

    }
    Vue.prototype.$nextTick(() => {
      el.callback = el[_exec](binding)
      el.addEventListener(eventType, el.callback)
    })
  },
  update (el, binding) {
    Vue.prototype.$nextTick(() => {
      el.removeEventListener(eventType, el.callback)
      el.callback = el[_exec](binding)
      el.addEventListener(eventType, el.callback)
    })
  },
  unbind (el) {
    delete el[_exec]
    el.removeEventListener(eventType, el.callback)
  },
}

function startMove (ele, target = 0, duration = 150, fx) {
  const start = Date.now()

  let t, b, c, d, fn

  b = ele.offsetHeight
  c = target - b
  d = duration

  const p = new Promise((resolve) => fn = resolve)

  if (!d) {
    ele.style.height = target + 'px'
    return fn()
  }

  if (typeof fx !== 'function') fx = (t, b, c, d) => c / d * t + b

  const _move = () => {
    startMove.timer = window.requestAnimationFrame(_move)

    t = Date.now() - start

    if (t >= d) {
      t = d
      window.cancelAnimationFrame(startMove.timer)
      startMove.timer = null
      fn()
    }

    const curt = fx(t, b, c, d)

    ele.style.height = curt + 'px'
  }

  _move()

  return p
}

export { $slideToggle }

export default {
  install (Vue) {
    Vue.directive('st', $slideToggle)
  }
}
