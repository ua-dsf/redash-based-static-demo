import GoldenLayoutView from '../common/GoldenLayoutView.js';
import RedashViewMixin from '../common/RedashViewMixin.js';

class RedashTestView extends RedashViewMixin(GoldenLayoutView) {
  constructor (argObj) {
    argObj.src = 'https://carrot.atmo.cloud/embed/query/81/visualization/129?api_key=YjMyytMZpb1zsKk4qrJTBBVmLpcz9qM4CAhYEe8X';
    super(argObj);
  }
  get title () {
    return 'Redash Test View';
  }
}

export default RedashTestView;
