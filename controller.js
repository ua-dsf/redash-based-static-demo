/* globals d3, less, GoldenLayout */
import { Model } from './node_modules/uki/dist/uki.esm.js';

// General-purpose views
import TooltipView from './views/TooltipView/TooltipView.js';
import ModalView from './views/ModalView/ModalView.js';

// Main views in the app
import D3TestView from './views/D3TestView/D3TestView.js';
import RedashTestView from './views/RedashTestView/RedashTestView.js';

const viewClassLookup = {
  D3TestView,
  RedashTestView
};

class Controller extends Model {
  constructor () {
    super();
    this.modal = new ModalView();
    this.tooltip = new TooltipView();
    this.setupLayout();
    window.onresize = () => {
      this.goldenLayout.updateSize();
      this.renderAllViews();
    };
    (async () => {
      await less.pageLoadFinished;
      // Anything that needs to guarantee that LESS has finished should
      // go after this line
      this.goldenLayout.init();
      this.renderAllViews();
    })();
  }
  setupLayout () {
    this.goldenLayout = new GoldenLayout({
      settings: {
        // GoldenLayout has a (really buggy) feature for popping a view out in a
        // separate browser window; I usually disable this unless there is a
        // clear user need
        showPopoutIcon: false
      },
      content: [{
        type: 'row',
        isCloseable: false,
        content: [{
          type: 'component',
          componentName: 'D3TestView',
          componentState: {}
        },
        {
          type: 'component',
          componentName: 'RedashTestView',
          componentState: {}
        }]
      }]
    }, d3.select('#layoutRoot').node());
    this.views = {};
    for (const [className, ViewClass] of Object.entries(viewClassLookup)) {
      const self = this;
      this.goldenLayout.registerComponent(className, function (container, state) {
        const view = new ViewClass({ container, state });
        self.views[className] = view;
      });
    }
  }
  renderAllViews () {
    this.modal.render();
    this.tooltip.render();
    for (const view of Object.values(this.views)) {
      view.render();
    }
  }
}

window.controller = new Controller();
