

class Helper {
    constructor(){}
    RandomNumber(end, start){
        if (start === void 0) { start = 0; }
        return Math.floor(Math.random() * end) + start;
    }
}