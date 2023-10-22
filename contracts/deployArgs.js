const _baseURI = `INSERT HERE FROM PINATA PINNING`;

const _reservedAddresses = [
  '0x50f47014A02EB46A80c048A5702BdD28fB0B1f6e',
  '0x48917eb80290960582CBe0c13c69A559110c6b5c',
  '0x4636cB0FD5d035c444478cbAD53985A29DBE6B8A',
  '0x50f47014A02EB46A80c048A5702BdD28fB0B1f6e',
  '0x50f47014A02EB46A80c048A5702BdD28fB0B1f6e',
  '0x50f47014A02EB46A80c048A5702BdD28fB0B1f6e',
  '0x4311E583bb30d9f8d62dd51C465272eDFD2C0aA6',
  '0x50f47014A02EB46A80c048A5702BdD28fB0B1f6e',
];

const _reservedIndexes = [31, 33, 37, 48, 57, 116, 129, 143];

const _freeAddresses = [
  '0x1144b0B094Da46957426C11130f433fF9C189350',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0x48917eb80290960582CBe0c13c69A559110c6b5c',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0xe23dca4a7e181acc8f3ca024f8ba7d439f72e013',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0xd8b5f4b33f0fffaf1cbd08e028ed8392578919d9',
  '0x50f47014A02EB46A80c048A5702BdD28fB0B1f6e',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0x4311E583bb30d9f8d62dd51C465272eDFD2C0aA6',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0x50f47014A02EB46A80c048A5702BdD28fB0B1f6e',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0x50f47014A02EB46A80c048A5702BdD28fB0B1f6e',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0x4636cB0FD5d035c444478cbAD53985A29DBE6B8A',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0xBb54A48c14184D7cD23013aA8f8EC403Db736Fa9',
  '0x48917eb80290960582CBe0c13c69A559110c6b5c',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0x4636cB0FD5d035c444478cbAD53985A29DBE6B8A',
  '0x4B24C6971DbfE241b4D3e1BBcB58EF998F6f3b24',
  '0xd8b5f4b33f0fffaf1cbd08e028ed8392578919d9',
  '0x63ba2d89AE1a8C1998cB45637D9047848BaC71a1',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0x5dC70A9b884f78Ee030a8c6ad3b3b7dc10Bbe7f4',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0x125a0c7b22f49516022f840be50f06182187d84a',
  '0x4311E583bb30d9f8d62dd51C465272eDFD2C0aA6',
  '0xa0A7413f254C36b40dF4Cdf5282a70AB6bF9B460',
  '0x48917eb80290960582CBe0c13c69A559110c6b5c',
];

const _freeIndexes = [
  1, 4, 7, 10, 16, 19, 22, 25, 26, 28, 35, 36, 45, 46, 47, 55, 56, 62, 65, 67, 72, 75, 78, 83, 87, 90, 92, 97, 102, 107,
  112, 117, 118, 120, 121, 122, 126, 127, 128, 130, 131, 133, 140, 141, 145, 146, 148, 149,
];

const _tierIndexes = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2,
  2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1,
];
