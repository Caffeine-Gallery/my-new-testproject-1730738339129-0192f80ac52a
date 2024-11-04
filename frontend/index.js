import { backend } from 'declarations/backend';

let display = document.getElementById('display');
let calculating = false;

window.appendToDisplay = (value) => {
    if (calculating) {
        display.value = value;
        calculating = false;
    } else {
        display.value += value;
    }
};

window.clearDisplay = () => {
    display.value = '';
};

window.calculate = async () => {
    try {
        calculating = true;
        const expression = display.value;
        const [num1, operator, num2] = expression.match(/(-?\d+\.?\d*)([\+\-\*\/])(-?\d+\.?\d*)/).slice(1);
        
        let result;
        switch (operator) {
            case '+':
                result = await backend.add(parseFloat(num1), parseFloat(num2));
                break;
            case '-':
                result = await backend.subtract(parseFloat(num1), parseFloat(num2));
                break;
            case '*':
                result = await backend.multiply(parseFloat(num1), parseFloat(num2));
                break;
            case '/':
                result = await backend.divide(parseFloat(num1), parseFloat(num2));
                break;
        }
        
        display.value = result.toString();
    } catch (error) {
        display.value = 'Error';
    }
};
