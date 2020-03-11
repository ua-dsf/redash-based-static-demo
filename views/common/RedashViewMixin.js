const RedashViewMixin = function (superclass) {
  const RedashView = class extends superclass {
    constructor (argObj) {
      argObj.resources = argObj.resources || [];
      argObj.resources.push({
        type: 'less', url: './views/common/RedashViewMixin.less'
      });
      super(argObj);
      this.src = argObj.src;
      this._previousBounds = { width: 0, height: 0 };
    }
    setupContentElement () {
      return this.d3el.append('iframe')
        .classed('RedashView', true)
        .attr('src', this.src)
        .on('load', () => { this.trigger('viewLoaded'); });
    }
    getAvailableSpace () {
      // Don't rely on non-dynamic SVG width / height for available space; use
      // this.d3el instead
      return super.getAvailableSpace(this.d3el);
    }
    draw () {
      super.draw();

      const bounds = this.getAvailableSpace();
      if (this._previousBounds.width !== bounds.width ||
          this._previousBounds.height !== bounds.height) {
        this.trigger('viewResized');
      }
      this._previousBounds = bounds;
      this.content
        .attr('width', bounds.width)
        .attr('height', bounds.height);
    }
    setupTab () {
      super.setupTab();
      this.tabElement
        .classed('redashTab', true)
        .append('div')
        .classed('linkIcon', true)
        .on('click', () => {
          console.log('todo: link to query');
        });
    }
  };
  RedashView.prototype._instanceOfRedashViewMixin = true;
  return RedashView;
};
Object.defineProperty(RedashViewMixin, Symbol.hasInstance, {
  value: i => !!i._instanceOfRedashViewMixin
});
export default RedashViewMixin;
