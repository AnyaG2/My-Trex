var PLAY=1;
var END=0;
var gameState=PLAY;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, CloudsGroup, cloudImage;
var ObstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score
var restart, restartImg;
var gameOver, gameOverImg;
var jumpSound , checkPointSound, dieSound;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");
  
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkPoint.mp3");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -6;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  CloudsGroup = new Group();
  ObstaclesGroup = new Group();
   score=0
  
  gameOver = createSprite(300,100);
  gameOver.addImage("g1",gameOverImg);
  gameOver.scale= 0.5;
  
  restart = createSprite(300,140);
  restart.addImage("r1",restartImg);
  restart.scale= 0.5;
 
  gameOver.visible=false;
  restart.visible=false;
}

function draw() {
  background("cyan");
  text("Score: "+ score, 500,50);
  
 if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(6 + 3*score/100);
    //scoring
   score = score + Math.round(getFrameRate()/60); 
    
   if(score>0 && score%100 === 0){
       checkPointSound.play(); 
   }
   
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space") && trex.y >= 159){
      trex.velocityY = -12 ;
      jumpSound.play();
    }
  
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
    
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles
    spawnObstacles();
    
    //End the game when trex is touching the obstacle
    if(ObstaclesGroup.isTouching(trex)){
      gameState = END;
      dieSound.play();
    }
 }
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    trex.velocityY=0;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.addAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
  
  if(mousePressedOver(restart)) {
    reset();
     }
   }
  //console.log(trex.y);
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage("c1",cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
  
}
 
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true  
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage("o1",obstacle1);
              break;
      case 2: obstacle.addImage("o2",obstacle2);
              break;
      case 3: obstacle.addImage("o3",obstacle3);
              break;
      case 4: obstacle.addImage("o4",obstacle4);
              break;
      case 5: obstacle.addImage("o5",obstacle5);
              break;
      case 6: obstacle.addImage("o6",obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}

function reset() {
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  
  trex.addAnimation("running",trex_running);
  
  score = 0;
}





 











