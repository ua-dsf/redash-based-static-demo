/* globals d3 */
import { View } from '../../node_modules/uki/dist/uki.esm.js';
import IntrospectableMixin from '../../utils/IntrospectableMixin.js';

class GoldenLayoutView extends IntrospectableMixin(View) {
  constructor ({
    container,
    state,
    resources
  }) {
    resources = resources || [];
    resources.push({
      type: 'less', url: './views/common/GoldenLayoutView.less'
    });
    super(null, resources);
    this.container = container;
    this.layoutState = state;
    this.isHidden = false;
    this.container.on('tab', tab => {
      this.tabElement = d3.select(tab.element[0]);
      this.setupTab();
    });
    this.container.on('open', () => {
      this.render(d3.select(this.container.getElement()[0]));
    });
    this.container.on('hide', () => {
      this.isHidden = true;
    });
    this.container.on('show', () => {
      this.isHidden = false;
      this.render();
    });
    this.container.on('resize', () => this.render());
  }
  get title () {
    return this.humanReadableType;
  }
  get isEmpty () {
    // Should be overridden when a view has nothing to show
    return false;
  }
  get isLoading () {
    // Should be overridden when a view is loading data
    return false;
  }
  setup () {
    this.d3el
      .classed('GoldenLayoutView', true)
      .classed(this.type, true);
    this.emptyStateDiv = this.d3el.append('div')
      .classed('emptyState', true)
      .style('display', 'none');
    this.content = this.setupContentElement(this.d3el);
    this.spinner = this.d3el.append('div')
      .classed('spinner', true)
      .style('display', 'none');
  }
  setupTab () {
    this.tabElement.classed(this.type, true);
  }
  drawTab () {
    this.tabElement.select(':scope > .lm_title')
      .text(this.title);
  }
  setupContentElement () {
    // Default setup is a scrollable div; SvgViewMixin overrides this
    return this.d3el.append('div')
      .classed('scrollArea', true);
  }
  getAvailableSpace (content = this.content) {
    return content.node().getBoundingClientRect();
  }
  draw () {
    this.emptyStateDiv.style('display', this.isEmpty ? null : 'none');
    this.spinner.style('display', this.isLoading ? null : 'none');
    if (this.tabElement) {
      this.drawTab();
    }
  }
}

export default GoldenLayoutView;
