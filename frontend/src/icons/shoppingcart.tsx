import { Icon } from 'react-icons-kit';
import { cart } from 'react-icons-kit/icomoon/cart';

interface IconCartProps {
  text: string;
  styleIcon:string;
  styleText:string
}

const IconCart: React.FC<IconCartProps> = ({ text,styleIcon,styleText }) => (
  <div className="flex items-center justify-center">
    <Icon icon={cart} className={styleIcon} />
    <p className={styleText}>{text}</p>
  </div>
);

export default IconCart;
