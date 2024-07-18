// Packages:
import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { NYTArticlesContext, NYTArticlesContextType } from '../context/NYTArticlesContext';
import useNYTArticles from './useNYTArticles';
import { act } from '@testing-library/react';

// Tests:
describe('useNYTArticles', () => {
  const mockContextValue: NYTArticlesContextType = {
    isFetchingArticles: false,
    articles: [],
    focusedArticleID: undefined,
    setFocusedArticleID: jest.fn(),
    focusedArticle: undefined
  };

  // Test Cases:
  it('returns the context value when used within NYTArticlesProvider', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <NYTArticlesContext.Provider value={mockContextValue}>
        {children}
      </NYTArticlesContext.Provider>
    );

    const { result } = renderHook(() => useNYTArticles(), { wrapper });

    expect(result.current).toBe(mockContextValue);
  });
});
