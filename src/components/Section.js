export default class Section {
  constructor(containerSelector) {
    this._container = document.querySelector(containerSelector);
  }

  renderItems({ items, renderer }) {
    this._renderedItems = items.reverse();
    this._renderer = renderer;
    
    this._renderedItems.forEach(item => this._renderer(item));
  }

  addItem(element) {
    this._container.prepend(element);
  }
}