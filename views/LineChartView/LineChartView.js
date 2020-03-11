import GoldenLayoutView from '../common/GoldenLayoutView.js';
import SvgViewMixin from '../common/SvgViewMixin.js';

class LineChartView extends SvgViewMixin(GoldenLayoutView) {
  constructor (argObj) {
    // CORS is restricted to WebDAV, so we use a local csv for testing
    const csvUrl = window.location.hostname === 'localhost'
      ? './data/example.csv'
      : 'https://carrot.atmo.cloud/api/queries/72/results.csv?api_key=q38NtQIaK0Ebw4Zq45oq9liC0Ckk8v0MMItcMnLP';
    argObj.resources = [
      { type: 'less', url: './views/LineChartView/style.less' },
      { type: 'text', url: './views/LineChartView/template.svg' },
      { type: 'csv', url: csvUrl }
    ];
    super(argObj);
  }
  get title () {
    return 'DE Jobs Over Last Year';
  }
  setup () {
    super.setup();
    // Apply the template
    this.content.html(this.resources[1]);
  }
  draw () {
    super.draw();

    if (this.isHidden || this.isLoading) {
      return;
    }

    console.log(this.resources[2]);
  }
}

export default LineChartView;
