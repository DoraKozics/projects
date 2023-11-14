document.addEventListener("DOMContentLoaded", () => {
    let number1 = document.getElementById("number1");
    let number2 = document.getElementById("number2");
    let result = document.getElementById("result");

    document.getElementById("add").onclick = () =>
        result.innerHTML = +number1.value + +number2.value;

    document.getElementById("substract").onclick = () =>
        result.innerHTML = number1.value - number2.value;

    document.getElementById("multiply").onclick = () =>
        result.innerHTML = number1.value * number2.value;

    document.getElementById("divide").onclick = () =>
        result.innerHTML = number1.value / number2.value;
})