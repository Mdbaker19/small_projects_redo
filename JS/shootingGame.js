(function (){
    //1500, 800
    const c = document.getElementById("game");
    const cc = c.getContext("2d");

    //===========NEED TO ADD:
    //      BOX SPAWN ON CONDITIONAL
    //      MORE THAN ONE BULLET AT A TIME
    //      TURRET AI
    //

    const gameInfoSpot = $(".gameInfo");

    const pSpeed = 25;
    let ammo = [1,1,1,1,1,1,1,1,1,1];

    let spawnX = c.width;
    let spawnY = 0;
    let shot = false;
    let missed = false;
    let turret1Built = false;
    let turret2Built = false;

    let wallBroke = false;

    let healthGrabbed = false;
    let ammoGrabbed = false;
    let suppliesGrabbed = false;

    let zArr = [];
    let amountOfZombies = 1;
    let killCount = 0;

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
                ammo.pop();
            }
        }
    });

    function contact(objX, objY, objS, zX, zY, zS, zHS){
        return ((objY + objS > zY - (zHS*2) && objY < zY + zS) && (objX + objS > zX))
    }

    function grabBox(px, py, pBodyH, pBodyW, pLegs, pHead, bx, by, boxS){
        return ((py - (pHead * 2) < by + boxS && py + pBodyH + pLegs > by) && (px < bx + boxS && px + pBodyW > bx))
    }


    const wall = {
        x: 200,
        y: 0,
        w: 15,
        health: 1000,
        broken: function (){
            if(this.health < 1){
                wallBroke = true;
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
        supplies: 0,
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
        c: "#ccc4c4",
        used: function (){
            if(grabBox(player.x, player.y, player.bodyH, player.bodyW, player.leg, player.head, this.x, this.y, boxSize)){
                ammo.push(1);
            }
        }
    }

    const repairKit = {
        x: 50,
        y: 700,
        c: "#8f1717",
        used: function (){
            if(grabBox(player.x, player.y, player.bodyH, player.bodyW, player.leg, player.head, this.x, this.y, boxSize)){
                wall.health++;
            }
        }
    }

    const supplies = {
        x: 50,
        y: 200,
        c: "#536abd",
        used: function (){
            if(grabBox(player.x, player.y, player.bodyH, player.bodyW, player.leg, player.head, this.x, this.y, boxSize)){
                if(player.supplies < 3){
                    player.supplies++;
                }
            }
        }
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

    function drawTurretsAndBoxes(){
        if(!ammoGrabbed) {
            fill(ammoBox.x, ammoBox.y, boxSize, boxSize, ammoBox.c);
            circle(ammoBox.x + 23, ammoBox.y + 17.5, 4.5, "#c95d25");
            fill(ammoBox.x + 8, ammoBox.y + 12.5, 15, 10, "#c2a145");
        }
        if(!healthGrabbed) {
            fill(repairKit.x, repairKit.y, boxSize, boxSize, repairKit.c);
            fill(repairKit.x + boxSize / 2 - 2.5, repairKit.y, 5, boxSize, "#ffffff");
            fill(repairKit.x, repairKit.y + boxSize / 2 - 2.5, boxSize, 5, "#ffffff");
        }
        if(!suppliesGrabbed) {
            fill(supplies.x, supplies.y, boxSize, boxSize, supplies.c);
            fill(supplies.x + boxSize / 4, supplies.y + boxSize / 5, boxSize / 2, boxSize / 3.5, "#423333");
            fill(supplies.x + boxSize / 2.5, supplies.y + boxSize / 5, boxSize / 5, boxSize / 1.5, "#423333");
        }
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
        player.shoot();
        wall.broken();
    }


    setInterval(gameFunctions, 100);

    function gameFunctions() {
        ammoBox.used();
        repairKit.used();
        supplies.used();
        updateStats();
        moveZombies();
        zHit();
    }
    function updateStats(){
        gameInfoSpot[0].innerHTML = render();
        gameInfoSpot[1].innerHTML = "Space Bar: Shoots, Need supplies to build turrets(Key '1' builds turret 1 and Key '2' " +
            "for turret 2) || grab ammo, supplies and health from the boxes";
    }

    function draw(){
        fill(0, 0, c.width, c.height, "#0c0808");
        createZombies();
        drawTurretsAndBoxes();
        if(!wallBroke) {
            fill(wall.x, wall.y, wall.w, c.height, "#606060");//wall
        }
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
                    <h5 class="item">Kill Count: ${killCount}</h5>
                </div>`;
    }


    function createZombiesArray(){
        for(let i = 0; i < amountOfZombies; i++){
            let zObj = {
                x: zombie.x + (~~(Math.random() * 150) - 150),
                y: ~~(Math.random() * 730) + 25
        }
            zArr.push(zObj);
        }
    }
    createZombiesArray();


    function createZombies(){
        zArr.forEach(z => {
            fill(z.x, z.y, zombie.size, zombie.size, "#2e632e");
            circle(z.x + zombie.size/2, z.y - zombie.r, zombie.r, "#178a17");
            circle(z.x + zombie.r/1.5 , z.y - zombie.r / .75, 2, "#ea0b0b");
            fill(z.x - zombie.arm, z.y, zombie.arm, zombie.arm/3, "#b08a2a");
        });
    }

    function moveZombies(){
        zArr.forEach(z => {
            let zSpeed = ~~(Math.random() * 15) + 5;
            if(z.x > 230) {
                z.x -= zSpeed;
            } else {
                if(!wallBroke) {
                    wall.health -= 1;
                } else z.x -= zSpeed;
            }
            if(z.x < 0){
                location.reload();
            }
        });
    }

    function zHit(){
        zArr.forEach(z => {
            if(contact(bullet.x, bullet.y, bullet.s, z.x, z.y, zombie.size, zombie.r)){
                killCount++;
                z.x = spawnX + (~~(Math.random() * 100) - 100);
                z.y =  ~~(Math.random() * 700) + 50;
                bullet.x = 1000;
                bullet.y = -100;
                if(killCount % 2 === 0) {
                    createZombiesArray();
                }
            }
        })
    }

})();