const assert = require("assert");
const game = require("../game");

function testgameResult() {
  console.log("Game result should return 3 random integers and bonus");
  console.log("Expect integers less than 5");

  try {
    assert.ok(game.gameResult());
    console.log("Passed.");
  } catch (error) {
    console.error("Failed.");
  }
}

testgameResult();
