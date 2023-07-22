import React, { ReactNode } from 'react';
import backgroundImage from '../../landingpage.webp'
interface HeaderProps {
  children: ReactNode;
}

class Header extends React.Component<HeaderProps> {
  render() {
    const headerStyle = {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      
    };

    const { children } = this.props;

    return (
      <header style={headerStyle} className='text-white py-20 min-h-screen'>
        {children}
      </header>
    );
  }
}

export default Header;