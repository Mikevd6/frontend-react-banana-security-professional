import React, { useState } from 'react';

const BananaList = () => {
  const [bananas, setBananas] = useState([
    { id: 1, name: 'Green Banana', price: 0.5 },
    { id: 2, name: 'Yellow Banana', price: 0.6 },
    { id: 3, name: 'Red Banana', price: 0.7 },
  ]);

  const [newBanana, setNewBanana] = useState('');
  const [newBananaPrice, setNewBananaPrice] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [bansPerPage] = useState(2);

  const handleAddBanana = () => {
    if (newBanana && newBananaPrice > 0) {
      const newId = Math.max(...bananas.map((banana) => banana.id)) + 1;
      const newBananaObj = { id: newId, name: newBanana, price: newBananaPrice };
      setBananas([...bananas, newBananaObj]);
      setNewBanana('');
      setNewBananaPrice(0);
    }
  };

  const handleRemoveBanana = (bananaId) => {
    const updatedBananas = bananas.filter((banana) => banana.id !== bananaId);
    setBananas(updatedBananas);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (field) => {
    setSortField(field);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Filter bananas based on search term
  const filteredBananas = bananas.filter((banana) =>
    banana.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort bananas based on sort field
  const sortedBananas = [...filteredBananas].sort((a, b) => {
    if (sortField === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortField === 'price') {
      return a.price - b.price;
    }
    return 0;
  });

  // Pagination
  const indexOfLastBanana = currentPage * bansPerPage;
  const indexOfFirstBanana = indexOfLastBanana - bansPerPage;
  const currentBananas = sortedBananas.slice(indexOfFirstBanana, indexOfLastBanana);

  // Calculate total price
  const totalPrice = sortedBananas.reduce((total, banana) => total + banana.price, 0);

  // Calculate average price
  const averagePrice = totalPrice / sortedBananas.length;

  // Find highest and lowest priced bananas
  const highestPriceBanana = sortedBananas.reduce((max, banana) => (max.price > banana.price ? max : banana), sortedBananas[0]);
  const lowestPriceBanana = sortedBananas.reduce((min, banana) => (min.price < banana.price ? min : banana), sortedBananas[0]);

  // ... rest of the component

  return (
    <div>
      {/* ... rest of the component */}

      <div>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button onClick={() => handleSort('name')}>Sort by Name</button>
        <button onClick={() => handleSort('price')}>Sort by Price</button>
        {/* ... rest of the component */}
      </div>

      <div>
        <h2>Total Price: €{totalPrice.toFixed(2)}</h2>
        <h2>Average Price: €{averagePrice.toFixed(2)}</h2>
        <h2>Highest Priced Banana: {highestPriceBanana.name} - €{highestPriceBanana.price.toFixed(2)}</h2>
        <h2>Lowest Priced Banana: {lowestPriceBanana.name} - €{lowestPriceBanana.price.toFixed(2)}</h2>
      </div>

      {/* ... rest of the component */}
    </div>
  );
};

export default BananaList;
