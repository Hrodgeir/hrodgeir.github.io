var context;
var stage;
var queue;
var gameTimer;
var gameTime = 0;
var timerText;

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

window.onload = function()
{
    var canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    context.canvas.width = WIDTH;
    context.canvas.height = HEIGHT;
    stage = new createjs.Stage("canvas");

    queue = new createjs.LoadQueue(false);
    queue.on("complete", queueLoaded, this);

    queue.loadManifest([
        {id: 'background', src: 'snake/assets/background.png'},
    ]);
    queue.load();

    gameTimer = setInterval(updateTime, 1000);
}

function queueLoaded(event)
{
    var background = new createjs.Bitmap(queue.getResult("background"));
    background.x = 800 - WIDTH;
    background.y = 600 - HEIGHT;
    stage.addChild(background);

    timerText = new createjs.Text("Time: " + gameTime.toString(), "36px Arial", "#FFF");
    timerText.x = 10;
    timerText.y = 10;
    stage.addChild(timerText);

    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener('tick', stage);
}

function updateTime()
{
    gameTime += 1;
    timerText.text = "Time: " + gameTime;
}
