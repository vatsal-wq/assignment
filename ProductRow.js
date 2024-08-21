import React, {useState} from 'react';
import './ProductRow.css';
import axios from 'axios';
import { redirect, useNavigate } from 'react-router-dom';
import fetchProducts from './Home';
import EditProduct from './EditProduct';
import Modal from 'react-bootstrap/Modal'
import TestEdit from './TestEdit';


function ProductRow({ product }) {
    const navigate = useNavigate();

    const getStatusColor = (quantity) => {
        if (quantity > 10) return 'green';
        if (quantity > 0) return 'yellow';
        return 'red';
    };

    const confirmDelete = () => {
        var decision = prompt("Are you sure you want to delete Product"+product.ProductName+" Product Id: "+product.ProductID);
        if (decision.toLowerCase() == 'yes' | decision.toLowerCase() == 'y'){
            handleDelete();
        } else {
            alert("aborting delete")
        }

    }
    const handleDelete = async (e) => {
        try {
            const id = product.ProductID;
            const deleteURL = 'http://localhost:5000/products/'+id;
            console.log(deleteURL);
            axios.delete(deleteURL);
            alert("delete succesful");
            window.location.reload();
        } catch (error){
            console.log(error);
            alert("delete failed....");
        }
    }

    return (
        <tr className='product-row'>
            <td>{product.ProductCode}</td>
            <td>{product.ProductName}</td>
            <td><img src={product.ProductImage} alt={product.ProductName} width="150" /></td>
            <td>Rs. {product.Price}</td>
            <td>{product.Category}</td>
            <td>{product.Rating || 0}</td>
            <td>
                <div style={{ backgroundColor: getStatusColor(product.Quantity), padding: '5px', borderRadius: '5px', color: 'white', textAlign: 'center' }}>
                    {product.Quantity > 10 ? 'In Stock' : product.Quantity > 0 ? 'Low Stock' : 'Out of Stock'}
                </div>
            </td>
            <td>
                <TestEdit product={product}/>
                
                <button className='delete-button' onClick={confirmDelete}>
                    <i className="fas fa-trash-alt"></i> Delete
                </button>
            </td>
        </tr>
    );
}

export default ProductRow;
