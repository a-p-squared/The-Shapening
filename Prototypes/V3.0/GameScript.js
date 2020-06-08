var canvas = document.querySelector("canvas");

canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;

var ctx = canvas.getContext("2d");

var gameStart = false;
var isPlaying = false;
var isInstructing = false;
var backInstructing = false;

var pauseTimeStart = 0;
var pauseTimeEnd = 0;
var isPaused = false;

function MainMenu() {
    this.heading = "THE SHAPENING";
    this.play = "PLAY";
    this.instructions = "INSTRUCTIONS";
    
    this.headingWidth;

    ctx.font = "60px Impact";
    this.playWidth = ctx.measureText(this.play ).width;
    this.playHeight = ctx.measureText(this.play).height;
    this.instructWidth = ctx.measureText(this.instructions ).width;
    this.instructHeight = ctx.measureText(this.instructions).height;

    this.canPlay = false;
    this.canInstruct = false;
    
    this.drawMenu = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeRect(canvas.width/2 - 540, canvas.height/2 - 360, 1080, 720);

        ctx.font = "70px Times New Roman";
        this.headingWidth = ctx.measureText(this.heading ).width;
        ctx.fillText(this.heading, (canvas.width/2) - (this.headingWidth/2), 150);
        
        ctx.font = "60px Impact";
        ctx.fillText(this.play, (canvas.width/2) - (this.playWidth/2), 400);

        ctx.font = "60px Impact";
        ctx.fillText(this.instructions, (canvas.width/2) - (this.instructWidth/2), 520);
    }
}

var mainMenu = new MainMenu();

window.addEventListener("keydown", keyPressed, false);
function keyPressed (event) {
    if(event.keyCode == 37 && player.centreX-200 > zone1.x)
        player.update(player.centreX-320, player.centreY);
    if(event.keyCode == 39 && player.centreX+200 < zone3.x)
        player.update(player.centreX+320, player.centreY);
    if(event.keyCode == 27)
    {
        isPlaying = false;
        if(!isPaused) {
            pauseTimeStart = pauseTimeStart + Date.now()
            isPaused = true;
        }
    }
}

function Player() {
    this.centreX = canvas.width/2;
    this.centreY = canvas.height/2;
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
    this.gameStartTime;

    this.startGame = function ()
    {
        this.gameStartTime = Date.now();
    }

    this.draw = function (GameTime) {
        ctx.font = "30px Times New Roman";
        ctx.fillText(this.title, canvas.width/2 - 500, 80);

        ctx.font = "30px Impact";
        ctx.fillText("Score : " + this.score, canvas.width/2 + 300, 60);
        ctx.fillText("Time   : " + GameTime, canvas.width/2 + 300, 100);

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

var zone1 = new Zone(canvas.width/2 - 420);
var zone2 = new Zone(canvas.width/2 - 100);
var zone3 = new Zone(canvas.width/2 + 220);

function Animation() {
    if(isPlaying)
        requestAnimationFrame(Animation);
    else
        requestAnimationFrame(mainMenu.drawMenu());
    
    ctx.clearRect(0,0,canvas.width, canvas.height);

    ctx.strokeRect(canvas.width/2 - 540, canvas.height/2 - 360, 1080, 720);
    
    var currentTime = Date.now() - (pauseTimeEnd - pauseTimeStart);

    var GameTime = (currentTime - ui.gameStartTime) / 1000;
    ui.draw(Math.round(GameTime));

    zone1.draw();
    zone2.draw();
    zone3.draw();

    player.draw();
}

mainMenu.drawMenu();

window.addEventListener("mousemove",mainMenuFuntions, false);

function Mouse() {
    this.x = undefined;
    this.y = undefined;
}

var mouse = new Mouse();

function mainMenuFuntions(event)
{
    mouse.x = event.x;
    mouse.y = event.y;

    if(mouse.x > canvas.width/2 - mainMenu.playWidth/2 && mouse.x < canvas.width/2 + mainMenu.playWidth/2 && mouse.y > 300 && mouse.y < 400)
        mainMenu.canPlay = true;
    else
        mainMenu.canPlay = false;
    
   if(mouse.x > canvas.width/2 - mainMenu.instructWidth/2 && mouse.x < canvas.width + mainMenu.instructWidth/2 && mouse.y >450 && mouse.y < 550) 
        mainMenu.canInstruct = true;
    else
        mainMenu.canInstruct = false;

    if(mouse.x > canvas.width/2-30 && mouse.x < canvas.width/2+50 && mouse.y > canvas.height/2 + 170 && mouse.y < canvas.height/2 + 210)
        backInstructing = true;
    else
        backInstructing = false;
}

window.addEventListener("mousedown", function (event) {
    if(mainMenu.canPlay)
    {
        if(!gameStart) ui.startGame();
        isPlaying = true;
        if(gameStart)
        {
            pauseTimeEnd =  pauseTimeEnd + Date.now()
            isPaused = false;
        }
        gameStart = true;
        Animation();
    }
    if(mainMenu.canInstruct)
    {
        isInstructing = true;
        Instruction();
    }
    if(isInstructing == true && backInstructing == true)
    {
        mainMenu.drawMenu();
        isInstructing = false;
    }
})

function Instruction () {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.strokeRect(canvas.width/2 - 540, canvas.height/2 - 360, 1080, 720);
    ctx.font = "60px Impact";
    ctx.fillText("INSTRUCTIONS",canvas.width/2 - mainMenu.instructWidth/2, canvas.height/2 - 300);
    this.instructions = ["You control the Circle shape. You can move left and right between the designated playzones.","Each zone is outlined by a Rectangle shape.","Zones gets ﬁlled up randomly. When a zone is completely ﬁlled by a Rectangle, the zone becomes a Killzone.","The Objective of the player is to avoid being in a Killzone.","Game ends if the player is in a Killzone.","Score is calculated based on survival time."];
    ctx.font = "30px Impact";
    for(var i = 0; i < 6; i++)
    {
        ctx.fillText(instructions[i], canvas.width/2 - 500, (canvas.height/2 - 200) + (i * 50), 1000);
    }
    ctx.font = "30px Times New Roman";
    ctx.fillText("Ajil Pappachan",canvas.width/2 - 520, canvas.height/2 + 350);
    ctx.fillText("Cheese Brain",canvas.width/2 + 360, canvas.height/2 + 350);
    ctx.fillText("Back", canvas.width/2 - 20, canvas.height/2 + 200);
    ctx.strokeRect(canvas.width/2-30, canvas.height/2 + 170, 80, 40); 
}