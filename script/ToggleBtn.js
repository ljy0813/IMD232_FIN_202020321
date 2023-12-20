class ToggleBtn {
  constructor(x, y, w, h, roundness, texts) {
    // ToggleBtn 객체의 속성 초기화
    this.width = w;
    this.height = h;
    this.roundness = 300;
    this.texts = texts;
    this.x = x;
    this.y = y;
    this.isOn = false;
    this.offsetX = 0;
    this.offsetY = 0;
    this.velocityX = random(-2, 2);
    this.velocityY = random(5, 10);
    this.gravity = 0.8;
    this.airResistance = 0.04;
    this.buttonColor = color(0, 255, 0); // 초기 버튼 색상 (녹색)
  }

  toggle() {
    // 버튼 상태를 토글
    this.isOn = !this.isOn;

    // 토글될 때 버튼 색상 변경
    this.buttonColor = this.isOn ? color(255, 0, 0) : color(0, 255, 0);
  }

  getBoundingBox() {
    return {
      left: this.x - this.width,
      right: this.x + this.width,
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
    if (this.x < this.width) {
      this.x = this.width;
      this.velocityX *= 0; // Reverse velocity to keep the object within the canvas
    } else if (this.x > width - this.width) {
      this.x = width - this.width;
      this.velocityX *= 0; // Reverse velocity to keep the object within the canvas
    }

    if (this.y < this.height) {
      this.y = this.height;
      this.velocityY *= -1; // Reverse velocity to keep the object within the canvas
    } else if (this.y > height - this.height) {
      this.y = height - this.height;
      this.velocityY *= -1; // Reverse velocity to keep the object within the canvas
    }

    // Collision detection with other objects
    for (let otherObj of objects) {
      if (otherObj !== this) {
        let thisHitbox = this.getBoundingBox();
        let otherHitbox = otherObj.getBoundingBox();

        // Vertical collision handling
        if (
          thisHitbox.right >= otherHitbox.left &&
          thisHitbox.left <= otherHitbox.right &&
          thisHitbox.bottom >= otherHitbox.top &&
          thisHitbox.top <= otherHitbox.bottom
        ) {
          // Apply gravity only when touching the bottom of another object
          if (thisHitbox.bottom <= otherHitbox.bottom && this.velocityY > 0) {
            this.velocityY *= -0.2; // Adjust the bounce factor, reduce the bounce
            this.y = otherHitbox.top - this.height;
          }
        }
      }
    }
  }

  display() {
    fill(this.buttonColor);
    rectMode(CENTER);
    rect(this.x, this.y, this.width * 2, this.height * 2, this.roundness);

    textSize(20);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    noStroke();

    for (let i = 0; i < this.texts.length; i++) {
      fill(255);
      stroke(255);
      strokeWeight(0.5);

      let xPosition = this.x - this.width + 20 + i * 10;
      let yPosition = this.y;

      let letterSpacing = 10;
      xPosition += i * letterSpacing;

      text(this.texts[i], xPosition, yPosition, 10, this.height * 2 - 20);
    }
  }

  drag() {
    // Update the button's position to the mouse position during drag
    this.x = mouseX - this.offsetX;
    this.y = mouseY - this.offsetY;

    // Ensure the button stays within the canvas boundaries
    this.x = constrain(this.x, this.width, width - this.width);
    this.y = constrain(this.y, this.height, height - this.height);
  }
}
