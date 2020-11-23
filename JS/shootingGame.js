(function (){
    //1500, 800
    const c = document.getElementById("game");
    const cc = c.getContext("2d");

    //===========NEED TO ADD:
    //      AMMO BOX SPAWN AND CONTACT
    //      SUPPLY BOX SPAWN AND WALL HEALTH REPAIR
    //      BULLET CONTACT ON ZOMBIES
    //      TURRET CONSTRUCTION
    //

    const gameInfoSpot = $(".gameInfo");

    const pSpeed = 15;
    const zSpeed = 20;
    let ammo = [1,1,1];

    let spawnX = c.width;
    let spawnY = 0;
    let shot = false;
    let missed = false;

    window.addEventListener("keydown", function (e){
        if(e.key.includes("Arrow")){
            e.preventDefault();
        }
        const dir = e.key.replace("Arrow", "");
        player.move(dir);
        if(e.key === " "){
            if(ammo.length > 0) {
                bullet.updatePosition();
                shot = true;
                ammo.pop();
            }
        }
    });


    const wall = {
        x: 200,
        y: 0,
        w: 15,
        health: 100,
        broken: function (){
            if(this.health < 1){
                window.location.reload();
            }
        }
    }

    const zombie = {
        x: spawnX,
        y: spawnY,
        r: 8,
        size: 15,
        arm: 10,
        traverse: function (){
            if(this.x > wall.x + wall.w + (this.arm * 1.25)) {
                this.x -= zSpeed;
            } else {
                wall.health -= 1;
            }
        }
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
        },
        shoot: function (){
            if(shot) {
                circle(bullet.x, bullet.y, bullet.s, "#ffffff");
                bullet.travel();
            } if(missed){
                shot = false;
            }
        }
    }

    const bullet = {
        x: player.x + (player.head/2),
        y: player.y + (player.head * 1.2),
        s: 5,
        travel: function (){
            if(this.x < c.width){
                missed = false;
                this.x += 75;
            } else {
                missed = true;
            }
        },
        updatePosition: function (){
            this.x = player.x + (player.head/2);
            this.y = player.y + (player.head * 1.2);
        }
    }




    const ammoBox = {

    }

    const repairKit = {

    }

    const supplies = {

    }

    const turret = {

    }


    setInterval(load, 50);

    function load() {
        draw();
        player.shoot();
        wall.broken();
    }

    // setInterval(logZombies, 500);

    function logZombies(){
        console.log(zombie.x);
    }

    setInterval(gameFunctions, 100);

    function gameFunctions() {
        zombie.traverse();
        updateStats();
    }
    function updateStats(){
        gameInfoSpot[0].innerHTML = render();
        gameInfoSpot[1].innerHTML = "have supplies to build turrets"
    }

    function draw(){
        fill(0, 0, c.width, c.height, "#0c0808");
        createZombies();
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
        html+=`<h5>Ammo Left: ${ammo.length}</h5>`;
        html+=`<h5>Wall Health: ${wall.health}</h5>`;
        html+=`</div>`;
        return html;
    }


    //=======MAKE AN ARRAY OF ZOMBIE POSITIONS THAT ARE RANDOM=========//
    function createZombies(){
        for(let i = 75; i < c.height; i+=75){
            fill(zombie.x, zombie.y + i, zombie.size, zombie.size, "#2e632e");
            circle(zombie.x + zombie.size/2, zombie.y - zombie.r + i, zombie.r, "#178a17");
            circle(zombie.x + zombie.r/1.5 , zombie.y + i - zombie.r / .75, 2, "#ea0b0b");
            fill(zombie.x - zombie.arm, zombie.y + i, zombie.arm, zombie.arm/3, "#b08a2a");
        }
    }




})();