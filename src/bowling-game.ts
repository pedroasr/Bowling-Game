export function buildBowlingGame() {
    const rolls: number[] = Array.from({ length: 21 }, () => 0);
    const totalFrames = 10;
    let currentRoll = 0;

    function roll(pins: number): void {
        rolls[currentRoll++] = pins;
    }

    function score(): number {
        let score = 0;
        let frameIndex = 0;
        for (let frame = 0; frame < totalFrames; frame++) {
            if (isStrike(frameIndex)) {
                score += 10 + strikeBonus(frameIndex);
                frameIndex += 1;
            } else if (isSpare(frameIndex)) {
                score += 10 + spareBonus(frameIndex);
                frameIndex += 2;
            } else {
                score += sumOfShotsInFrame(frameIndex);
                frameIndex += 2;
            }
        }
        return score;
    }

    function isSpare(frameIndex: number): boolean {
        const firstShot = frameIndex;
        const secondShot = frameIndex + 1;
        return rolls[firstShot] + rolls[secondShot] === 10;
    }

    function isStrike(frameIndex: number): boolean {
        return rolls[frameIndex] === 10;
    }

    function spareBonus(frameIndex: number) {
        return rolls[frameIndex + 2];
    }

    function strikeBonus(frameIndex: number) {
        return rolls[frameIndex + 1] + rolls[frameIndex + 2];
    }

    function sumOfShotsInFrame(frameIndex: number) {
        return rolls[frameIndex] + rolls[frameIndex + 1];
    }

    return {
        roll,
        score
    };
}

export type BowlingGame = ReturnType<typeof buildBowlingGame>;