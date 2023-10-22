// SPDX-License-Identifier: MIT
pragma solidity >=0.8.10;

import '@rari-capital/solmate/src/tokens/ERC721.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/security/Pausable.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract CelebPixelWooks is ERC721, Pausable, Ownable {
  using Strings for uint256;
  string public baseURI; // 0

  uint256 public constant tierOnePrice = 0.015 ether; // 1
  uint256 public constant tierTwoPrice = 0.03 ether; // 2
  uint16 public numSold; // 4
  uint16 public constant MAX_CELEBS = 150; // 4

  mapping(uint256 => address) public soldCelebs;
  mapping(uint256 => address) public reservedCelebs;
  mapping(uint256 => address) public freeCelebs;
  mapping(uint256 => uint256) public tierIndexes;

  uint256[] public soldIndexes;
  uint256[] public reservedIndexes;
  uint256[] public freeIndexes;

  bool public saleIsActive = false;

  event CelebMinted(address indexed _from, uint256 indexed _id);

  constructor(
    string memory _baseURI,
    address[] memory _reservedAddresses,
    uint8[] memory _reservedIndexes,
    address[] memory _freeAddresses,
    uint8[] memory _freeIndexes,
    uint8[] memory _tierIndexes
  ) ERC721('CelebPixelwooks', 'celebPixelwook') {
    baseURI = _baseURI;
    for (uint8 i = 0; i < _reservedAddresses.length; i++) {
      reservedCelebs[_reservedIndexes[i]] = _reservedAddresses[i];
    }
    for (uint8 j = 0; j < _freeAddresses.length; j++) {
      freeCelebs[_freeIndexes[j]] = _freeAddresses[j];
    }
    for (uint8 h = 0; h < _tierIndexes.length; h++) {
      tierIndexes[h] = _tierIndexes[h];
    }
  }

  function unReserve(uint256 celebIndex) public onlyOwner {
    reservedCelebs[celebIndex] = address(0x0);
  }

  function unFree(uint256 celebIndex) public onlyOwner {
    freeCelebs[celebIndex] = address(0x0);
  }

  function mintCelebWook(uint256 celebIndex) public payable whenNotPaused {
    if (!saleIsActive) {
      revert('NotActive');
    }
    if (soldCelebs[celebIndex] != address(0x0)) {
      revert('AlreadySold');
    }
    if (reservedCelebs[celebIndex] != address(0x0) && reservedCelebs[celebIndex] != msg.sender) {
      revert('WookReserved');
    }
    if (freeCelebs[celebIndex] != address(0x0) && freeCelebs[celebIndex] != msg.sender) {
      revert('WookReservedFree');
    }
    if (numSold + 1 > MAX_CELEBS) {
      revert('MaxMint');
    }
    // Free are tier 0
    if (tierIndexes[celebIndex] == 1 && msg.value < tierOnePrice) {
      revert('NotEnoughETH');
    }
    if (tierIndexes[celebIndex] == 2 && msg.value < tierTwoPrice) {
      revert('NotEnoughETH');
    }

    soldCelebs[celebIndex] = msg.sender;
    soldIndexes.push(celebIndex);
    _safeMint(msg.sender, celebIndex);
    emit CelebMinted(msg.sender, celebIndex);
    ++numSold;
  }

  function getReservedIndexes() public returns (uint256[] memory) {
    for (uint256 i = 0 ; i < MAX_CELEBS ; i ++) {
      if (reservedCelebs[i] != address(0x0) && reservedCelebs[i] != msg.sender) {
        reservedIndexes.push(i);
      }
    }
    return reservedIndexes;
  }

  function getFreeIndexes() public returns (uint256[] memory) {
    for (uint256 i = 0 ; i < MAX_CELEBS ; i ++) {
      if (freeCelebs[i] != address(0x0) && freeCelebs[i] != msg.sender) {
        freeIndexes.push(i);
      }
    }
    return freeIndexes;
  }

  function getSoldIndexes() public view returns (uint256[] memory) {
    return soldIndexes;
  }

  function newURI(string memory _newBaseURI) public onlyOwner {
    baseURI = _newBaseURI;
  }

  function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    if (ownerOf(tokenId) == address(0)) {
      revert('NonExistentTokenURI');
    }

    return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString())) : '';
  }

  function flipSaleState() public onlyOwner {
    saleIsActive = !saleIsActive;
  }

  function pause() public onlyOwner {
    _pause();
  }

  function unpause() public onlyOwner {
    _unpause();
  }

  function withdraw(address payable payee) public onlyOwner {
    uint256 balance = address(this).balance;
    (bool transferTx, ) = payee.call{value: balance}('');
    if (!transferTx) {
      revert('WithdrawTransfer');
    }
  }
}
