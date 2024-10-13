function toggleMenu() {
    const menuContent = document.getElementById('menuContent');
    if (menuContent.style.visibility === 'hidden') {
      menuContent.style.visibility = 'visible';
    } else {
      menuContent.style.visibility = 'hidden';
    }
  }