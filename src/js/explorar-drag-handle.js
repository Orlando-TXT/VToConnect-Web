document.addEventListener('DOMContentLoaded', () => {
  const dragContainer = document.getElementById('dragContainer');
  const dragHandle = document.getElementById('dragHandle');

  if (!dragContainer || !dragHandle) return;

  let isCollapsed = false;

  // Alternar estado al hacer clic en la barra superior
  dragHandle.addEventListener('click', () => {
    isCollapsed = !isCollapsed;
    if (isCollapsed) {
      dragContainer.classList.add('collapsed');
    } else {
      dragContainer.classList.remove('collapsed');
    }
  });

  // Opcional: Soporte básico para deslizamiento táctil (Swipe Down / Up)
  let startY = 0;
  
  dragHandle.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
  });

  dragHandle.addEventListener('touchend', (e) => {
    let endY = e.changedTouches[0].clientY;
    let diffY = endY - startY;

    // Si desliza hacia abajo más de 50px, contraer para ver el mapa
    if (diffY > 50) {
      dragContainer.classList.add('collapsed');
      isCollapsed = true;
    } 
    // Si desliza hacia arriba más de 50px, expandir panel
    else if (diffY < -50) {
      dragContainer.classList.remove('collapsed');
      isCollapsed = false;
    }
  });
});