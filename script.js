"use strict";
// Elements
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
//Functions
// This functions initialize all the input , display of buttons and removes some classes .
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
//This function checks input given so that none of the input is zero or less than zero.
// And if it is zero then we display a error message
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
//This function carry outs the main functionality of the app of getting the tip and total .
const calcTip = function (per, state) {
  if (!((checkInput(billInput) && checkInput(peopleInput)) || state)) return;
  if (!((billInput.value > 0 && peopleInput.value > 0) || state)) return;
  const tip = (billInput.value * per) / 100 / peopleInput.value;
  const total = billInput.value / peopleInput.value + tip;
  tipDisplay.innerHTML = `$${tip.toFixed(2)}`;
  totalDisplay.innerHTML = `$${total.toFixed(2)}`;
};
//For custom tip input
const customTip = function () {
  let custom = customInput.value;
  calcTip(custom, false);
};
//Function which adds eventlistener to all tips present in the grid
tips.forEach((tip) => {
  tip.addEventListener("click", function (e) {
    checkInput(billInput);
    checkInput(peopleInput);
    if (!(checkInput(billInput) && checkInput(peopleInput))) return;
    resetBtn.style.backgroundColor = "hsl(172, 67%, 45%)";
  });
});
//These are some function which are called when mouse is over or out of the reset button.
const resetBcg = function () {
  resetBtn.style.backgroundColor = "hsl(182, 50%, 31%)";
};
const resetHoverBcg = function () {
  resetBtn.style.backgroundColor = "hsl(172, 77%, 71%)";
};
//After clicking reset button then init funcion is called.
resetBtn.addEventListener("click", init);
