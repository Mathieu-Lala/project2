float speed = 100;
float constant = 0.01;
float angle = PI / 4.0f;

ArrayList<Particle> particles = new ArrayList(0);

void setup()
{
  // noiseSeed(3);
  colorMode(HSB, 360, 100, 100);
  size(720, 720);
  background(0);
}

void mouseClicked()
{
  particles.add(new Particle(random(width), random(height)));
}

void draw()
{
  for (Particle p : particles)
  {
    p.update();
  }
  if (keyPressed)
  {
    for (int w = 0; w < 10; w++){
    particles.add(new Particle(random(width), random(height)));
  }}
}

class Particle
{
  PVector position;
  PVector velocity;
  float noiseValue;
  
  Particle(float X, float Y)
  {
    position = new PVector(X, Y);
    velocity = new PVector(0, 0);
  }
  
  void update()
  {
    if(position.x > 0 & position.x < width & position.y > 0 & position.y < height) {
      noiseValue = noise(position.x * constant, position.y * constant);
      velocity = PVector.fromAngle(noiseValue * angle);
      velocity.setMag(speed);
      position.add(PVector.div(velocity, frameRate));
      display();
    }
  }
  
  void display()
  {
    fill((1.5 * noiseValue * 82.6 - 51) % 131.3, 45, 255);
    noStroke();
    circle(position.x, position.y, 0.5);
  }
}
