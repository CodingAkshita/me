var waitImg,bgimg,popimg
var playbutton,homebutton,aboutbutton;
var beetroot, brinjal, burger, carrot, corn, forest, fries, ham, icecream, cream1, scoop, pumpkin, redfruit
var stickice, veggieburg, dizzy, jump, bottle, leaf  
var gameState = "wait"
var food
var ground
var score = 0
var timer = 15
var junkGroup,foodGroup

function preload(){
waitImg= loadImage("nine.png")
playbgimg=loadImage("2Ct5.gif")
logoimg=loadImage("logo.png")
yumimg = loadImage("yummygif.gif")
bgimg= loadImage("background.png")
popimg= loadImage("popup.png")
beetrootimg = loadImage("beetRoot.png") 
brinjalimg = loadImage("Brinjal.png")
burgerimg = loadImage("Burger.png")
carrotimg = loadImage("Carrot.png")
cornimg = loadImage("Corn.png")
forestimg = loadImage("Forest.jpg")
friesimg = loadImage("frenchFries.png")
hamimg = loadImage("hamBurger.png")
icecreamimg = loadImage("iceCream.png")
cream1img = loadImage("icecream1.png")
scoopimg = loadImage("icecreamScoop.png")
pumpkinimg = loadImage("Pumpkin.png") 
redfruitimg = loadImage("redFruit.png")
stickiceimg = loadImage("stickIce.png")
veggieburgimg = loadImage("veggieBurger.png")
die = loadAnimation("die1.png", "die2.png", "die3.png", "die4.png", "die5.png", "die6.png");
run = loadAnimation("run1.png", "run2.png", "run3.png", "run4.png", "run5.png", "run6.png", "run7.png") 
walk = loadAnimation("walk1.png", "walk2.png", "walk3.png", "walk4.png", "walk5.png", "walk6.png", "walk7.png")
dizzyimg = loadImage("dizzy1.png")
attack = loadAnimation("attack1.png", "attack2.png", "attack3.png", "attack4.png", "attack5.png")
jumpimg = loadImage("jump1.png")
bottleimg = loadImage("bottle.png")
leafimg = loadImage("leaf.png")
font = loadFont("/fonts/Corinthia-Bold.ttf")
}

function setup(){
createCanvas(windowWidth,windowHeight)
textFont(font)



logo = createSprite(windowWidth/2,windowHeight/2)
logo.addImage(logoimg)
logo.scale = 1.4
logo.visible=false

yum = createSprite(windowWidth/2,windowHeight/2)
yum.addImage(yumimg)
yum.visible = false
//used dom library to create image buttons   p5.dom.min.js

home=createImg("homeButton.png")
home.position(80,80)
home.size(100,100)

play=createImg("playButton.png");
play.position(80,180);
play.size(100,100)

about=createImg("aboutButton.png");
about.position(80,280)
about.size(100,100)

resetbutton = createImg("reset.png")
resetbutton.position(80,380)
resetbutton.size(100,100)

popbox=createSprite(windowWidth/2,windowHeight/2)
popbox.addImage(popimg)
popbox.visible = false
popbox.scale = 1.25

player = createSprite(100,windowHeight-100)
player.addAnimation("walking",walk)
player.addAnimation("die",die)
player.visible = false
player.scale = 2

ground = createSprite(windowWidth/2,windowHeight-20,windowWidth,20);
ground.visible=false

junkGroup= new Group()
foodGroup = new Group()
  
}


function draw(){
  player.collide(ground)
if(home.mousePressed(()=>{
    gameState="wait"
  }))

if(gameState==="wait") {
    background(bgimg)
    popbox.visible=false
    player.visible = false
    logo.visible=true
    play.show()
    resetbutton.hide()
    home.show()
    about.show()
    yum.visible = false
 }

if(about.mousePressed(()=>{
gameState="about" 
}))

if (gameState === "about") {
    popbox.visible = true
    player.visible = false
    logo.visible=false
    play.show()
    yum.visible = false

   
}

if(play.mousePressed(()=>{
    gameState="play" 
}))

if (gameState === "play"){
    popbox.visible = false
    logo.visible=false
    play.hide()
    home.hide()
    about.hide()
    resetbutton.hide()
    background(playbgimg)
    player.changeAnimation("walking",walk)
    player.visible = true
    //yum.visible = false

    spawnhealthyfood()
    spawnjunkfood() 
    if(player.isTouching(foodGroup)){
      foodGroup.destroyEach();
      score = score+1;     
  
    for(i=0; i<50;i++){
      yum.visible = true
  }
  
    }
  
    if(player.isTouching(junkGroup)){   
      junkGroup.destroyEach();       
      gameState = "pause"   
      score = score-2;
      yum.visible = false
  
      }
          
  if(score >=-2){
    gameState="end"
    }  
  
    if(score>=7){
      
    }
    

if(keyDown("UP_ARROW") &&  player.y>= windowHeight-200){
  player.velocityY = -19
}
player.velocityY +=0.8 
}

if(gameState === "pause"){
  background(playbgimg)
    foodGroup.destroyEach()
    popbox.visible = false
    logo.visible=false
    play.hide()
    home.hide()
    about.hide()
   // player.pause()
    //resetbutton.show()
   // playbgimg.pause()

   textSize(50)
   fill(0)
stroke(5)
   text("OH NO!",windowWidth/2, windowHeight/3)
   text("It's taking time to digest",windowWidth/2, windowHeight/2)
   text("Digestion Time Left : "+timer, 100, 100) 

   if(World.frameCount%10===0){
    timer = timer - 1;
  }

  if(timer === 0){
    gameState = "play";
    timer = 15;
  }  
}
 


/*if (gameState === "reset"){
  player.changeAnimation("walking",walk)
  gameState = "play"
}*/

if(gameState==="end"){
    background(0)
  resetbutton.show()
  
if(resetbutton.mousePressed(()=>{
  resetgame()
}))

 foodGroup.destroyEach()
 junkGroup.destroyEach()
 player.visible=false

}

drawSprites()


if (gameState==="about"){
textSize(40)
stroke("green")
strokeWeight(2)
fill("red")
text("Nice to meet you!", (windowWidth/2-(popbox.x/5)),120)

}


if(gameState==="play" || gameState==="pause"){
  textSize(50)
  fill("black")
stroke("red")
strokeWeight(5)
   text("Score : "+score,windowWidth-200,100)  
}
}



function resetgame(){

  gameState="wait"
  score=0
timer=0

}

function spawnhealthyfood(){

if(frameCount % 200 ===0){

food = createSprite(windowWidth,windowHeight-250)
food.y = Math.round(random(windowHeight-250,90))
food.velocityX=-3
food.scale = 0.4
var rand1 = Math.round(random(1,7))
player.depth = food.depth+1

switch(rand1){

case 1: food.addImage(beetrootimg);
break;
case 2: food.addImage(brinjalimg);
break;
case 3: food.addImage(carrotimg);
break;
case 4: food.addImage(cornimg);
break;
case 5: food.addImage(pumpkinimg);
break;
case 6: food.addImage(redfruitimg);
break;
case 7: food.addImage(leafimg);
break;

default:break;
}
foodGroup.add(food)

}
}

function spawnjunkfood(){

    if(frameCount % 180 === 0){
    
    junk = createSprite(windowWidth,windowHeight-250)
    junk.y = Math.round(random(windowHeight-250,90))
    junk.velocityX = -3
    junk.scale = 0.65
    var rand = Math.round(random(1,9))
    player.depth = junk.depth+1
    
    switch(rand){
    
    case 1: junk.addImage(burgerimg);
    break;
    case 2: junk.addImage(friesimg);
    break;
    case 3: junk.addImage(hamimg);
    break;
    case 4: junk.addImage(icecreamimg);
    break;
    case 5: junk.addImage(cream1img);
    break;
    case 6: junk.addImage(scoopimg);
    break;
    case 7: junk.addImage(stickiceimg);
    break;
    case 8: junk.addImage(veggieburgimg);
    break;
    case 9: junk.addImage(bottleimg);
    break;
  
    default:break;
    }
    junkGroup.add(junk)
    }
    }

  /*  function keyPressed() {
        if (keyCode === UP_ARROW) {
         player.velocityY = -17;    
       }*/



