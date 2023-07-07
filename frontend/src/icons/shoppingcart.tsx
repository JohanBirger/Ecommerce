import { Icon } from 'react-icons-kit';
import {cart} from 'react-icons-kit/icomoon/cart'



const IconCart: React.FC= () => (
    <div className="flex items-center justify-center">
    <Icon icon={cart} className='text-white hover:scale-110' />
    <p className='text-white h-8 text-sm flex items-center justify-center px-2'>Shopping Cart</p>
    </div>
  
);

export default IconCart;