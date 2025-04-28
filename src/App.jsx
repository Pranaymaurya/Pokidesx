import React, { useState, useEffect } from 'react';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [types, setTypes] = useState([]);

  // Fetch Pokemon data
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        // Get initial list of 150 Pokemon
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        const data = await response.json();
        
        // Fetch detailed information for each Pokemon
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const detailResponse = await fetch(pokemon.url);
            return await detailResponse.json();
          })
        );
        
        // Format the Pokemon data
        const formattedPokemon = pokemonDetails.map((pokemon) => ({
          id: pokemon.id,
          name: pokemon.name,
          types: pokemon.types.map((type) => type.type.name),
          image: pokemon.sprites.front_default
        }));
        
        setPokemon(formattedPokemon);
        setFilteredPokemon(formattedPokemon);
        
        // Get unique types for filter dropdown
        const allTypes = new Set();
        formattedPokemon.forEach(pokemon => {
          pokemon.types.forEach(type => {
            allTypes.add(type);
          });
        });
        setTypes(Array.from(allTypes).sort());
        
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch Pokémon data. Please try again later.');
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  // Filter Pokemon based on search term and selected type
  useEffect(() => {
    const filtered = pokemon.filter((pokemon) => {
      const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === '' || pokemon.types.includes(selectedType);
      return matchesSearch && matchesType;
    });
    
    setFilteredPokemon(filtered);
  }, [searchTerm, selectedType, pokemon]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTypeFilterChange = (e) => {
    setSelectedType(e.target.value);
  };

  // Type color mapping for the badges
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

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="bg-red-600 text-white rounded-lg shadow-md mb-8 py-6">
          <h1 className="text-center text-3xl font-bold">PokéDex Explorer</h1>
        </header>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
          <div className="w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search Pokémon..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          
          <div className="w-full md:w-1/3">
            <select
              value={selectedType}
              onChange={handleTypeFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">All Types</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mx-auto mb-4"></div>
              <p className="text-xl">Loading Pokémon data...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <p className="text-center">{error}</p>
          </div>
        ) : filteredPokemon.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xl text-gray-600">No Pokémon found. Try adjusting your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPokemon.map((pokemon) => (
              <div key={pokemon.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                <div className="p-1 bg-gray-200 text-gray-700 text-right text-sm font-semibold">
                  #{pokemon.id}
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;