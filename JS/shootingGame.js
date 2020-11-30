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
    let turret1Built = false;
    let turret2Built = false;

    window.addEventListener("keydown", function (e){
        if(e.key === "1"){
            if(player.supplies > 0) {
                turret1Built = true;
                player.supplies--;
            }
        }
        if(e.key === "2"){
            if(player.supplies > 0) {
                turret2Built = true;
                player.supplies--;
            }
        }
        if(e.key.includes("Arrow")){
            e.preventDefault();
        }
        const dir = e.key.replace("Arrow", "");
        player.move(dir);
        if(e.key === " "){
            if(ammo.length > 0) {
                bullet.updatePosition();
                shot = true;
                // ammo.pop();
            }
        }
    });

    function contact(objX, objY, objS, zX, zY, zS, zHS){
        return ((objY + objS > zY - (zHS*2) && objY < zY + zS) && (objX))
    }

    function grabBox(px, py, pBodyH, pBodyW, pLegs, pHead, bx, by, boxS){

    }


    const wall = {
        x: 200,
        y: 0,
        w: 15,
        health: 10000,
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
        arm: 10
    }

    const player = {
        x: 50,
        y: 400,
        head: 15,
        bodyH: 30,
        bodyW: 20,
        leg: 25,
        supplies: 2,
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
        x: null,
        y: null,
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




    const boxSize = 35;
    const ammoBox = {
        x: 50,
        y: 50,
        c: "#ccc4c4"
    }

    const repairKit = {
        x: 50,
        y: 700,
        c: "#8f1717"
    }

    const supplies = {
        x: 50,
        y: 200,
        c: "#536abd"
    }

    const turret1 = {
        x: 215,
        y: 125,
        c: "#af7a28"
    }

    const turret2 = {
        x: 215,
        y: 525,
        c: "#af7a28"
    }

    function forOtherAnimate(){
        fill(ammoBox.x, ammoBox.y, boxSize, boxSize, ammoBox.c);
        circle(ammoBox.x + 23, ammoBox.y + 17.5, 4.5, "#c95d25");
        fill(ammoBox.x + 8, ammoBox.y + 12.5, 15, 10, "#c2a145");
        fill(repairKit.x, repairKit.y, boxSize, boxSize, repairKit.c);
        fill(repairKit.x + boxSize/2 - 2.5, repairKit.y, 5, boxSize, "#ffffff");
        fill(repairKit.x, repairKit.y + boxSize/2 - 2.5, boxSize, 5, "#ffffff");
        fill(supplies.x, supplies.y, boxSize, boxSize, supplies.c);
        fill(supplies.x + boxSize/4, supplies.y + boxSize/5, boxSize/2, boxSize/3.5, "#423333");
        fill(supplies.x + boxSize/2.5, supplies.y + boxSize/5, boxSize/5, boxSize/1.5, "#423333");
        if(turret1Built) {
            fill(turret1.x, turret1.y, boxSize, boxSize, turret1.c);
            fill(turret1.x + boxSize, turret1.y + boxSize / 2 - 5, boxSize / 1.5, 10, turret1.c);
            fill(turret1.x + boxSize * 2 - 18, turret1.y + boxSize / 2 - 5, 4, 10, "#000000");
        }
        if(turret2Built) {
            fill(turret2.x, turret2.y, boxSize, boxSize, turret2.c);
            fill(turret2.x + boxSize, turret2.y + boxSize / 2 - 5, boxSize / 1.5, 10, turret2.c);
            fill(turret2.x + boxSize * 2 - 18, turret2.y + boxSize / 2 - 5, 4, 10, "#000000");
        }
    }


    setInterval(load, 50);

    function load() {
        draw();
        forOtherAnimate();
        player.shoot();
        wall.broken();
    }

    // setInterval(logZombies, 500);

    function logZombies(){
        console.log(zombie.x);
    }

    setInterval(gameFunctions, 100);

    function gameFunctions() {
        updateStats();
        moveAll();
        zHit();
    }
    function updateStats(){
        gameInfoSpot[0].innerHTML = render();
        gameInfoSpot[1].innerHTML = "have supplies to build turrets(for now, key '1' builds turret 1 and key '2' " +
            "builds turret 2 || player supplies set to 2 || ammo is infinite for now too || wall health is very" +
            "High and supply boxes are infinite)"
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
        return `<div class="content">
                    <h5 class="item">Ammo Left: ${ammo.length}</h5>
                    <h5 class="item">Wall Health: ${wall.health}</h5>
                    <h5 class="item">Supplies: ${player.supplies}</h5>
                </div>`;
    }


    //=======MAKE AN ARRAY OF ZOMBIE POSITIONS THAT ARE RANDOM=========//
    let zArr = [];

    function makeZ(){
        for(let i = 0; i <= 15; i++){
            let zObj = {
                x: zombie.x + (~~(Math.random() * 100) - 100),
                y: ~~(Math.random() * 700) + 50
        }
            zArr.push(zObj);
        }
    }
    makeZ();


    function createZombies(){
        zArr.forEach(z => {
            fill(z.x, z.y, zombie.size, zombie.size, "#2e632e");
            circle(z.x + zombie.size/2, z.y - zombie.r, zombie.r, "#178a17");
            circle(z.x + zombie.r/1.5 , z.y - zombie.r / .75, 2, "#ea0b0b");
            fill(z.x - zombie.arm, z.y, zombie.arm, zombie.arm/3, "#b08a2a");
        });
    }

    function moveAll(){
        zArr.forEach(z => {
            if(z.x > 230) {
                z.x -= zSpeed;
            } else {
                wall.health -= 1;
            }
        });
    }

    function zHit(){
        zArr.forEach(z => {
            if(contact(bullet.x, bullet.y, bullet.s, z.x, z.y, zombie.size, zombie.r)){
                z.x = spawnX;
                bullet.x = null;
                bullet.y = null;
            }
        })
    }

})();