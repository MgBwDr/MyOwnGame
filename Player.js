class Player{
    constructor() {
        this.x = width / 2;
        this.y = height - 20;
        this.xdir = 0;
    }

    show() {
        fill(255);
        rectMode(CENTER);
        rect(this.x, this.y, 20, 20);
    }

    setDir(dir) {
        this.xdir = dir;
    }

    move() {
        this.x += this.xdir * 5;
    }

    hits(object) {
        let d = dist(this.x, this.y, object.x, object.y);
        if (d < object.r +10) {
            return true;
        } else {
            return false;
        }
    }
}