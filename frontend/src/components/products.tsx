import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/products.css';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: Buffer; // or image: string, depending on your preference
}

const ProductCard: React.FC<Product & { onAddToCart: () => void }> = ({
  _id,
  name,
  price,
  onAddToCart,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
    <h3 className="text-lg font-semibold">{name}</h3>
    <p className="text-gray-600">Price: ${price}</p>
    <button
      onClick={onAddToCart}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4"
    >
      Add to Cart
    </button>
  </div>
  );
};

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  
  interface ItemDTO{
    productId: string,
    name: string,
    quantity: number, // Assuming you want to add a quantity of 1 for each item
    price: number,
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/store/products/');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addToCart = async (productId: string) => {
    try {
      const access_token = localStorage.getItem('access_token');
  
      if (!access_token) {
        console.error('Access token not found');
        return;
      }
  
      const response = await axios.get(`http://localhost:8000/store/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
  
      const product = response.data;
  
      const itemDTO: ItemDTO = {
        productId: product._id,
        name: product.name,
        quantity: 1, // Assuming you want to add a quantity of 1 for each item
        price: product.price,
      };
  
      await axios.post(
        'http://localhost:8000/cart/',
        itemDTO,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
  
      console.log('Item added to cart');
    } catch (error) {
      console.error('Error adding item to cart:', error);
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
          onAddToCart={() => addToCart(product._id)}
        />
      ))}
    </div>
  </div>
  );
};

export default Products;