let c;

function setup() {
  createCanvas(800, 800);
  frameRate(60);
  c = new Ball2();
}

function draw() {
  background(240);
  c.update();
}

class Ball2 {
  constructor(){
    this.pos = createVector(400, 400);
    this.pos2= createVector(400, 400);
    this.anchor = createVector(400, 400);  
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