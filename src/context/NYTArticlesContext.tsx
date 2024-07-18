// Packages:
import React, { createContext, useCallback, useEffect, useState } from 'react';

// Typescript:
import type { NYTArticleListItem } from '../types';

export interface NYTArticlesContextType {
  isFetchingArticles: boolean;
  articles: NYTArticleListItem[];
  focusedArticleID: number | undefined;
  setFocusedArticleID: (articleID: number | undefined) => void;
  focusedArticle: NYTArticleListItem | undefined
};

// Exports:
export const NYTArticlesContext = createContext<NYTArticlesContextType>({
  isFetchingArticles: true,
  articles: [],
  focusedArticleID: undefined,
  setFocusedArticleID: () => { },
  focusedArticle: undefined,
});

export const NYTArticlesProvider = ({ children }: { children: React.ReactNode }) => {
  // Constants:
  const API_KEY = process.env['REACT_APP_API_KEY'];
  const API_URL = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${ API_KEY }`;

  // State:
  const [isFetchingArticles, setIsFetchingArticles] = useState(true);
  const [articles, setArticles] = useState<NYTArticleListItem[]>([]);
  const [focusedArticleID, _setFocusedArticleID] = useState<number>();
  const [focusedArticle, setFocusedArticle] = useState<NYTArticleListItem>()

  // Functions:
  const fetchNYTArticles = useCallback(async () => {
    try {
      const response = await (await fetch(API_URL)).json();
      if (response.status !== 'OK') throw new Error('Unable to fetch NYT articles, the API is currently down.');
      setArticles(response.results as NYTArticleListItem[])
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchingArticles(false);
    }
  }, [API_URL]);

  const setFocusedArticleID = (articleID?: number) => {
    _setFocusedArticleID(articleID);
    setFocusedArticle(articles.find(article => article.id === articleID))
  };

  // Effects:
  useEffect(() => {
    fetchNYTArticles();
  }, [fetchNYTArticles]);
  
  // Return:
  return (
    <NYTArticlesContext.Provider
      value={{
        isFetchingArticles,
        articles,
        focusedArticleID,
        setFocusedArticleID,
        focusedArticle,
      }}
    >
      <div data-testid={isFetchingArticles ? 'loading' : 'loaded'}>
        {children}
      </div>
    </NYTArticlesContext.Provider>
  );
};
