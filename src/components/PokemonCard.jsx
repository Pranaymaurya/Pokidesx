import React from 'react';
import { usePokemon } from '../contexts/PokemonContext';

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

function PokemonCard({ pokemon }) {
  const { favorites, toggleFavorite } = usePokemon();
  const isFavorite = favorites.includes(pokemon.id);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="p-1 bg-gray-200 text-gray-700 text-right text-sm font-semibold flex justify-between items-center">
        <span>#{pokemon.id}</span>
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(pokemon.id);
          }}
          className="text-red-500 hover:text-red-700"
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="p-4 flex flex-col items-center">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-32 h-32"
        />
        <h2 className="text-xl font-bold mt-2 capitalize">
          {pokemon.name}
        </h2>
        <div className="flex gap-2 mt-2">
          {pokemon.types.map((type) => (
            <span
              key={`${pokemon.id}-${type}`}
              className={`${getTypeColor(type)} text-white px-3 py-1 rounded-full text-xs font-medium capitalize`}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PokemonCard; 