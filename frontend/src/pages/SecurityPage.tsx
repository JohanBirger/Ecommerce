import React from 'react';


const SecurityPage: React.FC = () => {
  return (
    <div className='container m-auto py-10'>
      <p>
        Accounts are stored in mongodb with sensitive information encrypted using bcrypt 
      </p>
    </div>
  );
};

export default SecurityPage;