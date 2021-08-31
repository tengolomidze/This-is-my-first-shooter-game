const player = document.querySelector("#player")
const enemy = document.querySelector("#enemy")

const zombieHealthDiv = document.querySelector("#zombieHealthDiv")
const zombieHealth = document.querySelector("#zombieHealth")

const hp = document.querySelector("#hp")

const bullet = document.querySelector("#bullet")
const bullet2 = document.querySelector("#bullet2")
const bullet3 = document.querySelector("#bullet3")
const bullet4 = document.querySelector("#bullet4")
const bullet5 = document.querySelector("#bullet5")
const bullet6 = document.querySelector("#bullet6")
const bullet7 = document.querySelector("#bullet7")

const bullets = document.querySelector("#bullets")

const medkit = document.querySelector("#medkit")


const stage = document.querySelector("#stage")

const gamestarter = document.querySelector("#game")

const welcome = document.querySelector("#welcome")

const imgg = document.querySelector("#imgg")

const gameover = document.querySelector("#gameover")

var health = 100

var mouseX;
var mouseY;

// ეკრანის Y სიგრძე
let screenY = screen.height
// ეკრანის X სიგანე
let screenX = screen.width



var playerCenter = {
    x: parseInt(player.style.left) + parseInt(player.style.width)/2,
    y:  parseInt(player.style.top) + parseInt(player.style.height)/2
};


var key;

hp.innerHTML = 'hp: ' + health +'%'

medkit.style.width = 50 + 'px'
medkit.style.height = 50 + 'px'





var radius;
var degree;

var speed = 20;

var bulletsnumber = 0; 

var reload = 0;

var goX;
var goY;

var goX2;
var goY2;

var goX3;
var goY3;

var goX4;
var goY4;

var goX5;
var goY5;

var goX6;
var goY6;

var goX7;
var goY7;

var enemyCenter = {
    x: parseInt(enemy.style.left) + parseInt(enemy.style.width)/2,
    y:  parseInt(enemy.style.top) + parseInt(enemy.style.height)/2
}


var medkitCenter = {
    x: parseInt(medkit.style.left) + parseInt(medkit.style.width)/2,
    y:  parseInt(medkit.style.top) + parseInt(medkit.style.height)/2
}



var bulletFired = true;
var bullet2Fired = true;
var bullet3Fired = true;
var bullet4Fired = true;
var bullet5Fired = true;
var bullet6Fired = true;
var bullet7Fired = true;

bullets.innerHTML =  bulletsnumber + ' / 7' 

enemy.style.display = 'block'
medkit.style.display = 'none'

var stageNumber = 1;

var stageWin = false;
var nextStageTimer = 0;


var zombieHp = 100
var zombieHp100 = 100

var zombiespeed = 1;

stage.innerHTML = "ეტაპი: " + stageNumber

player.style.width = 120 + 'px'
player.style.height = 100 + 'px'
player.style.left = screenX /2 -  parseInt(player.style.width)/2 + 'px';
player.style.top = screenY /2 - parseInt(player.style.height)/2 + 'px';


var audio = new Audio('sounds/bgmusic.mp3');
var deathaudio = new Audio('sounds/lose.mp3');
var shootaudio = new Audio('sounds/myAudio.mp3');

audio.play();




function gameStart(){
    welcome.style.display = 'none'
    gamestarter.style.display = 'block'
    audio.play();

enemy.style.width = 80 + 'px' 
enemy.style.height = 80 + 'px'
enemy.style.left = Math.floor(Math.random() * (screenX - parseInt(player.style.width))) + 'px';
enemy.style.top =  Math.floor(Math.random() * (screenY -  parseInt(player.style.height) * 2)) + 'px';

zombieHealthDiv.style.width = 60 + 'px'
zombieHealthDiv.style.height = 10 + 'px'
zombieHealthDiv.style.left = enemyCenter.x - parseInt(zombieHealthDiv.style.width)/2 + 'px';
zombieHealthDiv.style.top =   enemyCenter.y -parseInt(enemy.style.height)/2 - 10+ 'px';

medkit.style.left = Math.floor(Math.random() * (screenX - parseInt(medkit.style.width))) + 'px';
medkit.style.top =  Math.floor(Math.random() * (screenY -  parseInt(medkit.style.height) * 2)) + 'px';



window.addEventListener('keydown', function(e){
    key = e.keyCode;
    
    
    if(key == 68 && playerCenter.x + parseInt(player.style.width)/2 <= screenX && gameover.style.display != "block"){
         player.style.left =  parseInt(player.style.left) + 15 + 'px'
    }

    if(key == 65 && playerCenter.x - parseInt(player.style.width)/2 >= 0 && gameover.style.display != "block"){
          player.style.left =  parseInt(player.style.left) - 15 + 'px'
    }

    if(key == 87 && playerCenter.y - parseInt(player.style.height)/2 >= 0 && gameover.style.display != "block"){
          player.style.top =  parseInt(player.style.top) - 15 + 'px'
    }

    if(key == 83 && playerCenter.y + parseInt(player.style.height)*2 <= screenY && gameover.style.display != "block"){
         player.style.top =  parseInt(player.style.top) + 15 + 'px'
    }

    if(key == 82 && reload == 0 && bulletsnumber != 7){
        bulletsnumber = 0
        bulletFired = true
        bullet2Fired = true
        bullet3Fired = true
        bullet4Fired = true
        bullet5Fired = true
        bullet6Fired = true
        bullet7Fired = true
        bullet2.style.display = 'none'
        bullet3.style.display = 'none'
        bullet4.style.display = 'none'
        bullet5.style.display = 'none'
        bullet6.style.display = 'none'
        bullet7.style.display = 'none'
    }

    
   console.log(key)
})




window.setInterval(function(){

    playerCenter = {
        x: parseInt(player.style.left) + parseInt(player.style.width)/2,
        y:  parseInt(player.style.top) + parseInt(player.style.height)/2
    }

    enemyCenter = {
        x: parseInt(enemy.style.left) + parseInt(enemy.style.width)/2,
        y:  parseInt(enemy.style.top) + parseInt(enemy.style.height)/2
    }



    var radians = Math.atan2(playerCenter.x - enemyCenter.x, playerCenter.y - enemyCenter.y);
    var degree = (radians * (180 / Math.PI) * -1) + 180; 
    enemy.style.transform = 'rotate('+ (-100 + degree) + "deg)"
    
    
if(enemyCenter.x > playerCenter.x + 50){
    enemy.style.left =  parseInt(enemy.style.left) - zombiespeed + 'px';
}
if(enemyCenter.x < playerCenter.x - 50){
    enemy.style.left =  parseInt(enemy.style.left) + zombiespeed + 'px';
}
if(enemyCenter.y > playerCenter.y + 50){
    enemy.style.top =  parseInt(enemy.style.top) - zombiespeed + 'px';
}
if(enemyCenter.y < playerCenter.y - 50){
    enemy.style.top =  parseInt(enemy.style.top) + zombiespeed + 'px';
}



if(enemyCenter.y > playerCenter.y - 55 && enemyCenter.y < playerCenter.y + 55 
    && enemyCenter.x > playerCenter.x - 55 && enemyCenter.x < playerCenter.x + 55){

    if(health >= 0.4 && enemy.style.display == 'block'){
          health -= 0.09
          hp.innerHTML = 'hp: ' + Math.floor(health) +'%'

             
       }
}
if( health > 80){
    hp.style.color = 'rgb(0, 255, 0)'
}
if(health > 50 && health < 80){
    hp.style.color = 'green'
}
if(health > 30 && health < 50){
    hp.style.color = 'orange'
}
if(health > 0 && health < 30){
    hp.style.color = 'red'
}



medkitCenter = {
    x: parseInt(medkit.style.left) + parseInt(medkit.style.width)/2,
    y:  parseInt(medkit.style.top) + parseInt(medkit.style.height)/2
}

if(medkitCenter.y > playerCenter.y - 55 && medkitCenter.y < playerCenter.y + 55 
    && medkitCenter.x > playerCenter.x - 55 && medkitCenter.x < playerCenter.x + 55){

    if(health >= 0.4 && medkit.style.display == 'block'){
          health += 40
          hp.innerHTML = 'hp: ' + Math.floor(health) +'%'

          medkit.style.display = 'none'
       }
}


}, 5)









function cosAndSin(){
        if(degree >= 0 && degree <= 90) {
            var x = degree;
            var y = -(90 - x);
            
            

            goX = speed * x/90;
            goY = speed * y/90;
            
        }else if(degree > 90 && degree <= 180) {
            var y = degree - 90;
            var x = 90 - y;
            
            
            

            goX = speed * x/90;
            goY = speed * y/90;

        }else if(degree > 180 && degree <= 270) {
            var x = -(degree - 180);
            var y = 90 - -(x);
            
            

            goX = speed * x/90;
            goY = speed * y/90;

        }else if(degree > 270 && degree <= 360) {
            
            var y = -(degree - 270);
            var x = -(90 - -(y));
            

            goX = speed * x/90;
            goY = speed * y/90;
        }
}

function cosAndSin2(){
    if(degree >= 0 && degree <= 90) {
        var x = degree;
        var y = -(90 - x);
        
        

        goX2 = speed * x/90;
        goY2 = speed * y/90;
        
    }else if(degree > 90 && degree <= 180) {
        var y = degree - 90;
        var x = 90 - y;
        
        
        

        goX2 = speed * x/90;
        goY2 = speed * y/90;

    }else if(degree > 180 && degree <= 270) {
        var x = -(degree - 180);
        var y = 90 - -(x);
        
        

        goX2 = speed * x/90;
        goY2 = speed * y/90;

    }else if(degree > 270 && degree <= 360) {
        
        var y = -(degree - 270);
        var x = -(90 - -(y));
        

        goX2 = speed * x/90;
        goY2 = speed * y/90;
    }
}

function cosAndSin3(){
    if(degree >= 0 && degree <= 90) {
        var x = degree;
        var y = -(90 - x);
        
        

        goX3 = speed * x/90;
        goY3 = speed * y/90;
        
    }else if(degree > 90 && degree <= 180) {
        var y = degree - 90;
        var x = 90 - y;
        
        
        

        goX3 = speed * x/90;
        goY3 = speed * y/90;

    }else if(degree > 180 && degree <= 270) {
        var x = -(degree - 180);
        var y = 90 - -(x);
        
        

        goX3 = speed * x/90;
        goY3 = speed * y/90;

    }else if(degree > 270 && degree <= 360) {
        
        var y = -(degree - 270);
        var x = -(90 - -(y));
        

        goX3 = speed * x/90;
        goY3 = speed * y/90;
    }
}

function cosAndSin4(){
    if(degree >= 0 && degree <= 90) {
        var x = degree;
        var y = -(90 - x);
        
        

        goX4 = speed * x/90;
        goY4 = speed * y/90;
        
    }else if(degree > 90 && degree <= 180) {
        var y = degree - 90;
        var x = 90 - y;
        
        
        

        goX4 = speed * x/90;
        goY4 = speed * y/90;

    }else if(degree > 180 && degree <= 270) {
        var x = -(degree - 180);
        var y = 90 - -(x);
        
        

        goX4 = speed * x/90;
        goY4= speed * y/90;

    }else if(degree > 270 && degree <= 360) {
        
        var y = -(degree - 270);
        var x = -(90 - -(y));
        

        goX4 = speed * x/90;
        goY4 = speed * y/90;
    }
}

function cosAndSin5(){
    if(degree >= 0 && degree <= 90) {
        var x = degree;
        var y = -(90 - x);
        
        

        goX5 = speed * x/90;
        goY5 = speed * y/90;
        
    }else if(degree > 90 && degree <= 180) {
        var y = degree - 90;
        var x = 90 - y;
        
        
        

        goX5 = speed * x/90;
        goY5 = speed * y/90;

    }else if(degree > 180 && degree <= 270) {
        var x = -(degree - 180);
        var y = 90 - -(x);
        
        

        goX5 = speed * x/90;
        goY5 = speed * y/90;

    }else if(degree > 270 && degree <= 360) {
        
        var y = -(degree - 270);
        var x = -(90 - -(y));
        

        goX5 = speed * x/90;
        goY5 = speed * y/90;
    }
}
function cosAndSin6(){
    if(degree >= 0 && degree <= 90) {
        var x = degree;
        var y = -(90 - x);
        
        

        goX6 = speed * x/90;
        goY6 = speed * y/90;
        
    }else if(degree > 90 && degree <= 180) {
        var y = degree - 90;
        var x = 90 - y;
        
        
        

        goX6 = speed * x/90;
        goY6 = speed * y/90;

    }else if(degree > 180 && degree <= 270) {
        var x = -(degree - 180);
        var y = 90 - -(x);
        
        

        goX6 = speed * x/90;
        goY6 = speed * y/90;

    }else if(degree > 270 && degree <= 360) {
        
        var y = -(degree - 270);
        var x = -(90 - -(y));
        

        goX6 = speed * x/90;
        goY6 = speed * y/90;
    }
}

function cosAndSin7(){
    if(degree >= 0 && degree <= 90) {
        var x = degree;
        var y = -(90 - x);
        
        

        goX7 = speed * x/90;
        goY7 = speed * y/90;
        
    }else if(degree > 90 && degree <= 180) {
        var y = degree - 90;
        var x = 90 - y;
        
        
        

        goX7 = speed * x/90;
        goY7 = speed * y/90;

    }else if(degree > 180 && degree <= 270) {
        var x = -(degree - 180);
        var y = 90 - -(x);
        
        

        goX7 = speed * x/90;
        goY7 = speed * y/90;

    }else if(degree > 270 && degree <= 360) {
        
        var y = -(degree - 270);
        var x = -(90 - -(y));
        

        goX7 = speed * x/90;
        goY7 = speed * y/90;
    }
}




window.setInterval(function(e){

if(parseInt(bullet.style.left) >= enemyCenter.x - parseInt(enemy.style.width)/2
   && parseInt(bullet.style.left) <= enemyCenter.x + parseInt(enemy.style.width)/2
   && parseInt(bullet.style.top) >= enemyCenter.y - parseInt(enemy.style.height)/2
   && parseInt(bullet.style.top) <= enemyCenter.y + parseInt(enemy.style.height)/2
   && bullets.innerHTML !=  'იტენება ...'){
       if(bulletFired == true){
      
       zombieHp -= 100

        if(zombieHp <= 0){
            enemy.style.display = 'none'
            stageWin = true;
            zombieHealthDiv.style.display = 'none'
        }

       }
   }
   if(parseInt(bullet2.style.left) >= enemyCenter.x - parseInt(enemy.style.width)/2
   && parseInt(bullet2.style.left) <= enemyCenter.x + parseInt(enemy.style.width)/2
   && parseInt(bullet2.style.top) >= enemyCenter.y - parseInt(enemy.style.height)/2
   && parseInt(bullet2.style.top) <= enemyCenter.y + parseInt(enemy.style.height)/2
   && bullets.innerHTML !=  'იტენება ...'){
       if(bullet2Fired == true){
        zombieHp -= 100

        if(zombieHp <= 0){
            enemy.style.display = 'none'
            stageWin = true;
            zombieHealthDiv.style.display = 'none'
        }
       }
   }
   if(parseInt(bullet3.style.left) >= enemyCenter.x - parseInt(enemy.style.width)/2
   && parseInt(bullet3.style.left) <= enemyCenter.x + parseInt(enemy.style.width)/2
   && parseInt(bullet3.style.top) >= enemyCenter.y - parseInt(enemy.style.height)/2
   && parseInt(bullet3.style.top) <= enemyCenter.y + parseInt(enemy.style.height)/2
   && bullets.innerHTML !=  'იტენება ...'){
       if(bullet3Fired == true){
        zombieHp -= 100

        if(zombieHp <= 0){
            enemy.style.display = 'none'
            stageWin = true;
            zombieHealthDiv.style.display = 'none'
        }
       }
   }
   if(parseInt(bullet4.style.left) >= enemyCenter.x - parseInt(enemy.style.width)/2
   && parseInt(bullet4.style.left) <= enemyCenter.x + parseInt(enemy.style.width)/2
   && parseInt(bullet4.style.top) >= enemyCenter.y - parseInt(enemy.style.height)/2
   && parseInt(bullet4.style.top) <= enemyCenter.y + parseInt(enemy.style.height)/2
   && bullets.innerHTML !=  'იტენება ...'){
       if(bullet4Fired == true){
        zombieHp -= 100

        if(zombieHp <= 0){
            enemy.style.display = 'none'
            stageWin = true;
            zombieHealthDiv.style.display = 'none'
        }
       }
   }
   if(parseInt(bullet5.style.left) >= enemyCenter.x - parseInt(enemy.style.width)/2
   && parseInt(bullet5.style.left) <= enemyCenter.x + parseInt(enemy.style.width)/2
   && parseInt(bullet5.style.top) >= enemyCenter.y - parseInt(enemy.style.height)/2
   && parseInt(bullet5.style.top) <= enemyCenter.y + parseInt(enemy.style.height)/2
   && bullets.innerHTML !=  'იტენება ...'){
       if(bullet5Fired == true){
        zombieHp -= 100

        if(zombieHp <= 0){
            enemy.style.display = 'none'
            stageWin = true;
            zombieHealthDiv.style.display = 'none'
        }
       }
   }
   if(parseInt(bullet6.style.left) >= enemyCenter.x - parseInt(enemy.style.width)/2
   && parseInt(bullet6.style.left) <= enemyCenter.x + parseInt(enemy.style.width)/2
   && parseInt(bullet6.style.top) >= enemyCenter.y - parseInt(enemy.style.height)/2
   && parseInt(bullet6.style.top) <= enemyCenter.y + parseInt(enemy.style.height)/2
   && bullets.innerHTML !=  'იტენება ...'){
       if(bullet6Fired == true){
        zombieHp -= 100

        if(zombieHp <= 0){
            enemy.style.display = 'none'
            stageWin = true;
            zombieHealthDiv.style.display = 'none'
        }
       }
   }
   if(parseInt(bullet7.style.left) >= enemyCenter.x - parseInt(enemy.style.width)/2
   && parseInt(bullet7.style.left) <= enemyCenter.x + parseInt(enemy.style.width)/2
   && parseInt(bullet7.style.top) >= enemyCenter.y - parseInt(enemy.style.height)/2
   && parseInt(bullet7.style.top) <= enemyCenter.y + parseInt(enemy.style.height)/2
   && bullets.innerHTML !=  'იტენება ...'){
       if(bullet7Fired == true){
        zombieHp -= 100

        if(zombieHp <= 0){
            enemy.style.display = 'none'
            stageWin = true;
            zombieHealthDiv.style.display = 'none'
        }
       }
   }

 
},1)


window.addEventListener('click', function(e){
    if(bulletFired != true && gameover.style.display != "block"){
        bulletFired = true
        cosAndSin()
        bulletsnumber--
        bullets.innerHTML =  bulletsnumber + ' / 7' 
        shootaudio = new Audio('sounds/myAudio.mp3');
        shootaudio.play();
    }else if(bullet2Fired != true && gameover.style.display != "block"){
        bullet2Fired = true
        cosAndSin2()
        bulletsnumber--
        bullets.innerHTML =  bulletsnumber + ' / 7' 
        shootaudio = new Audio('sounds/myAudio.mp3');
        shootaudio.play();
    }else if(bullet3Fired != true && gameover.style.display != "block"){
        bullet3Fired = true
        cosAndSin3()
        bulletsnumber--
        bullets.innerHTML =  bulletsnumber + ' / 7' 
        shootaudio = new Audio('sounds/myAudio.mp3');
        shootaudio.play();
    }else if(bullet4Fired != true && gameover.style.display != "block"){
        bullet4Fired = true
        cosAndSin4()
        bulletsnumber--
        bullets.innerHTML =  bulletsnumber + ' / 7' 
        shootaudio = new Audio('sounds/myAudio.mp3');
        shootaudio.play();
    }else if(bullet5Fired != true && gameover.style.display != "block"){
        bullet5Fired = true
        cosAndSin5()
        bulletsnumber--
        bullets.innerHTML =  bulletsnumber + ' / 7' 
        shootaudio = new Audio('sounds/myAudio.mp3');
        shootaudio.play();
    }else if(bullet6Fired != true && gameover.style.display != "block"){
        bullet6Fired = true
        cosAndSin6()
        bulletsnumber--
        bullets.innerHTML =  bulletsnumber + ' / 7' 
        shootaudio = new Audio('sounds/myAudio.mp3');
        shootaudio.play();
    }else if(bullet7Fired != true && gameover.style.display != "block"){
        bullet7Fired = true
        cosAndSin7()
        bulletsnumber--
        bullets.innerHTML =  bulletsnumber + ' / 7' 
        shootaudio = new Audio('sounds/myAudio.mp3');
        shootaudio.play();
    }
    
})


window.setInterval(function(){
    

    if(bulletsnumber <= 0){
        if( gameover.style.display != "block"){
        reload += 0.005
        }
        bullets.innerHTML =  'იტენება ...'
    }
    if(reload > 4){
        reload = 0
        bulletFired = false
        bullet2Fired = false
        bullet3Fired = false
        bullet4Fired = false
        bullet5Fired = false
        bullet6Fired = false
        bullet7Fired = false
        bulletsnumber = 7

        bullet2.style.display = 'block'
        bullet3.style.display = 'block'
        bullet4.style.display = 'block'
        bullet5.style.display = 'block'
        bullet6.style.display = 'block'
        bullet7.style.display = 'block'


        bullets.innerHTML =  bulletsnumber + ' / 7' 
    }
    
},1)


window.setInterval(function(){




    
if(stageWin == true ){
    nextStageTimer += 0.005
}
if(nextStageTimer > 5){
    nextStageTimer = 0;
    if(medkit.style.display != 'block' && stageNumber % 3 == 0){
        medkit.style.display = 'block';
        medkit.style.left = Math.floor(Math.random() * (screenX - parseInt(medkit.style.width))) + 'px';
        medkit.style.top =  Math.floor(Math.random() * (screenY -  parseInt(medkit.style.height) * 2)) + 'px';
    }
    stageNumber++;
    stage.innerHTML = "ეტაპი: " + stageNumber;
    stageWin = false;

    enemy.style.display = 'block'

    if(parseInt(enemy.style.width) < 400 &&
       parseInt(enemy.style.height) < 400)
       {
    enemy.style.width = parseInt(enemy.style.width) + 40 + 'px' 
    enemy.style.height = parseInt(enemy.style.height) + 40 + 'px' 

    zombieHp100 *= 6
    zombieHp = zombieHp100
    if(zombiespeed < 1.6){
    zombiespeed +=0.2
       }
       }

       enemy.style.left = Math.floor(Math.random() * (screenX - parseInt(player.style.width))) + 'px';
       enemy.style.top =  Math.floor(Math.random() * (screenY -  parseInt(player.style.height) * 2)) + 'px';
    
       zombieHealthDiv.style.display = 'block'

       

    }
}, 1)

window.setInterval(function(){
    zombieHealthDiv.style.left = enemyCenter.x - parseInt(zombieHealthDiv.style.width)/2 + 'px';
    zombieHealthDiv.style.top =   enemyCenter.y -parseInt(enemy.style.height)/2 - 10 + 'px';
    var healthWidth = 60;
    zombieHealth.style.width = healthWidth * zombieHp/zombieHp100 + 'px'
    zombieHealth.style.left =  -((healthWidth - parseInt(zombieHealth.style.width))/2) + 'px' 

},1)
}


window.setInterval(function(e){

    playerCenter = {
        x: parseInt(player.style.left) + parseInt(player.style.width)/2,
        y:  parseInt(player.style.top) + parseInt(player.style.height)/2
    }

   bulletCenterr = {
        x: parseInt(bullet.style.left) + parseInt(bullet.style.width)/2,
        y:  parseInt(bullet.style.top) + parseInt(bullet.style.height)/2
    }
    bulletCenterr2 = {
        x: parseInt(bullet2.style.left) + parseInt(bullet2.style.width)/2,
        y:  parseInt(bullet2.style.top) + parseInt(bullet2.style.height)/2
    }
    bulletCenterr3 = {
        x: parseInt(bullet3.style.left) + parseInt(bullet3.style.width)/2,
        y:  parseInt(bullet3.style.top) + parseInt(bullet3.style.height)/2
    }
    bulletCenterr4 = {
        x: parseInt(bullet4.style.left) + parseInt(bullet4.style.width)/2,
        y:  parseInt(bullet4.style.top) + parseInt(bullet4.style.height)/2
    }
    bulletCenterr5 = {
        x: parseInt(bullet5.style.left) + parseInt(bullet5.style.width)/2,
        y:  parseInt(bullet5.style.top) + parseInt(bullet5.style.height)/2
    }
    bulletCenterr6 = {
        x: parseInt(bullet6.style.left) + parseInt(bullet6.style.width)/2,
        y:  parseInt(bullet6.style.top) + parseInt(bullet6.style.height)/2
    }
    bulletCenterr7 = {
        x: parseInt(bullet7.style.left) + parseInt(bullet7.style.width)/2,
        y:  parseInt(bullet7.style.top) + parseInt(bullet.style.height)/2
    }
   
    
if(bulletFired != true){
bullet.style.transform = 'rotate('+ (-100 + degree) + "deg)"
}
if(bullet2Fired != true){
bullet2.style.transform = 'rotate('+ (-100 + degree) + "deg)"
}
if(bullet3Fired != true){
bullet3.style.transform = 'rotate('+ (-100 + degree) + "deg)"
}
if(bullet4Fired != true){
bullet4.style.transform = 'rotate('+ (-100 + degree) + "deg)"
}
if(bullet5Fired != true){
bullet5.style.transform = 'rotate('+ (-100 + degree) + "deg)"
}
if(bullet6Fired != true){
bullet6.style.transform = 'rotate('+ (-100 + degree) + "deg)"
}
if(bullet7Fired != true){
bullet7.style.transform = 'rotate('+ (-100 + degree) + "deg)"
}
     




if(bulletFired == true){
bullet.style.left = parseInt(bullet.style.left) + goX + 'px';
bullet.style.top = parseInt(bullet.style.top) + goY + 'px';
}else{
    bullet.style.left = playerCenter.x + 'px';
    bullet.style.top = playerCenter.y + 'px';
}

if(bullet2Fired == true){
bullet2.style.left = parseInt(bullet2.style.left) + goX2 + 'px';
bullet2.style.top = parseInt(bullet2.style.top) + goY2 + 'px';
}else{
    bullet2.style.left = playerCenter.x + 'px';
    bullet2.style.top = playerCenter.y + 'px';
}
if(bullet3Fired == true){
bullet3.style.left = parseInt(bullet3.style.left) + goX3 + 'px';
bullet3.style.top = parseInt(bullet3.style.top) + goY3 + 'px';
}else{
    bullet3.style.left = playerCenter.x + 'px';
    bullet3.style.top = playerCenter.y + 'px';
}
if(bullet4Fired == true){
bullet4.style.left = parseInt(bullet4.style.left) + goX4 + 'px';
bullet4.style.top = parseInt(bullet4.style.top) + goY4 + 'px';
}else{
    bullet4.style.left = playerCenter.x + 'px';
    bullet4.style.top = playerCenter.y + 'px';
}
if(bullet5Fired == true){
bullet5.style.left = parseInt(bullet5.style.left) + goX5 + 'px';
bullet5.style.top = parseInt(bullet5.style.top) + goY5 + 'px';
}else{
    bullet5.style.left = playerCenter.x + 'px';
    bullet5.style.top = playerCenter.y + 'px';
}
if(bullet6Fired == true){
bullet6.style.left = parseInt(bullet6.style.left) + goX6 + 'px';
bullet6.style.top = parseInt(bullet6.style.top) + goY6 + 'px';
}else{
    bullet6.style.left = playerCenter.x + 'px';
    bullet6.style.top = playerCenter.y + 'px';
}
if(bullet7Fired == true){
bullet7.style.left = parseInt(bullet7.style.left) + goX7 + 'px';
bullet7.style.top = parseInt(bullet7.style.top) + goY7 + 'px';
}else{
    bullet7.style.left = playerCenter.x + 'px';
    bullet7.style.top = playerCenter.y + 'px';
}
if(bulletFired == true){
bullet.style.left = parseInt(bullet.style.left) + goX + 'px';
bullet.style.top = parseInt(bullet.style.top) + goY + 'px';
}else{
    bullet.style.left = playerCenter.x + 'px';
    bullet.style.top = playerCenter.y + 'px';
}

},0.1)


document.addEventListener("mousemove", function(e){

    playerCenter = {
        x: parseInt(player.style.left) + parseInt(player.style.width)/2,
        y:  parseInt(player.style.top) + parseInt(player.style.height)/2
    }

    mouseX = e.x;
    mouseY = e.y;
    

    radius = Math.atan2(e.x - playerCenter.x, e.y - playerCenter.y);
    degree = (radius * (180 / Math.PI) * -1) + 180; 
    if(gameover.style.display != "block"){
    player.style.transform = 'rotate('+ (-100 + degree) + "deg)"
    }

    imgg.style.transform = 'rotate('+ (-100 + degree) + "deg)"
    
    
    

})

window.setInterval(function(){
    if ( Math.floor(health) <= 0 && gameover.style.display != "block"){
        gameover.style.display = "block"
        deathaudio = new Audio('sounds/lose.mp3');
        deathaudio.play();
        audio.pause();

    }
}, 1)

function gameRestart(){
    gameover.style.display = "none"
    bulletsnumber = 0
    bulletFired = true;
    bullet2Fired = true;
    bullet3Fired = true;
    bullet4Fired = true;
    bullet5Fired = true;
    bullet6Fired = true;
    bullet7Fired = true;



    zombieHp = 100
    zombieHp100 = 100

player.style.width = 120 + 'px'
player.style.height = 100 + 'px'
player.style.left = screenX /2 -  parseInt(player.style.width)/2 + 'px';
player.style.top = screenY /2 - parseInt(player.style.height)/2 + 'px';

    
enemy.style.width = 80 + 'px' 
enemy.style.height = 80 + 'px'
enemy.style.left = Math.floor(Math.random() * (screenX - parseInt(player.style.width))) + 'px';
enemy.style.top =  Math.floor(Math.random() * (screenY -  parseInt(player.style.height) * 2)) + 'px';

zombieHealthDiv.style.width = 60 + 'px'
zombieHealthDiv.style.height = 10 + 'px'
zombieHealthDiv.style.left = enemyCenter.x - parseInt(zombieHealthDiv.style.width)/2 + 'px';
zombieHealthDiv.style.top =   enemyCenter.y -parseInt(enemy.style.height)/2 - 10+ 'px';

medkit.style.left = Math.floor(Math.random() * (screenX - parseInt(medkit.style.width))) + 'px';
medkit.style.top =  Math.floor(Math.random() * (screenY -  parseInt(medkit.style.height) * 2)) + 'px';

stageNumber = 1
stage.innerHTML = "ეტაპი: " + stageNumber

health = 100
hp.innerHTML = 'hp: ' + health +'%'

bullet.style.left = -100 +'px'
bullet2.style.left = -100 +'px'
bullet3.style.left = -100 +'px'
bullet4.style.left = -100 +'px'
bullet5.style.left = -100 +'px'
bullet6.style.left = -100 +'px'
bullet7.style.left = -100 +'px'

deathaudio.pause();
audio.play();
}

