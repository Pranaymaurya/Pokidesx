import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRandomPokemon } from '../hooks/usePokemonData';

function RandomPokemonButton() {
  const navigate = useNavigate();
  const { data: randomPokemon, refetch } = useRandomPokemon();

  const handleClick = async () => {
    await refetch();
    if (randomPokemon) {
      navigate(`/pokemon/${randomPokemon.id}`);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
    >
      Random Pokémon
    </button>
  );
}

export default RandomPokemonButton; 