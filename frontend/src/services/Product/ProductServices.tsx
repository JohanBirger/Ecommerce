// ProductService.ts
import { BehaviorSubject } from 'rxjs';
import axios, { AxiosResponse } from 'axios';
import { BACKEND_URL } from '../../config.js';
import { Product } from './ProductInterface';

interface Filter {
  search?: string;
  category?: string;
}

// Create a BehaviorSubject for the product state
const productState$ = new BehaviorSubject<Product[]>([]);

export const fetchProducts = async (filter?: Filter) => {
  try {
    // Prepare URL

    // Create filter object
    const response: AxiosResponse<Product[]> = await axios.get(`${BACKEND_URL}/store/products`, { params: filter });
    // Update the productState with new product data
    productState$.next(response.data);
  } catch (error) {
    console.error(`Failed to fetch products: ${error}`);
  }
}

export const searchProducts = async (search: string) => {
  await fetchProducts({ search });
}

export const fetchProductsByCategory = async (category: string) => {
  await fetchProducts({ category });
}

export const productStateObservable = productState$.asObservable();
