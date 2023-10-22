const nameMap = require('./nameMap.json');

const flat = Object.keys(nameMap).reduce((acc, curr) => {
  if (curr === 'attributesNumber') {
    acc[curr] = 'number of attributes';
    return acc;
  }
  acc[curr] = curr;
  Object.keys(nameMap[curr]).map((key) => {
    acc[key] = nameMap[curr][key];
  });
  return acc;
}, {});

console.log(flat);
