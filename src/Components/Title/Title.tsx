import React, { ReactNode } from 'react';
import './Title.css';

interface TitleProps {
  children: ReactNode;
}

const Title: React.FC<TitleProps> = ({ children }) => {
  return <h1 className="title__component">{children}</h1>;
};

export default Title;
