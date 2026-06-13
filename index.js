document.addEventListener('DOMContentLoaded', () => {

    // 1. БАЗА ДАНИХ (Масив об'єктів)
    const questionsData = {
        easy: [
           { question: "Яка столиця України?", answers: ["Варшава", "Київ", "Прага", "Будапешт"], correct: 1},
           { question: "Найбільший океан:", answers: ["Атлантичний", "Індійський", "Тихий", "Південний"], correct: 2},
           { question: "Яка країна має форму «чобота»", answers: ["Франція", "Італія", "Іспанія", "Греція"], correct: 1},
           { question: "Найвища гора світу:", answers: ["Монблан", "Говерла", "Еверест", "Кіліманджаро"], correct: 2},
           { question: "Який материк найбільший?", answers: ["Африка", "Європа", "Азія", "Австралія"], correct: 2}
        ],
        
        medium: [
           { question: "Яка країна має найбільше населення у світі?", answers: ["Індія", "Китай", "США", "Індонезія"], correct: 0},
           { question: "Яка пустеля найбільша у світі?", answers: ["Гобі", "Сахара", "Антарктична пустеля","Атакама"], correct: 2},
           { question: "Яка річка протікає через Лондон?", answers: ["Сена", "Темза", "Рейн", "Дніпро"], correct: 1},
           { question: "Яка країна має форму “чобота”?", answers: ["Іспанія", "Італія", "Греція", "Португалія"], correct: 1}, 
           { question: "Який материк є найменшим?", answers: ["Європа", "Австралія", "Антарктида", "Африка"], correct: 1},
        ],
        
        hard: [
            { question: "Яка найглибша точка Світового океану?", answers: ["Жолоб Пуерто-Ріко", "Маріанська западина", "Яванський жолоб", "Перуанський жолоб"], correct: 1},
            { question: "Яка країна має найбільшу кількість часових поясів?", answers: ["США", "Китай", "Франція", "Росія"], correct: 2},
            { question: "Яке озеро є найглибшим у світі?", answers: ["Вікторія", "Байкал", "Мічиган", "Танганьїка"], correct: 1},
            { question: "Яка країна НЕ має виходу до моря?", answers: ["Молдова", "Еритрея", "Мозамбік", "М'янма"], correct: 0},
            { question: "Яка країна має найбільшу кількість сусідів?", answers: ["Китай", "Росія", "Німеччина", "Бразилія"], correct: 0},
        ]
    }
    let questions = [];

    // Створення елементів
    const startScreen = document.querySelector('#start-screen');
    const quizScreen = document.querySelector('#quiz-screen');
    const resultScreen = document.querySelector('#result-screen');
    const startBtn = document.querySelector('#start-btn');
    const restartBtn = document.querySelector('#restart-btn');
    const resultText = document.querySelector('.result-text');
    const questionText = document.querySelector('#question-text');
    const answersContainer = document.querySelector('#answers-container');
    const timerDisplay = document.querySelector('#timer');
    const scoreDisplay = document.querySelector('#score-display');
    const difficultySelect = document.querySelector('#difficulty');
    const highScoreDisplay = document.querySelector('#high-score');

    let questionIndex = 0;
    let score = 0;
    let timer = 15;
    let interval;

    // Завантаження рекорду
    function loadHighScore() {
        const savedScore = localStorage.getItem('cosmicHighScore') || 0;
        if (highScoreDisplay) highScoreDisplay.innerText = `Рекорд: ${savedScore}`;
    }
    loadHighScore();

    // Функція для відображення запитання
    function showQuestion(question) {

        clearInterval(interval);
        startTimer();

        answersContainer.innerHTML = '';
        questionText.innerText = question.question;
        for (let i = 0; i < question.answers.length; i++) {
            const button = document.createElement('button');
            button.innerText = question.answers[i];
            button.classList.add('answer-btn');
            button.addEventListener('click', () => checkAnswer(button, i));
            answersContainer.appendChild(button);

        }
    }

    function nextQuestion() {
        questionIndex++;
        if (questionIndex < questions.length) {
            showQuestion(questions[questionIndex]);
        } else {
            showResult();
        }
    }

    function checkAnswer(button, i) {
        if (i == questions[questionIndex].correct) {
            score++;
            button.classList.add('correct');
        } else {
            button.classList.add('wrong');
        }
        scoreDisplay.innerText = `Бали: ${score}`;

        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.disabled = true;
        })

        setTimeout(nextQuestion, 1000);
    }


    function showResult() {
        const accuracy = Math.round((score / questions.length) * 100);
        resultText.innerText = `Твій результат: ${score}/${questions.length} (${accuracy}%)`;

        const savedScore = localStorage.getItem('cosmicHighScore') || 0;
        if (score > savedScore) {
            localStorage.setItem('cosmicHighScore', score);
            resultText.innerText += "\nНОВИЙ РЕКОРД! 🚀";
        }

        quizScreen.classList.add('hide');
        resultScreen.classList.remove('hide');
    }

    function startGame() {
        const difficulty = difficultySelect.value;
        questions = questionsData[difficulty];

        startScreen.classList.add('hide');
        resultScreen.classList.add('hide');
        quizScreen.classList.remove('hide');
        questionIndex = 0;
        score = 0;
        scoreDisplay.innerText = `Бали: 0`;
        showQuestion(questions[questionIndex]);
    }

    startBtn.addEventListener('click', startGame);


    function startTimer() {
        timer = 15;
        timerDisplay.innerText = `Час: ${timer}`;
        interval = setInterval(() => {
            timer--;
            timerDisplay.innerText = `Час: ${timer}`;
            if (timer <= 0) {
                clearInterval(interval);
                nextQuestion();
            }
        }, 1000);
    }

    restartBtn.addEventListener('click', () => {
        loadHighScore();
        resultScreen.classList.add('hide');
        startScreen.classList.remove('hide');
    });

});
