import React from 'react';
import { usePokemon } from '../contexts/PokemonContext';
import { usePokemonList } from '../hooks/usePokemonData';
import PokemonCard from '../components/PokemonCard';

function Comparison() {
  const { comparison, setComparisonPokemon } = usePokemon();
  const { data: pokemonList, isLoading, error } = usePokemonList();

  const handlePokemonSelect = (slot, pokemon) => {
    setComparisonPokemon(slot, pokemon);
  };

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
      <h1 className="text-3xl font-bold mb-8">Compare Pokémon</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Select First Pokémon</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pokemonList?.map((pokemon) => (
              <button
                key={pokemon.id}
                onClick={() => handlePokemonSelect('pokemon1', pokemon)}
                className={`p-2 rounded-lg transition-colors ${
                  comparison.pokemon1?.id === pokemon.id
                    ? 'bg-red-600 text-white'
                    : 'bg-white hover:bg-gray-100'
                }`}
              >
                <PokemonCard pokemon={pokemon} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Select Second Pokémon</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pokemonList?.map((pokemon) => (
              <button
                key={pokemon.id}
                onClick={() => handlePokemonSelect('pokemon2', pokemon)}
                className={`p-2 rounded-lg transition-colors ${
                  comparison.pokemon2?.id === pokemon.id
                    ? 'bg-red-600 text-white'
                    : 'bg-white hover:bg-gray-100'
                }`}
              >
                <PokemonCard pokemon={pokemon} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {comparison.pokemon1 && comparison.pokemon2 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Comparison</h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <h3 className="font-bold capitalize">{comparison.pokemon1.name}</h3>
                <img
                  src={comparison.pokemon1.image}
                  alt={comparison.pokemon1.name}
                  className="w-32 h-32 mx-auto"
                />
              </div>
              <div className="text-center">
                <h3 className="font-bold">VS</h3>
              </div>
              <div className="text-center">
                <h3 className="font-bold capitalize">{comparison.pokemon2.name}</h3>
                <img
                  src={comparison.pokemon2.image}
                  alt={comparison.pokemon2.name}
                  className="w-32 h-32 mx-auto"
                />
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Stats Comparison</h3>
              <div className="space-y-4">
                {comparison.pokemon1.stats.map((stat1, index) => {
                  const stat2 = comparison.pokemon2.stats[index];
                  const pokemon1Wins = stat1.value > stat2.value;
                  const pokemon2Wins = stat2.value > stat1.value;

                  return (
                    <div key={stat1.name} className="grid grid-cols-3 gap-4 items-center">
                      <div className="text-right">
                        <span className="font-medium capitalize">{stat1.name}</span>
                        <span className={`ml-2 ${pokemon1Wins ? 'text-green-600' : ''}`}>
                          {stat1.value}
                        </span>
                      </div>
                      <div className="text-center font-medium capitalize">
                        {stat1.name}
                      </div>
                      <div className="text-left">
                        <span className={`mr-2 ${pokemon2Wins ? 'text-green-600' : ''}`}>
                          {stat2.value}
                        </span>
                        <span className="font-medium capitalize">{stat2.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Comparison; 