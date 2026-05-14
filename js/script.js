let billPrice = 0;
let tipPercent = 0;
let people = 1;

const buttons = document.querySelectorAll(".button-tip-choices");
const billInput = document.getElementById("bill");
const numberOfPeopleInput = document.getElementById("number-of-people");
const customTipInput = document.getElementById("custom-tip-input");
const errorMessage = document.querySelector(".error-message");
const resetButton = document.querySelector(".reset-button");
const tipAmountOutput = document.getElementById("tip-amount-per-person");
const totalOutput = document.getElementById("total-per-person");
resetButton.disabled = true;

function updateCalculator() {
    const hasValues = billPrice > 0 || tipPercent > 0  || people > 0 || billInput.value !== "" || customTipInput.value !== "";
    resetButton.disabled = !hasValues;

    if (people > 0) {
        const resultTipPerPerson = billPrice * tipPercent / people;
        const resultTotalPerPerson = (billPrice + resultTipPerPerson * people) / people;
        tipAmountOutput.textContent = "$" + resultTipPerPerson.toFixed(2);
        totalOutput.textContent = "$" + resultTotalPerPerson.toFixed(2);
        numberOfPeopleInput.classList.remove("error");
        errorMessage.classList.remove("show-error");
    }
    else {
        numberOfPeopleInput.classList.add("error");
        errorMessage.classList.add("show-error");
    }
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        buttons.forEach((button) => {
            button.classList.remove("active");
        });
        button.classList.add("active");
        customTipInput.value = "";
        tipPercent = Number(button.textContent.replace("%", "")) / 100;
        updateCalculator();
    });
});

if (billInput) {
    billInput.addEventListener("input", () => {
        billPrice = Math.max(0, Number(billInput.value));
        updateCalculator();
    });
}

if (numberOfPeopleInput) {
    numberOfPeopleInput.addEventListener("input", () => {
        people = Math.max(0, Number(numberOfPeopleInput.value));
        updateCalculator();
    });
}

if (customTipInput) {
    customTipInput.addEventListener("input", () => {
        buttons.forEach((button) => {
            button.classList.remove("active");
        });
        tipPercent = Number(customTipInput.value) / 100;
        updateCalculator();
    });
}

if (resetButton) {
    resetButton.addEventListener("click", () => {
        billPrice = 0;
        tipPercent = 0;
        people = 1;

        billInput.value = "";
        numberOfPeopleInput.value = "";
        customTipInput.value = "";

        tipAmountOutput.textContent = "$0.00";
        totalOutput.textContent = "$0.00";

        buttons.forEach((button) => {
            button.classList.remove("active");
        });

        numberOfPeopleInput.classList.remove("error");
        document.querySelector(".error-message").classList.remove("show-error");
        resetButton.disabled = true;
    });
}

