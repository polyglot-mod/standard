function rgb2hsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;
  
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
}

let interval;

export default ({ message, username, content }) => ({
  load: () => {
    const perform = () => {
      const messages = document.querySelectorAll(message);
    
      let lastColor = '';
      for (const message of messages) {
        const author = message.querySelector(username);
        let roleColor = author && (author.style.color || '#fff');
    
        if (roleColor) {
          let rgb = roleColor.replace('rgb(', '').replace(')', '').split(', ').map((x) => parseFloat(x));
    
          let [h, s, l] = rgb2hsl(rgb[0], rgb[1], rgb[2]);
    
          roleColor = `hsl(${h}, ${85}%, ${75}%)`;
        }
    
        const contents = message.querySelectorAll(content);
    
        for (const content of contents) {
          content.style.color = roleColor || lastColor;
        }
        
        if (roleColor) lastColor = roleColor;
      }
    };

    interval = setInterval(perform, 100);
  },

  unload: () => {
    clearInterval(interval); // Stop doing it

    // Reset modified elements
    for (const el of document.querySelectorAll(content)) {
      el.style.color = '';
    }
  }
});