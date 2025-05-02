import React, { createContext, useContext, useReducer, useCallback } from 'react';

const PokemonContext = createContext();

const initialState = {
  favorites: JSON.parse(localStorage.getItem('pokemonFavorites')) || [],
  itemsPerPage: 20,
  currentPage: 1,
  sortBy: 'id',
  sortOrder: 'asc',
  selectedTypes: [],
  comparison: {
    pokemon1: null,
    pokemon2: null,
  },
};

function pokemonReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      const newFavorites = state.favorites.includes(action.payload)
        ? state.favorites.filter(id => id !== action.payload)
        : [...state.favorites, action.payload];
      localStorage.setItem('pokemonFavorites', JSON.stringify(newFavorites));
      return { ...state, favorites: newFavorites };
    
    case 'SET_ITEMS_PER_PAGE':
      return { ...state, itemsPerPage: action.payload };
    
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    
    case 'SET_SORT':
      return { ...state, sortBy: action.payload.sortBy, sortOrder: action.payload.sortOrder };
    
    case 'TOGGLE_TYPE_FILTER':
      const newSelectedTypes = state.selectedTypes.includes(action.payload)
        ? state.selectedTypes.filter(type => type !== action.payload)
        : [...state.selectedTypes, action.payload];
      return { ...state, selectedTypes: newSelectedTypes };
    
    case 'SET_COMPARISON_POKEMON':
      return {
        ...state,
        comparison: {
          ...state.comparison,
          [action.payload.slot]: action.payload.pokemon,
        },
      };
    
    default:
      return state;
  }
}

export function PokemonProvider({ children }) {
  const [state, dispatch] = useReducer(pokemonReducer, initialState);

  const toggleFavorite = useCallback((pokemonId) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: pokemonId });
  }, []);

  const setItemsPerPage = useCallback((itemsPerPage) => {
    dispatch({ type: 'SET_ITEMS_PER_PAGE', payload: itemsPerPage });
  }, []);

  const setCurrentPage = useCallback((page) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
  }, []);

  const setSort = useCallback((sortBy, sortOrder) => {
    dispatch({ type: 'SET_SORT', payload: { sortBy, sortOrder } });
  }, []);

  const toggleTypeFilter = useCallback((type) => {
    dispatch({ type: 'TOGGLE_TYPE_FILTER', payload: type });
  }, []);

  const setComparisonPokemon = useCallback((slot, pokemon) => {
    dispatch({ type: 'SET_COMPARISON_POKEMON', payload: { slot, pokemon } });
  }, []);

  const value = {
    ...state,
    toggleFavorite,
    setItemsPerPage,
    setCurrentPage,
    setSort,
    toggleTypeFilter,
    setComparisonPokemon,
  };

  return (
    <PokemonContext.Provider value={value}>
      {children}
    </PokemonContext.Provider>
  );
}

export function usePokemon() {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemon must be used within a PokemonProvider');
  }
  return context;
} 