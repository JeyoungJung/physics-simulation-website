function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  val = 1;
  maxSpring = 3;
  b = new Ball();
  c = new Ball2();
  d = new Ball3();
}

function draw() {
  background(240);
  button = createButton('>');
  button.style('font-size', 100 + 'px');
  button.style('border', 'none');
  button.position(windowWidth-85, windowHeight/2);
  button.mousePressed(nextSpring);
  
  button = createButton('<');
  button.style('font-size', 100 + 'px');
  button.style('border', 'none');
  button.position(15, windowHeight/2);
  button.mousePressed(previousSpring);
  if(val == 1){
    b.update();
  }
  else if(val == 2){
    c.update();
  }
  else if(val == 3){
    d.update();
  }
}

function nextSpring() {
  val++;
  if(val == maxSpring+1){
    val = 1;
  }
}
function previousSpring() {
  val--;
  if(val == 0){
    val = maxSpring;
  }
}

class Ball {
  constructor() {
    this.anchor = createVector (windowWidth/2, windowHeight/2);
    this.pos = createVector (windowWidth/2, windowHeight/2);
    this.vel = createVector (0, 0);
    this.acc = createVector (0, 0);
  }    

  update() {
    this.visualUpdate();
    this.posUpdate();
    this.applyForce();
  }

  visualUpdate() {    
    fill(249, 247, 232);
    strokeWeight(3);
    line(this.anchor.x, this.anchor.y, this.pos.x, this.pos.y);
    ellipse(this.pos.x, this.pos.y, 30, 30);
  }

  posUpdate() {
    this.vel.mult(0.992);      // cross this line out for simple oscillator    
    this.vel.y += 1.2;
    this.pos.add(this.vel);
    if (dist(mouseX, mouseY, this.pos.x, this.pos.y) < 100 && mouseIsPressed) { 
      this.pos.x = mouseX;
      this.pos.y = mouseY;
      this.vel.mult(0);
    }
  }

  applyForce() {
    let sForce = p5.Vector.sub(this.pos, this.anchor);
    let x = sForce.mag();
    sForce.normalize();
    sForce.mult(-1*0.01*x);
    this.acc.add(sForce);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }
}
class Ball2 {
  constructor(){
    this.pos = createVector(windowWidth/2, windowHeight/2);
    this.pos2= createVector(windowWidth/2, windowHeight/2+200);
    this.anchor = createVector(windowWidth/2, windowHeight/2);  
    this.vel = createVector(0, 0);
    this.vel2 = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.acc2 = createVector(0, 0);
  }  

  update() {
    this.visualUpdate();
    this.posUpdate();
    this.applyForce();
  }

  visualUpdate() {    
    strokeWeight(3);
    line(this.anchor.x, this.anchor.y, this.pos.x, this.pos.y);
    line(this.pos.x, this.pos.y, this.pos2.x, this.pos2.y); 
    fill(249, 255, 203);     
    ellipse(this.pos.x, this.pos.y, 30, 30); 
    fill(133, 222, 119);       
    ellipse(this.pos2.x, this.pos2.y, 30, 30);
  }

  posUpdate() {
    this.vel.mult(0.992);      // cross this line out for simple oscillator    
    this.pos.add(this.vel);
    this.vel2.mult(0.992);
    this.pos2.add(this.vel2);
    if (dist(mouseX, mouseY, this.pos.x, this.pos.y) < 100 && mouseIsPressed) {    
      this.pos.x = mouseX;
      this.pos.y = mouseY;
      this.vel.mult(0);
    } else if (dist(mouseX, mouseY, this.pos2.x, this.pos2.y) < 100 && mouseIsPressed) {   
      this.pos2.x = mouseX;
      this.pos2.y = mouseY;
      this.vel2.mult(0);
    }
  }

  applyForce() {   
    let sForce2 = p5.Vector.sub(this.pos2, this.pos);  
    let x2 = sForce2.mag();
    sForce2.normalize();
    sForce2.mult(-1*0.01*x2);
    this.acc2.add(sForce2);
    this.vel2.add(this.acc2);
    this.acc2.mult(0);
    let sForce = p5.Vector.sub(this.pos, this.anchor).sub(p5.Vector.sub(this.pos2,                           this.pos));  
    let x = sForce.mag();
    sForce.normalize();
    sForce.mult(-1*0.01*x);
    this.acc.add(sForce);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }
}
class Ball3 {
  constructor() {      
    this.size = 5;
    this.pos = [];     
    this.vel = []; 
    this.acc = [];    
    this.sForce = [];  
    this.x = [];
    this.anchor = createVector (windowWidth/2, windowWidth/5); 
    for (let i=0; i<this.size; i++) {                         
      this.pos[i] = createVector(windowWidth/2, 150+i*500/this.size);            
      this.vel[i] = createVector();
      this.acc[i] = createVector();
    }
  }    

  update() {
    this.visualUpdate();
    this.posUpdate();
    this.applyForce();
  }

  visualUpdate() {    
    strokeWeight(3);
    for (let i=0; i<this.size-1; i++) {
      if (i>0) {
        line(this.anchor.x, this.anchor.y, this.pos[0].x, this.pos[0].y);
        line(this.pos[i].x, this.pos[i].y, this.pos[i-1].x, this.pos[i-1].y);
      }
    }
    for (let i=0; i<this.size-1; i++) {
      fill(255-i*5, 255, 207);
      ellipse(this.pos[i].x, this.pos[i].y, 30, 30); 
    }
  }

  posUpdate() {
    for (let i=0; i<this.size; i++) {
      this.vel[i].mult(0.981);      
      this.pos[i].add(this.vel[i]);      
    }
  }

  applyForce() {      
    for (let i=0; i<this.size-1; i++) {
      if (i==0) {
        this.sForce[i] = p5.Vector.sub(this.pos[i], this.anchor).sub(p5.Vector.sub(this.pos[i+1], this.pos[i]));
      } else if (i>0) {
        this.sForce[i] = p5.Vector.sub(this.pos[i], this.pos[i-1]).sub(p5.Vector.sub(this.pos[i+1],     this.pos[i]));
      }
      this.x[i] = this.sForce[i].mag();            
      this.sForce[i].normalize();             
      this.sForce[i].mult(-1*0.01*this.x[i]-0.02);    
      this.acc[i].add(this.sForce[i]);           
      this.vel[i].add(this.acc[i]);              
      this.acc[i].mult(0);                  
    }
  }
}
function mouseDragged() {
  for (let i=0; i<d.size-1; i++) {
    if (dist(mouseX, mouseY, d.pos[i].x, d.pos[i].y) < 30) {
      d.pos[i].x = mouseX;
      d.pos[i].y = mouseY;
      d.vel[i].mult(0);
    }
  }
}

