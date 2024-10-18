    // Array of image filenames
    const images = [
        'BitOneVladimirskaya.png',
        'DaveTobolsk.png',
        'DaveTobolsk2.png',
        'JachCenter.png',
        'VitorMtAbraham.png'
      ];
  
      // Function to select a random image
      function getRandomImage() {
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex];
      }
  
      // Set the background image of the element with ID "hro_backdrop_main"
      document.getElementById('hro_backdrop_main').style.backgroundImage = `url(${getRandomImage()})`;
  