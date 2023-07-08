import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/products.css';
import {ic_done} from 'react-icons-kit/md/ic_done'
import {Icon} from 'react-icons-kit'

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
}

const ProductCard: React.FC<Product & { onAddToCart: () => void }> = ({
  _id,
  name,
  price,
  description,
  onAddToCart,
}) => {
  const [showModal, setShowModal] = useState(false);
  const handleAddToCart = () => {
    onAddToCart();
    setShowModal(true);

    setTimeout(() => {
      setShowModal(false);
    }, 1300);
  };
  return (
    <div className="bg-white rounded-md border p-5 flex flex-col justify-between">
    <div>
      <h3 className="text-lg font-200 text-black">{name}</h3>
      <p className="text-gray-600">${price}</p>
    
    </div>
    <div className='items-center'>
    {showModal ? (
        <div className="bg-green-200 text-black text-center px-4 py-2 rounded-md z-110">
        <Icon icon={ic_done}/>
        </div>
      ):<div>
      <span className='px-12'></span>
      </div>
      }
    <button
      onClick={handleAddToCart}
      className="btn-wide m-4"
    >
      Add to Cart
    </button>
    </div>
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
    description: string,
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
        description: product.description,
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
    <div className="bg-white mx-auto flex flex-col items-center">
    <p className="text-2xl font-bold mb-4">Products</p>
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