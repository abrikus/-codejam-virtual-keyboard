import './style.css';
import kdbkeys from './keys.js';

const createEl = (tag, cls, addTo, tagvalue) => {
  const el = document.createElement(tag);
  if (cls != null) {
    el.setAttribute('class', cls);
  }
  if (tagvalue != null) {
    el.innerText = tagvalue;
  }

  addTo.append(el);
  return el;
};

const body = document.querySelector('body');
const root = createEl('div', 'root', body, null);
const wrapper = createEl('div', 'wrapper', root, null);
const textArea = createEl('textarea', null, wrapper, null);
const kbdContainer = createEl('div', 'keyboard', wrapper, null);


kdbkeys.forEach((row) => {
  const sectionRow = createEl('section', 'key-row', kbdContainer, null);
  row.forEach((keyItem) => {
    const keyDiv = createEl('div', keyItem[0], sectionRow, keyItem[2]);
    keyDiv.setAttribute('data-action', keyItem[1]);
  });
});

const keyDownListener = (event) => {
  event.preventDefault();
  let someKey;
  let setValue;
  if (event.code) {
    someKey = document.querySelector(`div[data-action=${event.code}]`);
    setValue = event.key;
  }

  if (event.target.hasAttribute('data-action')) {
    someKey = event.target;
    setValue = someKey.innerText;
  }

  if (someKey.getAttribute('data-action') === 'ShiftLeft'
    || someKey.getAttribute('data-action') === 'ShiftRight'
    || someKey.getAttribute('data-action') === 'ControlLeft'
    || someKey.getAttribute('data-action') === 'ControlRight'
    || someKey.getAttribute('data-action') === 'AltLeft') {
    textArea.value += '';
    someKey.classList.toggle('active');
  } else if (someKey.getAttribute('data-action') === 'Tab') {
    textArea.value += ' '.repeat(4);
    someKey.classList.toggle('active');
  } else if (someKey.getAttribute('data-action') === 'Enter') {
    textArea.value += '\n';
    someKey.classList.toggle('active');
  } else if (someKey.getAttribute('data-action') === 'Space') {
    textArea.value += ' ';
    someKey.classList.toggle('active');
  } else {
    textArea.value += setValue;
    someKey.classList.toggle('active');
  }
};

const keyUpListener = (event) => {
  event.preventDefault();
  let someKey;
  if (event.code === undefined) {
    someKey = event.target;
  } else {
    someKey = document.querySelector(`div[data-action=${event.code}]`);
  }
  someKey.classList.toggle('active');
};

document.addEventListener('keydown', keyDownListener);
document.addEventListener('keyup', keyUpListener);
document.addEventListener('mousedown', keyDownListener);
document.addEventListener('mouseup', keyUpListener);
