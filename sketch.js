const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var engine, world
var ninja, ninja_running, thunder
var obsGroup, obs1Image, obs2Image, obs3Image
var bg, train, trainImg
var drops=[]
var a=0

function preload(){
ninja_running = loadAnimation('Images/n1.png','Images/n2.png','Images/n3.png','Images/n4.png','Images/n5.png','Images/n6.png')
thunder= loadAnimation('Images/thunderbolt/1.png','Images/thunderbolt/2.png','Images/thunderbolt/3.png','Images/thunderbolt/4.png')
bg=loadImage('Images/bg.png')
trainImg=loadImage('Images/trainside.png')
thunder= loadAnimation('Images/thunderbolt/1.png','Images/thunderbolt/2.png','Images/thunderbolt/3.png','Images/thunderbolt/4.png')
obs1Image=loadImage('Images/obs1.png')
obs2Image=loadImage('Images/obs2.png')
obs3Image=loadImage('Images/obs3.png')
}

function setup(){
    var canvas = createCanvas(displayWidth, displayHeight);
    engine = Engine.create();
    world = engine.world;
    train=createSprite(displayWidth/2,displayHeight-150,10,10)
    train.scale=2
    train.velocityX=-10
    train.setCollider('rectangle',0,0,displayWidth,100)
    train.addImage(trainImg)
    ninja=createSprite(displayWidth/2-200,displayHeight/2+50,10,10)
    ninja.addAnimation("run", ninja_running)
    ninja.scale=0.5
    ninja.setCollider('rectangle',0,0,250,200)
    obsGroup=createGroup()
   
    /*if(frameCount%100===0){
        for(var i =0; i<100; i++){
            drops.push(new Drops(random(0,400),random(0,600),5))
        }
    }*/
    
}

function draw(){
    background(bg)
    Engine.update(engine)
    /*for(var i=0;i<100;i++){
        drops[i].display();
        drops[i].update();
    }*/
    if (keyDown("space")&&ninja.y>displayHeight/2-49){
    ninja.velocityY=-10
    }
   ninja.velocityY+=1
   ninja.collide(train)
   ninja.debug=true
    if(train.x<50){
        train.x=displayWidth/2
    }
    
    //spawnThunder();
    spawnOBS();
    for(var i=0; i<obsGroup.length;i++){
        obsGroup.get(i).rotation=a
        a=a+5
        if(a>300){
            a=0
        }
    }
  drawSprites();
}   

function keyPressed(){
    if(keyIsDown(RIGHT_ARROW)){
        //Matter.Body.setPosition(umbrella.body,{x:umbrella.body.position.x+4, y:umbrella.body.position.y})
        //man.x=man.x+4
    }   
}
function spawnThunder(){
    if(frameCount%50===0){
        var t = createSprite(random(0,400),50,10,10)
        t.addAnimation('lightning',thunder);
        t.lifetime=50
    }
}
function spawnOBS(){
    if(frameCount%70===0){
        var obs=createSprite(displayWidth-100,displayHeight/2+20,10,10)
        obs.scale=0.75
        obs.velocityX=-10
        var r= Math.round(random(1,3))
        console.log(r)
        switch(r){
            case 1:obs.addImage(obs1Image);
            break;
            case 2:obs.addImage(obs2Image);
            break;
            case 3:obs.addImage(obs3Image);
            break;
            

        }
        obsGroup.add(obs)
        obs.lifetime=displayWidth-100
    }
}