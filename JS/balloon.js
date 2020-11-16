(function (){
    const c = document.getElementById("sky");
    const cc = c.getContext("2d");
    let amountOfBalloons = 1;
    let size = 25;
    let range = [200, 400, 600, 800, 1200, 1500];
    let ranX = Math.floor(Math.random() * 6);
    let speed = 8;
    let easier = document.getElementById("decrease");
    let harder = document.getElementById("increase");
    let score = document.getElementById("score");
    let points = 0;
    easier.addEventListener("click", function (){
        if(speed > 5){
            speed--;
        }
    });

    harder.addEventListener("click", function (){
        speed++;
    });

    window.addEventListener("mousemove", function (e){
        nozzle.x = e.x;
        nozzle.y = e.y;
    });

    const nozzle = {
        x: null,
        y: null
    }


    let balls = [];
    function Ball (){
        this.x = Math.floor(Math.random() * 1500) + 100;
        this.y = 950;
        this.fly = function (){
            if(this.y > size) {
                this.y -= speed;
            } else draw();
        };
        this.make = function (){
            fill(this.x - size/10, this.y, size/15, size*3, "#ffffff");
            circle(this.x, this.y, size, "#a33535");
            fill(this.x - size * .2, this.y + size, size/4, size/6, "#000000");
        };
        this.again = function (){
            if(size > 100){
                ranX = Math.floor(Math.random() * 6);
                amountOfBalloons++;
                size = 25;
                balloon.y = 950;
                balloon.x =  Math.floor(Math.random() * 1650) + 100;
            }
        }
    }

    window.onload = function (){
        start();
    }

    function start (){
        for(let i = 0; i < amountOfBalloons; i++){
            balls[i] = new Ball();
        }
    }

    function construct (){
        for(let i = 0; i < balls.length; i++){
            balls[i].fly();
            balls[i].make();
            balls[i].again();
        }
    }


    const balloon = {
        x: Math.floor(Math.random() * 1500) + 100,
        y : 950,
        move : function (){
            if(this.y > size) {
                this.y -= speed;
            } else draw();
        }
    }
    setInterval(load, 50);

    function create(){
        for(let i = 0; i < amountOfBalloons; i++){
            fill(range[ranX] - size/10, balloon.y, size/15, size*3, "#ffffff");
            circle(range[ranX], balloon.y, size, "#a33535");
            fill(range[ranX] - size * .2, balloon.y + size, size/4, size/6, "#000000");
        }
    }

    function load(){
        draw();
        balloon.move();
        create();
        construct();
        scenery();
        if(inflate(nozzle.x, nozzle.y, range[ranX], balloon.y, size)){
            size += 5;
        }
        if(size > 100){
            ranX = Math.floor(Math.random() * 6);
            amountOfBalloons++;
            start();
            points++;
            size = 25;
            balloon.y = 950;
            balloon.x =  Math.floor(Math.random() * 1500) + 100;
            score.innerText = points;
        }
    }

    function inflate(nx, ny, bx, by, s){
        if((nx < bx + s && nx > bx - s) && (ny > by - s && ny < by + s)){
            return true;
        }
    }

    function draw(){
        fill(0, 0, c.width, c.height, "#2e487c");
        fill(0, 0, c.width, 200, "#401a7d");
        fill(0, 100, c.width, 100, "#26608b");
        fill(0, c.height-100, c.width, 100, "#343030");
    }
    function scenery(){
        circle(200, 200, 35, "#e1e1e1");
        circle(180, 210, 35, "#e1e1e1");
        circle(210, 220, 35, "#e1e1e1");
        circle(260, 200, 35, "#e1e1e1");
        circle(290, 185, 35, "#e1e1e1");
        circle(265, 220, 35, "#e1e1e1");
        circle(700, 200, 35, "#e1e1e1");
        circle(720, 210, 35, "#e1e1e1");
        circle(710, 240, 35, "#e1e1e1");
        circle(760, 220, 35, "#e1e1e1");
        circle(1400, 200, 35, "#e1e1e1");
        circle(1500, 210, 35, "#e1e1e1");
        circle(1450, 220, 35, "#e1e1e1");
        circle(1450, 190, 35, "#e1e1e1");
        fill(100, 700, 50, 250, "#3f2c2c");
        circle(90, 650, 35, "#5fc63c");
        circle(120, 670, 35, "#5fc63c");
        circle(100, 630, 35, "#5fc63c");
        circle(160, 630, 35, "#5fc63c");
        circle(150, 610, 35, "#5fc63c");
        fill(700, 700, 50, 250, "#3f2c2c");
        circle(690, 650, 35, "#5fc63c");
        circle(720, 670, 35, "#5fc63c");
        circle(700, 630, 35, "#5fc63c");
        circle(760, 630, 35, "#5fc63c");
        circle(750, 610, 35, "#5fc63c");
        fill(900, 700, 50, 250, "#3f2c2c");
        circle(900, 650, 35, "#5fc63c");
        circle(920, 670, 35, "#5fc63c");
        circle(900, 630, 35, "#5fc63c");
        circle(960, 630, 35, "#5fc63c");
        circle(950, 610, 35, "#5fc63c");
        fill(1600, 700, 50, 250, "#3f2c2c");
        circle(1600, 650, 35, "#5fc63c");
        circle(1620, 670, 35, "#5fc63c");
        circle(1600, 630, 35, "#5fc63c");
        circle(1640, 630, 35, "#5fc63c");
        circle(1650, 610, 35, "#5fc63c");
    }
    function fill(lx, ly, w, h, c){
        cc.fillStyle = c;
        cc.fillRect(lx, ly, w, h);
    }

    function circle(x, y, r, c){
        cc.fillStyle = c;
        cc.beginPath();
        cc.arc(x, y, r, 0, Math.PI * 2, false);
        cc.fill();
    }
})();