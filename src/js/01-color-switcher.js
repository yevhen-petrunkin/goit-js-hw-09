const colorSwitcher = {
  colorSwitchId: null,
  bodyRef: document.querySelector('body'),
  startBtnRef: document.querySelector('button[data-start]'),
  stopBtnRef: document.querySelector('button[data-stop]'),
};

colorSwitcher.startBtnRef.addEventListener('click', onStartBtnClick);
colorSwitcher.stopBtnRef.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  colorSwitcher.startBtnRef.setAttribute('disabled', '');
  colorSwitcher.colorSwitchId = setInterval(
    () => (colorSwitcher.bodyRef.style.backgroundColor = getRandomHexColor()),
    1000
  );
}

function onStopBtnClick() {
  colorSwitcher.startBtnRef.removeAttribute('disabled');
  clearInterval(colorSwitcher.colorSwitchId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
