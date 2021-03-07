# Excel JavaScript
Статус: в процессе разработки

Ссылка: [посмотреть](https://vakulovv.github.io/js-excel/) 

Одностраничное приложение на чистом Javascript без использования фреймворков.

Приложение строится на компонентах, унаследованных от класса DomListener.
Использование шаблона Observer, позволяет одним компонентам подписываться и реагировать на события других компонентов.

Главный компонент ExcelComponent включает внутренние компоненты Header, Toolbar, Formula, Table.
ExcelComponent производит рендеринг в нужном порядке и выводит шаблоны HTML.

Сохранение состояния приложения реализовано через механизм, аналогичный redux.

Добавлен роутинг по страницам.




