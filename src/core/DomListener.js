import {capitalize} from '@core/utils'

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener!`)
    }
    this.$root = $root
    this.listeners = listeners
    this.eventHandlers = []
  }
  initDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      if (!this[method]) {
        const name = this.name || ''
        throw new Error(`
          Method ${method} is not implemented in ${name} Component`)
      }
      const objRef = {
        listener: listener,
        handler: this[method].bind(this)
      }
      this.eventHandlers.push(objRef)
      // Тоже самое, что addEventListener
      this.$root.on(listener, objRef.handler)
    })
  }
  removeDOMListeners() {
    this.eventHandlers.forEach( item => {
      this.$root.off(item.listener, item.handler)
    })
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}
