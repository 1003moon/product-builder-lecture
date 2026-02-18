class LottoNumber extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const number = this.getAttribute('number');
        const color = this.getAttribute('color');

        const circle = document.createElement('div');
        circle.style.width = '50px';
        circle.style.height = '50px';
        circle.style.borderRadius = '50%';
        circle.style.backgroundColor = color;
        circle.style.display = 'flex';
        circle.style.justifyContent = 'center';
        circle.style.alignItems = 'center';
        circle.style.color = 'white';
        circle.style.fontSize = '1.5rem';
        circle.style.fontWeight = 'bold';
        circle.textContent = number;

        shadow.appendChild(circle);
    }
}

customElements.define('lotto-number', LottoNumber);

document.getElementById('generate-btn').addEventListener('click', () => {
    const lottoNumbersContainer = document.getElementById('lotto-numbers-container');
    lottoNumbersContainer.innerHTML = '';
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    sortedNumbers.forEach(number => {
        const lottoNumberElement = document.createElement('lotto-number');
        lottoNumberElement.setAttribute('number', number);
        lottoNumberElement.setAttribute('color', getNumberColor(number));
        lottoNumbersContainer.appendChild(lottoNumberElement);
    });
});

function getNumberColor(number) {
    if (number <= 10) return '#fbc400'; // Yellow
    if (number <= 20) return '#69c8f2'; // Blue
    if (number <= 30) return '#ff7272'; // Red
    if (number <= 40) return '#aaa'; // Gray
    return '#b0d840'; // Green
}