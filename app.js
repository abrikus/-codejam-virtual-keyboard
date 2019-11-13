import './style.css';
import kbdkeys from './keys';

const states = {
  firedKey: null,
  ControlLeft: false,
  AltLeft: false,
  ShiftLeft: false,
  lang: 'ru',
};

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

const changeLang = (kbdKeysInst) => {
  const { lang, ShiftLeft } = states;
  if (lang === 'en' && ShiftLeft === false) {
    kbdKeysInst.forEach((keyGroup) => {
      keyGroup.forEach((key) => {
        const keyCurrent = document.querySelector(`div[data-action=${key[1]}]`);
        global.console.log(key[1]);
        const keyRu = key[2];
        keyCurrent.innerText = keyRu;
      });
    });
    states.lang = 'ru';
  }

  if (lang === 'en' && ShiftLeft === true) {
    kbdKeysInst.forEach((keyGroup) => {
      keyGroup.forEach((key) => {
        const keyCurrent = document.querySelector(`div[data-action=${key[1]}]`);
        global.console.log(key[1]);
        const keyRu = key[3];
        keyCurrent.innerText = keyRu;
      });
    });
    states.lang = 'ru';
  }

  if (lang === 'ru' && ShiftLeft === false) {
    kbdKeysInst.forEach((keyGroup) => {
      keyGroup.forEach((key) => {
        const keyCurrent = document.querySelector(`div[data-action=${key[1]}]`);
        global.console.log(key[1]);
        const keyEn = key[4];
        keyCurrent.innerText = keyEn;
      });
    });
    states.lang = 'en';
  }

  if (lang === 'ru' && ShiftLeft === true) {
    kbdKeysInst.forEach((keyGroup) => {
      keyGroup.forEach((key) => {
        const keyCurrent = document.querySelector(`div[data-action=${key[1]}]`);
        global.console.log(key[1]);
        const keyEn = key[5];
        keyCurrent.innerText = keyEn;
      });
    });
    states.lang = 'en';
  }
};

const shiftUpper = (kbdKeysInst) => {
  const { lang, ShiftLeft } = states;
  if (lang === 'ru' && ShiftLeft === true) {
    kbdKeysInst.forEach((keyGroup) => {
      keyGroup.forEach((key) => {
        const keyCurrent = document.querySelector(`div[data-action=${key[1]}]`);
        const keyRu = key[3];
        keyCurrent.innerText = keyRu;
      });
    });
  }

  if (lang === 'ru' && ShiftLeft === false) {
    kbdKeysInst.forEach((keyGroup) => {
      keyGroup.forEach((key) => {
        const keyCurrent = document.querySelector(`div[data-action=${key[1]}]`);
        const keyRu = key[2];
        keyCurrent.innerText = keyRu;
      });
    });
  }

  if (lang === 'en' && ShiftLeft === true) {
    kbdKeysInst.forEach((keyGroup) => {
      keyGroup.forEach((key) => {
        const keyCurrent = document.querySelector(`div[data-action=${key[1]}]`);
        const keyEn = key[5];
        keyCurrent.innerText = keyEn;
      });
    });
  }

  if (lang === 'en' && ShiftLeft === false) {
    kbdKeysInst.forEach((keyGroup) => {
      keyGroup.forEach((key) => {
        const keyCurrent = document.querySelector(`div[data-action=${key[1]}]`);
        const keyEn = key[4];
        keyCurrent.innerText = keyEn;
      });
    });
  }
};

const body = document.querySelector('body');
const root = createEl('div', 'root', body, null);
const wrapper = createEl('div', 'wrapper', root, null);
const textArea = createEl('textarea', null, wrapper, null);
const kbdContainer = createEl('div', 'keyboard', wrapper, null);


kbdkeys.forEach((row) => {
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
    global.console.log(event.target);
    someKey = event.target;
    setValue = someKey.innerText;
  }

  if (someKey) {
    if (states.firedKey !== null) {
      states.firedKey.classList.remove('active');
      states.firedKey = someKey;
    } else {
      states.firedKey = someKey;
    }
    if (someKey.getAttribute('data-action') === 'ShiftLeft'
    || someKey.getAttribute('data-action') === 'ControlLeft'
    || someKey.getAttribute('data-action') === 'AltLeft') {
      const elAdv = someKey;
      const { ShiftLeft, ControlLeft, AltLeft } = states;
      if (elAdv.getAttribute('data-action') === 'ShiftLeft') {
        if (ShiftLeft === true) {
          states.ShiftLeft = false;
          elAdv.classList.toggle('active');
        }
        if (ShiftLeft === false) {
          states.ShiftLeft = true;
          elAdv.classList.toggle('active');
        }
        shiftUpper(kbdkeys);
      }

      if (elAdv.getAttribute('data-action') === 'ControlLeft') {
        if (ControlLeft === true) {
          states.ControlLeft = false;
          elAdv.classList.toggle('active');
        }

        if (ControlLeft === false) {
          states.ControlLeft = true;
          elAdv.classList.toggle('active');
          if (AltLeft === true) {
            changeLang(kbdkeys);
            states.ControlLeft = false;
            states.AltLeft = false;
          }
        }
      }

      if (elAdv.getAttribute('data-action') === 'AltLeft') {
        if (AltLeft === true) {
          states.AltLeft = false;
          elAdv.classList.toggle('active');
        }

        if (AltLeft === false) {
          states.AltLeft = true;
          elAdv.classList.toggle('active');
          if (ControlLeft === true) {
            changeLang(kbdkeys);
            states.ControlLeft = false;
            states.AltLeft = false;
          }
        }
      }

      global.console.log(states);
    } else if (someKey.getAttribute('data-action') === 'Tab') {
      textArea.value += ' '.repeat(4);
      someKey.classList.toggle('active');
    } else if (someKey.getAttribute('data-action') === 'Enter') {
      textArea.value += '\n';
      someKey.classList.toggle('active');
    } else if (someKey.getAttribute('data-action') === 'Space') {
      textArea.value += ' ';
      someKey.classList.toggle('active');
    } else if (someKey.classList.contains('key')) {
      textArea.value += setValue;
      someKey.classList.toggle('active');
    }
  }
};

const keyUpListener = () => {
  let { firedKey } = states;
  if (firedKey !== null) {
    firedKey.classList.toggle('active');
    firedKey = null;
  }
};

window.addEventListener('keydown', keyDownListener);
window.addEventListener('keyup', keyUpListener);
kbdContainer.addEventListener('mousedown', keyDownListener);
kbdContainer.addEventListener('mouseup', keyUpListener);
