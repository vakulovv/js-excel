import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  // Абстрактный базовый метод для instance будущих классов toolbar etc
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.store = options.store
    this.unsubscribers = []
    this.storeSub = null
    this.prepare()
  }
  // Настраиваем компонент до Init
  prepare() {}
  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }
  // Уведомляем слушателей про событе event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }
  // Подписываемся на событие event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }
  $dispatch(action) {
    this.store.dispatch(action)
  }
  // Приходят изменения только по тем полям, на которые мы подписались
  storeChanged() { }

  isWatching(key) {
    return this.subscribe.includes(key)
  }


  // Инициализируем компонент
  // Добавляем DOM слушателей
  init() {
    this.initDOMListeners()
  }
  // Удаляем компонент
  // Чистим слушателей
  removeAction() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
