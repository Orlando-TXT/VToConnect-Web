document.addEventListener('DOMContentLoaded', () => {
  const openFiltersBtn = document.getElementById('openFiltersBtn');
  const filtersOverlay = document.getElementById('filtersOverlay');
  const closeFiltersBtn = document.getElementById('closeFiltersBtn');
  const applyFiltersBtn = document.getElementById('applyFiltersBtn');
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');
  const distanceRange = document.getElementById('distanceRange');
  const distanceValue = document.getElementById('distanceValue');

  // Abrir panel de filtros
  if (openFiltersBtn && filtersOverlay) {
    openFiltersBtn.addEventListener('click', () => {
      filtersOverlay.classList.remove('hidden');
    });
  }

  // Cerrar panel de filtros
  if (closeFiltersBtn && filtersOverlay) {
    closeFiltersBtn.addEventListener('click', () => {
      filtersOverlay.classList.add('hidden');
    });
  }

  // Actualizar etiqueta del slider de distancia dinámicamente
  if (distanceRange && distanceValue) {
    distanceRange.addEventListener('input', (e) => {
      distanceValue.textContent = e.target.value;
    });
  }

  // Manejo de chips de categorías (selección única o múltiple)
  const chips = document.querySelectorAll('.filter-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });

  // Aplicar filtros y retornar
  if (applyFiltersBtn && filtersOverlay) {
    applyFiltersBtn.addEventListener('click', () => {
      // Aquí puedes capturar los valores seleccionados para filtrar la búsqueda
      filtersOverlay.classList.add('hidden');
      
      // Evento personalizado para actualizar la lista en Explorar
      const eventApplied = new CustomEvent('vto:filtersApplied', {
        detail: {
          distance: distanceRange.value,
          category: document.querySelector('.filter-chip.active')?.dataset.category || 'todos',
          sortBy: document.getElementById('sortBySelect').value
        }
      });
      document.dispatchEvent(eventApplied);
    });
  }

  // Limpiar filtros
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', () => {
      distanceRange.value = 5;
      distanceValue.textContent = '5';
      chips.forEach(c => c.classList.remove('active'));
      document.querySelector('[data-category="todos"]')?.classList.add('active');
      document.getElementById('sortBySelect').value = 'proximos';
    });
  }
});