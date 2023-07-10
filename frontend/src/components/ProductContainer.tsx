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
    }, 200);
  };
  return (
    <div className="w-full mx-auto bg-white rounded-md border border-black-200 p-5 flex flex-col justify-between m-5">
    <div>
      <h3 className="text-lg font-200 text-black ">{name}</h3>
      <p className="text-gray-600 ">${price}</p>
    
    </div>
    <div className='items-center pt-5'>
    {showModal ? (
        <div className="btn-wide text-black text-center rounded-md z-110">
        <Icon icon={ic_done}/>
        </div>
      ):<button
      onClick={handleAddToCart}
      className="btn-wide"
    >
      Add to Cart
    </button>
      }
    
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
      const response = await axios.get('https://prickly-ray-sarong.cyclic.app/store/products/');
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
  
      const response = await axios.get(`https://prickly-ray-sarong.cyclic.app/store/products/${productId}`, {
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
        'https://prickly-ray-sarong.cyclic.app/cart/',
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
    <div className="w-full bg-white mx-auto flex flex-col items-center" id="products">
    <p className="text-2xl font-bold mb-4 p-10">Products</p>
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