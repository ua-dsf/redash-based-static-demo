/* globals d3 */
import GoldenLayoutView from '../common/GoldenLayoutView.js';
import SvgViewMixin from '../common/SvgViewMixin.js';

class LineChartView extends SvgViewMixin(GoldenLayoutView) {
  constructor (argObj) {
    argObj.resources = [
      { type: 'less', url: './views/LineChartView/style.less' },
      { type: 'text', url: './views/LineChartView/template.svg' },
      { type: 'text', url: './views/LineChartView/controls.html' }
    ];
    super(argObj);
  }
  get title () {
    return 'DE Jobs Over Last Year';
  }
  async getData () {
    // CORS is restricted to WebDAV, so we use a local csv for testing
    const csvUrl = window.location.hostname === 'localhost'
      ? './data/example.csv'
      : 'https://carrot.atmo.cloud/api/queries/85/results.csv?api_key=q38NtQIaK0Ebw4Zq45oq9liC0Ckk8v0MMItcMnLP';
    const response = await window.fetch(csvUrl, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      body: { id: 85, parameters: { 'APP_NAME': 'Cufflinks2' } } });
    if (response.status === 200) {
      this.data = d3.csvParse(await response.text());
    } else {
      console.warn('Error fetching data');
      console.log(response);
    }
    this.render();
  }
  setup () {
    super.setup();
    // Apply the template
    this.content.html(this.resources[1]);
    // Insert the controls outside
    this.d3el.append('div')
      .classed('controls', true)
      .html(this.resources[2]);
    this.d3el.select('.submit.button')
      .on('click', async () => {
        this.getData();
      });
    this.getData();
  }
  draw () {
    super.draw();

    if (this.isHidden || this.isLoading) {
      return;
    }

    console.log(this.data);
  }
}

export default LineChartView;
