(function (){
    const c = document.getElementById("sky");
    const cc = c.getContext("2d");
    let balloonCount = 1;
    let size = 25;
    let range = [200, 400, 600, 800, 1200, 1500];
    let ranX = Math.floor(Math.random() * 6);

    window.addEventListener("mousemove", function (e){
        nozzle.x = e.x;
        nozzle.y = e.y;
    });

    const nozzle = {
        x: null,
        y: null
    }

    const balloon = {
        x: Math.floor(Math.random() * 1500) + 100,
        y : 950,
        move : function (){
            if(this.y > size) {
                this.y -= 8;
            }
        }
    }
    setInterval(load, 50);

    function load(){
        draw();
        for(let i = 0; i < balloonCount; i++){
            fill(range[ranX] - size/10, balloon.y, size/15, size*3, "#ffffff");
            circle(range[ranX], balloon.y, size, "#a33535");
            fill(range[ranX] - size * .2, balloon.y + size, size/4, size/6, "#000000");
        }
        balloon.move();
        if(inflate(nozzle.x, nozzle.y, range[ranX], balloon.y, size)){
            size += 5;
        }
        if(size > 100){
            ranX = Math.floor(Math.random() * 6);
            balloonCount++;
            console.log(balloonCount);
            size = 25;
            balloon.y = 950;
            balloon.x =  Math.floor(Math.random() * 1500) + 100;

        }
    }

    function inflate(nx, ny, bx, by, s){
        if((nx < bx + s && nx > bx - s) && (ny > by - s && ny < by + s)){
            return true;
        }
    }

    function draw(){
        fill(0, 0, c.width, c.height, "#2e487c");
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