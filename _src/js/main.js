import 'babel-polyfill';
import { filterActions, loadActions } from './lib/bundle-utility';

const loaded = loadActions(filterActions([
  {
    selector: '#draw',
    load: [require('./modules/canvas-draw')],
  },
  {
    selector: '.js-episode-select',
    load: [require('./modules/episode-select')],
  },
  {
    selector: '.js-drawer-opener',
    load: [require('./modules/open-drawer')],
  },
]));

console.log('🎨', loaded);