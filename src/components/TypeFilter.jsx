import React from 'react';

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

const allTypes = Object.keys(typeColors).sort();

function TypeFilter({ selectedTypes, onTypeToggle }) {
  return (
    <div className="flex flex-wrap gap-2">
      {allTypes.map((type) => (
        <button
          key={type}
          onClick={() => onTypeToggle(type)}
          className={`px-3 py-1 rounded-full text-white text-sm font-medium capitalize transition-colors ${
            selectedTypes.includes(type)
              ? `${typeColors[type]} opacity-100`
              : `${typeColors[type]} opacity-50 hover:opacity-75`
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
}

export default TypeFilter; 