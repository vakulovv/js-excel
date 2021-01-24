import {ExcelComponent} from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
  // Статическая без instance
  static className = 'excel__formula'

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click']
    })
  }

  toHTML() {
    return `
         <div class="info" >fx</div>
         <div class="input" contenteditable="true" spellcheck="false"></div>
     `
  }

  onInput(event) {
    console.log(this)
    console.log('Formula: onInput', event.target.textContent.trim())
  }

  onClick() {
    // console.log('Formula: onClick')
  }
}