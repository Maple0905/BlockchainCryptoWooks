// Test community minting with mock contract that returns 1. Should allow and then fail on second time
// Test buying wooks
// Test buying too many wooks
// Test not enough money
// Test buying all stars with enough and without enough

import {expect, use} from 'chai';
import { waffle } from "hardhat";
const WooksABI = require('../artifacts/contracts/cryptowooks.sol/CryptoWooks.json');
const WooksABI2 = require('../artifacts/contracts/cwTest.sol/cwTest.json');

const erc721ABI = require('./erc721.abi.json');

describe("Wooks contract", function () {
  async function mintNftDefault(num, numForValue, contract){
    const useContract = contract || wooksContract;
    const valMult = numForValue || num;
    const txVal = 0.042 * valMult;
    const val = ethers.utils.parseEther(`${txVal}`);

    return useContract.mintWook(num, { value: val });
  }

  async function mintAllStar(idx, contract){
    const useContract = contract || wooksContract;
    const txVal = 0.42;
    const val = ethers.utils.parseEther(`${txVal}`);

    return useContract.mintAllStar(idx, { value: val });
  }

  let NFT;
  let wooksContract;
  let owner;
  let addr1;
  let addr2;
  let addrs;
  let mockVF;
  let mockBA;
  let mockDH;
  let mockCP;
  let mockMB;
  let ipfsBase;
  let ipfsNotRevealed;

  // `beforeEach` will run before each test, re-deploying the contract every
  // time. It receives a callback, which can be async.
  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    NFT = await ethers.getContractFactory("CryptoWooks");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    // console.log(NFT, owner)
    mockVF = await waffle.deployMockContract(addr2, erc721ABI);
    mockBA = await waffle.deployMockContract(addr2, erc721ABI);
    mockDH = await waffle.deployMockContract(addr2, erc721ABI);
    mockCP = await waffle.deployMockContract(addr2, erc721ABI);
    mockMB = await waffle.deployMockContract(addr2, erc721ABI);
    ipfsBase = "ipfs://QmSkSaDKwSQes8kWC72GhkE8CYUTad8GwDi29GJRLM4UFb/";
    ipfsNotRevealed = "ipfs://not_revealed/";
    

    wooksContract = await NFT.deploy(mockVF.address, mockBA.address, mockDH.address, mockCP.address, mockMB.address, ipfsBase, ipfsNotRevealed);
    await wooksContract.deployed();

    const saleIsActive = await wooksContract.saleIsActive.call()
    if (!saleIsActive) {
      wooksContract.flipSaleState();
    }
    console.log('saleIsActive', saleIsActive)
  });

  // You can nest describe calls to create subsections.
  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await wooksContract.owner()).to.equal(owner.address);
    });


    it("should return not revealed uri", async () => {
      let startIndex = await wooksContract.saleStartIndex();
      let tx = await mintNftDefault(1, 1);
      tx.wait();
      expect(await wooksContract.tokenURI(startIndex)).to.equal("ipfs://not_revealed/")
    })

    it("should return valid uri when revealed for default wook", async () => {
      let startIndex = await wooksContract.saleStartIndex();
      let tx = await mintNftDefault(1, 1);
      tx.wait();

      await wooksContract.reveal();
      expect(await wooksContract.tokenURI(startIndex)).to.equal(ipfsBase + String(startIndex))
    })
  });

  describe("Transactions", function () {
    it("Should mint a freebie to an NFT owner", async function () {
      await mockVF.mock.balanceOf.returns(1);
      expect(await wooksContract.checkUserOwnsNFT()).to.be.equal(1);
      let ownerBalance = await wooksContract.balanceOf(owner.address);
      expect(ownerBalance).to.equal(0);
      await wooksContract.mintCommunityWook();
      ownerBalance = await wooksContract.balanceOf(owner.address);
      expect(ownerBalance).to.equal(1);
      await expect(wooksContract.mintCommunityWook()).to.be.revertedWith('Already minted a freebie');
    });

    it("Should not mint a freebie to an NFT owner if all freebies used up", async function () {
      NFT = await ethers.getContractFactory("cwTest");
      wooksContract = await NFT.deploy(mockVF.address, mockBA.address, mockDH.address, mockCP.address, mockMB.address, 2000, 0, 0);
      await wooksContract.deployed();
      await mockVF.mock.balanceOf.returns(1);
      const saleIsActive = await wooksContract.saleIsActive.call()
      if (!saleIsActive) {
        wooksContract.flipSaleState();
      }
      await expect(wooksContract.mintCommunityWook()).to.be.revertedWith('Mint would exceed max supply of Community Wooks');
    });

    it("Should not mint a freebie if no community NFTs are owned", async function () {
      NFT = await ethers.getContractFactory("cwTest");
      wooksContract = await NFT.deploy(mockVF.address, mockBA.address, mockDH.address, mockCP.address, mockMB.address, 1999, 0, 0);
      await wooksContract.deployed();
      await mockVF.mock.balanceOf.returns(0);
      await mockBA.mock.balanceOf.returns(0);
      await mockDH.mock.balanceOf.returns(0);
      await mockCP.mock.balanceOf.returns(0);
      await mockMB.mock.balanceOf.returns(0);

      const saleIsActive = await wooksContract.saleIsActive.call()
      if (!saleIsActive) {
        wooksContract.flipSaleState();
      }
      await expect(wooksContract.mintCommunityWook()).to.be.revertedWith('Does not own the NFT');
    });

    it("gets the count of NFTs for this address", async () => {
      await expect(await wooksContract.balanceOf(owner.address)).to.eq("0");

      await mintNftDefault(1, 1);

      expect(await wooksContract.balanceOf(owner.address)).to.eq("1");
    });

    it("correct ether value and incorrect ether value", async () => {
      NFT = await ethers.getContractFactory("cwTest");
      wooksContract = await NFT.deploy(mockVF.address, mockBA.address, mockDH.address, mockCP.address, mockMB.address, 1999, 0, 0);
      await wooksContract.deployed();
      const saleIsActive = await wooksContract.saleIsActive.call()
      if (!saleIsActive) {
        wooksContract.flipSaleState();
      }
      await expect(mintNftDefault(21, 20, wooksContract)).to.be.revertedWith('Ether value sent is not correct');
      await mintNftDefault(21, 21, wooksContract)
      expect(await wooksContract.balanceOf(owner.address)).to.eq("21");
      const idCounter = await wooksContract.getForSaleIdCounter();
      expect(idCounter.toNumber()).to.eq(21)
    });

    it("correct maximum sold", async () => {
      NFT = await ethers.getContractFactory("cwTest");
      wooksContract = await NFT.deploy(mockVF.address, mockBA.address, mockDH.address, mockCP.address, mockMB.address, 2000, 7999, 0);
      await wooksContract.deployed();
      const saleIsActive = await wooksContract.saleIsActive.call()
      if (!saleIsActive) {
        wooksContract.flipSaleState();
      }
      await (mintNftDefault(1, 1, wooksContract));
      expect(await wooksContract.balanceOf(owner.address)).to.eq("1");
      await expect(mintNftDefault(1, 1, wooksContract)).to.be.revertedWith("No more wooks for sale");
    });

    it("correct maximum sold of for sale nfts", async () => {
      NFT = await ethers.getContractFactory("cwTest");
      wooksContract = await NFT.deploy(mockVF.address, mockBA.address, mockDH.address, mockCP.address, mockMB.address, 0, 7999, 0);
      await wooksContract.deployed();
      const saleIsActive = await wooksContract.saleIsActive.call()
      if (!saleIsActive) {
        wooksContract.flipSaleState();
      }
      await (mintNftDefault(1, 1, wooksContract));
      expect(await wooksContract.balanceOf(owner.address)).to.eq("1");
      await expect(mintNftDefault(1, 1, wooksContract)).to.be.revertedWith("No more wooks for sale");
    });

    it("correct maximum sold of for all stars", async () => {
      NFT = await ethers.getContractFactory("cwTest");
      wooksContract = await NFT.deploy(mockVF.address, mockBA.address, mockDH.address, mockCP.address, mockMB.address, 0, 7999, 49);
      await wooksContract.deployed();
      const saleIsActive = await wooksContract.saleIsActive.call()
      if (!saleIsActive) {
        wooksContract.flipSaleState();
      }
      const idCounter = await wooksContract.getAllStarIdCounter();
      console.log(idCounter.toNumber())
      await (mintAllStar(1, wooksContract));
      const idCounter2 = await wooksContract.getAllStarIdCounter();
      console.log(idCounter2.toNumber())
      expect(await wooksContract.balanceOf(owner.address)).to.eq("1");
      await expect(mintAllStar(2, wooksContract)).to.be.revertedWith("No more All Stars for sale");
    });

    it("cannot mint two of same allstar", async () => {
      NFT = await ethers.getContractFactory("cwTest");
      wooksContract = await NFT.deploy(mockVF.address, mockBA.address, mockDH.address, mockCP.address, mockMB.address, 0, 7999, 45);
      await wooksContract.deployed();
      const saleIsActive = await wooksContract.saleIsActive.call()
      if (!saleIsActive) {
        wooksContract.flipSaleState();
      }
      const idCounter = await wooksContract.getAllStarIdCounter();
      await (mintAllStar(1, wooksContract));
      const idCounter2 = await wooksContract.getAllStarIdCounter();
      expect(await wooksContract.balanceOf(owner.address)).to.eq("1");
      await expect(mintAllStar(1, wooksContract)).to.be.revertedWith("allstar already minted");
    });

    it("account other than owner can mint a wook", async () => {
      NFT = await ethers.getContractFactory("cwTest");
      wooksContract = await NFT.deploy(mockVF.address, mockBA.address, mockDH.address, mockCP.address, mockMB.address, 0, 7000, 45);
      await wooksContract.deployed();
      const saleIsActive = await wooksContract.saleIsActive.call()
      if (!saleIsActive) {
        wooksContract.flipSaleState();
      }
      const val = ethers.utils.parseEther("0.042");
      await wooksContract.mintWook(1, { value: val });
      await wooksContract.connect(addr1).mintWook(1, { value: val });
      expect(await wooksContract.balanceOf(addr1.address)).to.eq("1");
    });
  })
});
