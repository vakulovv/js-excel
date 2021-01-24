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
