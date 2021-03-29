const body = document.querySelector("body");
const windowDisplay = document.querySelector("#window-display");
const terminalEl = document.querySelector("#terminal");
const windowBox = document.querySelector(".window");

let booted = false;
const bootAudio = new Audio("public/audio/boot.mp3");
const netAudio = new Audio("public/audio/dial_up.mp3");
const terminalPrinter = (text) => {
  terminalEl.innerHTML += `<p>${text}</p>`;
};

const terminalInput = () => {
  const input = `<div>/> <input id="cliInput" /></div>`;
  terminalEl.innerHTML += input;
};

function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
function replaceAt(string, index, replacement) {
  return (
    string.substr(0, index) +
    replacement +
    string.substr(index + replacement.length)
  );
}

async function playModemNoise() {
  while (true) {
    netAudio.volume = 0.1;
    netAudio.play();
    await sleep(70000);
  }
}

jQuery(function ($, undefined) {
  home();
});
