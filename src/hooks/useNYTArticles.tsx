// Packages:
import { useContext } from 'react';

// Context:
import { NYTArticlesContext } from '../context/NYTArticlesContext';

// Functions:
const useNYTArticles = () => {
  const context = useContext(NYTArticlesContext);
  return context;
};

// Exports:
export default useNYTArticles;
