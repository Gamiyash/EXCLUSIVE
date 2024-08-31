const express = require('express');
const router = express.Router();
const Product = require('../../models/product'); // Import your Product model

// Route to get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const synonymsDictionary = {
  "dress": ["gown", "frock", "attire"],
  "shirt": ["top", "blouse", "tee", "WomenShirt"],
  "phone": ["mobile", "smartphone", "mobilephone"],
  "smartwatch": ["digitalwatch", "watch", "wristsmartwatch"],
  "women": ["woman", "female", "ladies", "girls"],
  "womenshirt": ["shirt", "womenshirt", "WomenFashion", "women"]
}

// Function to get synonyms for a query term
function getSynonyms(query) {
  const terms = query.split(' ');
  let synonyms = [];

  terms.forEach(term => {
    const lowerTerm = term.toLowerCase();
    if (synonymsDictionary[lowerTerm]) {
      synonyms.push(...synonymsDictionary[lowerTerm], lowerTerm); // Include the original term
    } else {
      synonyms.push(lowerTerm);
    }
  });

  return synonyms;
}

function calculateRelevanceScore(query, product) {
  const queryTerms = query.toLowerCase().split(' ');
  let score = 0;
  let matchedKeyword = null;

  queryTerms.forEach(term => {
    const wordBoundaryRegex = new RegExp(`\\b${term}\\b`, 'i'); // Word boundary regex

    if (wordBoundaryRegex.test(product.name.toLowerCase())) {
      score += 10; // Weight for name matches
    }

    // Check each keyword in the array for whole word matches
    if (product.keyword && Array.isArray(product.keyword)) {
      for (let i = 0; i < product.keyword.length; i++) {
        if (wordBoundaryRegex.test(product.keyword[i].toLowerCase())) {
          matchedKeyword = product.keyword[i];
          score += 15; // Weight for keyword matches
          break; // Stop at the first match
        }
      }
    }
  });

  score += product.rating * 2; // Increase score based on rating
  score += product.discount ? parseInt(product.discount) : 0; // Increase score based on discount

  return { score, matchedKeyword };
}


router.get('/search', async (req, res) => {
  const query = req.query.q.trim();

  if (!query) {
    return res.json([]);
  }

  // Get synonyms and prepare the search terms
  const searchTerms = getSynonyms(query);
  const regexPattern = searchTerms.map(term => `\\b${term}\\b`).join('|'); // Word boundary regex pattern
  const regex = new RegExp(regexPattern, 'i'); // Create regex pattern for search

  try {
    // Search products using regex pattern
    let products = await Product.find({
      $or: [
        { keyword: regex },
        { name: regex }

      ]
    });

    // // Calculate relevance score for each product
    // products = products.map(product => ({
    //   ...product.toObject(),
    //   relevanceScore: calculateRelevanceScore(query, product)
    // }));

    // Calculate relevance score for each product
    products = products.map(product => {
      const relevance = calculateRelevanceScore(query, product);
      console.log(`Product: ${product.name}, Score: ${relevance.score}, Matched Keyword: ${relevance.matchedKeyword}`);
      return {
        ...product.toObject(),
        relevanceScore: relevance.score,
        matchedKeyword: relevance.matchedKeyword
      };
    });

    // Sort by relevance score
    products.sort((a, b) => b.relevanceScore - a.relevanceScore);

    // Limit results (pagination)
    res.json(products.slice(0, 20));
  } catch (error) {
    console.error('Error:', error.message); // Log error message
    res.status(500).json({ message: error.message });
  }
});



// Route to create a new product
router.post('/products', async (req, res) => {
  const { name, image, offerPrice, actualPrice, discount, rating, discription, size, sideimg1, sideimg2, sideimg3, sideimg4 } = req.body;

  const newProduct = new Product({
    name,
    image,
    sideimg1,
    sideimg2,
    sideimg3,
    sideimg4,
    offerPrice,
    actualPrice,
    discount,
    rating,
    discription,
    size,
    type
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
