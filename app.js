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
        const keyDiv = createEl('div', `${keyItem[0]}`, sectionRow, keyItem[2]);
    });
});

const keyDownListener = (event) => {};

const KeyUpListener = (event) => {};

