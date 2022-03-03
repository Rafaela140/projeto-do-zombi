var bg, bgImg;
var player, shooterImg, shooter_shooting;
var zombie;
var zombie_image;
var bullet;
var heart1, heart2, heart3, heart1Img, heart2Img, heart3Img;
var bulletGroup, zombieGroup
var bullets = 70
var gameState = "fight"
var score=0
var life=3
var lose,winning,explosionSound

function preload() {
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
  zombie_image = loadImage("assets/zombie.png")
  lose=loadSound("assets/lose.mp3")
  winning=loadSound("assets/win.mp3")
  explosionSound=loadSound("assets/explosion.mp3")
}

function setup() {


  createCanvas(windowWidth, windowHeight);

  //adicionando a imagem de fundo
  bg = createSprite(displayWidth / 2, displayHeight / 2, 00, 20)
  bg.addImage(bgImg)
  bg.scale = 1.5

  //criando o sprite do jogador
  player = createSprite(displayWidth - 1150, displayHeight - 300, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.6
  player.debug = true
  player.setCollider("rectangle", 0, 0, 300, 300)


  heart1 = createSprite(displayWidth - 150, 40, 20, 20)
  heart1.visible = false
  heart1.addImage("heart1", heart1Img)
  heart1.scale = 0.4

  heart2 = createSprite(displayWidth - 100, 40, 20, 20)
  heart2.visible = false
  heart2.addImage("heart2", heart2Img)
  heart2.scale = 0.4

  heart3 = createSprite(displayWidth - 150, 40, 20, 20)
  heart3.addImage("heart3", heart3Img)
  heart3.scale = 0.4

  bulletGroup = new Group()
  zombieGroup = new Group()

}

function draw() {
  background(0);

  if (gameState === "fight") {
if(life===3){
  heart3.visible=true
  heart2.visible=false
  heart1.visible=false
}
if(life===2){
  heart3.visible=false
  heart2.visible=true
  heart1.visible=false

}
if(life===1){
  heart3.visible=false
  heart2.visible=false
  heart1.visible=true
}
if(life===0){
  gameState="lost"

}
if(score==100){
  gameState="won"
  winning.play()
}
    if (keyDown("DOWN_ARROW")) {
      player.changeAnimation("shooter_1", shooter_shooting)

    }
    //movendo o jogador para cima e para baixo e tornando o jogo compatível com dispositivos móveis usando toques
    if (keyDown("UP_ARROW") || touches.length > 0) {
      player.y = player.y - 30
    }
    if (keyDown("DOWN_ARROW") || touches.length > 0) {
      player.y = player.y + 30
    }
    if (keyDown("LEFT_ARROW")) {
      player.x = player.x - 40
    }

    if (keyDown("RIGHT_ARROW")) {
      player.x = player.x + 40
    }
    //solte balas e mude a imagem do atirador para a posição de tiro quando a tecla de espaço for pressionada
    if (keyWentDown("space")) {
      player.addImage(shooterImg)
      bullet = createSprite(player.x - 20, player.y - 47, 20, 10)
      bullet.velocityX = 20
      bulletGroup.add(bullet)
      player.depth = bullet.depth
      player.depth = player.depth + 2
      bullets = bullets - 1
      explosionSound.play()
      

    }
    //o jogador volta à imagem original quando pararmos de pressionar a barra de espaço
    else if (keyWentUp("space")) {
      player.addImage(shooter_shooting)

     

    } 
    if (bullets == 0) {
      gameState = "bullet"
      lose.play()
    }
if(zombieGroup.isTouching(bulletGroup)){
  for(var i=0;i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(bulletGroup)){
      zombieGroup[i].destroy()
      bulletGroup.destroyEach()
      explosionSound.play()
      score+=2


    }
  }
}
if(zombieGroup.isTouching(player)){
  lose.play()
  for(var i=0;i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(player)){
      zombieGroup[i].destroy()
      life-=1
    }
  }
}

    zombies()
  }

  drawSprites();

textSize(20)
fill("white")
text("balas = "+bullets,displayWidth-210,displayHeight/2-250)
text("pontoação = "+score,displayWidth-200,displayHeight/2-220)
text("vidas = "+life,displayWidth-200,displayHeight/2-280)

if(gameState=="lost"){
  fill("red")
  textSize(100)
  text("você perdeu ☹️",400,400)
  zombieGroup.destroyEach()
  player.destroy()
}
else if(gameState=="won"){
  fill("yellow")
  textSize(100)
  text("você ganhou, parabens 💖",400,400)
  zombieGroup.destroyEach()
  player.destroy()
}
else if(gameState=="bullet"){
  fill("yellow")
  textSize(50)
  text("você não tem mais balas...",470,410)
  zombieGroup.destroyEach()
  player.destroy()
  bulletGroup.destroyEach()
}




  

}
function zombies() {

  if (frameCount % 60 === 0) {
    y = Math.round(random(250, 500))
    x=Math.round(random(500,1100))
    console.log(y)
    zombie = createSprite(displayWidth - x, displayHeight - y, 30, 50)
    zombie.addImage(zombie_image)
    zombie.scale = 0.25
    zombie.velocityX = -3
    zombie.lifetime = 500
    zombie.setCollider("rectangle",0,0,400,400)
    zombieGroup.add(zombie)



  }


}