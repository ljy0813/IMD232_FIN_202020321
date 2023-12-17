class CustomObject {
  constructor(x, y, w, h, roundness, texts) {
    this.width = w;
    this.height = h;
    this.roundness = roundness;
    this.texts = texts;
    this.velocityX = random(-2, 2);
    this.velocityY = random(5, 10);
    this.gravity = 0.8;
    this.airResistance = 0.04;

    this.x = x;
    this.y = y;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  checkCollision(otherObjects) {
    for (let otherObj of otherObjects) {
      let thisHitbox = this.getBoundingBox();
      let otherHitbox = otherObj.getBoundingBox();

      if (
        thisHitbox.right > otherHitbox.left &&
        thisHitbox.left < otherHitbox.right &&
        thisHitbox.bottom > otherHitbox.top &&
        thisHitbox.top < otherHitbox.bottom
      ) {
        return true;
      }
    }
    return false;
  }

  getBoundingBox() {
    return {
      left: this.x - this.width * 1.6,
      right: this.x + this.width * 1.6,
      top: this.y - this.height,
      bottom: this.y + this.height,
    };
  }

  update(objects) {
    // Update velocity based on gravity and air resistance
    this.velocityY += this.gravity;
    this.velocityX *= 1 - this.airResistance;
    this.velocityY *= 1 - this.airResistance;

    // Update position based on velocity
    this.y += this.velocityY;
    this.x += this.velocityX;

    // Canvas boundary control
    if (this.x < this.width * 1.6) {
      this.x = this.width * 1.6;
      this.velocityX *= -30; // Reverse velocity to keep the object within the canvas
    } else if (this.x > width + this.width * 1.6) {
      this.x = width - this.width;
      this.velocityX *= 0; // Reverse velocity to keep the object within the canvas
    }

    if (this.y < this.height / 2) {
      this.y = this.height;
      this.velocityY *= 1; // Reverse velocity to keep the object within the canvas
    } else if (this.y > height - this.height) {
      this.y = height - this.height;
      this.velocityY *= 1; // Reverse velocity to keep the object within the canvas
    }

    // Collision detection
    for (let otherObj of objects) {
      if (otherObj !== this) {
        let thisHitbox = this.getBoundingBox();
        let otherHitbox = otherObj.getBoundingBox();

        // Vertical collision handling
        if (
          thisHitbox.right > otherHitbox.left &&
          thisHitbox.left < otherHitbox.right &&
          thisHitbox.bottom > otherHitbox.top &&
          thisHitbox.top < otherHitbox.bottom
        ) {
          // Apply gravity only when touching the bottom of another object
          if (thisHitbox.bottom <= otherHitbox.bottom) {
            this.velocityY *= -0.2; // Adjust the bounce factor, reduce the bounce
            this.y = otherHitbox.top - this.height;
          }
        }

        // Horizontal collision handling
        if (
          thisHitbox.bottom > otherHitbox.top &&
          thisHitbox.top < otherHitbox.bottom &&
          thisHitbox.right > otherHitbox.left &&
          thisHitbox.left < otherHitbox.right
        ) {
          // Apply a weak force to push objects away
          if (thisHitbox.right <= otherHitbox.right) {
            this.velocityX += 0.1; // Adjust the force as needed, reduce the force
          } else {
            this.velocityX -= 0.1; // Adjust the force as needed, reduce the force
          }
        }
      }
    }
  }

  display() {
    fill(0, 100, 200);
    rectMode(CENTER);

    let outerWidth = this.texts.length * 10 + 17;
    let outerHeight = textAscent() + textDescent() + 20;

    this.roundness = 100;

    rect(this.x, this.y, outerWidth * 2, outerHeight * 2, this.roundness);

    textSize(20);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    noStroke();

    for (let i = 0; i < this.texts.length; i++) {
      fill(255);
      stroke(255);
      strokeWeight(0.5);

      let xPosition = this.x - outerWidth + 20 + i * 10;
      let yPosition = this.y;

      let letterSpacing = 10;
      xPosition += i * letterSpacing;

      text(this.texts[i], xPosition, yPosition, 10, outerHeight - 20);
    }
  }

  drag() {
    // Update the object's position to the mouse position during drag
    this.x = mouseX - this.offsetX;
    this.y = mouseY - this.offsetY;
  }
}
