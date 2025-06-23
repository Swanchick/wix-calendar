let redLine = null;
let currentTime = 0;


function getRedLine() {
    return document.getElementById("red-line");
}


function setRedLinePos(number) {
    if (redLine == null) {
        redLine = getRedLine();

        return;
    }

    redLine.style.top = number + "%";
}

function changeLinePos() {
    currentTime += 0.005;
    if (currentTime >= Math.PI) {
        currentTime = 0;
    }

    let y = Math.pow(Math.sin(currentTime), 2) * 98;

    setRedLinePos(y);
}


setInterval(changeLinePos, 0.1);

