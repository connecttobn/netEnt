
let getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

let randomBonus = () => {
    // keeping 0.3 probability of bonus
    let val = Math.random();
    let res = val < 0.3 ? true: false;
    return res;
}
let gameResult = () => {
    return {
        tiles : [getRandomInt(5),getRandomInt(5),getRandomInt(5)],
        bonus : randomBonus()
    };
}
exports.gameResult = gameResult;