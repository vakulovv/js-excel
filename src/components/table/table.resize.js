import {$} from '@core/dom'

export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  const type = event.target.dataset.resize
  // const $parent = $resizer.$el.parentNode
  // const $parent = $resizer.$el.closest('.column') // уже лучше
  const $parent = $resizer.closest('[data-type="resizable"')
  const coords = $parent.getCoords()
  const id = $parent.data.col
  let value
  let diff

  document.onmousemove = e => {
    if (type === 'col') {
      console.log(e.movementX)
      diff = e.pageX - coords.right
      value = coords.width + diff
      // $resizer.css({right: value + 'px', opacity: 1})
      // eslint-disable-next-line max-len
      $resizer.css({right: -diff + 'px', bottom: '-100vh', opacity: 1})
      // Крайне не производительный способ!
      // document.querySelectorAll(`[data-col="${id}"]`)
      //     .forEach( node => node.style.width = value + 'px')
    } else {
      diff = e.pageY - coords.bottom
      value = coords.height + diff
      $resizer.css({width: '100vw', bottom: -diff + 'px', opacity: 1})
      // $parent.css({ color: 'red'})
    }
  }

  document.onmouseup = e => {
    if (type === 'col') {
      const columns = $root.findAll(`[data-col="${id}"]`)
      columns.forEach(node => {
        $(node).css({width: value + 'px'})
      })
    } else {
      $parent.css({height: value + 'px'})
    }

    if (type === 'col') {
      $resizer.css({right: '0px', opacity: 0})
    } else {
      $resizer.css({bottom: 0, opacity: 0})
    }

    document.onmousemove = null
    document.onmouseup = null
  }
  console.log('Start resizing', event.target.dataset.resize)
}
