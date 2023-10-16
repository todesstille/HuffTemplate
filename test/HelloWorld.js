const { expect } = require("chai");
const { ethers } = require("hardhat");
const { BigNumber } = require("ethers");
const { getContractFactory } = require("@nomiclabs/hardhat-ethers/types");

async function readBytecode() {
  const fs = require("fs");
  let byteCode = fs.readFileSync("./huff/contract.hex").toString();
  byteCode = "0x" + byteCode.slice(0, byteCode.length);
  return byteCode;
};

describe("Hello World", function () {

  before(async () => {

    [admin] = await ethers.getSigners();


    bytecode = await readBytecode();
    const {deployBytecode} = require('./helpers/bytecode');
    HelloWorld = await deployBytecode(bytecode);
  });

  beforeEach(async () => {
    helloWorld = (await HelloWorld.deploy());
  });

  describe("Functionality", function () {

    it("default return", async () => {
      let data = await helloWorld.callStatic("0x");
      let abiCoder = new ethers.utils.AbiCoder;
      let greeting = abiCoder.decode(["string"], data);
      expect(greeting).to.deep.equal(["Hello, world!"]);
    });
  });
});