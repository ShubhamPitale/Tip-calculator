"use strict";
const billInput = document.getElementById("bill");
const peopleInput = document.getElementById("people");
const customInput = document.getElementById("tip-6");
const tipDisplay = document.querySelector(".display__tip--amount");
const totalDisplay = document.querySelector(".display__total--amount");
const resetBtn = document.querySelector(".reset");
const tips = document.querySelectorAll(".tip");
const mainBill = document.querySelector(".main__bill");
const mainPeople = document.querySelector(".main__numofpeople");
const smalls = document.querySelectorAll("small");
let t;
const init = function () {
  resetBtn.style.backgroundColor = "hsl(182, 50%, 31%)";

  billInput.value = 0;
  peopleInput.value = 1;
  calcTip(0, true);
  billInput.value = "";
  peopleInput.value = "";
  customInput.value = "";
  billInput.parentElement.classList.remove("success");
  billInput.parentElement.classList.remove("error");
  peopleInput.parentElement.classList.remove("success");
  peopleInput.parentElement.classList.remove("error");
  smalls.forEach((small) => (small.innerText = ""));
  clearTimeout(t);
};
const checkInput = function (input) {
  if (input.value <= 0) {
    let small =
      input === billInput
        ? mainBill.querySelector("small")
        : mainPeople.querySelector("small");
    console.log(input.parentElement);
    input.parentElement.classList.add("error");
    small.innerText = "Can't be zero";
    t = setTimeout(init, 2000);
    return false;
  } else {
    input.parentElement.classList.add("success");
    return true;
  }
};

const calcTip = function (per, state) {
  if (!((checkInput(billInput) && checkInput(peopleInput)) || state)) return;
  //   console.log((billInput.value > 0 && peopleInput.value > 0) || state);
  if (!((billInput.value > 0 && peopleInput.value > 0) || state)) return;
  const tip = (billInput.value * per) / 100 / peopleInput.value;
  const total = billInput.value / peopleInput.value + tip;
  tipDisplay.innerHTML = `$${tip.toFixed(2)}`;
  totalDisplay.innerHTML = `$${total.toFixed(2)}`;
};

const customTip = function () {
  let custom = customInput.value;
  calcTip(custom, false);
};

tips.forEach((tip) => {
  tip.addEventListener("click", function (e) {
    checkInput(billInput);
    checkInput(peopleInput);
    if (!(checkInput(billInput) && checkInput(peopleInput))) return;

    resetBtn.style.backgroundColor = "hsl(172, 67%, 45%)";
  });
});
const resetBcg = function () {
  resetBtn.style.backgroundColor = "hsl(182, 50%, 31%)";
};
const resetHoverBcg = function () {
  resetBtn.style.backgroundColor = "hsl(172, 77%, 71%)";
};
resetBtn.addEventListener("click", init);
