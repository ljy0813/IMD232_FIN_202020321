let objects = [];
let selectedObject = null;
let toggleBtn;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  for (let i = 0; i < 25; i++) {
    objects.push(
      new CustomObject(
        random(width),
        random(height),
        50,
        50,
        10,
        [
          '  인  ',
          '  터  ',
          '  렉  ',
          '  티브 ',
          '  인터렉티브  ',
          '  인터렉티브디자인  ',
          '  디자인  ',
          '  상명대학교인터렉티브  ',
          '  인  ',
          '  터  ',
          '  렉  ',
          '  티브 ',
          '  인터렉티브  ',
          '  인터렉티브  ',
          '  인터렉티브디자인  ',
          '  렉  ',
          '  티브 ',
          '  인터렉티브  ',
          '  인터렉티브디자인  ',
          '  인터렉티브  ',
          '  인터렉티브  ',
          '  상명대학교인터렉티브  ',
          '  상명대학교인터렉티브  ',
          '  상명대학교인터렉티브  ',
          '  디자인  ',
        ][i]
      )
    );
  }

  toggleBtn = new ToggleBtn(windowWidth / 2, windowHeight - 50, 150, 50, 10, [
    'Toggle',
  ]);
}

function draw() {
  background(255);

  for (let i = objects.length - 1; i >= 0; i--) {
    let obj = objects[i];
    obj.update(objects);
    obj.display();
  }

  toggleBtn.update(objects);
  toggleBtn.display();
}

function mousePressed() {
  let toggleHitbox = toggleBtn.getBoundingBox();
  if (
    mouseX > toggleHitbox.left &&
    mouseX < toggleHitbox.right &&
    mouseY > toggleHitbox.top &&
    mouseY < toggleHitbox.bottom
  ) {
    toggleBtn.offsetX = mouseX - toggleBtn.x;
    toggleBtn.offsetY = mouseY - toggleBtn.y;
    return;
  }

  for (let i = objects.length - 1; i >= 0; i--) {
    let obj = objects[i];
    let thisHitbox = obj.getBoundingBox();

    if (
      mouseX > thisHitbox.left &&
      mouseX < thisHitbox.right &&
      mouseY > thisHitbox.top &&
      mouseY < thisHitbox.bottom
    ) {
      selectedObject = obj;
      selectedObject.offsetX = mouseX - obj.x;
      selectedObject.offsetY = mouseY - obj.y;
      break;
    }
  }
}

function mouseReleased() {
  selectedObject = null;
  toggleBtn.offsetX = 0;
  toggleBtn.offsetY = 0;
}

function mouseDragged() {
  if (toggleBtn.offsetX !== 0 || toggleBtn.offsetY !== 0) {
    toggleBtn.drag();
  }

  if (selectedObject) {
    selectedObject.drag();
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    objects.push(
      new CustomObject(random(width), random(height), 100, 50, 10, [
        '새로운',
        '객체',
        'New',
        'Object',
        '새로운',
        '객체',
        'New',
        'Object',
      ])
    );
  }
}
