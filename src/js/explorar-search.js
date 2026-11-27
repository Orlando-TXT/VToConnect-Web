import { EventsService } from './services/events.service.js';

document.addEventListener('DOMContentLoaded', () => {
  const searchContainer = document.getElementById('searchContainer');
  const searchInput = document.getElementById('searchInput');
  const searchDropdown = document.getElementById('searchDropdown');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const dropdownCategories = document.getElementById('dropdownCategories');
  const dropdownResults = document.getElementById('dropdownResults');

  if (!searchInput || !searchDropdown) return;

  // Renderiza categorías desde el servicio
  async function loadCategories() {
    const categories = await EventsService.getSearchCategories();
    dropdownCategories.innerHTML = categories
      .map(
        (cat) => `
        <li class="dropdown-item" data-type="category" data-value="${cat.nombre}">
          <span>${cat.nombre}</span>
          ${cat.total_eventos ? `<span class="dropdown-item-badge">${cat.total_eventos}</span>` : ''}
        </li>
      `
      )
      .join('');
  }

  // Renderiza sugerencias dinámicas según lo que escribe el usuario
  async function updateResults(query = '') {
    const results = await EventsService.searchOptions(query);

    if (results.length === 0) {
      dropdownResults.innerHTML = `<li class="dropdown-item" style="color: #94a3b8; cursor: default;">No se encontraron coincidencias</li>`;
      return;
    }

    dropdownResults.innerHTML = results
      .map(
        (item) => `
        <li class="dropdown-item" data-type="event" data-id="${item.id}" data-value="${item.titulo}">
          <div>
            <strong>${item.titulo}</strong>
            <div style="font-size: 0.75rem; color: #64748b;">${item.categoria}</div>
          </div>
          <span class="dropdown-item-badge">${item.tipo === 'clase' ? 'Clase' : 'Evento'}</span>
        </li>
      `
      )
      .join('');
  }

  // Abrir menú al enfocar el input
  searchInput.addEventListener('focus', async () => {
    searchDropdown.classList.remove('hidden');
    if (dropdownCategories.children.length === 0) {
      await loadCategories();
    }
    await updateResults(searchInput.value);
  });

  // Filtrar en tiempo real al escribir
  searchInput.addEventListener('input', async (e) => {
    const value = e.target.value;
    clearSearchBtn.classList.toggle('hidden', value.length === 0);
    searchDropdown.classList.remove('hidden');
    await updateResults(value);
  });

  // Limpiar input
  clearSearchBtn.addEventListener('click', async () => {
    searchInput.value = '';
    clearSearchBtn.classList.add('hidden');
    searchInput.focus();
    await updateResults('');
  });

  // Manejar clic en alguna opción del menú desplegable
  searchDropdown.addEventListener('click', (e) => {
    const item = e.target.closest('.dropdown-item');
    if (!item || !item.dataset.value) return;

    searchInput.value = item.dataset.value;
    clearSearchBtn.classList.remove('hidden');
    searchDropdown.classList.add('hidden');

    // Dispara un evento personalizado para que tu lista de tarjetas en Explorar filtre los resultados
    const filterEvent = new CustomEvent('vto:searchSelected', {
      detail: {
        type: item.dataset.type,
        id: item.dataset.id || null,
        value: item.dataset.value
      }
    });
    document.dispatchEvent(filterEvent);
  });

  // Cerrar menú si se hace clic fuera del contenedor
  document.addEventListener('click', (e) => {
    if (!searchContainer.contains(e.target)) {
      searchDropdown.classList.add('hidden');
    }
  });
});