import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const suggestionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = debounce(async () => {
      if (query.trim()) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/search`, { params: { q: query } });
          const products = response.data;
          setSuggestions(products);
          // const sortedSuggestions = products.sort((a, b) => b.relevanceScore - a.relevanceScore);
          // setSuggestions(sortedSuggestions);
        } catch (error) {
          console.error('Error fetching search suggestions:', error);
        }
      } else {
        setSuggestions([]);
      }
    }, 300); // Adjust the delay as needed

    fetchSuggestions();

    return () => {
      fetchSuggestions.cancel(); // Clean up on unmount
    };
  }, [query]);


  const handleSearch = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/search`, { params: { q: query } });
      const products = response.data;

      onFilter(products);
      navigate('/searchproducts', { state: { products } });

    } catch (error) {
      console.error('Error fetching search results:', error);
    }

  };

  const handleSelectSuggestion = async (product) => {
    // setQuery(product.name); // Or product.name based on your preference
    setSuggestions([]);

    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/search`, { params: { q: query } });
      const products = response.data;
      // window.location.reload();
      navigate('/searchproducts', { state: { products } });
       window.location.reload();

    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="relative xl:w-[30vw] w-[45vw]">
      <div className='flex gap-2 items-center'>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products..."
          className="w-full text-sm p-2 border border-gray-300 rounded"
        />
        <button className='absolute text-sm right-5 xl:block hidden' onClick={handleSearch}>Search</button>
      </div>

      {suggestions.length > 0 ? (
        <ul className="absolute left-0 w-full max-h-[40vh] bg-white border border-gray-300 rounded mt-1 overflow-y-auto z-50"
          style={{ scrollbarWidth: 'none', ' msOverflowStyle': 'none' }}
          ref={suggestionsRef}>
          {suggestions.map((product) => (
            <li
              key={product.id}
              onClick={() => handleSelectSuggestion(product)}
              className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-8 h-8 object-cover mr-2 rounded"
              />
              {product.name}
            </li>
          ))}
        </ul>
      ) : (
        query.trim() && (
            <div className="absolute left-0 w-full bg-white border border-gray-300 rounded mt-1 z-50 p-2 text-center">
              <p> Sorry No Products found for "{query}".</p>
            </div>
        )
      )}
    </div>
  );
};

export default SearchComponent;
