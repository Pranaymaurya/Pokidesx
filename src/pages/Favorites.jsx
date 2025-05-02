import React from 'react';
import { usePokemon } from '../contexts/PokemonContext';
import { usePokemonList } from '../hooks/usePokemonData';
import PokemonCard from '../components/PokemonCard';

function Favorites() {
  const { favorites } = usePokemon();
  const { data: pokemonList, isLoading, error } = usePokemonList();

  const favoritePokemon = React.useMemo(() => {
    if (!pokemonList) return [];
    return pokemonList.filter((pokemon) => favorites.includes(pokemon.id));
  }, [pokemonList, favorites]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-xl">Loading Pokémon data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <p className="text-center">{error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Favorite Pokémon</h1>
      
      {favoritePokemon.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-xl text-gray-600">You haven't favorited any Pokémon yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoritePokemon.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites; 