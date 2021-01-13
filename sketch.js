var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
  Constraint = Matter.Constraint;
  Body = Matter.Body;
 
var particles = [];
var plinkos = [];
var divisions = [];
var divisionHeight=300;
var score,particle,turn;
var gameState = "start";
//var PLAY = gameState;
function setup() {
  createCanvas(800, 780);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(600,width-50,1200,20);
  //To give the value of score and varTurn as 0:-
  score = 0;
  var turn = 0;
  //To create the divisions:-
   for (var k = 0; k <=width; k = k + 150) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }
   //To create the plinkos:-
    for (var j = 75; j <=width; j=j+120) 
    {
    
       plinkos.push(new Plinko(j,75,20));
    }

    for (var j = 50; j <=width; j=j+120) 
    {
    
       plinkos.push(new Plinko(j,175,20));
    }

     for (var j = 75; j <=width; j=j+120) 
    {
    
       plinkos.push(new Plinko(j,275,20));
    }

     for (var j = 50; j <=width-10; j=j+120) 
    {
    
       plinkos.push(new Plinko(j,375,20));
    }    
  Engine.run(engine);
}
function draw() {
  background('Fuchsia');
  Engine.update(engine);
  if(frameCount%1===0)
  {
    particles.push(new Particle(random(width/2-30, width/2+30), 10,10));
  }
  for (var j = 0; j < particles.length; j++) {
   
    particles[j].display();
  }
  for (var k = 0; k < divisions.length; k++) {
     
    divisions[k].display();
  }
  for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
  }
  ground.display();
  //To create a yellow line:-
  strokeWeight(5);
  stroke("yellow");
  fill("yellow");
  line(50,400,780,400); 
   //To display the score:-
   stroke("green");
   fill("white");
   textSize(30);
   text("Score: "+score,20,30);
   text("500",50,500);
   text("400",200,500);
   text("300",350,500);
   text("200",500,500);
   text("100",650,500);
   //To call the function mousepressed and avoid the bugs that're coming:-
   mousePressed();
   //To increase the score card:-
   if(particle!==null)
   {
     particle.display();
     if(particle.body.position.y>760)
     {
       if(particle.body.position.x<300)
       {
         score = score + 500;
         particle=null;
         if(turn>=5) gameState="end";
       }
     }
   }
}
function mousePressed()
{
  if(gameState!=="end")
  {
    score++;
    particle = new Particle(mouseX, 10, 10, 10);
  }
}