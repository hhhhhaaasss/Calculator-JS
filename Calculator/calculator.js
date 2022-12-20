let screen = "0";
let runningTotal = 0;
let previousOperator = null;
const write = document.querySelector(".write");

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}

function handleNumber(number) {
  if (screen === "0") {
    screen = number;
  } else {
    screen += number;
    // (look up to see what it means) screen = screen + number
  }
}

function handleMath(value) {
  if (screen === "0") {
    //do nothing
    return;
  }

  const intScreen = parseInt(screen);
  if (runningTotal === 0) {
    runningTotal = intScreen;
  } else {
    flushOperation(intScreen);
  }

  previousOperator = value;
  screen = "0";
}

function flushOperation(intScreen) {
  if (previousOperator === "+") {
    runningTotal += intScreen;
  } else if (previousOperator === "-") {
    runningTotal -= intScreen;
  } else if (previousOperator === "*") {
    runningTotal *= intScreen;
  } else if (previousOperator === "÷") {
    runningTotal /= intScreen;
  }
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      screen = "0";
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(screen));
      previousOperator = null;
      screen = "" + runningTotal;
      runningTotal = 0;

      break;
    case "←":
      if (screen.length === 1) {
        screen = "0";
      } else {
        screen = screen.substring(0, screen.length - 1);
      }
      break;
    case "+":
    case "-":
    case "*":
    case "÷":
      handleMath(symbol);
      break;
  }
}

function init() {
  document
    .querySelector(".calculator")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}

function rerender() {
  write.innerText = screen;
}

init();
