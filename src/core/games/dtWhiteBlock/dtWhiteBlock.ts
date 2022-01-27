import {GameState} from "../state";

export class DtWhiteBlock {
    public readonly generated: number[];
    private over: boolean = false;
    public currentStep = 0;

    constructor(
        private readonly sequenceGenerator: Iterator<number, number>,
        public keepUntouchedSize: number = 0
    ) {
        this.generated = [];
        this.keepUntouched();
    }

    private keepUntouched() {
        for (let i: number = this.generated.length - this.currentStep + this.keepUntouchedSize; i > 0; i--) {
            this.generated.push(this.sequenceGenerator.next().value);
        }
    }

    public step(choice: number): GameState {
        if (this.over) {
            throw new Error("Game is over");
        }
        if (this.generated[this.currentStep] !== choice) {
            this.over = true;
            return GameState.Lose;
        }
        if (this.currentStep >= this.generated.length) {
            this.over = true;
            return GameState.Win;
        }
        this.currentStep++;
        this.keepUntouched();
        return GameState.InProgress;
    }
}

export class SequenceGenerator {
    constructor(private blockNum: number) {}
    *generator(): IterableIterator<number> {
        yield Math.floor(Math.random() * this.blockNum);
    }
}
