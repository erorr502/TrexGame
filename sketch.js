var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
//var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;


function preload(){
  trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
 
  groundImage = loadImage("ground2.png");
 
  cloudImage = loadImage("cloud.png");
 
  
 
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
 
  trex = createSprite(50,180,20,50);
 
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
 
  ground = createSprite(200,180,400*400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = 0//-(6 + 3*score/100);
 
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
 
  restart = createSprite(300,140);
  restart.addImage(restartImg);
 
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
 
  invisibleGround = createSprite(200,190,400*400,10);
  invisibleGround.visible = false;
 
  cloudsGroup = new Group();
 
  score = 0;
}

function draw() {
  background(255);
  text("Score: "+ score, 500,50);
 
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = 0//-(6 + 3*score/100);
    trex.changeAnimation("running", trex_running);
    camera.position.x = trex.x-5;
    camera.position.y = trex.y-5;


   
    if(keyDown("space") && trex.y >= 159) {
      trex.velocityY = -12;
    }
    if(keyWentDown("Right_Arrow")) {
      trex.velocityX = 5;
    }
    if(keyWentUp("Right_Arrow")) {
      trex.velocityX = 0;
    }
 
    trex.velocityY = trex.velocityY + 0.8
 
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
 
    trex.collide(invisibleGround);
    spawnClouds();
 
  
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
   
    ground.velocityX = 0;
    trex.velocityY = 0;
    cloudsGroup.setVelocityXEach(0);
   
    trex.changeAnimation("collided",trex_collided);
   
    cloudsGroup.setLifetimeEach(-1);
   
    if(mousePressedOver(restart)) {
      reset();
    }
  }
 
 
  drawSprites();
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  cloudsGroup.destroyEach();
  trex.changeAnimation("running", trex_running);
  score = 0;
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}

