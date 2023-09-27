var plane,plane_Img;
var planeCrashed,planeCrashed_Img,bg_Image,bg,startStateBg,Island_Img,bg_infinite;
var player_standing1_img,player_running_img,player,poisonApple_img;
var game_state = "start"


var play,end;

function preload(){
  
  plane_Img = loadImage("Imgs/Plane.png");
  planeCrashed_Img = loadImage("Imgs/Plane_Crashed.png");
  bg_Image = loadImage("Imgs/plane bg.png");
  startStateBg = loadImage("Imgs/Plane_titlePage.png");
  Island_Img = loadImage("Imgs/Island.jpg");
  player_running_img = loadAnimation("Imgs/player_running1.png","Imgs/player_running2.png");
  player_standing1_img = loadImage("Imgs/player_standing.png");
  poisonApple_img = loadImage("Imgs/poision_fruit.png");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  form = new Start();

  bg_infinite = createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight);
  bg_infinite.addImage(Island_Img);
  bg_infinite.scale = 4.5;
  bg_infinite.velocityX = -3;
  bg_infinite.visible = false;

  plane = createSprite(950,350,15,15);
  plane.addImage(plane_Img);
  plane.scale = 0.5;
  plane.visible = false;

}

function draw(){
  background(0);
 
  imageMode(CENTER);

  //-----------------------------------START----------------------------
  if(game_state === "start"){
    image(startStateBg,windowWidth/2,windowHeight/2,windowWidth,windowHeight);
    form.display()
  }
  //-----------------------------------PLANE CRASH----------------------------
  if(game_state === "planeCrash"){
    image(bg_Image,windowWidth/2,windowHeight/2,windowWidth,windowHeight);

    //The aero-plane sprite
    plane.visible=true;
    plane.velocityX = -4;
    
    if(plane.x <= windowWidth/2){
     plane.addImage(planeCrashed_Img);
     plane.x = windowWidth/2;
     plane.velocityY += 0.2; //gravity
     plane.scale=1.1;
    }

    //change game state to play
    if(plane.y > windowHeight - 100){
      game_state = "play";      
    }
  }
  //-----------------------------------PLAY - (Island)----------------------------
  if(game_state === "play"){
    //infinite background
    bg_infinite.visible = true;
    if(bg_infinite.x < 0){
      bg_infinite.x = windowWidth/2-200;
    }

    player = createSprite(760,870);
    player.addImage("player",player_standing1_img);
    player.scale = 3;

    //player movement
    if(keyDown("left_arrow")){
      player.x -= 4;
    }

    if(keyDown("right_arrow")){
      player.x += 4;
    }
  
    spawnObstacles();
  }

  drawSprites();

  //THE MOUSE CURSOR
  fill("white");
  text(mouseX + "," + mouseY, mouseX, mouseY);

}

//obstacles
function spawnObstacles(){
  if(frameCount % 60 === 0){
    var poisonApples = createSprite(random(100, windowWidth-100), 0);
    poisonApples.addImage("obstacles",poisonApple_img);
    poisonApples.velocityY = 10;
    poisonApples.scale = 0.2;
  }
}
