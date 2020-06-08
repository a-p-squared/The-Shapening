var canvas = document.querySelector("canvas");

canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;

var ctx = canvas.getContext("2d");

window.addEventListener("keydown", keyPressed, false);

function Player() {
    this.centreX = 540;
    this.centreY = 360;
    this.radius = 90;
    this.startAngle = 0;
    this.endAngle = Math.PI * 2;
    
    this.update = function (newX, newY) {
        this.centreX = newX;
        this.centreY = newY;
    }

    this.draw = function () {
        ctx.fillStyle = "skyblue";
        ctx.beginPath();
        ctx.arc(this.centreX, this.centreY, this.radius, this.startAngle, this.endAngle);
        ctx.stroke();
        ctx.fill();
        ctx.fillStyle = "black";
    }
}

function UI () {
    this.title = "THE SHAPENING";
    this.score = 0;
    this.time = 0;
    this.gameStartTime = Date.now();

    this.draw = function (GameTime) {
        ctx.font = "30px Times New Roman";
        ctx.fillText(this.title, 120, 80);

        ctx.font = "30px Impact";
        ctx.fillText("Score : " + this.score, 780, 60);
        ctx.fillText("Time   : " + GameTime, 780, 100);

    }
}

function Zone(x) {
    this.x = x;
    this.y = 160;
    this.width = 200;
    this.height = 400;

    this.draw = function () {
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}

var ui = new UI();

var player = new Player();

var zone1 = new Zone(120);
var zone2 = new Zone(440);
var zone3 = new Zone(760);

function keyPressed(event) {
    if(event.keyCode == 37 && player.centreX-320 > 120)
        player.update(player.centreX-320, player.centreY);
    if(event.keyCode == 39 && player.centreX+320 < 960)
        player.update(player.centreX+320, player.centreY);
}

function Animation() {
    requestAnimationFrame(Animation);
    
    ctx.clearRect(0,0,canvas.width, canvas.height);

    var currentTime = Date.now();
    var GameTime = (currentTime - ui.gameStartTime) / 1000;
    ui.draw(Math.round(GameTime));

    zone1.draw();
    zone2.draw();
    zone3.draw();

    player.draw();
}

Animation();