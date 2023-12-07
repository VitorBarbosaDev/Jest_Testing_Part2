/**
 * @jest-environment jsdom
 */

const {game,newGame,showScore,addTurn,lightsOn,showTurns,playerTurn} = require('../game');
jest.spyOn(window, 'alert').mockImplementation(() => { });

beforeAll(() => {
    let fs = require('fs');
    let fileContents = fs.readFileSync('index.html', 'utf-8');
    document.open();
    document.write(fileContents);
    document.close();
});

describe('Game object contains correct keys', () => {
    test('score key exists', () => {
        expect("score" in game).toBe(true);
    });test('last button key exists', () => {
        expect("lastbutton" in game).toBe(true);
    });test('turnInProgress key exists', () => {
        expect("turnInProgress" in game).toBe(true);
    });test('turnInProgress key is false', () => {
        expect("turnInProgress" in game).toBe(true);
    });test('turnNumber key exists', () => {
        expect("turnNumber" in game).toBe(true);
    }); test('currentGame key exists', () => {
        expect("currentGame" in game).toBe(true);
    });test('playerMoves key exists', () => {
        expect("playerMoves" in game).toBe(true);
    });test('choices key exists', () => {
        expect("choices" in game).toBe(true);
    });test('choices contains correct ids', () => {
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
    });
});


describe('newGame works Correctly', () => {
    beforeAll(() => {
        game.score = 42;
        game.currentGame = ["button1", "button2"];
        game.playerMoves = ["button1", "button2"];
        document.getElementById("score").innerText = 42;
        newGame();
    });

    test('sets score to 0', () => {
        game.score = 42;
        newGame();
        expect(game.score).toEqual(0);
    });
    test('adds new random button to game.currentGame', () => {
        newGame();
        expect(game.currentGame.length).toBe(1);
    });
    test('clears playerMoves array', () => {
        game.playerMoves = ["button1", "button2"];
        newGame();
        expect(game.playerMoves.length).toBe(0);
    });
    test('Should display 0 for the element with id of score', () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
    test('expect data-listener to be true', () => {
        const elements = document.getElementsByClassName("circle");
        for (let element of elements) {
            expect(element.dataset.listener).toEqual("true");
        }
    });


});

describe('gameplay works Correctly', () => {
    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });

    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });

    test('addTurn adds a new turn to the game', () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test('should add correct class to light up the buttons', () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain("light");
    });
    test('showTurns should update game.turnNumber', () => {
       game.turnNumber = 42;
       showTurns();
       expect(game.turnNumber).toBe(0);
    } );
    test('playerTurn should increment score if correct', () => {
        game.playerMoves.push(game.currentGame[0]);
        playerTurn();
        expect(game.score).toBe(1);
    });
    test('should call an alert if the move is wrong', () => {
        game.playerMoves.push("wrong");
        playerTurn();
        expect(window.alert).toBeCalledWith("Wrong move!");
    })
    test('Should toggle turnInProgress to be true', () => {
        showTurns();
        expect(game.turnInProgress).toBe(true);
    });
    test('Clicking during computer sequence should not register', () => {
        showTurns();
        game.lastButton = "";
        document.getElementById("button2").click();
        expect(game.lastButton).toEqual("");
    });


});