export function buildBowlingGame() {
    const rolls: number[] = Array.from({ length: 21 }, () => 0);
    const totalFrames = 10;
    let currentRoll = 0;

    function roll(pins: number): void {
        rolls[currentRoll] = pins;
        currentRoll++;
    }

    function score(): number {
        let score = 0;
        for (let i = 0; i < totalFrames; i++) {
            if (isStrike(i)) {
                score += strikeBonus(i);
            } else if (isSpare(i)) {
                score += spareBonus(i);
            } else {
                score += normalRoll(i);
            }
        }
        return score;
    }

    function isSpare(frameIndex: number): boolean {
        const firstShot = frameIndex * 2;
        const secondShot = frameIndex * 2 + 1;
        return rolls[firstShot] + rolls[secondShot] === 10;
    }

    function isStrike(frameIndex: number): boolean {
        return rolls[frameIndex * 2] === 10;
    }

    function spareBonus(frameIndex: number) {
        return 10 + rolls[(frameIndex + 1) * 2];
    }

    function strikeBonus(frameIndex: number) {
        if (frameIndex === 9)
            return 10 + rolls[frameIndex * 2 + 1] + rolls[(frameIndex + 1) * 2];
        if (isStrike(frameIndex + 1))
            return (
                10 +
                rolls[(frameIndex + 1) * 2] +
                rolls[(frameIndex + 1) * 2 + 2]
            );
        return (
            10 + rolls[(frameIndex + 1) * 2] + rolls[(frameIndex + 1) * 2 + 1]
        );
    }

    function normalRoll(frameIndex: number) {
        return rolls[frameIndex * 2] + rolls[frameIndex * 2 + 1];
    }

    return {
        roll,
        score
    };
}

export type BowlingGame = ReturnType<typeof buildBowlingGame>;
