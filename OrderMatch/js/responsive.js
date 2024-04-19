screen.orientation.lock('landscape');
const canvas = document.getElementById('gameCanvas');
const sizes = [
    { name: 'ipad', width: 4, height: 3 },
    { name: 'iphone', width: 19.5, height: 9 },
    { name: 'android', width: 16, height: 9 },
    { name: 'tablet', width: 16, height: 10 },
];
// Get the width and height of the current device's screen
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

// Calculate the aspect ratio of the current screen
const aspectRatio = screenWidth / screenHeight;

// Function to find the best matching size from the sizes array based on aspect ratio
function findBestSize() {
  let bestSize = sizes[0];
  let bestDifference = Math.abs((bestSize.width / bestSize.height) - aspectRatio);

  sizes.forEach(size => {
    const difference = Math.abs((size.width / size.height) - aspectRatio);
    if (difference < bestDifference) {
      bestDifference = difference;
      bestSize = size;
    }
  });

  return bestSize;
}

// Find the best matching size
const bestSize = findBestSize();

// Set the canvas width and height based on the best matching size
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.width = screenWidth;
canvas.height = screenHeight;
