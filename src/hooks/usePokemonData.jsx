import { useQuery } from '@tanstack/react-query';

const fetchPokemon = async (id) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!response.ok) throw new Error('Failed to fetch Pokemon');
  return response.json();
};

const fetchPokemonList = async (limit = 151) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  if (!response.ok) throw new Error('Failed to fetch Pokemon list');
  const data = await response.json();
  
  const pokemonDetails = await Promise.all(
    data.results.map(async (pokemon) => {
      const detailResponse = await fetch(pokemon.url);
      if (!detailResponse.ok) throw new Error('Failed to fetch Pokemon details');
      return detailResponse.json();
    })
  );

  return pokemonDetails.map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name,
    types: pokemon.types.map((type) => type.type.name),
    image: pokemon.sprites.front_default,
    stats: pokemon.stats.map((stat) => ({
      name: stat.stat.name,
      value: stat.base_stat,
    })),
    abilities: pokemon.abilities.map((ability) => ability.ability.name),
    moves: pokemon.moves.map((move) => move.move.name),
  }));
};

export function usePokemonList() {
  return useQuery({
    queryKey: ['pokemonList'],
    queryFn: () => fetchPokemonList(),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function usePokemonDetail(id) {
  return useQuery({
    queryKey: ['pokemonDetail', id],
    queryFn: () => fetchPokemon(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function useRandomPokemon() {
  return useQuery({
    queryKey: ['randomPokemon'],
    queryFn: async () => {
      const randomId = Math.floor(Math.random() * 151) + 1;
      return fetchPokemon(randomId);
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
} 