import './Title.css';
import { TitleProps } from './titleTypes';

const Title: React.FC<TitleProps> = ({ children }) => {
  return <h1 className="title__component">{children}</h1>;
};

export default Title;
