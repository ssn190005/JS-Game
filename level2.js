// define variables
var game;
var player;
var platforms;
var badges;
var items;
var cursors;
var jumpButton;
var text;
var winningMessage;
var won = false;
var currentScore = 0;
var winningScore = 100;


// add collectable items to the game
function addItems() {
  items = game.add.physicsGroup();
  items.create(305,410,'star');
  items.create(760,260,'star');
  items.create(245,60,'star');
  createItem(375, 400, 'coin');
  createItem(575, 500, 'coin');
  createItem(700, 100, 'coin');
  createItem(225, 500, 'poison');
  createItem(100, 250, 'coin');
  createItem(575, 150, 'coin');
  createItem(525, 300, 'poison');
  createItem(650, 250, 'coin');
  createItem(225, 200, 'coin');
}

// add platforms to the game
function addPlatforms() {
  platforms = game.add.physicsGroup();
  platforms.create(450, 550, 'platform2');
  platforms.create(100, 550, 'platform2');
  platforms.create(300, 450, 'platform2');
  platforms.create(250, 150, 'platform2');
  platforms.create(35, 300, 'platform2');
  platforms.create(150, 250, 'platform2');
  platforms.create(630, 300, 'platform2');
  platforms.create(540, 200, 'platform2');
  platforms.create(300, 450, 'platform2');
  platforms.create(400, 350, 'platform2');
  platforms.create(100, 100, 'platform2');
  platforms.setAll('body.immovable', true);
}

// create a single animated item and add to screen
function createItem(left, top, image) {
  var item = items.create(left, top, image);
  item.animations.add('spin');
  item.animations.play('spin', 10, true);
}

// create the winning badge and add to screen
function createBadge() {
  badges = game.add.physicsGroup();
  var badge = badges.create(750, 400, 'badge');
  badge.animations.add('spin');
  badge.animations.play('spin', 10, true);
}

// when the player collects an item on the screen
function itemHandler(player, item) {
  item.kill();
  
  var questionBank = ['Is Nile the longest river in the world?',//0
  'Is 77/11+5-2 equal to 20-50/5?',//1
  'Is Antartica the largest coldest desert in the world?',//2
  'Do normal adults have 206 bones?',//3
  'Is Mount Everest the tallest peak of the world?',//4
  'Are there 50 states in the USA?',//5
  'Is Gandhinagar the capital of Gujarat?',//6
  'Are kangaroos marsupial?',//6-7
  'Do humans have 23 sets of chromosomes?',//6-8
  'Would Feb 2018 have 29 days?',//7
  'Do bats lay eggs?',//8
  'Does the abbrievation WWW stand for Window of World Web',//9
  'Is 27*13 greater than 14*26?',//10
  'Is New York City the Capital of USA?',//11
  'Is Yen the currency of China?',//12
  'Do Equators experience the highest peak temperatures of the year?',//12-14
  'Does the Olympic ring symbol have 6 rings?'//12-16
  ];
  var index = Math.floor(Math.random()*questionBank.length);
  var res = 'Yes';
  if(index < 9) {
    res = 'Yes';
  }
  else {
    res = 'No';
  }

  if (item.key == 'coin'){
    currentScore = currentScore + 10;
  }
  else if (item.key == 'poison'){
      lose = true;
      player.kill();
      
      //losingMessage.text = "   You Lose!!!" + "\n" + "You scored" + " " + currentScore;
      swal(
        'You Lose!!!',
        'You scored ' + currentScore
        );  

      setTimeout(function(){
        window.location.href = "thanks.html";
      },2000);
    // currentScore = currentScore - 5;
  }
  else if(item.key == 'star'){
    swal({
       title: questionBank[index],
       input: 'text',
       inputPlaceholder: 'Type Yes or No'
       }).then(function(result){
          if(result.toLowerCase() == res.toLowerCase()){
            currentScore = currentScore + 10;
            swal(
              'Correct Answer! You get 10 points.',
               'success'
            );  
            if (currentScore == winningScore) {
                createBadge();
            }
          }
          else {
            swal(
              'Incorrect Answer! You Lose',
              'failure'
            );
            lose = true;
            player.kill();
            setTimeout(function(){
              window.location.href = "thanks.html";
            },2000);
          }
        });
  }

  else {
  	//
  }
 
  if (currentScore === winningScore) {
      createBadge();
  }
}

// when the player collects the badge at the end of the game
function badgeHandler(player, badge) {
  badge.kill();
  swal(
        'Congratulations!!!',
        'You have won this level.',
        'success'
        );
      setTimeout(function(){
        window.location.href = "thanks.html";
      },3000);
  //won = true;
}

// setup game when the web page loads
window.onload = function () {
  game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
  
  // before the game begins
  function preload() {
    game.stage.backgroundColor = '#5db1ad';
    //Load image
    //game.load.image('platform', 'platform_1.png');
    game.load.image('platform2', 'platform_2.png');

    //game.stage.backgroundColor = background;
    
    //Load spritesheets
    game.load.spritesheet('player', 'cartoon3.png', 65, 65);
    game.load.spritesheet('coin', 'coin.png', 36, 44);
    game.load.spritesheet('badge', 'badge.png', 42, 54);
    game.load.spritesheet('poison', 'poison.png', 32, 32);
    game.load.spritesheet('star', 'star.png', 32, 32);
    //game.load.spritesheet('c-door', 'c-door.png', 40, 40);

    setTimeout(function(){
            swal(
              'Welcome to Level#2',
              'Beware of the poison'
              );
        },1000);


    }

  
  // initial game set up
  function create() {
    player = game.add.sprite(50, 600, 'player');
    player.animations.add('walk');
    player.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 500;
    player.inputEnabled = true;
    //ayer.touch = true;

    addItems();
    addPlatforms();

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    text = game.add.text(16, 16, "SCORE: " + currentScore, { font: "bold 24px Arial", fill: "white" });
    winningMessage = game.add.text(game.world.centerX, 275, "", { font: "bold 48px Arial", fill: "white" });
    winningMessage.anchor.setTo(0.5, 1);
    losingMessage = game.add.text(game.world.centerX, 275, "", { font: "bold 48px Arial", fill: "red" });
    losingMessage.anchor.setTo(0.5, 1);
    
  }

  // while the game is running
  function update() {
    text.text = "SCORE: " + currentScore;
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, items, itemHandler);
    game.physics.arcade.overlap(player, badges, badgeHandler);
    player.body.velocity.x = 0;

    // is the left cursor key presssed?
    if (cursors.left.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = -300;
      player.scale.x = - 1;
    }
    // is the right cursor key pressed?
    else if (cursors.right.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = 300;
      player.scale.x = 1;
    }
    // player doesn't move
    else {
      player.animations.stop();
    }
    
    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down)) {
      player.body.velocity.y = -400;
    }
    // when the player wins the game
    if (won) {
      //winningMessage.text = "YOU WIN!!!";
      swal(
        'Congratulations!!!',
        'You have won this level.',
        'success'
        );
      setTimeout(function(){
		    window.location.href = "thanks.html";
		  },3000);
    }

  }

  function render() {

  }

};
