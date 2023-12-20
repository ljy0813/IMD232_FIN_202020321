// sketch.js
let objects = [];
let selectedObject = null;
let toggleBtn;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  for (let i = 0; i < 24; i++) {
    objects.push(
      new CustomObject(
        random(width),
        random(height),
        50,
        50,
        10,
        [
          '  손우성 교수님  ',
          '  손우성  ',
          '  인터랙티브  ',
          '  interactive  ',
          '  커뮤니케이션 디자인 학과  ',
          '  커뮤니케이션 디자인  ',
          '  디자인  ',
          '  상명대학교인터렉티브  ',
          '  상명대학교  ',
          '  202020321  ',
          '  202020321 이주영  ',
          '  이주영 ',
          '  디자이너  ',
          '  인터랙티브 디자인  ',
          '  흔들흔들  ',
          '  탑쌓기  ',
          ' 흔들흔들 탑쌓기 ',
          '  기말고사 최종과제  ',
          '  기말고사  ',
          '  3학년  ',
          '  커디과  ',
          '  감사했습니다 ',
          '  한학기동안   ',
          '  손우성 교수님  ',
        ][i]
      )
    );
  }

  toggleBtn = new ToggleBtn(windowWidth / 2, windowHeight - 100, 150, 100, 10, [
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

    let tokenTextWidth = toggleBtn.texts.reduce(
      (sum, text) => sum + textWidth(text),
      0
    );
    let tokenTextX = toggleBtn.x - tokenTextWidth / 2;
    let tokenTextY = toggleBtn.y - toggleBtn.height;
    toggleBtn.texts.forEach((text, index) => {
      let textWidthSum = toggleBtn.texts
        .slice(0, index)
        .reduce((sum, t) => sum + textWidth(t), 0);
      let x = tokenTextX + textWidthSum;
      let y = tokenTextY;
      toggleBtn.texts[index] = new TokenText(text, x, y);
    });

    // 클릭할 때만 색상 변경
    toggleBtn.toggle();

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
