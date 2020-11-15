(function (){
    const c = document.getElementById("snake");
    const cc = c.getContext("2d");

    setInterval(load, 50);

    function load(){
        draw();
    }
    function draw(){
        fill(0, 0, c.width, c.height, "#716c6c");
    }
    function fill(lx, ty, w, h, c){
        cc.fillStyle = c;
        cc.fillRect(lx, ty, w, h);
    }

})();
