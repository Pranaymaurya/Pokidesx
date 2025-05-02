import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePokemon } from '../contexts/PokemonContext';
import { usePokemonDetail } from '../hooks/usePokemonData';

const getTypeColor = (type) => {
  const typeColors = {
    normal: 'bg-gray-300',
    fire: 'bg-red-500',
    water: 'bg-blue-400',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-blue-200',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-700',
    flying: 'bg-indigo-300',
    psychic: 'bg-pink-500',
    bug: 'bg-green-400',
    rock: 'bg-yellow-600',
    ghost: 'bg-purple-700',
    dragon: 'bg-indigo-700',
    dark: 'bg-gray-800',
    steel: 'bg-gray-400',
    fairy: 'bg-pink-300',
  };
  
  return typeColors[type] || 'bg-gray-300';
};

function PokemonDetail() {
  const { id } = useParams();
  const { favorites, toggleFavorite } = usePokemon();
  const { data: pokemon, isLoading, error } = usePokemonDetail(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-xl">Loading Pokémon details...</p>
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

  if (!pokemon) {
    return (
      <div className="text-center py-8">
        <p className="text-xl text-gray-600">Pokémon not found</p>
        <Link to="/" className="text-red-600 hover:text-red-700 mt-4 inline-block">
          Back to Home
        </Link>
      </div>
    );
  }

  const isFavorite = favorites.includes(pokemon.id);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <Link
          to="/"
          className="text-red-600 hover:text-red-700 flex items-center"
        >
          ← Back to Home
        </Link>
        <button
          onClick={() => toggleFavorite(pokemon.id)}
          className="text-2xl"
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-full h-auto"
              />
            </div>
            <div className="md:w-2/3">
              <h1 className="text-3xl font-bold capitalize mb-4">
                {pokemon.name}
              </h1>
              <div className="flex gap-2 mb-6">
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className={`${getTypeColor(type.type.name)} text-white px-3 py-1 rounded-full text-sm font-medium capitalize`}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name} className="bg-gray-100 p-3 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium capitalize">
                        {stat.stat.name}
                      </span>
                      <span className="text-lg font-bold">{stat.base_stat}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-600 h-2 rounded-full"
                        style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-bold mb-2">Abilities</h2>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map((ability) => (
                    <span
                      key={ability.ability.name}
                      className="bg-gray-100 px-3 py-1 rounded-full text-sm capitalize"
                    >
                      {ability.ability.name}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-2">Moves</h2>
                <div className="flex flex-wrap gap-2">
                  {pokemon.moves.slice(0, 10).map((move) => (
                    <span
                      key={move.move.name}
                      className="bg-gray-100 px-3 py-1 rounded-full text-sm capitalize"
                    >
                      {move.move.name}
                    </span>
                  ))}
                  {pokemon.moves.length > 10 && (
                    <span className="text-gray-500">+{pokemon.moves.length - 10} more</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;

 