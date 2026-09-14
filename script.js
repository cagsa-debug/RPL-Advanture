// ==================================================
// RPL ADVENTURE
// ==================================================

// MASUKKAN URL GOOGLE APPS SCRIPT DI SINI
const API_URL =
    "PASTE_URL_APPS_SCRIPT_DI_SINI";


// ================= GAME SETTINGS =================

const GAME_TIME = 90;

const START_LIVES = 3;

const CORRECT_POINT = 10;

const WRONG_POINT = 5;


// ================= GAME DATA =================

let score = 0;

let lives = START_LIVES;

let timeLeft = GAME_TIME;

let gameRunning = false;

let timer = null;

let username = "";

let collected = [];


// ================= PLAYER =================

let playerX = 50;

let playerY = 55;

const SPEED = 3;


// ================= ELEMENT =================

const menuScreen =
    document.getElementById("menuScreen");

const howScreen =
    document.getElementById("howScreen");

const gameScreen =
    document.getElementById("gameScreen");

const gameOverScreen =
    document.getElementById("gameOverScreen");

const leaderboardScreen =
    document.getElementById("leaderboardScreen");

const quizModal =
    document.getElementById("quizModal");

const player =
    document.getElementById("player");

const gameArea =
    document.getElementById("gameArea");

const scoreText =
    document.getElementById("score");

const livesText =
    document.getElementById("lives");

const timerText =
    document.getElementById("timer");

const playerName =
    document.getElementById("playerName");


// ================= SOAL =================

const questions = {

    html: {

        icon: "🌐",

        title: "HTML",

        question:
            "Apa fungsi utama HTML dalam website?",

        answers: [

            "Membuat struktur halaman web",

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
            "JavaScript digunakan untuk?",

        answers: [

            "Membuat website menjadi interaktif",

            "Membuat kabel LAN",

            "Menyimpan listrik",

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

            "Mengubah warna layar",

            "Mengedit video",

            "Membuat kabel"

        ],

        correct: 0

    },


    git: {

        icon: "🔀",

        title: "Git",

        question:
            "Git digunakan untuk?",

        answers: [

            "Version control",

            "Mengedit foto",

            "Membuat komputer",

            "Menghapus internet"

        ],

        correct: 0

    }

};


// ================= START =================

document
    .getElementById("startBtn")
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


    if (!username) {

        alert(
            "Masukkan username terlebih dahulu!"
        );

        return;
    }


    score = 0;

    lives = START_LIVES;

    timeLeft = GAME_TIME;

    collected = [];

    playerX = 50;

    playerY = 55;


    scoreText.textContent =
        score;

    livesText.textContent =
        lives;

    timerText.textContent =
        timeLeft;

    playerName.textContent =
        username;


    player.style.left =
        playerX + "%";

    player.style.top =
        playerY + "%";


    // tampilkan semua item

    document
        .querySelectorAll(".item")
        .forEach(item => {

            item.style.display =
                "flex";

        });


    menuScreen
        .classList
        .add("hidden");

    howScreen
        .classList
        .add("hidden");

    gameOverScreen
        .classList
        .add("hidden");

    leaderboardScreen
        .classList
        .add("hidden");

    gameScreen
        .classList
        .remove("hidden");


    gameRunning = true;


    startTimer();

}


// ================= TIMER =================

function startTimer() {

    clearInterval(timer);


    timer =
        setInterval(() => {

            if (!gameRunning)
                return;


            timeLeft--;

            timerText.textContent =
                timeLeft;


            if (timeLeft <= 0) {

                endGame();

            }

        }, 1000);

}


// ================= KEYBOARD =================

document.addEventListener(
    "keydown",
    event => {

        if (!gameRunning)
            return;


        movePlayer(event.key);

    }
);


// ================= MOVE =================

function movePlayer(key) {

    if (
        key === "ArrowUp" ||
        key === "w" ||
        key === "W"
    ) {

        playerY -= SPEED;

    }


    if (
        key === "ArrowDown" ||
        key === "s" ||
        key === "S"
    ) {

        playerY += SPEED;

    }


    if (
        key === "ArrowLeft" ||
        key === "a" ||
        key === "A"
    ) {

        playerX -= SPEED;

    }


    if (
        key === "ArrowRight" ||
        key === "d" ||
        key === "D"
    ) {

        playerX += SPEED;

    }


    limitPlayer();


    updatePlayer();


    checkCollision();

}


// ================= MOBILE =================

document
    .querySelectorAll(
        ".mobileControls button"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                if (!gameRunning)
                    return;


                movePlayer(
                    button.dataset.key
                );

            }
        );

    });


// ================= LIMIT =================

function limitPlayer() {

    playerX =
        Math.max(
            2,
            Math.min(
                94,
                playerX
            )
        );


    playerY =
        Math.max(
            10,
            Math.min(
                90,
                playerY
            )
        );

}


// ================= UPDATE PLAYER =================

function updatePlayer() {

    player.style.left =
        playerX + "%";

    player.style.top =
        playerY + "%";

}


// ================= COLLISION =================

function checkCollision() {

    const playerRect =
        player.getBoundingClientRect();


    document
        .querySelectorAll(".item")
        .forEach(item => {

            if (
                item.style.display ===
                "none"
            ) {

                return;

            }


            const itemRect =
                item.getBoundingClientRect();


            const collision =

                playerRect.left <
                itemRect.right &&

                playerRect.right >
                itemRect.left &&

                playerRect.top <
                itemRect.bottom &&

                playerRect.bottom >
                itemRect.top;


            if (collision) {

                collectItem(item);

            }

        });

}


// ================= COLLECT =================

function collectItem(item) {

    if (
        item.style.display ===
        "none"
    ) {

        return;

    }


    const type =
        item.dataset.type;


    item.style.display =
        "none";


    collected.push(type);


    showQuiz(type);

}


// ================= QUIZ =================

function showQuiz(type) {

    const data =
        questions[type];


    document
        .getElementById("quizIcon")
        .textContent =
        data.icon;


    document
        .getElementById("quizTitle")
        .textContent =
        data.title;


    document
        .getElementById("question")
        .textContent =
        data.question;


    const answers =
        document.getElementById(
            "answers"
        );


    answers.innerHTML = "";


    data.answers.forEach(
        (answer, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "answer";


            button.textContent =
                answer;


            button.addEventListener(
                "click",
                () => {

                    answerQuiz(
                        index,
                        data.correct
                    );

                }
            );


            answers.appendChild(
                button
            );

        }
    );


    gameRunning = false;


    quizModal
        .classList
        .remove("hidden");

}


// ================= ANSWER =================

function answerQuiz(
    selected,
    correct
) {

    if (
        selected === correct
    ) {

        score += CORRECT_POINT;

        scoreText.textContent =
            score;


        alert(
            "✅ Benar! +10 poin"
        );

    }

    else {

        score =
            Math.max(
                0,
                score - WRONG_POINT
            );


        lives--;


        scoreText.textContent =
            score;

        livesText.textContent =
            lives;


        alert(
            "❌ Salah! -5 poin"
        );


        if (lives <= 0) {

            quizModal
                .classList
                .add("hidden");

            endGame();

            return;

        }

    }


    quizModal
        .classList
        .add("hidden");


    const totalItems =
        document
            .querySelectorAll(".item")
            .length;


    if (
        collected.length >=
        totalItems
    ) {

        alert(
            "🎉 Semua materi RPL ditemukan!"
        );

        endGame();

        return;

    }


    gameRunning = true;

}


// ================= END GAME =================

async function endGame() {

    if (!gameRunning)
        return;


    gameRunning = false;

    clearInterval(timer);


    quizModal
        .classList
        .add("hidden");


    gameScreen
        .classList
        .add("hidden");


    gameOverScreen
        .classList
        .remove("hidden");


    document
        .getElementById("finalScore")
        .textContent =
        score;


    let message;


    if (score >= 50) {

        message =
            "🔥 Luar biasa! Dasar RPL kamu sangat bagus!";

    }

    else if (score >= 30) {

        message =
            "⭐ Bagus! Terus tingkatkan kemampuan RPL kamu!";

    }

    else {

        message =
            "💪 Jangan menyerah! Coba lagi dan pelajari materi RPL.";

    }


    document
        .getElementById("finalMessage")
        .textContent =
        message;


    // SIMPAN KE GOOGLE SHEETS

    await saveScore();

}


// ================= SAVE SCORE =================

async function saveScore() {

    if (
        API_URL.includes(
            "PASTE_URL"
        )
    ) {

        console.log(
            "Google Sheets belum dihubungkan."
        );

        return;

    }


    try {

        const params =
            new URLSearchParams({

                action:
                    "saveScore",

                username:
                    username,

                score:
                    score,

                level:
                    1

            });


        await fetch(
            API_URL +
            "?" +
            params.toString()
        );


        console.log(
            "Score berhasil disimpan."
        );

    }

    catch (error) {

        console.error(
            "Gagal menyimpan score:",
            error
        );

    }

}


// ================= LEADERBOARD =================

document
    .getElementById(
        "leaderboardBtn"
    )
    .addEventListener(
        "click",
        showLeaderboard
    );


async function showLeaderboard() {

    menuScreen
        .classList
        .add("hidden");

    gameOverScreen
        .classList
        .add("hidden");

    leaderboardScreen
        .classList
        .remove("hidden");


    const list =
        document.getElementById(
            "leaderboardList"
        );


    list.innerHTML =
        `<div class="loading">
            ⏳ Memuat leaderboard...
        </div>`;


    if (
        API_URL.includes(
            "PASTE_URL"
        )
    ) {

        list.innerHTML =
            `<div class="loading">
                ⚠️ Google Sheets belum dihubungkan.
            </div>`;

        return;

    }


    try {

        const params =
            new URLSearchParams({

                action:
                    "leaderboard"

            });


        const response =
            await fetch(
                API_URL +
                "?" +
                params.toString()
            );


        const result =
            await response.json();


        if (!result.success) {

            throw new Error(
                result.message
            );

        }


        renderLeaderboard(
            result.data
        );

    }

    catch (error) {

        console.error(error);


        list.innerHTML =
            `<div class="loading">
                ❌ Gagal mengambil leaderboard.
                <br><br>
                Pastikan URL Apps Script benar.
            </div>`;

    }

}


// ================= RENDER LEADERBOARD =================

function renderLeaderboard(data) {

    const list =
        document.getElementById(
            "leaderboardList"
        );


    if (
        !data ||
        data.length === 0
    ) {

        list.innerHTML =
            `<div class="loading">
                🏆 Belum ada skor.
            </div>`;

        return;

    }


    list.innerHTML =
        data.map(
            (player, index) => {

                let rank;


                if (index === 0)
                    rank = "🥇";

                else if (index === 1)
                    rank = "🥈";

                else if (index === 2)
                    rank = "🥉";

                else
                    rank =
                        "#" +
                        (index + 1);


                return `

                    <div class="leaderRow">

                        <div class="rank">
                            ${rank}
                        </div>

                        <div class="playerInfo">

                            <strong>
                                ${escapeHTML(
                                    player.username
                                )}
                            </strong>

                            <small>
                                RPL Adventure
                            </small>

                        </div>

                        <div class="leaderScore">

                            ⭐ ${player.score}

                        </div>

                    </div>

                `;

            }
        ).join("");

}


// ================= ESCAPE HTML =================

function escapeHTML(value) {

    return String(
        value ?? ""
    )
    .replaceAll(
        "&",
        "&amp;"
    )
    .replaceAll(
        "<",
        "&lt;"
    )
    .replaceAll(
        ">",
        "&gt;"
    )
    .replaceAll(
        '"',
        "&quot;"
    )
    .replaceAll(
        "'",
        "&#039;"
    );

}


// ================= PLAY AGAIN =================

document
    .getElementById(
        "playAgainBtn"
    )
    .addEventListener(
        "click",
        startGame
    );


// ================= HOME =================

document
    .getElementById(
        "homeBtn"
    )
    .addEventListener(
        "click",
        goHome
    );


function goHome() {

    gameRunning = false;

    clearInterval(timer);


    gameOverScreen
        .classList
        .add("hidden");

    leaderboardScreen
        .classList
        .add("hidden");

    gameScreen
        .classList
        .add("hidden");

    howScreen
        .classList
        .add("hidden");

    menuScreen
        .classList
        .remove("hidden");

}


// ================= HOW TO PLAY =================

document
    .getElementById("howBtn")
    .addEventListener(
        "click",
        () => {

            menuScreen
                .classList
                .add("hidden");

            howScreen
                .classList
                .remove("hidden");

        }
    );


document
    .getElementById("backHowBtn")
    .addEventListener(
        "click",
        goHome
    );


// ================= BACK LEADERBOARD =================

document
    .getElementById(
        "backLeaderboardBtn"
    )
    .addEventListener(
        "click",
        goHome
    );


// ================= QUIT =================

document
    .getElementById("quitBtn")
    .addEventListener(
        "click",
        () => {

            if (
                confirm(
                    "Yakin ingin keluar dari game?"
                )
            ) {

                endGame();

            }

        }
    );
