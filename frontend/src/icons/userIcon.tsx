import { Icon } from 'react-icons-kit';
import {user} from 'react-icons-kit/icomoon/user'

interface IconUserProps{
    text: string;
} 

const IconUser: React.FC<IconUserProps> = ({text}) => (
    <div className="flex items-center justify-center">
    <Icon icon={user} className='text-white hover:scale-110' />
    <p className='text-white h-8 text-sm flex items-center justify-center px-2'>{text}</p>
    </div>
  
);

export default IconUser;