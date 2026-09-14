// ==========================================
// RPL ADVENTURE
// GOOGLE SHEETS + LEADERBOARD
// ==========================================


// ==========================================
// MASUKKAN URL GOOGLE APPS SCRIPT DI SINI
// ==========================================

const SCRIPT_URL =
    "MASUKKAN_URL_APPS_SCRIPT";


// ==========================================
// PENGATURAN GAME
// ==========================================

const GAME_TIME = 90;

const MAX_LIVES = 3;

const CORRECT_SCORE = 10;

const WRONG_SCORE = 5;


// ==========================================
// VARIABLE
// ==========================================

let username = "";

let score = 0;

let lives = MAX_LIVES;

let timeLeft = GAME_TIME;

let gameActive = false;

let timer = null;

let playerX = 50;

let playerY = 55;

let collectedItems = [];


// ==========================================
// ELEMENT
// ==========================================

const menuScreen =
    document.getElementById("menuScreen");

const howScreen =
    document.getElementById("howScreen");

const gameScreen =
    document.getElementById("gameScreen");

const leaderboardScreen =
    document.getElementById("leaderboardScreen");

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


// ==========================================
// SOAL
// ==========================================

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


// ==========================================
// MULAI GAME
// ==========================================

document
    .getElementById("startButton")
    .addEventListener("click", startGame);


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

    lives = MAX_LIVES;

    timeLeft = GAME_TIME;

    playerX = 50;

    playerY = 55;

    collectedItems = [];


    scoreDisplay.textContent = score;

    lifeDisplay.textContent = lives;

    timeDisplay.textContent = timeLeft;

    nameDisplay.textContent = username;


    updatePlayer();


    document
        .querySelectorAll(".item")
        .forEach(item => {

            item.style.display = "flex";

        });


    menuScreen.classList.add("hidden");

    howScreen.classList.add("hidden");

    leaderboardScreen.classList.add("hidden");

    gameOverScreen.classList.add("hidden");

    gameScreen.classList.remove("hidden");


    gameActive = true;


    startTimer();

}


// ==========================================
// TIMER
// ==========================================

function startTimer() {

    clearInterval(timer);


    timer = setInterval(() => {

        if (!gameActive) return;


        timeLeft--;


        timeDisplay.textContent =
            timeLeft;


        if (timeLeft <= 0) {

            finishGame("Waktu habis");

        }

    }, 1000);

}


// ==========================================
// KEYBOARD
// ==========================================

document.addEventListener(
    "keydown",
    event => {

        if (!gameActive) return;


        if (
            event.key === "ArrowUp" ||
            event.key === "w" ||
            event.key === "W"
        ) {

            event.preventDefault();

            movePlayer(0, -3);

        }


        if (
            event.key === "ArrowDown" ||
            event.key === "s" ||
            event.key === "S"
        ) {

            event.preventDefault();

            movePlayer(0, 3);

        }


        if (
            event.key === "ArrowLeft" ||
            event.key === "a" ||
            event.key === "A"
        ) {

            event.preventDefault();

            movePlayer(-3, 0);

        }


        if (
            event.key === "ArrowRight" ||
            event.key === "d" ||
            event.key === "D"
        ) {

            event.preventDefault();

            movePlayer(3, 0);

        }

    }
);


// ==========================================
// GERAK PLAYER
// ==========================================

function movePlayer(x, y) {

    playerX += x;

    playerY += y;


    playerX =
        Math.max(
            2,
            Math.min(94, playerX)
        );


    playerY =
        Math.max(
            12,
            Math.min(90, playerY)
        );


    updatePlayer();

    checkCollision();

}


function updatePlayer() {

    player.style.left =
        playerX + "%";

    player.style.top =
        playerY + "%";

}


// ==========================================
// MOBILE CONTROL
// ==========================================

document
    .querySelectorAll(
        ".controls button"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                if (!gameActive)
                    return;


                const direction =
                    button.dataset.direction;


                if (direction === "up")
                    movePlayer(0, -4);


                if (direction === "down")
                    movePlayer(0, 4);


                if (direction === "left")
                    movePlayer(-4, 0);


                if (direction === "right")
                    movePlayer(4, 0);

            }
        );

    });


// ==========================================
// COLLISION
// ==========================================

function checkCollision() {

    const playerRect =
        player.getBoundingClientRect();


    document
        .querySelectorAll(".item")
        .forEach(item => {

            if (
                item.style.display === "none"
            ) return;


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


// ==========================================
// AMBIL ITEM
// ==========================================

function collectItem(item) {

    const type =
        item.dataset.type;


    if (
        collectedItems.includes(type)
    ) return;


    collectedItems.push(type);


    item.style.display = "none";


    openQuiz(type);

}


// ==========================================
// QUIZ
// ==========================================

function openQuiz(type) {

    const data =
        questions[type];


    if (!data) return;


    gameActive = false;


    document
        .getElementById("quizIcon")
        .textContent = data.icon;


    document
        .getElementById("quizTitle")
        .textContent = data.title;


    document
        .getElementById("questionText")
        .textContent = data.question;


    const container =
        document.getElementById(
            "answerContainer"
        );


    container.innerHTML = "";


    data.answers.forEach(
        (answer, index) => {

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
                () => {

                    checkAnswer(
                        index,
                        data.correct
                    );

                }
            );


            container.appendChild(button);

        }
    );


    quizModal.classList.remove(
        "hidden"
    );

}


// ==========================================
// JAWAB SOAL
// ==========================================

function checkAnswer(
    selected,
    correct
) {

    if (selected === correct) {

        score += CORRECT_SCORE;


        alert(
            "✅ Jawaban benar! +10 poin"
        );

    } else {

        score =
            Math.max(
                0,
                score - WRONG_SCORE
            );


        lives--;


        alert(
            "❌ Jawaban salah! -5 poin"
        );

    }


    scoreDisplay.textContent =
        score;


    lifeDisplay.textContent =
        lives;


    closeQuiz();


    if (lives <= 0) {

        finishGame(
            "Nyawa habis"
        );

        return;

    }


    const totalItems =
        document.querySelectorAll(
            ".item"
        ).length;


    if (
        collectedItems.length >=
        totalItems
    ) {

        finishGame(
            "Semua materi berhasil ditemukan"
        );

        return;

    }


    gameActive = true;

}


// ==========================================
// CLOSE QUIZ
// ==========================================

function closeQuiz() {

    quizModal.classList.add(
        "hidden"
    );

}


// ==========================================
// SELESAI GAME
// ==========================================

function finishGame(reason) {

    if (!gameScreen.classList.contains("hidden")) {

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
            .textContent = score;


        document
            .getElementById("resultText")
            .textContent =
                reason;


        saveGame();

    }

}


// ==========================================
// SIMPAN KE GOOGLE SHEETS
// ==========================================

function saveGame() {

    if (
        !SCRIPT_URL ||
        SCRIPT_URL.includes(
            "MASUKKAN_URL"
        )
    ) {

        console.warn(
            "URL Google Apps Script belum diisi."
        );

        return;

    }


    const params =
        new URLSearchParams({

            action: "save",

            username: username,

            score: score,

            materi: collectedItems.length,

            status: "Selesai"

        });


    fetch(
        SCRIPT_URL +
        "?" +
        params.toString()
    )

    .then(response =>
        response.json()
    )

    .then(data => {

        console.log(
            "Google Sheets:",
            data
        );

    })

    .catch(error => {

        console.error(
            "Gagal menyimpan:",
            error
        );

    });

}


// ==========================================
// LEADERBOARD
// ==========================================

document
    .getElementById(
        "leaderboardButton"
    )
    .addEventListener(
        "click",
        showLeaderboard
    );


document
    .getElementById(
        "resultLeaderboard"
    )
    .addEventListener(
        "click",
        showLeaderboard
    );


document
    .getElementById(
        "refreshLeaderboard"
    )
    .addEventListener(
        "click",
        loadLeaderboard
    );


function showLeaderboard() {

    menuScreen.classList.add(
        "hidden"
    );

    gameOverScreen.classList.add(
        "hidden"
    );

    leaderboardScreen.classList.remove(
        "hidden"
    );


    loadLeaderboard();

}


// ==========================================
// AMBIL DATA LEADERBOARD
// ==========================================

function loadLeaderboard() {

    const list =
        document.getElementById(
            "leaderboardList"
        );


    list.innerHTML =
        "<p>⏳ Memuat leaderboard...</p>";


    if (
        !SCRIPT_URL ||
        SCRIPT_URL.includes(
            "MASUKKAN_URL"
        )
    ) {

        list.innerHTML =
            "<p>⚠️ URL Google Apps Script belum diisi.</p>";

        return;

    }


    fetch(
        SCRIPT_URL +
        "?action=leaderboard"
    )

    .then(response =>
        response.json()
    )

    .then(result => {

        if (
            !result.success
        ) {

            list.innerHTML =
                "<p>Gagal mengambil data.</p>";

            return;

        }


        if (
            result.data.length === 0
        ) {

            list.innerHTML =
                "<p>Belum ada pemain.</p>";

            return;

        }


        list.innerHTML = "";


        result.data.forEach(
            (player, index) => {

                const row =
                    document.createElement(
                        "div"
                    );


                row.className =
                    "leaderboardRow";


                row.innerHTML = `

                    <span class="rank">
                        ${index + 1}
                    </span>

                    <span class="playerName">
                        ${escapeHTML(
                            player.username
                        )}
                    </span>

                    <span class="playerScore">
                        ⭐ ${player.score}
                    </span>

                `;


                list.appendChild(row);

            }
        );

    })

    .catch(error => {

        console.error(error);


        list.innerHTML = `

            <p>
                ❌ Tidak dapat terhubung
                ke Google Sheets.
            </p>

        `;

    });

}


// ==========================================
// KEAMANAN TEXT
// ==========================================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


// ==========================================
// MENU
// ==========================================

document
    .getElementById("againButton")
    .addEventListener(
        "click",
        startGame
    );


document
    .getElementById("homeButton")
    .addEventListener(
        "click",
        goHome
    );


document
    .getElementById("howButton")
    .addEventListener(
        "click",
        () => {

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


document
    .getElementById("leaderboardBack")
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

    leaderboardScreen.classList.add(
        "hidden"
    );

    menuScreen.classList.remove(
        "hidden"
    );

}


// ==========================================
// KELUAR
// ==========================================

document
    .getElementById("quitButton")
    .addEventListener(
        "click",
        () => {

            if (
                confirm(
                    "Yakin ingin keluar?"
                )
            ) {

                finishGame(
                    "Pemain keluar dari game"
                );

            }

        }
    );
