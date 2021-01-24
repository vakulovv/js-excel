import {$} from '@core/dom'

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector)
    this.components = options.components || []
  }

  getRoot() {
    const $root = $.create('div', 'excel')
    // const $root = document.createElement('div')
    // $root.classList.add('excel')
    // $root.textContent = 'test'
    // $root.style.fontSize = '5rem'
    this.components = this.components.map(Component => {
      // const $el = document.createElement('div')
      // $el.classList.add(Component.className)
      const $el = $.create('div', Component.className)
      const component = new Component($el)
      $el.html(component.toHTML())
      // $root.insertAdjacentHTML('beforeend', component.toHTML())
      $root.append($el)
      return component
    })
    return $root
  }

  // Что-то складываем в шаблон
  render() {
    // afterbegin, afterend, beforeend, beforebegin
    // this.$el.insertAdjacentHTML('afterbegin', `<h1>Test</h1>`)
    // const node = document.createElement('h1')
    // node.textContent = 'TEST'
    this.$el.append(this.getRoot())
    this.components.forEach(component => component.init())
    // this.components.forEach(component => component.removeAction())
  }
}
