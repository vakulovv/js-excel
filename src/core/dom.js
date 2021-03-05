class Dom {
  constructor(selector) {
    // app
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }

  // Геттер или сеттер
  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  text(text) {
    if (typeof text === 'string' || typeof text === 'number') {
      this.$el.textContent = text
      return this
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim()
    }
    return this.$el.textContent.trim()
  }

  clear() {
    this.html('')
    return this
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
    // Something here
  }

  off(eventType, callback) {
    console.log(this)
    this.$el.removeEventListener(eventType, callback)
    // Something here
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    // мини-полифилл
    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      // старый метод
      this.$el.appendChild(node)
    }
    return this
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  get data() {
    return this.$el.dataset
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  /*
      {
        height: '32px',
        width: '42px',
        background-color: red
      }
   */

  css(styles={}) {
    if (typeof(styles) === 'object') {
      Object.keys(styles)
          .map(key => {
            this.$el.style[key] = styles[key]
          })
    }
  }

  getStyles(styles = []) {
    return styles.reduce((res, s) => {
      res[s] = this.$el.style[s]
      return res
    }, {})
  }

  removeClass(className) {
    this.$el.classList.remove(className)
    return this
  }

  id(parse) {
    if (parse) {
      const parsed = this.id().split(':')
      return {
        row: +parsed[0],
        col: +parsed[1]
      }
    }
    return this.data.id
  }

  focus() {
    this.$el.focus()
    return this
  }

  attr(name, value) {
    if (value) {
      this.$el.setAttribute(name, value)
      return this
    }
    return this.$el.getAttribute(name)
  }

  addClass(className) {
    this.$el.classList.add(className)
    return this
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
