document.addEventListener("DOMContentLoaded", function() {
    let canvas = document.getElementById("gameCanvas");
    let ctx = canvas.getContext("2d");
    let scoreElem = document.getElementById("score");
    let livesElem = document.getElementById("lives");

    let paddleX = canvas.width / 2 - 35;
    let ballX = canvas.width / 2;
    let ballY = canvas.height - 30;
    let ballDirX = 2;
    let ballDirY = -2;
    let score = 0;
    let lives = 3;
    let rightPressed = false;
    let leftPressed = false;

    canvas.width = 480;
    canvas.height = 320;

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    function keyDownHandler(e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = true;
        } else if (e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = true;
        }
    }

    function keyUpHandler(e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = false;
        } else if (e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = false;
        }
    }

    function drawBall() {
        ctx.beginPath();
        ctx.arc(ballX, ballY, 10, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height - 10, 70, 10);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        drawPaddle();
        ballX += ballDirX;
        ballY += ballDirY;

        if (ballX + ballDirX > canvas.width - 10 || ballX + ballDirX < 10) {
            ballDirX = -ballDirX;
        }
        if (ballY + ballDirY < 10) {
            ballDirY = -ballDirY;
        } else if (ballY + ballDirY > canvas.height - 10) {
            if (ballX > paddleX && ballX < paddleX + 70) {
                ballDirY = -ballDirY;
                score++;
                scoreElem.textContent = score;
            } else {
                lives--;
                livesElem.textContent = lives;
                if (!lives) {
                    alert("GAME OVER");
                    document.location.reload();
                } else {
                    ballX = canvas.width / 2;
                    ballY = canvas.height - 30;
                    ballDirX = 2;
                    ballDirY = -2;
                }
            }
        }

        if (rightPressed && paddleX < canvas.width - 70) {
            paddleX += 7;
        } else if (leftPressed && paddleX > 0) {
            paddleX -= 7;
        }

        requestAnimationFrame(draw);
    }

    function showBallBlitz() {
        document.getElementById("menu").style.display = "none";
        document.getElementById("ballBlitz").style.display = "block";
        draw();
    }

    function showMathQuiz() {
        document.getElementById("menu").style.display = "none";
        document.getElementById("mathQuiz").style.display = "block";
        loadQuiz();
    }

    function showMenu() {
        document.getElementById("menu").style.display = "block";
        document.getElementById("ballBlitz").style.display = "none";
        document.getElementById("mathQuiz").style.display = "none";
    }

    function exitGame() {
        window.close();
    }

    let questions = [
        {
            question: "Q1) 40x40=___?",
            options: ["a) 1600", "b) 1400", "c) 1200", "d) 1000"],
            answer: "a"
        },
        {
            question: "Q2) 999-33-87-100=___?",
            options: ["a) 789", "b) 779", "c) 769", "d) 759"],
            answer: "b"
        },
        {
            question: "Q3) What is 22+47?",
            options: ["a) 68", "b) 69", "c) 70", "d) 71"],
            answer: "b"
        },
        {
            question: "Q4) To stay in a hotel costs $40 per night. You stay for three nights and check out on the fourth morning. How much will you pay?",
            options: ["a) $120", "b) $140", "c) $100", "d) $160"],
            answer: "a"
        },
        {
            question: "Q5) 120+240+400-240-400+1=___?",
            options: ["a) 120", "b) 121", "c) 119", "d) 118"],
            answer: "b"
        }
    ];

    let currentQuestion = 0;
    let correctAnswers = 0;
    let skippedQuestions = 0;

    function loadQuiz() {
        if (currentQuestion < questions.length) {
            document.getElementById("question").innerText = questions[currentQuestion].question;
            let optionsContainer = document.getElementById("options");
            optionsContainer.innerHTML = "";
            questions[currentQuestion].options.forEach((option, index) => {
                let button = document.createElement("button");
                button.innerText = option;
                button.onclick = function() { selectOption(option[0]) };
                optionsContainer.appendChild(button);
            });
        } else {
            showResult();
        }
    }

    function selectOption(answer) {
        if (answer === questions[currentQuestion].answer) {
            correctAnswers++;
        }
        currentQuestion++;
        loadQuiz();
    }

    function skipQuestion() {
        skippedQuestions++;
        currentQuestion++;
        loadQuiz();
    }

    function showResult() {
        document.getElementById("quizContainer").style.display = "none";
        let resultContainer = document.getElementById("quizResult");
        resultContainer.style.display = "block";
        resultContainer.innerHTML = `
            <p>Quiz Result</p>
            <p>You have answered ${correctAnswers} questions correctly!</p>
            <p>You skipped ${skippedQuestions} questions.</p>
            <p>You gave ${(questions.length - correctAnswers - skippedQuestions)} wrong answers.</p>
        `;
    }

    window.showBallBlitz = showBallBlitz;
    window.showMathQuiz = showMathQuiz;
    window.showMenu = showMenu;
    window.exitGame = exitGame;
});
