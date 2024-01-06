function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
  
    const formattedTime24 = `${hours}:${minutes}:${seconds}`;
  
    let ampm = 'AM';
    let formattedTime12 = formattedTime24;
    if (now.getHours() >= 12) {
      ampm = 'PM';
      if (hours !== '12') {
        formattedTime12 = `${(now.getHours() - 12).toString().padStart(2, '0')}:${minutes}:${seconds}`;
      }
    }
  
    console.log(`24-hour format: ${formattedTime24}`);
    console.log(`12-hour format: ${formattedTime12} ${ampm}`);
}

setInterval(getCurrentTime, 1000);
  