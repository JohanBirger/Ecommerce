import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/products.css'
import { BACKEND_URL } from '../../config.js';

interface Product {
  _id: string;
  name: string;
  price: number;
}

interface CreateProductDTO {
    name: string;
    description: string;
    price: number;
    category: string;
  }

const ProductCard: React.FC<Product & { onDeleteProduct: () => void }> = ({
  _id,
  name,
  price,
  onDeleteProduct,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
    <h3 className="text-lg font-semibold">{name}</h3>
    <p className="text-gray-600">Price: ${price}</p>
    <button
      onClick={onDeleteProduct}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4"
    >
      Delete Product
    </button>
  </div>
  );
};

const AddProduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name,setName] = useState('');
  const [description,setDescription] = useState('');
  const [price,setPrice] = useState<number>(0);
  const [category,setCategory] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/store/products/`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  

  const addProduct = async (event: React.FormEvent)  => {
    event.preventDefault();

    const productData: CreateProductDTO = {
        name: name,
        description: description,
        price: price,
        category: category,
      };

    try {
      const access_token = localStorage.getItem('access_token');

      if (!access_token) {
        console.error('Access token not found');
        return;
      }

      await axios.post(
        `${BACKEND_URL}/store/products/`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      console.log('Product added');
      fetchData();
    } catch (error) {
      console.error('Error adding product', error);
    }
  };


  const deleteProduct = async (productId: string) => {
    try {
      const access_token = localStorage.getItem('access_token');

      if (!access_token) {
        console.error('Access token not found');
        return;
      }

      await axios.delete(
        `${BACKEND_URL}/store/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      console.log('Product deleted');
      fetchData();
    } catch (error) {
      console.error('Error deleting product', error);
    }
  };

  return (
    <div>
    <h1 className="text-2xl font-bold mb-4">Products</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          {...product}
          onDeleteProduct={() => deleteProduct(product._id)}
        />
      ))}
    </div>
    <form onSubmit={addProduct} className="space-y-4">
        <div>
          <label className="block mb-1">name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">price:</label>
          <input
            type="number"
            value={price.toString()}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            className="border border-gray-300 px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>

    </form>
  </div>
  );
};

export default AddProduct;