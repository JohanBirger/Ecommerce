import React, { useEffect, useState, ChangeEvent, MouseEvent } from 'react';
import axios,  { AxiosResponse }from 'axios';
import { useParams } from 'react-router-dom';
import { BACKEND_URL } from '../config.js';
import '../styles/products.css';
import { ic_done } from 'react-icons-kit/md/ic_done';
import { Icon } from 'react-icons-kit';
import CustomNumberInput from '../components/subcomponents/CustomNumberInput';
import { addToCart, fetchCart } from '../services/CartServices'
import { ic_search } from 'react-icons-kit/md/ic_search'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'
import logo from '../webp.webp';
import { debounce } from 'lodash'; // Import the debounce function from lodash or use a custom debounce implementation

import { fetchProductsByCategory, productStateObservable, searchProducts, fetchProducts } from '../services/Product/ProductServices';
import { ItemDTO } from '../services/Product/ItemDTO';
import { useNavigate } from 'react-router-dom';


interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

const ProductPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { '*' : id } = useParams();
  const validId = id || '';  // if id is undefined, it will be replaced with an empty string
  

  useEffect(() => {
    console.log(id)
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/store/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);
  
  const handleAddToCart = () => {
    addToCart(validId,quantity)
    setShowModal(true);

    //fetchCart();

    setTimeout(() => {
      setShowModal(false);
    }, 350);
  };

  const handleQuantityChange = (value: number) => {
    setQuantity(value);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (

    <div className="max-w-lg bg-white flex flex-col justify-center items-center m-2 grid grid-cols-1 md:grid-cols-2 gap-4">
      <img className='max-w-full max-h-full mx-auto' src={product.image} alt={product.name} />
      <div>
      <h3 className="text-lg font-200 text-black">{product.name}</h3>
      <p className="text-gray-600">${product.price}</p>
      <p className="text-black">{product.description}</p>
      <div className="items-center">
        {showModal ? (
            <div className='grid grid-cols-1 gap-1'>

          <div className="btn-wide text-black text-center rounded-md z-110">
            <Icon icon={ic_done} />
          </div>
          <div>
              <CustomNumberInput 
                  value={quantity} 
                  onIncrement={() => handleQuantityChange(quantity + 1)}
                  onDecrement={() => handleQuantityChange(quantity > 0 ? quantity - 1 : 0)}
                />
              </div>
            
              </div>
              
        ) : (
          <>
            <div className='grid grid-cols-1 gap-1'>
              <div className='flex flex-flow justify-between'>
              <button onClick={(event) => {
                    event.preventDefault();
                    handleAddToCart();
                  }} className="btn-wide">
                Add to Cart
              </button>
              </div>
              <div>
              <CustomNumberInput 
                  value={quantity} 
                  onIncrement={() => handleQuantityChange(quantity + 1)}
                  onDecrement={() => handleQuantityChange(quantity > 0 ? quantity - 1 : 0)}
                />
              </div>
              </div>
          </>
        )}
      </div>
      </div>
    </div>
  );
};

export default ProductPage;
