var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game3', { preload: preload, create: create });

var PIECE_WIDTH = 200,
    PIECE_HEIGHT = 200,
    BOARD_COLS,
    BOARD_ROWS;

var piecesGroup,
    piecesAmount,
    pause_label,
    text = 0,
    counter = 0,
    shuffledIndexArray = [];

function preload() {
    game.load.spritesheet("background", "assets/cats.jpg", PIECE_WIDTH, PIECE_HEIGHT); //https://images.app.goo.gl/RaxUBbG1gNsUexnFA
}

function create() {
    prepareBoard();
    //pause game button
    pause_label = game.add.text(game.world.centerX, game.world.centerY, 'start', { font: '80px Arial', fill: '#00000' });
    pause_label.anchor.setTo(0.5, 0.5);
    pause_label.inputEnabled = true;
    game.paused = true;

    // Add a input listener that can help us return from being paused
    game.input.onDown.add(unpause, self);

    function unpause(event){
        game.paused = false;
        pause_label.visible = false;
    }

    text = game.add.text(10, 10, 'Time: 0', { font: "34px Arial", fill: "#4488AA" });
    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
}

function updateCounter() {

    counter++;

    text.setText('Time: ' + counter);

}

function prepareBoard() {

    var piecesIndex = 0,
        i, j,
        piece;

    BOARD_COLS = Math.floor(game.world.width / PIECE_WIDTH);
    BOARD_ROWS = Math.floor(game.world.height / PIECE_HEIGHT);

    piecesAmount = BOARD_COLS * BOARD_ROWS;

    shuffledIndexArray = createShuffledIndexArray();

    piecesGroup = game.add.group();

    for (i = 0; i < BOARD_ROWS; i++)
    {
        for (j = 0; j < BOARD_COLS; j++)
        {
            if (shuffledIndexArray[piecesIndex]) {
                piece = piecesGroup.create(j * PIECE_WIDTH, i * PIECE_HEIGHT, "background", shuffledIndexArray[piecesIndex]);
            }
            else { //initial position of black piece
                piece = piecesGroup.create(j * PIECE_WIDTH, i * PIECE_HEIGHT);
                piece.black = true;
            }
            piece.name = 'piece' + i.toString() + 'x' + j.toString();
            piece.currentIndex = piecesIndex;
            piece.destIndex = shuffledIndexArray[piecesIndex];
            piece.inputEnabled = true;
            piece.events.onInputDown.add(selectPiece, this);
            piece.posX = j;
            piece.posY = i;
            piecesIndex++;
        }
    }

}

function selectPiece(piece) {

    var blackPiece = canMove(piece);

    //if there is a black piece in neighborhood
    if (blackPiece) {
        movePiece(piece, blackPiece);
    }

}

function canMove(piece) {

    var foundBlackElem = false;

    piecesGroup.children.forEach(function(element) {
        if (element.posX === (piece.posX - 1) && element.posY === piece.posY && element.black ||
            element.posX === (piece.posX + 1) && element.posY === piece.posY && element.black ||
            element.posY === (piece.posY - 1) && element.posX === piece.posX && element.black ||
            element.posY === (piece.posY + 1) && element.posX === piece.posX && element.black) {
            foundBlackElem = element;
            return;
        }
    });

    return foundBlackElem;
}

function movePiece(piece, blackPiece) {

    var tmpPiece = {
        posX: piece.posX,
        posY: piece.posY,
        currentIndex: piece.currentIndex
    };

    game.add.tween(piece).to({x: blackPiece.posX * PIECE_WIDTH, y: blackPiece.posY * PIECE_HEIGHT}, 300, Phaser.Easing.Linear.None, true);

    //change places of piece and blackPiece
    piece.posX = blackPiece.posX;
    piece.posY = blackPiece.posY;
    piece.currentIndex = blackPiece.currentIndex;
    piece.name ='piece' + piece.posX.toString() + 'x' + piece.posY.toString();

    //piece is the new black
    blackPiece.posX = tmpPiece.posX;
    blackPiece.posY = tmpPiece.posY;
    blackPiece.currentIndex = tmpPiece.currentIndex;
    blackPiece.name ='piece' + blackPiece.posX.toString() + 'x' + blackPiece.posY.toString();

    //after every move check if puzzle is completed
    checkIfFinished();
}

function checkIfFinished() {

    var isFinished = true;

    piecesGroup.children.forEach(function(element) {
        if (element.currentIndex !== element.destIndex) {
            isFinished = false;
            return;
        }
    });

    if (isFinished) {
        showFinishedText();
    }

}

function showFinishedText() {

    var style = { font: "40px Arial", fill: "#000", align: "center"};

    var text = game.add.text(game.world.centerX, game.world.centerY, "Congratulations! \nYou made it!", style);

    text.anchor.set(0.5);

}

function createShuffledIndexArray() {

    var indexArray = [];

    for (var i = 0; i < piecesAmount; i++)
    {
        indexArray.push(i);
    }

    return shuffle(indexArray);

}

function shuffle(array) {

    var counter = array.length,
        temp,
        index;

    while (counter > 0)
    {
        index = Math.floor(Math.random() * counter);

        counter--;

        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
    
}
