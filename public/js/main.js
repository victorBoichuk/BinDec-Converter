let lastPosition = 0;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("addBit").onclick = () => {
    clearDisplay();
    const newButton = document.createElement("button");

    newButton.dataset.bit = "true";
    newButton.dataset.position = lastPosition;
    newButton.innerText = 0;

    document.body.appendChild(newButton);
    lastPosition++;
  };

  document.addEventListener("click", (event) => {
    if (event.target.dataset.bit) {
      let value = event.target.innerText;
      event.target.innerText = value === "1" ? "0" : "1";
    }
  });

  document.getElementById("calculate").onclick = () => {
    let bits = document.querySelectorAll('[data-bit="true"]');
    let result = 0;

    bits.forEach((element) => {
      const degree = lastPosition - 1 - Number(element.dataset.position);
      result += Number(element.innerText) * 2 ** degree;
    });

    let resultElement = document.getElementById("result");

    if (resultElement) {
      resultElement.innerText = `The result is: ${result}`;
    } else {
      const newElement = document.createElement("div");

      newElement.innerText = `The result is: ${result}`;
      newElement.id = "result";

      document.body.appendChild(newElement);
    }
  };

  document.getElementById("removeBit").onclick = () => {
    let bits = document.querySelectorAll('[data-bit="true"]');

    if (bits.length > 0) {
      bits[bits.length - 1].remove();
      lastPosition--;
    }
  };
});

function clearDisplay() {
  const resultElement = document.getElementById("result");

  if (document.getElementById("result")) {
    document.querySelectorAll('[data-bit="true"]').forEach((element) => {
      element.parentNode.removeChild(element);
    });

    resultElement.remove();
  }
}
