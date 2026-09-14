// ==========================================
// RPL ADVENTURE
// ==========================================
const SCRIPT_URL = 
    "https://script.google.com/macros/s/AKfycbzjMBjCm1-70HeeXXTt_M_oHmdHhx7_lQRnw14ZfvCQxkR__LZJDqSnwlBqRINUvopu0g/exec";

// ================= GAME =================

const GAME_TIME = 90;

const MAX_LIVES = 3;

const CORRECT_SCORE = 10;

const WRONG_SCORE = 5;


// ================= STATE =================

let username = "";

let score = 0;

let lives = MAX_LIVES;

let timeLeft = GAME_TIME;

let gameActive = false;

let timer = null;

let playerX = 50;

let playerY = 55;

let collectedItems = [];


// ================= ELEMENT =================

const menuScreen =
    document.getElementById("menuScreen");

const howScreen =
    document.getElementById("howScreen");

const gameScreen =
    document.getElementById("gameScreen");

const gameOverScreen =
    document.getElementById("gameOverScreen");

const quizModal =
    document.getElementById("quizModal");

const player =
    document.getElementById("player");

const scoreDisplay =
    document.getElementById("scoreDisplay");

const lifeDisplay =
    document.getElementById("lifeDisplay");

const timeDisplay =
    document.getElementById("timeDisplay");

const nameDisplay =
    document.getElementById("nameDisplay");


// ================= SOAL =================

const questions = {

    html: {

        icon: "🌐",

        title: "HTML",

        question:
            "Apa fungsi utama HTML?",

        answers: [

            "Membuat struktur halaman website",

            "Mengatur database",

            "Membuat sistem operasi",

            "Mengedit video"

        ],

        correct: 0

    },


    css: {

        icon: "🎨",

        title: "CSS",

        question:
            "Apa fungsi utama CSS?",

        answers: [

            "Menyimpan data",

            "Mengatur tampilan website",

            "Membuat database",

            "Mengatur server"

        ],

        correct: 1

    },


    javascript: {

        icon: "⚡",

        title: "JavaScript",

        question:
            "JavaScript digunakan untuk apa?",

        answers: [

            "Membuat website menjadi interaktif",

            "Membuat kabel jaringan",

            "Mengedit hardware",

            "Membersihkan komputer"

        ],

        correct: 0

    },


    python: {

        icon: "🐍",

        title: "Python",

        question:
            "Manakah sintaks Python yang benar?",

        answers: [

            "print('Hello')",

            "<print>Hello</print>",

            "echo Hello",

            "console.log('Hello')"

        ],

        correct: 0

    },


    database: {

        icon: "🗄️",

        title: "Database",

        question:
            "Apa fungsi database?",

        answers: [

            "Menyimpan dan mengelola data",

            "Mengatur warna monitor",

            "Mengedit foto",

            "Membuat kabel LAN"

        ],

        correct: 0

    },


    git: {

        icon: "🔀",

        title: "Git",

        question:
            "Apa fungsi Git dalam pengembangan software?",

        answers: [

            "Version control",

            "Mengedit gambar",

            "Membuat hardware",

            "Menghapus internet"

        ],

        correct: 0

    }

};


// ================= START BUTTON =================

document
    .getElementById("startButton")
    .addEventListener(
        "click",
        startGame
    );


function startGame() {

    username =
        document
            .getElementById("username")
            .value
            .trim();


    if (username === "") {

        alert(
            "Masukkan username terlebih dahulu!"
        );

        return;

    }


    // RESET

    score = 0;

    lives = MAX_LIVES;

    timeLeft = GAME_TIME;

    playerX = 50;

    playerY = 55;

    collectedItems = [];


    // UPDATE HUD

    scoreDisplay.textContent =
        score;

    lifeDisplay.textContent =
        lives;

    timeDisplay.textContent =
        timeLeft;

    nameDisplay.textContent =
        username;


    // RESET PLAYER

    updatePlayer();


    // TAMPILKAN SEMUA ITEM

    const items =
        document.querySelectorAll(
            ".item"
        );


    items.forEach(item => {

        item.style.display =
            "flex";

    });


    // SCREEN

    menuScreen.classList.add(
        "hidden"
    );

    howScreen.classList.add(
        "hidden"
    );

    gameOverScreen.classList.add(
        "hidden"
    );

    gameScreen.classList.remove(
        "hidden"
    );


    // GAME AKTIF

    gameActive = true;


    startTimer();

}


// ================= TIMER =================

function startTimer() {

    clearInterval(timer);


    timer =
        setInterval(() => {

            if (!gameActive) {
                return;
            }


            timeLeft--;


            timeDisplay.textContent =
                timeLeft;


            if (timeLeft <= 0) {

                finishGame();

            }

        }, 1000);

}


// ================= KEYBOARD =================

document.addEventListener(
    "keydown",
    function(event) {

        if (!gameActive) {
            return;
        }


        if (
            event.key === "ArrowUp" ||
            event.key === "w" ||
            event.key === "W"
        ) {

            movePlayer(
                0,
                -3
            );

        }


        if (
            event.key === "ArrowDown" ||
            event.key === "s" ||
            event.key === "S"
        ) {

            movePlayer(
                0,
                3
            );

        }


        if (
            event.key === "ArrowLeft" ||
            event.key === "a" ||
            event.key === "A"
        ) {

            movePlayer(
                -3,
                0
            );

        }


        if (
            event.key === "ArrowRight" ||
            event.key === "d" ||
            event.key === "D"
        ) {

            movePlayer(
                3,
                0
            );

        }

    }
);


// ================= MOVE PLAYER =================

function movePlayer(
    x,
    y
) {

    playerX += x;

    playerY += y;


    // BATAS

    if (playerX < 2) {
        playerX = 2;
    }

    if (playerX > 94) {
        playerX = 94;
    }

    if (playerY < 12) {
        playerY = 12;
    }

    if (playerY > 90) {
        playerY = 90;
    }


    updatePlayer();


    checkCollision();

}


// ================= UPDATE PLAYER =================

function updatePlayer() {

    player.style.left =
        playerX + "%";

    player.style.top =
        playerY + "%";

}


// ================= MOBILE =================

document
    .querySelectorAll(
        ".controls button"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            function() {

                if (!gameActive) {
                    return;
                }


                const direction =
                    button.dataset.direction;


                if (direction === "up") {

                    movePlayer(0, -4);

                }

                if (direction === "down") {

                    movePlayer(0, 4);

                }

                if (direction === "left") {

                    movePlayer(-4, 0);

                }

                if (direction === "right") {

                    movePlayer(4, 0);

                }

            }
        );

    });


// ================= COLLISION =================

function checkCollision() {

    const playerRect =
        player.getBoundingClientRect();


    const items =
        document.querySelectorAll(
            ".item"
        );


    items.forEach(item => {

        if (
            item.style.display ===
            "none"
        ) {

            return;

        }


        const itemRect =
            item.getBoundingClientRect();


        const hit =

            playerRect.left <
                itemRect.right &&

            playerRect.right >
                itemRect.left &&

            playerRect.top <
                itemRect.bottom &&

            playerRect.bottom >
                itemRect.top;


        if (hit) {

            collectItem(item);

        }

    });

}


// ================= COLLECT =================

function collectItem(item) {

    const type =
        item.dataset.type;


    if (
        collectedItems.includes(type)
    ) {

        return;

    }


    collectedItems.push(type);


    item.style.display =
        "none";


    openQuiz(type);

}


// ================= QUIZ =================

function openQuiz(type) {

    const data =
        questions[type];


    if (!data) {

        return;

    }


    gameActive = false;


    document
        .getElementById("quizIcon")
        .textContent =
        data.icon;


    document
        .getElementById("quizTitle")
        .textContent =
        data.title;


    document
        .getElementById("questionText")
        .textContent =
        data.question;


    const container =
        document.getElementById(
            "answerContainer"
        );


    container.innerHTML = "";


    data.answers.forEach(
        function(answer, index) {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "answerButton";


            button.textContent =
                answer;


            button.addEventListener(
                "click",
                function() {

                    checkAnswer(
                        index,
                        data.correct
                    );

                }
            );


            container.appendChild(
                button
            );

        }
    );


    quizModal.classList.remove(
        "hidden"
    );

}


// ================= ANSWER =================

function checkAnswer(
    selected,
    correct
) {

    if (selected === correct) {

        score += CORRECT_SCORE;

        scoreDisplay.textContent =
            score;


        alert(
            "✅ Jawaban benar! +10 poin"
        );

    }

    else {

        score =
            Math.max(
                0,
                score - WRONG_SCORE
            );


        lives--;


        scoreDisplay.textContent =
            score;

        lifeDisplay.textContent =
            lives;


        alert(
            "❌ Jawaban salah! -5 poin"
        );


        if (lives <= 0) {

            closeQuiz();

            finishGame();

            return;

        }

    }


    closeQuiz();


    const totalItems =
        document.querySelectorAll(
            ".item"
        ).length;


    if (
        collectedItems.length >=
        totalItems
    ) {

        alert(
            "🎉 Semua materi RPL berhasil ditemukan!"
        );

        finishGame();

        return;

    }


    gameActive = true;

}


// ================= CLOSE QUIZ =================

function closeQuiz() {

    quizModal.classList.add(
        "hidden"
    );

}


// ================= FINISH =================

function finishGame() {

    if (!gameActive) {

        // Tetap boleh selesai jika dipanggil
        // setelah quiz
    }


    gameActive = false;


    clearInterval(timer);


    closeQuiz();


    gameScreen.classList.add(
        "hidden"
    );


    gameOverScreen.classList.remove(
        "hidden"
    );


    document
        .getElementById("finalScore")
        .textContent =
        score;


    let message;


    if (score >= 50) {

        message =
            "🔥 Luar biasa! Kamu menguasai dasar RPL!";

    }

    else if (score >= 30) {

        message =
            "⭐ Bagus! Pengetahuan RPL kamu sudah cukup baik.";

    }

    else {

        message =
            "💪 Tetap semangat! Pelajari RPL dan coba lagi.";

    }


    document
        .getElementById("resultText")
        .textContent =
        message;

}


// ================= PLAY AGAIN =================

document
    .getElementById("againButton")
    .addEventListener(
        "click",
        function() {

            startGame();

        }
    );


// ================= HOME =================

document
    .getElementById("homeButton")
    .addEventListener(
        "click",
        goHome
    );


function goHome() {

    gameActive = false;

    clearInterval(timer);

    closeQuiz();


    gameScreen.classList.add(
        "hidden"
    );

    gameOverScreen.classList.add(
        "hidden"
    );

    howScreen.classList.add(
        "hidden"
    );

    menuScreen.classList.remove(
        "hidden"
    );

}


// ================= HOW TO PLAY =================

document
    .getElementById("howButton")
    .addEventListener(
        "click",
        function() {

            menuScreen.classList.add(
                "hidden"
            );

            howScreen.classList.remove(
                "hidden"
            );

        }
    );


document
    .getElementById("backButton")
    .addEventListener(
        "click",
        goHome
    );


// ================= QUIT =================

document
    .getElementById("quitButton")
    .addEventListener(
        "click",
        function() {

            const confirmQuit =
                confirm(
                    "Yakin ingin keluar?"
                );


            if (confirmQuit) {

                finishGame();

            }

        }
    ); 
