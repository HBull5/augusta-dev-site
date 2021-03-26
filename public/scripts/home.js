const body = document.querySelector('body');
const windowDisplay = document.querySelector('#window-display');
const terminal = document.querySelector('#terminal');
const windowBox = document.querySelector('.window');
const muteBtn = document.querySelector('.mute-btn');
const asci1 = `   ___                     __         ___          `;
const asci2 = `  / _ |__ _____ ___ _____ / /____ _  / _ \\___ _  __`;
const asci3 = ` / __ / // / _ \`/ // (_- / __/ _ \`/ / // / -_) |/ /`;
const asci4 = `/_/ |_\\_,_/\\_, /\\_,_/___/\\__/\\_,_/ /____/\\__/|___/ `;
const asci5 = `          /___/                                    `;
let loadingBar = '[>-----------------------------------------------]';
const txtCommands = [
	'FORCE: XX0022. ENCYPT://000.222.2345',
	'TRYPASS: ********* AUTH CODE: ALPHA GAMMA: 1___ PRIORITY 1',
	'RETRY: REINDEER FLOTILLA',
	'Z:> /FALKEN/GAMES/TICTACTOE/ EXECUTE -PLAYERS 0',
	'================================================',
	'Priority 1 // local / scanning...',
	'scanning ports...',
	'BACKDOOR FOUND (23.45.23.12.00000000)',
	'BACKDOOR FOUND (13.66.23.12.00110000)',
	'BACKDOOR FOUND (13.66.23.12.00110044)',
	'...',
	'...',
	'BRUTE.EXE -r -z',
	'...locating vulnerabilities...',
	'...vulnerabilities found...',
	'MCP/> DEPLOY CLU',
	'SCAN: __ 0100.0000.0554.0080',
	'SCAN: __ 0020.0000.0553.0080',
	'SCAN: __ 0001.0000.0554.0550',
	'SCAN: __ 0012.0000.0553.0030',
	'SCAN: __ 0100.0000.0554.0080',
	'SCAN: __ 0020.0000.0553.0080'
];
let booted = false;
let muted = false;
const bootAudio = new Audio('public/audio/boot.mp3');
const netAudio = new Audio('public/audio/dial_up.mp3');

function sleep(ms) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve();
		}, ms);
	});
}

function mute() {
	bootAudio.volume = 0;
	netAudio.volume = 0;
}

function unmute() {
	bootAudio.volume = 0.2;
	netAudio.volume = 0.1;
}

function replaceAt(string, index, replacement) {
	return string.substr(0, index) + replacement + string.substr(index + replacement.length);
}

async function playModemNoise() {
	while (!muted) {
		netAudio.volume = 0.1;
		netAudio.play();
		await sleep(70000);
	}
}

muteBtn.addEventListener('click', async () => {
	if (!muted) {
		mute();
		muted = true;
		muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
	} else {
		unmute();
		muted = false;
		muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
	}
});

body.addEventListener('click', async () => {
	if (!booted) {
		booted = true;
		bootAudio.volume = 0.2;
		bootAudio.play();
		await sleep(1000);
		windowDisplay.classList.remove('minimize');
		await sleep(400);
		windowDisplay.classList.remove('transition');
		terminal.innerHTML = `<pre>${asci1}</pre>`;
		terminal.innerHTML += `<pre>${asci2}</pre>`;
		terminal.innerHTML += `<pre>${asci3}</pre>`;
		terminal.innerHTML += `<pre>${asci4}</pre>`;
		terminal.innerHTML += `<pre>${asci5}</pre>`;
		terminal.innerHTML += `<p>${loadingBar}</p>`;
		for (let i = 1; i < loadingBar.length; i++) {
			if (loadingBar[i] === '>') {
				loadingBar = replaceAt(loadingBar, i + 1, '>');
				loadingBar = replaceAt(loadingBar, i, '=');
				terminal.innerHTML = `<pre>${asci1}</pre>`;
				terminal.innerHTML += `<pre>${asci2}</pre>`;
				terminal.innerHTML += `<pre>${asci3}</pre>`;
				terminal.innerHTML += `<pre>${asci4}</pre>`;
				terminal.innerHTML += `<pre>${asci5}</pre>`;
				terminal.innerHTML += `<p>${loadingBar}</p>`;
				windowBox.scrollTop = windowBox.scrollHeight;
				if (loadingBar[i + 2] === ']') {
					break;
				}
			}
			await sleep(50);
		}
		await sleep(1000);
		for (const txtCommand of txtCommands) {
			terminal.innerHTML += `<p>${txtCommand}</p>`;
			windowBox.scrollTop = windowBox.scrollHeight;
			await sleep(100);
		}
		playModemNoise();
	}
});
