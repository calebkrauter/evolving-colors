class MyAutomata {
    x = 1;
    y = 1;
    MyAutomata(game) {
        Object.assign(this, { game });

        // make an array that contains 10x10 based position values.
        // Might be easier to make this in the terminal first.
    }

    update() {
        if (this.x >= 100) {
            this.x = this.x - 1;
            this.y = this.y - 1;
        }
        if (this.x <= 1 || this.x > 0) {
            this.x = this.x + 1;
            this.y = this.y + 1;
        }
    }

    draw(ctx) {
        ctx.fillStyle = "Red";
        ctx.fillRect(this.x, this.y, 10, 10);
    }
}