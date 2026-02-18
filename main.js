document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggleBtn.textContent = '☀️'; // Sun icon for dark mode
    } else {
        themeToggleBtn.textContent = '🌙'; // Moon icon for light mode
    }

    // Toggle theme on button click
    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            themeToggleBtn.textContent = '☀️'; // Changed to sun icon
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggleBtn.textContent = '🌙'; // Changed to moon icon
            localStorage.setItem('theme', 'light');
        }
    });

    document.getElementById('generate-btn').addEventListener('click', function() {
        const container = document.getElementById('lotto-numbers-container');
        container.innerHTML = ''; // 이전 번호 삭제

        let numbers = [];

        // 1~45 중복 없는 숫자 6개 추출
        while(numbers.length < 6) {
            let randNum = Math.floor(Math.random() * 45) + 1;
            if(!numbers.includes(randNum)) {
                numbers.push(randNum);
            }
        }

        // 번호를 보기 좋게 오름차순 정렬
        numbers.sort((a, b) => a - b);

        // 공 생성 및 화면 표시
        numbers.forEach(num => {
            const ball = document.createElement('div');
            ball.classList.add('ball');
            ball.textContent = num;
            
            // 실제 로또 색상 규칙 적용
            if (num <= 10) ball.style.backgroundColor = '#fbc400'; // 노란색
            else if (num <= 20) ball.style.backgroundColor = '#69c8f2'; // 파란색
            else if (num <= 30) ball.style.backgroundColor = '#ff7272'; // 빨간색
            else if (num <= 40) ball.style.backgroundColor = '#aaa'; // 회색
            else ball.style.backgroundColor = '#b0d840'; // 초록색

            container.appendChild(ball);
        });
    });
});