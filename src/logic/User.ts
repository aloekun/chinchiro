export class User {
    private pointDefault: number;

    constructor(
        private point: number
    ) {
        this.pointDefault = point;
    }

    getNumber(): number {
        return this.point;
    }

    gainPoint(point: number) {
        this.point += point;
    }

    payCost(point: number) {
        if (this.point < point) {
            throw new EvalError("Point is less");
        }
        this.point -= point;
    }

    refreshPoint() {
        this.point = this.pointDefault;
    }
}