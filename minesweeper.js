let COLS = 10, ROWS = 10, MINES = 10;
let board = [];
let state = [];
let STATE_CLOSED = 0,
    STATE_FLAGGED = 1,
    STATE_OPENED = 2;
let BLOCK_MINE = -1;
let playing = true;
let blocksOpened = 0;
let startDate;
let endDate;
let startTime;
let endTime;
let timer;
let playerAmount;


function inBounds(x, y) {
    return x >= 0 && y >= 0
        && x < COLS && y < ROWS;
}

function countMinesAround(x, y) {
    let count = 0;
    for (let dx = -1; dx <= 1; ++dx) {
        for (let dy = -1; dy <= 1; ++dy) {
            if (dx == 0 && dy == 0) {
                continue;
            }
            let yy = y + dy,
                xx = x + dx;
            if (inBounds(xx, yy)) {
                if (board[yy][xx] == BLOCK_MINE) {
                    ++count;
                }
            }
        }
    }
    return count;
}

function init() {
    startDate = new Date();
    startTime = startDate.getTime() / 1000;

    //this.registerServiceWorker()

    for (let y = 0; y < ROWS; ++y) {
        board.push([]);
        state.push([]);
        for (let x = 0; x < COLS; ++x) {
            board[y].push(0);
            state[y].push(STATE_CLOSED);
        }
    }

    for (let mine = 0; mine < MINES; ++mine) {
        let x, y;
        do {
            x = Math.floor(Math.random() * COLS),
                y = Math.floor(Math.random() * ROWS);
        } while (board[y][x] == BLOCK_MINE);

        board[y][x] = BLOCK_MINE;
    }

    for (let y = 0; y < ROWS; ++y) {
        for (let x = 0; x < COLS; ++x) {
            if (board[y][x] != BLOCK_MINE) {
                board[y][x] = countMinesAround(x, y);
            }
        }
    }

}

function openBlock(x, y) {
    blocksOpened += 1;

    if (!playing) {
        return;
    }
    if (state[y][x] == STATE_FLAGGED) {
        return;
    }

    if (board[y][x] == BLOCK_MINE) {
        alert('Sa kaotasid!');
        playing = false;
        revealBoard(false);
        return;
        endDate = new Date();
        startTime = startDate.getTime() / 1000;
        console.log(timer);
        result = {
            gameResult: "lose",
            clicks: clicks,
            boxesOpened: blocksOpened,
            time: timer
        }
        try {
        playerAmount = (localStorage.getItem("playerAmount"))
        }
        catch(err){
            console.log("LocalStorage oli tühi")
            let errorMessege = err.messege
        }

        if (errorMessege === null){
            playerAmount = JSON.parse(localStorage.getItem("playerAmount"))
            playerAmount += 1
            localStorage.setItem("playerAmount", JSON.stringify(playerAmount))
            localStorage.setItem(JSON.stringify(playerAmount, result))
        }
        if (errorMessege !== null){
            localStorage.setItem("playerAmount", "1")
            localStorage.setItem("1", JSON.stringify(result))
        }

        /*if (localStorage.getItem('playerAmount') === null) {
            console.log("localStorage was null")
            playerAmount = 1
            localStorage.setItem('playerAmount', JSON.stringify(playerAmount))
        }
        if (localStorage.getItem('playerAmount') !== null) {
            playerAmount = JSON.parse(localStorage.getItem('playerAmount'))
            console.log("localStorage wasn't null")
            localStorage.setItem('playerAmount', JSON.stringify(playerAmount))
            localStorage.setItem(JSON.stringify(playerAmount), JSON.stringify(result))
        }*/

    }

    state[y][x] = STATE_OPENED;
    if (board[y][x] == 0) {
        for (let dx = -1; dx <= 1; ++dx) {
            for (let dy = -1; dy <= 1; ++dy) {
                let xx = x + dx,
                    yy = y + dy;
                if (inBounds(xx, yy)) {
                    if (state[yy][xx] != STATE_OPENED) {
                        openBlock(xx, yy);
                    }
                }
            }
        }
    }

    if (checkVictory()) {
        alert('Sa said hakkama!');
        playing = false;
        revealBoard(true);
        endDate = new Date();
        endTime = endDate.getTime() / 1000;
        timer = startTime / endTime;
        console.log(timer);
        result = {
            gameResult: "win",
            clicks: clicks,
            boxesOpened: blocksOpened,
            time: timer
        }
    }
}

function checkVictory() {
    for (let y = 0; y < ROWS; ++y) {
        for (let x = 0; x < COLS; ++x) {
            if (board[y][x] != BLOCK_MINE) {
                if (state[y][x] != STATE_OPENED) {
                    return false;
                }
            }
        }
    }
    return true;
}

function flagBlock(x, y) {
    if (state[y][x] == STATE_OPENED) {
        return;
    }
    state[y][x] = 1 - state[y][x];
}

function revealBoard(victorious) {
    for (let y = 0; y < ROWS; ++y) {
        for (let x = 0; x < COLS; ++x) {
            if (board[y][x] == BLOCK_MINE && victorious) {
                state[y][x] = STATE_FLAGGED;
                continue;
            }
            state[y][x] = STATE_OPENED;
        }
    }
}

init()

//code from: https://www.youtube.com/watch?v=LRnnNInjmN0