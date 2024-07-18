// Packages:
import React from 'react';
import { render, act, waitFor } from '@testing-library/react';
import {
  NYTArticlesProvider,
  NYTArticlesContext,
  NYTArticlesContextType
} from './NYTArticlesContext';

// Mocks:
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 'OK', results: [] }),
  })
) as jest.Mock;

// Tests:
describe('NYTArticlesProvider', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.clearAllMocks();
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  // Test Cases:
  it('fetches articles on mount', async () => {
    await act(async () => {
      render(
        <NYTArticlesProvider>
          <div>Test</div>
        </NYTArticlesProvider>
      );
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key='));
  });

  it('provides the correct context value', async () => {
    let contextValue: NYTArticlesContextType;
    const TestComponent = () => {
      contextValue = React.useContext(NYTArticlesContext);
      return null;
    };

    await act(async () => {
      render(
        <NYTArticlesProvider>
          <TestComponent />
        </NYTArticlesProvider>
      );
    });

    await waitFor(() => {
      expect(contextValue).toEqual(expect.objectContaining({
        isFetchingArticles: false,
        articles: [],
        focusedArticleID: undefined,
        focusedArticle: undefined,
      }));
      expect(typeof contextValue.setFocusedArticleID).toBe('function');
    });
  });

  it('handles API errors', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    (global.fetch as jest.Mock).mockImplementationOnce(() => Promise.reject('API is down'));

    await act(async () => {
      render(
        <NYTArticlesProvider>
          <div>Test</div>
        </NYTArticlesProvider>
      );
    });

    expect(consoleSpy).toHaveBeenCalledWith('API is down');
    consoleSpy.mockRestore();
  });

  it('should log an error when API response status is not OK', async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ status: 'ERROR' })
    });
    global.fetch = mockFetch as any;

    const TestComponent = () => {
      const { isFetchingArticles } = React.useContext(NYTArticlesContext);
      return <div>{isFetchingArticles ? 'Loading' : 'Loaded'}</div>;
    };

    await act(async () => {
      render(
        <NYTArticlesProvider>
          <TestComponent />
        </NYTArticlesProvider>
      );
    });

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      new Error('Unable to fetch NYT articles, the API is currently down.')
    );
  });

  it('updates focusedArticle when setFocusedArticleID is called', async () => {
    const testArticles = [
      { id: 1, title: 'Test Article 1' },
      { id: 2, title: 'Test Article 2' },
    ];

    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ status: 'OK', results: testArticles }),
      })
    );

    let contextValue: NYTArticlesContextType;
    const TestComponent = () => {
      contextValue = React.useContext(NYTArticlesContext);
      return null;
    };

    await act(async () => {
      render(
        <NYTArticlesProvider>
          <TestComponent />
        </NYTArticlesProvider>
      );
    });

    await waitFor(() => {
      expect(contextValue.articles).toEqual(testArticles);
    });

    act(() => {
      contextValue.setFocusedArticleID(1);
    });

    await waitFor(() => {
      expect(contextValue.focusedArticleID).toBe(1);
      expect(contextValue.focusedArticle).toEqual(testArticles[0]);
    });
  });
});
