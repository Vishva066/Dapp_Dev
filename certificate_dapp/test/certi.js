const certi = artifacts.require("certi");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Music contract", function (accounts) {
  it("should assert true", async function () {
    await certi.deployed();
    return assert.isTrue(true);
  });

  it("Login issues",async function(){
    let instance = await certi.deployed();

    let txRecipt = await instance.issueCertificate("EB604", "Ethereum Bootcamp", "Vishva", "S", "14-05-2022", {from: accounts[0]});

    let result = await instance.certificates("EB604");

    assert.equal(result.courseName, "Ethereum Bootcamp");
    assert.equal(result.candidateName, "Vishva");
    assert.equal(result.grade, "S");
    assert.equal(result.date, "14-05-2022");
  })

  it("DOuble spending this should fail", async function () {
    let instance = await certi.deployed();
    try {
      let txRecipt = await instance.issueCertificate("EB604", "Ethereum Bootcamp", "Vishva", "S", "14-05-2022", {from: accounts[1]});
    } catch (error) {
      console.log(error.reason);
    }
  });
});
