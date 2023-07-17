

import React, { useEffect, useState, ChangeEvent, MouseEvent } from 'react';
import axios,  { AxiosResponse }from 'axios';
import '../styles/products.css';
import { ic_done } from 'react-icons-kit/md/ic_done';
import { Icon } from 'react-icons-kit';
import { BACKEND_URL } from '../config.js';
import CustomNumberInput from './subcomponents/CustomNumberInput';
import { addToCart, fetchCart } from '../services/CartServices'
import { ic_search } from 'react-icons-kit/md/ic_search'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'
import logo from '../webp.webp';
import { debounce } from 'lodash'; // Import the debounce function from lodash or use a custom debounce implementation
import {Product} from '../services/Product/ProductInterface'
import { fetchProductsByCategory, productStateObservable, searchProducts, fetchProducts } from '../services/Product/ProductServices';
import { ItemDTO } from '../services/Product/ItemDTO';
import { useNavigate } from 'react-router-dom';


const ProductCard: React.FC<Product> = ({
  _id,
  name,
  price,
  description,
  image,
  
}) => {
  

  const navigate = useNavigate();
  
  const navigateToProductPage = () => {
    navigate(`/products/${_id}`)
  }  

  return (
    <div className="max-w-sm bg-white flex flex-col justify-between m-5 " onClick={navigateToProductPage}>
      <div className='relative w-40 h-40 overflow-hidden hover:shadow-md '>
     
      <LazyLoadImage
      className='max-w-full max-h-full mx-auto transition duration-300 transform hover:scale-110'
      alt="example"
      height={200}
      effect="blur"
      src={image} />
       </div>
      <h3 className="text-lg font-200 text-black">{name}</h3>
      <p className="text-gray-600">${price}</p>
      </div>

  );
};

interface ProductProps{
  categoryQuery?:string;
  searchQuery? :string;
}

const Products: React.FC<ProductProps> = ({ categoryQuery }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const productSubscription = productStateObservable.subscribe(productsData => {
      console.log('Updating state with new products data:', productsData);
      setProducts(productsData);
    });

    return () => {
      productSubscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if(categoryQuery){
      fetchProductsByCategory(categoryQuery);
    } else {
      fetchProducts();
    }
  }, [categoryQuery]);

  const debouncedSearchProducts = debounce((value: string) => {
    searchProducts(value);
  }, 300); // Debounce for 300 milliseconds


  return (
    
    <div className="w-full bg-white mx-auto flex flex-col items-center" id="products">
     {categoryQuery !== "poppis" && <div className='flex items-center justify-center p-4'>
        <div className="relative pt-3 ">
          <input 
            id="search"
            className="border border-gray-300 text-md p-2 h-12 rounded-md focus:outline-none focus:ring-none focus:ring-none w-64 pl-10" 
            type="text" 
            placeholder="Search for a product" 
            onChange={(event) => debouncedSearchProducts(event.target.value)}
          />
          <div className="absolute top-0 pt-4 left-0 mt-2 ml-2">
            <Icon icon={ic_search} size={24} style={{ color: '#030212' }} />
          </div>
        </div>
      </div>}
      <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.length < 1 &&
          <div className='flex justify-center items-center'>
             <div className='p-10 '>No products</div>
           </div>
           }
        {products.map((product) => (
          <ProductCard
            key={product._id}
            {...product}
          />
        ))}
      </div>
      </div>
    </div>
    
  );
};

export default Products;
