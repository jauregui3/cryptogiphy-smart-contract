import assertRevert from "zeppelin-solidity/test/helpers/assertRevert";

const Cryptogiphy = artifacts.require("Cryptogiphy");

contract("Cryptogiphy token", accounts => {
  it("Should make first account an owner", async () => {
    let instance = await Cryptogiphy.deployed();
    let owner = await instance.owner();
    assert.equal(owner, accounts[0]);
  });

  describe("mint", () => {
    it("creates token with specified outer and inner colors", async () => {
      let instance = await Cryptogiphy.deployed();
      let owner = await instance.owner();

      let token = await instance.mint("https://media.giphy.com/media/l2JhudOsvMyYYGTny/giphy.gif");

      let tokens = await instance.tokensOf(owner);
      let giphtokens = await instance.getGiphtokens(tokens[0]);
      assert.deepEqual(giphtokens, ["https://media.giphy.com/media/l2JhudOsvMyYYGTny/giphy.gif"]);
    });

    it("allows to mint only to owner", async () => {
      let instance = await Cryptogiphy.deployed();
      let other = accounts[1];

      await instance.transferOwnership(other);
      await assertRevert(instance.mint("https://media.giphy.com/media/l2JhudOsvMyYYGTny/giphy.gif"));
    });
  });
});