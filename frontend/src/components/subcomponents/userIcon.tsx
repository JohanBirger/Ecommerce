import { Icon } from 'react-icons-kit';
import {user} from 'react-icons-kit/icomoon/user'

interface IconUserProps{
    text: string;
    styleIcon:string;
    styleText:string
} 

const IconUser: React.FC<IconUserProps> = ({text,styleIcon,styleText}) => (
    <div className="flex items-center">
    <Icon icon={user} className={styleIcon}  size={24} />
    <p className={styleText}>{text}</p>
    </div>
  
);

export default IconUser;