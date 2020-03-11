/* globals d3 */
import GoldenLayoutView from '../common/GoldenLayoutView.js';
import SvgViewMixin from '../common/SvgViewMixin.js';

class D3TestView extends SvgViewMixin(GoldenLayoutView) {
  constructor (argObj) {
    argObj.resources = [
      { type: 'less', url: './views/D3TestView/style.less' },
      { type: 'text', url: './views/D3TestView/template.svg' },
      { type: 'text', url: './views/D3TestView/controls.html' }
    ];
    super(argObj);
  }
  get title () {
    return 'D3 Test View';
  }
  get isEmpty () {
    // For now (while we're still debugging the security issues), display the
    // emptyStateDiv
    return true;
  }
  async getData () {
    // CORS is restricted to WebDAV, so we use a local csv for testing
    const csvUrl = window.location.hostname === 'localhost'
      ? './data/example.csv'
      : 'https://carrot.atmo.cloud/api/queries/85/results.csv?api_key=VHSNSovfm3GG2i40LKp4auSYLIFYlkmc8FXSJALo';
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
      // This still returns 403 errors because the linked query requires input
      // parameters. It should work just fine for queries that don't
    }
    this.render();
  }
  setup () {
    super.setup();
    // Apply the template
    this.content.html(this.resources[1]);

    // Fill the emptyStateDiv with our warning
    this.emptyStateDiv.html('<h3>View under construction</h3>');

    // Insert the controls outside the svg added by SvgViewMixin
    this.d3el.append('div')
      .classed('controls', true)
      .html(this.resources[2]);
    this.d3el.select('.submit.button')
      .on('click', async () => {
        // TODO: grab the value from the input field as a parameter to this
        // function
        this.getData();
      });

    // Pull data from Redash
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

export default D3TestView;
