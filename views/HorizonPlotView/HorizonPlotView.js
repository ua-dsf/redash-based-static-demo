import GoldenLayoutView from '../common/GoldenLayoutView.js';
import ImgViewMixin from '../common/ImgViewMixin.js';

class HorizonPlotView extends ImgViewMixin(GoldenLayoutView) {
  constructor (argObj) {
    argObj.src = './img/HorizonPlot.png';
    super(argObj);
  }
  get title () {
    return 'Horizon Plot View';
  }
}

export default HorizonPlotView;
