import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  // Абстрактный базовый метод для instance будущих классов toolbar etc
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name
  }
  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }
  init() {
    this.initDOMListeners()
  }
  removeAction() {
    this.removeDOMListeners()
  }
}