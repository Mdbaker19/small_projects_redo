(function (){
    //1500, 800
    const c = document.getElementById("game");
    const cc = c.getContext("2d");

    window.addEventListener("keydown", function (e){
       const dir = e.key.replace("Arrow", "");
       player.move(dir);
    });

    const pSpeed = 10;
    let ammo = 0;
    let wallHealth = 100;

    const wall = {
        x: 200,
        y: 0,
        w: 15
    }

    const player = {
        x: 50,
        y: 400,
        head: 15,
        bodyH: 30,
        bodyW: 20,
        leg: 25,
        move: function (dir){
            switch (dir){
                case "Up":
                    if(this.y > this.head){
                        this.y -= pSpeed;
                    }
                    break;
                case "Down":
                    if(this.y < c.height - this.head -this.bodyH - this.leg){
                        this.y += pSpeed;
                    }
                    break;
                case "Left":
                    if(this.x > this.head){
                        this.x -= pSpeed;
                    }
                    break;
                case "Right":
                    if(this.x + this.head < wall.x){
                        this.x += pSpeed;
                    }
                    break;
            }
        }
    }

    setInterval(load, 50);

    function load(){
        draw();
    }
    function updateStats(){
        $(".gameInfo")[0].innerHTML = render();
    }
    updateStats();

    function draw(){
        fill(0, 0, c.width, c.height, "#000000");
        fill(wall.x, wall.y, wall.w, c.height, "#606060");//divider line
        fill(player.x - player.head/1.5, player.y + player.bodyH, 5, player.leg, "#123f67");//left leg
        fill(player.x + player.head/3, player.y + player.bodyH, 5, player.leg, "#123f67");//right leg
        fill(player.x -player.head/1.5, player.y + player.bodyH, player.bodyW, 8, "#123f67");//pants
        fill(player.x - player.head/1.5, player.y + player.head/4, player.bodyW, player.bodyH, "#771515");//player body
        circle(player.x, player.y, player.head, "#6d5555");//player head
        circle(player.x + player.head/2, player.y - player.head/5, 2, "#060505");// player eye
        fill(player.x - player.head/2, player.y + player.head * 1.2, player.bodyW, 5, "#3a2e2e");//player arm
    }

    function fill(x, y, w, h, c){
        cc.fillStyle = c;
        cc.fillRect(x, y, w ,h);
    }

    function circle(x, y, r, c){
        cc.fillStyle = c;
        cc.beginPath();
        cc.arc(x, y, r, 0, Math.PI * 2, false);
        cc.fill();
    }

    function render(){
        let html = `<div>`;
        html+=`<h5>Ammo Left: ${ammo}</h5>`;
        html+=`<h5>Wall Health: ${wallHealth}</h5>`;
        html+=`</div>`;

        return html;
    }



})();