import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/products.css';
import { ic_done } from 'react-icons-kit/md/ic_done';
import { Icon } from 'react-icons-kit';
import { BACKEND_URL } from '../config.js';
import CustomNumberInput from './subcomponents/CustomNumberInput';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
}

const ProductCard: React.FC<Product & { onAddToCart: (quantity: number) => void }> = ({
  _id,
  name,
  price,
  description,
  onAddToCart,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(quantity);
    setShowModal(true);

    setTimeout(() => {
      setShowModal(false);
    }, 200);
  };

  const handleQuantityChange = (value: number) => {
    setQuantity(value);
  };

  return (
    <div className="w-full mx-auto bg-white rounded-md border border-black-200 p-5 flex flex-col justify-between m-5">
      <div>
        <h3 className="text-lg font-200 text-black ">{name}</h3>
        <p className="text-gray-600 ">${price}</p>
      </div>
      <div className="items-center pt-5">
        {showModal ? (
          <div className="btn-wide text-black text-center rounded-md z-110">
            <Icon icon={ic_done} />
          </div>
        ) : (
          <>
              <div className='flex flex-flow justify-between'>
              <button onClick={(event) => {
                    event.preventDefault();
                    handleAddToCart();
                  }} className="btn-wide">
                Add to Cart
              </button>
              <CustomNumberInput 
                  value={quantity} 
                  onIncrement={() => handleQuantityChange(quantity + 1)}
                  onDecrement={() => handleQuantityChange(quantity > 0 ? quantity - 1 : 0)}
                />
              </div>
          </>
        )}
      </div>
    </div>
  );
};

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  interface ItemDTO {
    productId: string;
    name: string;
    quantity: number; // Assuming you want to add a quantity of 1 for each item
    price: number;
    description: string;
  }

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

  const addToCart = async (productId: string, quantity: number) => {
    try {
      const access_token = localStorage.getItem('access_token');

      if (!access_token) {
        console.error('Access token not found');
        return;
      }

      const response = await axios.get(`${BACKEND_URL}/store/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const product = response.data;

      const itemDTO: ItemDTO = {
        productId: product._id,
        name: product.name,
        quantity,
        price: product.price,
        description: product.description,
      };

      await axios.post(`${BACKEND_URL}/cart/`, itemDTO, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      console.log('Item added to cart');
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <div className="w-full bg-white mx-auto flex flex-col items-center" id="products">
      <p className="text-2xl font-bold mb-4 p-10">Products</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            {...product}
            onAddToCart={(quantity) => addToCart(product._id, quantity)}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
