import React, { useEffect, useState, ChangeEvent, MouseEvent } from 'react';
import axios,  { AxiosResponse }from 'axios';
import '../styles/products.css';
import { ic_done } from 'react-icons-kit/md/ic_done';
import { Icon } from 'react-icons-kit';
import { BACKEND_URL } from '../config.js';
import CustomNumberInput from './subcomponents/CustomNumberInput';
import { fetchCart } from '../services/CartServices'
import { ic_search } from 'react-icons-kit/md/ic_search'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'
import logo from '../webp.webp';


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
    fetchCart();

    setTimeout(() => {
      setShowModal(false);
    }, 350);
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
      <div className='flex flex-col items-center justify-center'>
      <LazyLoadImage
      className=' object-contain max-w-full max-h-full mx-auto transition-transform duration-500 ease-in-out transform hover:scale-110 '
      alt="example"
      height={200}
      effect="blur"
      src={logo} />
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


interface ProductProps{
  categoryQuery?:string;
  searchQuery? :string;
}

const Products: React.FC<ProductProps> = ({ categoryQuery }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  interface ItemDTO {
    productId: string;
    name: string;
    quantity: number; // Assuming you want to add a quantity of 1 for each item
    price: number;
    description: string;
  }
  
  interface Filter {
    search?: string;
    category?: string;
  }

  useEffect(() => {
    if(categoryQuery){
      handleFetchProducts();
      fetchCart();
    }
    else{fetchData();}
    
  }, [categoryQuery]);


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
      fetchCart();
      console.log('Item added to cart');
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const getProducts = async (filter:Filter): Promise<Product[]> => {
    try {
      // Prepare URL
      let url = `${BACKEND_URL}/store/products`; 
  
      // Create filter object
      if (search) filter['search'] = search;
      if (category) filter['category'] = category;
  
      const response: AxiosResponse<Product[]> = await axios.get(url, { params: filter });
      fetchCart();
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch products: ${error}`);
      return []; // return empty array in case of error
    }
  }

  const handleFetchProducts = async () => {
    const data = await getProducts({category: categoryQuery});  // use categoryQuery instead of "poppis"
    setProducts(data);
    fetchCart();
    
  }

  const searchProduct = async (value: string) => {
    const data = await getProducts({search: value});  // use categoryQuery instead of "poppis"
    setProducts(data);
    fetchCart();
    
  }


  return (
    
    <div className="w-full bg-white mx-auto flex flex-col items-center" id="products">
     {categoryQuery !== "poppis" && <div className='flex items-center justify-center p-4'>
        <div className="relative pt-3">
          <input 
            id="search"
            className="border border-gray-300 text-md p-2 h-12 rounded-md focus:outline-none focus:ring-none focus:ring-none w-64 pl-10" 
            type="text" 
            placeholder="Search for a product" 
            onChange={(event) => searchProduct(event.target.value)}
            onKeyUp={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
              }
              searchProduct(event.currentTarget.value);
            }}
            
            
          />
          <div className="absolute top-0 pt-4 left-0 mt-2 ml-2">
            <Icon icon={ic_search} size={24} style={{ color: '#030212' }} />
          </div>
        </div>
      </div>}
      
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
