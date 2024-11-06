import React, { ReactNode } from 'react';

interface TitleProps {
  children: ReactNode;
}

const Title: React.FC<TitleProps> = ({ children }) => {
  return (
    <h1
      style={{
        fontSize: '3rem',
        fontWeight: 'bold',
        margin: '5rem 0',
        color: '#313131',
      }}
    >
      {children}
    </h1>
  );
};

export default Title;
