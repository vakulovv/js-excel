import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from './table.resize'
// eslint-disable-next-line max-len
import {shouldResize, isCell, matrix, nextSelector} from '@/components/table/table.functions'
import {TableSelection} from '@/components/table/TableSelection'
import * as actions from '@/redux/actions'
import {defaultStyles} from '@/constants'
import {parse} from '@core/parse'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
    this.resizing = 0
  }
  // Возвращаем шаблон компонента
  toHTML() {
    return createTable(20, this.store.getState())
  }

  // Настраиваем компонент до init
  prepare() {
    this.selection = new TableSelection()
  }
  // Инициализируем компонент
  // Добавляем DOM-слушателей
  init() {
    super.init()
    this.selectCell(this.$root.find('[data-id="0:0"]'))

    this.$on('formula:input', value => {
      const parseValue = parse(value)
      this.selection.current
          .attr('data-value', value)
          .text(parseValue)

      this.updateTextInStore(value)
    })

    this.$on('formula:enter', text => {
      this.selection.current.focus()
    })

    this.$on('toolbar:applyStyle', value => {
      this.selection.applyStyle(value)
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds
      }))
    })
  }

  onKeydown(event) {
    const keyPress = ['Enter',
      'Tab',
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight'
    ]

    const {key} = event

    if (keyPress.includes(key) && !event.shiftKey) {
      event.preventDefault()

      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))

      console.log($next)

      // const $target = this.$root.find($next)
      this.selectCell($next)
    }
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
    const styles = $cell.getStyles(Object.keys(defaultStyles))
    console.log('Styles to dispatch', styles)
    this.$dispatch(actions.changeStyles(styles))
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event)
      this.$dispatch(actions.tableResize(data))
      console.log('Resize data', data)
    } catch (e) {
      console.warn('Resize error', e.message)
    }
  }

  onMousedown(event) {
    this.$emit('table:input', $(event.target))
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map( id => this.$root.find(`[data-id="${id}"`))
        this.selection.selectGroup($cells)
      } else {
        this.selectCell($target)
      }
    }

    // const $cell = this.$root.find('[data-id="0:0"]')
    // this.selection.select($cell)
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
  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }))
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text())
  }
}


// 922 ms  Scripting
// 463 ms  Rendering
// 515 ms  Painting
// 302 ms  System
// 1681 ms  Idle
// 3884 ms  Total


