export interface SearchCategory {
  id: string;
  nombre: string;
  total_eventos?: number;
}

export interface EventSearchOption {
  id: string;
  titulo: string;
  categoria: string;
  tipo: 'evento' | 'clase';
}

// Datos temporales mientras se conecta la instancia de Supabase
const MOCK_CATEGORIES: SearchCategory[] = [
  { id: 'cat-1', nombre: 'Clases de Baile', total_eventos: 12 },
  { id: 'cat-2', nombre: 'Yoga y Bienestar', total_eventos: 8 },
  { id: 'cat-3', nombre: 'Conferencias Tech', total_eventos: 5 },
  { id: 'cat-4', nombre: 'Grupos de Sprint / Running', total_eventos: 9 },
  { id: 'cat-5', nombre: 'Tours Guiados', total_eventos: 4 }
];

const MOCK_SUGGESTIONS: EventSearchOption[] = [
  { id: 'evt-101', titulo: 'Clase de Salsa Principiantes', categoria: 'Clases de Baile', tipo: 'clase' },
  { id: 'evt-102', titulo: 'Yoga al Amanecer en el Parque', categoria: 'Yoga y Bienestar', tipo: 'clase' },
  { id: 'evt-103', titulo: 'Meetup Desarrollo Web & IA', categoria: 'Conferencias Tech', tipo: 'evento' },
  { id: 'evt-104', titulo: 'Ruta Nocturna 5K', categoria: 'Grupos de Sprint / Running', tipo: 'evento' }
];

export const EventsService = {
  /**
   * Obtiene las categorías disponibles para el menú desplegable.
   * TODO: Reemplazar con consulta a tabla `categorias` en Supabase.
   */
  async getSearchCategories(): Promise<SearchCategory[]> {
    // Ejemplo futuro Supabase:
    // const { data, error } = await supabase.from('categorias').select('id, nombre');
    return Promise.resolve(MOCK_CATEGORIES);
  },

  /**
   * Busca eventos y clases por término de coincidencia.
   * TODO: Reemplazar con `.ilike('titulo', `%${query}%`)` en Supabase.
   */
  async searchOptions(query: string): Promise<EventSearchOption[]> {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return MOCK_SUGGESTIONS;

    return Promise.resolve(
      MOCK_SUGGESTIONS.filter(
        (item) =>
          item.titulo.toLowerCase().includes(cleanQuery) ||
          item.categoria.toLowerCase().includes(cleanQuery)
      )
    );
  }
};