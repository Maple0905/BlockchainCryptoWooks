import { flatNames } from '../frontend/src/app-assets/flatNames';
const wook_meta = require('../frontend/assets/data/wooks-data-w-index.json')['wooks'];

const newWooks = { wooks: [] };

wook_meta.forEach((wook) => {
  const mappedWook = {};
  mappedWook = { ...wook };
  for (let att in mappedWook) {
    mappedWook[att] = flatNames[mappedWook[att]];
  }
  newWooks.wooks.push(newWook);
});

console.log(newWooks);
