import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BACKEND_URL } from '../config.js';
import '../styles/products.css';
import { ic_done } from 'react-icons-kit/md/ic_done';
import { Icon } from 'react-icons-kit';
import CustomNumberInput from '../components/subcomponents/CustomNumberInput';
import { addToCart } from '../services/Cart/CartServices'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { sessionStateObservable } from '../services/sessionService';


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
  const [loggedIn,setLoggedIn] =useState(false);

  useEffect(() => {
    const sessionSubscription = sessionStateObservable.subscribe((session) => {
      const isLoggedIn = session?.loggedIn;
      if(isLoggedIn){
        setLoggedIn(isLoggedIn);
      }
      else{
        setLoggedIn(false);
      }
    });

    
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

    return () => {
      sessionSubscription.unsubscribe();
    };
  }, [id]);
  
  const handleAddToCart = () => {
    addToCart(validId,quantity)
    setShowModal(true);
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
    
    <div>
    <div className='pt-20'></div>
    <div className="flex justify-center items-center min-h-screen pt-20">
        <div className="max-w-lg min-h-screen bg-white flex flex-col items-center m-2">
        <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <img className='max-w-full max-h-full mx-auto' src={product.image} alt={product.name} />
            <div className="text-center">
                <h3 className="text-lg font-200 text-black cool-font">{product.name}</h3>
                <p className="text-gray-600 cool-font">${product.price}</p>
                <p className="text-black">{product.description}</p>
                <div className="items-center justify-center flex">
                {showModal ? (
                    <div className='grid grid-cols-1 gap-1 items-center'>
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
                    <div className='grid grid-cols-1 gap-1 items-center'>
                       
                          {
                            loggedIn ? 
                            (<>
                             <div className='flex justify-center'>
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
                                  onDecrement={() => handleQuantityChange(quantity > 0 ? quantity - 1 : 0)}/>
                            </div>

                            </>
                            ):(
                            <>
                            <div className='flex justify-center'>

                            </div>
                            </>
                            )
                          }
                        
                    </div>
                    </>
                )}
                </div>
            </div>
            </div>
        </div>
        </div>
        </div>
        </div>
    

  );
};

export default ProductPage;
