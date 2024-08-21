import React, { useState } from 'react';
import ProductRow from './ProductRow';


function ProductTable({ products }) {
    return (
        <table align='center' style={{width:'100%'}}>
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Rating</th>
                    <th>Stock Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => (
                    <ProductRow key={product.id} product={product} />
                ))}
            </tbody>
        </table>
    );
}

export default ProductTable;
