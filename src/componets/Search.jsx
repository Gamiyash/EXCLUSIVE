import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Define the calculateRelevanceScore function
// const calculateRelevanceScore = (product, query) => {
//   const nameScore = product.name.toLowerCase().includes(query.toLowerCase()) ? 1 : 0;
//   return nameScore;
// };

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

  // useEffect(() => {
  //   if (query.trim()) {
  //     const fetchSuggestions = async () => {
  //       try {
  //         const response = await axios.get('/api/search', { params: { q: query } });
  //         const products = response.data;

  //         // Calculate relevance scores and sort products
  //         const scoredProducts = products.map(product => ({
  //           ...product,
  //           score: calculateRelevanceScore(product, query),
  //         })).sort((a, b) => b.score - a.score);

  //         setSuggestions(scoredProducts);
  //       } catch (error) {
  //         console.error('Error fetching search suggestions:', error);
  //       }
  //     };
  //     fetchSuggestions();
  //   } else {
  //     setSuggestions([]);
  //   }
  // }, [query]);

  useEffect(() => {
    if (query.trim()) {
      const fetchSuggestions = async () => {
        try {
          const response = await axios.get('/api/search', { params: { q: query } });
          const products = Array.isArray(response.data) ? response.data : [];

          // Process suggestions to include only matched keywords
          const filteredSuggestions = products.flatMap(product =>
            (product.keyword || []).filter(keyword =>
              keyword.toLowerCase().includes(query.toLowerCase())
            ).map(keyword => ({
              ...product,
              keyword,
            }))
          );

          setSuggestions(filteredSuggestions);
        } catch (error) {
          console.error('Error fetching search suggestions:', error);
        }
      };
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('/api/search', { params: { q: query } });
      const products = response.data;
      navigate('/searchproducts', { state: { products } });
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleSelectSuggestion = async (product) => {
    // setQuery(product.name);
    // setSuggestions([]);
    // navigate(`/Allproductdetails/${product._id}`);
    try {
      const response = await axios.get('/api/search', { params: { q: query } });
      const products = response.data;
      navigate('/searchproducts', { state: { products } });
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="relative w-[30vw]">
      <div className='flex gap-2 items-center'>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products..."
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button className='absolute right-5' onClick={handleSearch}>Search</button>
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute left-0 w-full max-h-[40vh] bg-white border border-gray-300 rounded mt-1 overflow-y-auto z-50"
          style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}
          ref={suggestionsRef}>
          {suggestions.map((product) => (
            <li
              key={product._id}
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
      )}
    </div>
  );
};

export default SearchComponent;
