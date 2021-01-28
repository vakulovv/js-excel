import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table.resize'
import {shouldResize} from '@/components/table/table.functions'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    })

    this.resizing = 0
  }

  toHTML() {
    return createTable()
  }

  // onClick() {
  //   console.log('onClick')
  // }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    }
  }


  onMousemove(e) {
    // eslint-disable-next-line no-empty
    if (this.resizing) {
    }
  }
  //
  onMouseup() {
    console.log(this.resizing)
  }
}


// 922 ms  Scripting
// 463 ms  Rendering
// 515 ms  Painting
// 302 ms  System
// 1681 ms  Idle
// 3884 ms  Total


