const textStatus = {
  no_win: "No win",
  win: "Small Win",
  big: "Big Win"
};

let calculateWin = (a, b, c) => {
  if (a == b && b == c) {
    return textStatus.big;
  } else if (a == b || a == c || b == c) {
    return textStatus.win;
  } else {
    return textStatus.no_win;
  }
};

let successHanlder = response => {
  let res = JSON.parse(response);
  console.log(response);
  document.getElementById("result-container").classList.remove("hide");
  document.getElementById("titleHeader").innerText = calculateWin(...res.tiles);
  //set images
  for (let i = 0; i < 3; i++) {
    let id = "result" + (i + 1);
    let imgSrc = "/img/Symbol_" + res.tiles[i] + ".png";
    document.getElementById(id).setAttribute("src", imgSrc);
  }
  //handle bonus part
  let bonusDiv = document.getElementById("bonus").classList;
  if (res.bonus === true) {
    if(bonusDiv.contains("hide"))
        bonusDiv.remove("hide");
    //make new call after 2.5 seconds
    setTimeout(handlePlay, 2500);
  } else {
    if (!bonusDiv.contains("hide")) bonusDiv.add("hide");
  }
};

let handlePlay = () => {
  //raise http request
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      successHanlder(this.response);
    }
  };
  xhttp.open("GET", "/play?id=" + Math.random(), true);
  xhttp.send();
};
