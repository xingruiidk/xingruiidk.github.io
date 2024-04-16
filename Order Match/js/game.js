import { Customer } from './customer.js';

// Global variables and constants
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const backgroundImage = new Image();
const fullHeartImage = new Image();
const brokenHeartImage = new Image();
const submitButton = {
  x: canvas.width * 0.0625,
  y: canvas.height * 0.833,
  width: canvas.width * 0.25,
  height: canvas.height * 0.0833,
  image: new Image(),
  draw: function(ctx) {
    if (this.image.complete) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  },
  isClicked: function(x, y) {
    return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
  }
};

let currentOrder = [];
let trayItems = [];
const itemsPerRow = 3;
let patienceTimer = null;
let currentCustomer;
let lives = 3;
const maxLives = 3;
const items = [
  { name: 'mcspicy', src: 'image/mcspicy.png', x: canvas.width * 0.5, y: canvas.height * 0.75, width:  canvas.height * 0.125, height: canvas.height * 0.1667 },
  { name: 'fries', src: 'image/fries.png', x: canvas.width * 0.75, y: canvas.height * 0.75, width: canvas.height * 0.125, height: canvas.height * 0.1667 },
  { name: 'drink', src: 'image/drink.png', x: canvas.width * 0.5, y: canvas.height * 0.5, width: canvas.height * 0.125, height: canvas.height * 0.1667 },
  { name: 'icecream', src: 'image/icecream.png', x: canvas.width * 0.75, y: canvas.height * 0.5, width: canvas.height * 0.125, height: canvas.height * 0.1667 },
];

// Image loading
submitButton.image.src = 'image/buttonup.png';
backgroundImage.src = 'image/bg.png';
fullHeartImage.src = 'image/heart.png';
brokenHeartImage.src = 'image/brokenheart.png'; 

backgroundImage.onload = () => {
  console.log('Background image loaded successfully.');
};

backgroundImage.onerror = () => {
  console.error('Failed to load the background image.');
};

items.forEach(item => {
  item.image = new Image();
  item.image.src = item.src;
});

Promise.all(items.map(item => new Promise((resolve, reject) => {
  item.image.onload = resolve;
  item.image.onerror = () => reject(new Error('Failed to load image: ' + item.src));
})))
  .then(startGame)
  .catch(error => {
    console.error('Failed to load images:', error);
  });

// Generates a new random order by selecting a random customer
function generateRandomOrder() {
  selectRandomCustomer();
}
// Starts the patience timer for the current customer
function startPatienceTimer() {
  if (patienceTimer !== null) {
    clearInterval(patienceTimer);
  }

  patienceTimer = setInterval(() => {
    currentCustomer.patience -= 1;

    if (currentCustomer.patience <= 0) {
      clearInterval(patienceTimer);
      //alert('Time out! You did not complete the order in time.');
      loseLife();
    }

    drawItems();
  }, 1000);
}
// Initializes the game by selecting a random customer, setting up event listeners, and drawing items
function startGame() {
  selectRandomCustomer();
  drawItems();
  setupEventListeners();
  setupSubmitOrderButton();
}
// Handles the submit order button click event
function handleSubmitOrder(event) {
  event.preventDefault();
  event.stopPropagation();
  checkOrder();
}
// Sets up the submit order button event listeners
function setupSubmitOrderButton() {
  const imageSubmitButton = document.getElementById('imageSubmitOrder');
  imageSubmitButton.removeEventListener('click', handleSubmitOrder);
  imageSubmitButton.removeEventListener('touchend', handleSubmitOrder);
  imageSubmitButton.addEventListener('click', handleSubmitOrder);
  imageSubmitButton.addEventListener('touchend', handleSubmitOrder);
}
// Selects a random customer and generates their order
function selectRandomCustomer() {
  const customerTypes = Object.keys(Customer.types);
  const randomType = customerTypes[Math.floor(Math.random() * customerTypes.length)];
  currentCustomer = new Customer(randomType);
  currentCustomer.generateOrder(items);
  currentOrder = currentCustomer.orderItems.map(item => item.name);
  startPatienceTimer();

  if (currentCustomer.imageSrc) {
    currentCustomer.image.onload = drawItems;
    currentCustomer.image.onerror = () => {
      console.error('Failed to load customer image.');
      drawItems();
    };
  }
}
//Draws different heart based on amount of lives of player left
function drawLives() {
    const heartSpacing = 40; // Space between hearts
    const startX = canvas.width / 2 - (maxLives * heartSpacing) / 2; // Center the hearts horizontally
    for (let i = 0; i < maxLives; i++) {
        const heartX = startX + i * heartSpacing;
        const heartImage = i < lives ? fullHeartImage : brokenHeartImage;
        ctx.drawImage(heartImage, heartX, 10, 50, 50); // Adjust size and position as needed
    }
}

function loseLife() {
    lives--;
    if (lives <= 0) {
        alert('Game Over! You lost all your lives.');
        lives = maxLives; // Reset lives for a new game, or handle game over differently
        trayItems = [];
    } else {
        selectRandomCustomer();
    }
    drawItems();
}
// Draws the game items, customer, order details, and tray items on the canvas
function drawItems() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

  if (currentCustomer.image.complete && currentCustomer.image.naturalHeight !== 0) {
    ctx.drawImage(currentCustomer.image, canvas.width * 0.5, canvas.height * 0.5 + currentCustomer.heightOffset, currentCustomer.imageWidth, currentCustomer.imageHeight);
  } else {
    ctx.fillText('No image available', 10, 100);
  }

  ctx.font = "18px Arial";
  ctx.fillStyle = "cyan";
  ctx.fillText(`Order for ${currentCustomer.type}: ${currentOrder.join(', ')}`, 10, 20);
  ctx.fillText(`Time remaining: ${Math.max(0, Math.floor(currentCustomer.patience))}s`, canvas.width - 200, 20);
  submitButton.draw(ctx);

  items.forEach(item => {
    ctx.drawImage(item.image, item.x, item.y, item.width, item.height);
  });

  trayItems.forEach((item, index) => {
    let row = Math.floor(index / itemsPerRow);
    let col = index % itemsPerRow;
    let trayX = col * 110;
    let trayY = 250 + row * 100;
    ctx.drawImage(item.image, trayX, trayY, item.width, item.height);
  });

  drawLives();
}
// Checks if the submitted order matches the current customer's order
function checkOrder() {
  let orderCounts = currentOrder.reduce((acc, itemName) => {
    acc[itemName] = (acc[itemName] || 0) + 1;
    return acc;
  }, {});

  let trayCounts = trayItems.reduce((acc, item) => {
    let itemName = item.name;
    acc[itemName] = (acc[itemName] || 0) + 1;
    return acc;
  }, {});

  let correct =
    Object.keys(orderCounts).length === Object.keys(trayCounts).length &&
    Object.keys(orderCounts).every(itemName => orderCounts[itemName] === trayCounts[itemName]);

  if (correct) {
    alert('Order correct! Generating new order for another customer.');
    generateRandomOrder();
    trayItems = [];
    drawItems();
  } else {
    alert('Order incorrect, try again.');
  }
}
// Handles the canvas click or touch event
function handleInteraction(event) {
  event.preventDefault();
  event.stopPropagation();

  let x, y;
  if (event.changedTouches) {
    x = event.changedTouches[0].clientX;
    y = event.changedTouches[0].clientY;
  } else {
    x = event.clientX;
    y = event.clientY;
  }

  const rect = canvas.getBoundingClientRect();
  x -= rect.left;
  y -= rect.top;

  if (submitButton.isClicked(x, y)) {
    handleSubmitOrder(event);
  } else {
    checkInteraction(x, y);
  }
}
// Checks for interactions with items or the tray based on the click/touch coordinates
function checkInteraction(x, y) {
  const maxItemsInTray = 6;

  items.forEach(item => {
    if (x >= item.x && x <= item.x + item.width && y >= item.y && y <= item.y + item.height) {
      if (trayItems.length < maxItemsInTray) {
        trayItems.push(Object.assign({}, item));
        drawItems();
      } else {
        alert('Tray is full. You cannot add more items.');
      }
    }
  });

  trayItems.forEach((item, index) => {
    let row = Math.floor(index / itemsPerRow);
    let col = index % itemsPerRow;
    let trayX = col * 110;
    let trayY = 250 + row * 100;

    if (x >= trayX && x <= trayX + item.width && y >= trayY && y <= trayY + item.height) {
      trayItems.splice(index, 1);
      drawItems();
      return;
    }
  });
}

// Sets up the canvas event listeners for click and touch events
function setupEventListeners() {
  canvas.removeEventListener('click', handleInteraction);
  canvas.removeEventListener('touchend', handleInteraction);
  canvas.addEventListener('click', handleInteraction);
  canvas.addEventListener('touchend', handleInteraction);
}