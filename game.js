const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "groundd.png";

const foodImg = new Image();
foodImg.src = "food.png";

let box = 32;

let score = 0;

let food = {
   x: Math.floor(Math.random() * 17 + 1) * box,
   y: Math.floor(Math.random() * 15 + 3) * box,
};

let sneke = [];
sneke[0] = {
   x: 9 * box,
   y: 10 * box,
};

document.addEventListener("keydown", direction);

let dir;

function direction(event) {
   if (event.keyCode == 37 && dir != "right")
      dir = "left";
   else if (event.keyCode == 38 && dir != "down")
      dir = "up";
   else if (event.keyCode == 40 && dir != "up")
      dir = "down";
   else if (event.keyCode == 39 && dir != "left")
      dir = "right";
}


function eatTail(head, arr) {
   for (let i = 0; i < arr.length; i++) {
      if (head.x == arr[i].x && head.y == arr[i].y)
         clearInterval(game);
   }
}


function drawGame() {
   ctx.drawImage(ground, 0, 0);

   ctx.drawImage(foodImg, food.x, food.y);

   for (let i = 0; i < sneke.length; i++) {
      ctx.fillStyle = i == 0 ? "headimg" : "red";
      ctx.fillRect(sneke[i].x, sneke[i].y, box, box)
   }

   ctx.fillStyle = "white";
   ctx.font = "50px Schneidler Halb Fette Deutsch";
   ctx.fillText(score, box * 2.5, box * 1.65);

   let snekeX = sneke[0].x;
   let snekeY = sneke[0].y;

   if (snekeX == food.x && snekeY == food.y) {
      score++;
      food = {
         x: Math.floor(Math.random() * 17 + 1) * box,
         y: Math.floor(Math.random() * 15 + 3) * box,
      };
   } else {
      sneke.pop();
   }

   if (snekeX < box || snekeX > box * 17
      || snekeY < 3 * box || snekeY > box * 17)
      clearInterval(gаme);


   if (dir == "left") snekeX -= box;
   if (dir == "right") snekeX += box;
   if (dir == "up") snekeY -= box;
   if (dir == "down") snekeY += box;

   let newHead = {
      x: snekeX,
      y: snekeY
   };

   eatTail(newHead, sneke);

   sneke.unshift(newHead);
}

let game = setInterval(drawGame, 100);