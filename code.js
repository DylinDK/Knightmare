// create Phaser.Game object named "game"
var game = new Phaser.Game(1199, 401, Phaser.AUTO, 'my-game',
    { preload: preload, create: create, update: update });
var player;
var arrowKey;
var background;
var spacebar;
var score =0 ;
var snakeSound;
var hiss;
var deathSound;
var fireKey;
var background;
var snake;
var snakeGroup, bGroup, cGroup;
var scoreText;
var swordSound;
var endText;
var music;
var dGroup;
// preload game assets - runs once at start
function preload() {
   // declare global variables for game
 
game.load.spritesheet('player', 'assets/images/characters/knight1/knight-sprite-sheet.png', 95, 90); 
game.load.spritesheet('hiss', 'assets/images/king-cobra.png', 90,100);
game.load.spritesheet('barrier', 'assets/images/barrier.png', 295,193);
game.load.spritesheet('barrier1', 'assets/images/barrier1.png', 482, 427);
game.load.spritesheet('barrier2', 'assets/images/barrier2.png', 1199, 401);
game.load.image('background', 'assets/images/mainsetting/Knightmare.png',1199, 401);
game.load.audio('sword', 'assets/sounds/sword.wav');
game.load.audio('snake', 'assets/sounds/snake.wav');
game.load.audio('dead' , 'assets/sounds/dead.wav');
game.load.audio('music', 'assets/sounds/knightmare.wav');
}

// create game world - runs once after "preload" finished
function create() {
  
   
//   game.physics.arcade.enable(hiss);
   game.physics.startSystem(Phaser.Physics.ARCADE);
   
  //game.physics.arcade.collide(player,hiss);


game.world.setBounds(0, 0, 1199, 401);
//platform.body.immovable = true;

background= game.add.image(0,0, 'background');
background.fixedToCamera = true;
 hiss=game.add.sprite(0,0, 'hiss');
 hiss.animations.add('hiss', [1,2,3,4,5,6,7,8,9,10,11,12], 12, true);
arrowKey= game.input.keyboard.createCursorKeys();
fireKey = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
player= game.add.sprite(5,5, 'player');
game.physics.arcade.enable(player); 
player.animations.add('player', [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], 20, false);    



player.body.gravity.y = 450;
player.body.collideWorldBounds = true;
//camera follows the player on the screen
//game.camera.follow(player);
scoreText= game.add.text (20,20, 'Score:'+ score, { font: 'Arial', fontSize: '20px', fontStyle: 'bold', fill: '#fff' });
endText= game.add.text (550,100, 'Game Over! Refresh to play again!', { font: 'Arial', fontSize: '20px', fontStyle: 'bold', fill: '#fff' });
endText.visible = false;
snakeSound=game.add.audio ('snake', 0.5);
deathSound= game.add.audio ('dead' , 0.5);
swordSound= game.add.audio ('sword', 0.5);    
music= game.add.audio('music', 0.3); 
    snakeGroup = game.add.group();
    snakeGroup.enableBody = true;
    bGroup = game.add.group();
    bGroup.enableBody = true;
    bGroup.create(0,220,'barrier');
    // bGroup.create(0, 478, 'barrier2');
    bGroup.setAll('body.immovable', true);
    cGroup = game.add.group();
    cGroup.enableBody = true;
    cGroup.create(424,277,'barrier1');
    cGroup.setAll('body.immovable', true);

    
music.play();
music.loop = true;
scoreText.fixedToCamera= true;
//     // add snakes to group
    for (var i = 0; i < 23; i++) {
        var snake = snakeGroup.create(game.world.randomX, game.world.randomY, 'hiss');
        snake.anchor.set(0.5, 0.5);
snake.body.velocity.x= 15;
      //hiss.animations.play('hiss');
      snake.body.velocity.x = Math.random() * 15 + 20; // between 15-20
      if (Math.random() < 0.5) snake.body.velocity.x *= -2; // reverse direction 
  
        
    }    

}
    

// update gameplay - runs in continuous loop after "create" finished
function update() {
game.physics.arcade.collide(player, snakeGroup, collideSnake, null, this);
game.physics.arcade.collide(player, bGroup);
game.physics.arcade.collide(player, cGroup);
game.physics.arcade.collide(player, dGroup);

if (arrowKey.right.isDown) {
 player.body.velocity.x = 100;
    
  

}
  
 if (arrowKey.right.justUp){
     player.body.velocity.x = 0;
 hiss.animations.stop('hiss');
     
 }
 
 if (arrowKey.left.isDown) {
     player.body.velocity.x = -100;
 }
 
 if(arrowKey.left.justUp) {
     player.body.velocity.x = 0;
 }
 if (arrowKey.up.justDown){
    player.body.velocity.y =-200; 
 }
//   if (fireKey.isDown){
//  player.animations.play('player');
//     swordSound.play();
   //  }
     
if (fireKey.isUp){
    player.animations.stop();
}

if (score >= 100) {  
 endText.visible = true;   
snakeGroup=0;
}
}
function collideSnake(player, snake){
 if (fireKey.isDown) {player.animations.play ('player'); 
 snake.kill();
  swordSound.play();   
 score += 10;
scoreText.text= 'Score:'+ score;    
}
}
 
    
    
    
    
    



