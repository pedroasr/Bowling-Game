import { BowlingGame, buildBowlingGame } from "@src/bowling-game";

function makeRolls(game: BowlingGame, rolls: number, pins: number) {
    for(let i = 0; i < rolls; i++) {
        game.roll(pins);
        if (pins === 10)
            game.roll(0);
    }
}

function makeSpare(game: BowlingGame, nextPins: number) {
    game.roll(5);
    game.roll(5);
    game.roll(nextPins);
}

function makeFrame(game: BowlingGame, firstRollPins: number, secondRollPins: number) {
    game.roll(firstRollPins);
    game.roll(secondRollPins);
}

function makeStrike(game: BowlingGame, firstRollPins: number, secondRollPins: number) {
    game.roll(10);
    game.roll(0);
    game.roll(firstRollPins);
    game.roll(secondRollPins);
}

describe('Bowling score', () => {
    test('should return 0 for an empty game', () => {
        const game = buildBowlingGame();
        makeRolls(game, 20, 0);

        expect(game.score()).toBe(0);
    });

    test('should return 20 for a one pin each turn', () => {
        const game = buildBowlingGame();
        makeRolls(game, 20, 1);

        expect(game.score()).toBe(20);
    });

    test('should return 20 for a spare with 3', () => {
        const game = buildBowlingGame();
        makeSpare(game, 3);
        makeRolls(game, 17, 0);

        expect(game.score()).toBe(16);
    });

    test('should return 21 for a spare plus five', () => {
        const game = buildBowlingGame();
        makeSpare(game, 3);
        game.roll(5);
        makeRolls(game, 16, 0);

        expect(game.score()).toBe(21);
    });

    test('should return 49 for two spares one at the end', () => {
        const game = buildBowlingGame();
        makeFrame(game, 1, 5);
        makeFrame(game, 5, 3);
        makeRolls(game, 12, 0);
        makeFrame(game, 0, 7);
        makeSpare(game, 9);


        expect(game.score()).toBe(40);
    });

    test('should return 26 when makes one strike', () => {
        const game = buildBowlingGame();
        makeStrike(game, 5, 3);
        makeRolls(game, 17, 0);


        expect(game.score()).toBe(26);
    });

    test('should return 38 with one strike and one spare', () => {
        const game = buildBowlingGame();
        makeStrike(game, 5, 5);
        makeFrame(game, 3, 2);
        makeRolls(game, 14, 0);


        expect(game.score()).toBe(38);
    });

    test('should do the perfect score', () => {
        const game = buildBowlingGame();
        makeRolls(game, 9, 10);
        game.roll(10);
        game.roll(10);
        game.roll(10);

        expect(game.score()).toBe(300);
    });
});