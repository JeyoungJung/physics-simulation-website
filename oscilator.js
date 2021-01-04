let b;

function setup() {
  createCanvas(800, 800);
  frameRate(60);
  b = new Ball();
}

function draw() {
  background(240);
  b.update();
}

class Ball {
  constructor() {
    this.anchor = createVector (400, 400);
    this.pos = createVector (400, 400);
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