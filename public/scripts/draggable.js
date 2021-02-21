const dragArea = document.querySelector('.fakeMenu');
const dragItem = document.querySelector('.drag-item');
const container = document.querySelector('.drag-container');
const closeBtn = document.querySelector('.fakeClose');
const minimizeBtn = document.querySelector('.fakeMinimize');
const maximizeBtn = document.querySelector('.fakeZoom');
const shortcut1 = document.querySelector('.shortcut-1');
const shortcut2 = document.querySelector('.shortcut-2');
const shortcut3 = document.querySelector('.shortcut-3');
let active = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

function sleep(ms) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve();
		}, ms);
	});
}

function dragStart(e) {
	if (e.type === 'touchstart') {
		initialX = e.touches[0].clientX - xOffset;
		initialY = e.touches[0].clientY - yOffset;
	} else {
		initialX = e.clientX - xOffset;
		initialY = e.clientY - yOffset;
	}

	if (e.target === dragArea) {
		active = true;
	}
}

function dragEnd(e) {
	initialX = currentX;
	initialY = currentY;
	active = false;
}

function drag(e) {
	if (active) {
		e.preventDefault();

		if (e.type === 'touchmove') {
			currentX = e.touches[0].clientX - initialX;
			currentY = e.touches[0].clientY - initialY;
		} else {
			currentX = e.clientX - initialX;
			currentY = e.clientY - initialY;
		}

		xOffset = currentX;
		yOffset = currentY;

		setTranslate(currentX, currentY, dragItem);
	}
}

function setTranslate(xPos, yPos, el) {
	el.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0)';
}

function offScreen(e) {
	active = false;
}

function fullscreen(e) {
	dragItem.classList.toggle('fullscreen');
}

function close(e) {
	if (dragItem.classList.contains('fullscreen')) {
		dragItem.classList.remove('fullscreen');
	}
	dragItem.classList.add('minimize');
}

async function newTerminal(e) {
	dragItem.classList.remove('minimize');
}

container.addEventListener('touchstart', dragStart, false);
container.addEventListener('touchend', dragEnd, false);
container.addEventListener('touchmove', drag, false);

container.addEventListener('mousedown', dragStart, false);
container.addEventListener('mouseup', dragEnd, false);
container.addEventListener('mousemove', drag, false);
container.addEventListener('mouseleave', offScreen, false);

closeBtn.addEventListener('click', close, false);
minimizeBtn.addEventListener('click', close, false);
shortcut1.addEventListener('click', newTerminal, false);
maximizeBtn.addEventListener('click', fullscreen, false);
