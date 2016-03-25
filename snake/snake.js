var context;
var stage;
var queue;
var gameTimer;
var gameTime = 0;
var timerText;

window.onload = function()
{
    var canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    context.canvas.width = 800;
    context.canvas.height = 600;
    stage = new createjs.Stage("canvas");

    queue = new createjs.LoadQueue(false);
    queue.on("complete", queueLoaded, this);

    queue.loadManifest([
        {id: 'background', src: 'assets/background.png'},
    ]);
    queue.load();

    gameTimer = setInterval(updateTime, 1000);
}

function queueLoaded(event)
{
    var background = new createjs.Bitmap(queue.getResult("background"));
    stage.addChild(background);

    timerText = new createjs.Text("Time: " + gameTime.toString(), "36px Arial", "#FFF");
    timerText.x = 10;
    timerText.y = 10;
    stage.addChild(timerText);

    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener('tick', stage);
    createjs.Ticker.addEventListener('tick', tickEvent);
}

function updateTime()
{
    gameTime += 1;
    timerText.text = "Time: " + gameTime;
}
