export class Page {
  constructor(params) {
    this.params = params
  }
  getRoot() {
    throw new Error('Method "getRoot" hsould be implemented')
  }

  afterRender() {}

  destroy() {}
}
