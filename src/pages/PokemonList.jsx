import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { usePokemon } from '../contexts/PokemonContext';
import { usePokemonList } from '../hooks/usePokemonData';
import PokemonCard from '../components/PokemonCard';
import TypeFilter from '../components/TypeFilter';
import Pagination from '../components/Pagination';
import SortControls from '../components/SortControls';
import RandomPokemonButton from '../components/RandomPokemonButton';

function PokemonList() {
  const {
    itemsPerPage,
    currentPage,
    sortBy,
    sortOrder,
    selectedTypes,
    setItemsPerPage,
    setCurrentPage,
    setSort,
    toggleTypeFilter,
  } = usePokemon();

  const { data: pokemonList, isLoading, error } = usePokemonList();

  const filteredAndSortedPokemon = useMemo(() => {
    if (!pokemonList) return [];

    let filtered = [...pokemonList];

    // Apply type filters
    if (selectedTypes.length > 0) {
      filtered = filtered.filter((pokemon) =>
        selectedTypes.every((type) => pokemon.types.includes(type))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === 'id') {
        return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
      } else if (sortBy === 'name') {
        return sortOrder === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      return 0;
    });

    return filtered;
  }, [pokemonList, selectedTypes, sortBy, sortOrder]);

  const paginatedPokemon = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedPokemon.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedPokemon, currentPage, itemsPerPage]);

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
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="w-full md:w-1/2">
          <TypeFilter
            selectedTypes={selectedTypes}
            onTypeToggle={toggleTypeFilter}
          />
        </div>
        <div className="flex items-center gap-4">
          <SortControls
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={setSort}
          />
          <RandomPokemonButton />
        </div>
      </div>

      <div className="mb-4">
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={50}>50 per page</option>
        </select>
      </div>

      {paginatedPokemon.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-xl text-gray-600">No Pokémon found. Try adjusting your filters.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedPokemon.map((pokemon) => (
              <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`}>
                <PokemonCard pokemon={pokemon} />
              </Link>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalItems={filteredAndSortedPokemon.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}

export default PokemonList; 