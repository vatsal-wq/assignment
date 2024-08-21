import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import ProductTable from './ProductTable';
import { useNavigate } from 'react-router-dom';
import AuthFlag from '../auth/AuthFlag';
import './Home.css'
import TestAdd from './TestAdd';
import Loading from './Loading';


function Home() {
    const [isLoading, setIsLoading] = useState(true);

    console.log("auth flag "+localStorage.getItem('flag'));
    
    useEffect(() => {
        if(!localStorage.getItem('flag')){
            alert('Please login first');
            navigate('/login');
        }
    },[])
    
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [sortConfig, setSortConfig] = useState({key: null, direction: 'ascending'});
    const navigate = useNavigate();

    const addRedirect = () => {
        navigate('/add');
    }
    const logoutRedirect = () => {
        localStorage.setItem('username',null);
        localStorage.setItem('flag', false)
        navigate('/login')
    }

    const fetchProducts = async () => {
        const response = await axios.get('http://localhost:5000/products');
        console.log(response.data);
        setProducts(response.data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);
  
    const filteredProducts = products.filter(product =>
        product.ProductName.toLowerCase().includes(search.toLowerCase()) || product.ProductCode.toLowerCase().includes(search.toLowerCase())
    );
    console.log("fp"+filteredProducts);
    return (
        <div className="home-container">
            <div className="header-container">
                <h1>Welcome, {localStorage.getItem('username')}</h1>
                <div className="header-controls">
                    <input
                        type="text"
                        placeholder="Search Products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="search-input"
                    />
                    <button onClick={sortByPrice} className="action-button">Sort by Price</button>
                    <TestAdd />
                    <button onClick={logoutRedirect} className="action-button">Logout</button>
                </div>
            </div>
            {/* <ProductTable products={sortedProducts} requestSort={requestSort} sortConfig={sortConfig} /> */}
            <ProductTable products={filteredProducts} />
        </div>
    );
}

export default Home;
