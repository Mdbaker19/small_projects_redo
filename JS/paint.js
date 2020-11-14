(function (){
    const cvs = document.getElementById("canvas");
    const context = cvs.getContext("2d");
    cvs.width = window.innerWidth;
    cvs.height = window.innerHeight;

    let helpDisplayed = false;
    let helpMenu = $("#help");
    helpMenu.hide(0);

    const mouse = {
        x: null,
        y: null
    }

    const brush = {
        s: 10,
        c: "#000000"
    }

    window.onload = function (){
        draw();
    };

    function draw(){
        fill(0, 0, cvs.width, cvs.height, "#cfc7c7");
    }

    function fill(lx, ty, w, h, c){
        context.fillStyle = c;
        context.fillRect(lx, ty, w, h);
    }

    function circle(x, y, r, c){
        context.fillStyle = c;
        context.beginPath();
        context.arc(x, y, r, 0, Math.PI * 2);
        context.fill();
    }

    window.addEventListener("mousemove", function (e){
       mouse.x = e.x;
       mouse.y = e.y;
       circle(mouse.x - brush.s, mouse.y - brush.s, brush.s, brush.c);
    });

    window.addEventListener("click", draw);

    window.addEventListener("keydown", function (e){
            if(e.key === "h"){
                if(!helpDisplayed){
                    helpMenu.fadeIn(1000);
                    helpDisplayed = true;
                } else{
                    helpMenu.fadeOut(1000);
                    helpDisplayed = false;
                }
            }
            if(e.key === "r"){
                brush.c = "red";
            }
            if(e.key === "b"){
                brush.c = "blue";
            }
            if(e.key === "g"){
                brush.c = "green";
            }
            if(e.key === "Enter"){
                brush.c = ranColor();
            }
            if(e.key === "e") {
                brush.c = "#cfc7c7";
            }
            if(e.key === "u"){
                brush.c = "#000000";
            }
    });

    function ranColor(){
        let output = "#";
        const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "a", "b", "c", "d", "e", "f"];
        for(let i = 0; i < 6; i++){
            let ranNum = Math.floor(Math.random() * options.length-1) + 1;
            output+=(options[ranNum]);
        }
        return output;
    }
})();