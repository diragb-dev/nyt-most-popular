// Packages:
import { render, screen } from '@testing-library/react';
import useNYTArticles from '../hooks/useNYTArticles';

// Typescript:
import { NYTArticleListItem } from '../types';

// Constants:
import { MOCK_ARTICLES } from '../constants/tests';

// Components:
import List from './List';

// Mocks:
jest.mock('../hooks/useNYTArticles');
jest.mock('./ListItem', () => {
  return function MockListItem({ article }: { article: NYTArticleListItem }) {
    return <div data-testid={`list-item-${article.id}`}>{article.title}</div>;
  };
});

// Tests:
describe('List', () => {
  beforeEach(() => {
    (useNYTArticles as jest.Mock).mockReturnValue({ articles: MOCK_ARTICLES });
  });

  // Test Cases:
  it('renders the header correctly', () => {
    render(<List />);
    expect(screen.getByText('NYT Most Popular')).toBeInTheDocument();
    expect(screen.getByText('Find the most popular articles on New York Times')).toBeInTheDocument();
  });

  it('renders ListItems for each article', () => {
    render(<List />);
    MOCK_ARTICLES.forEach(article => {
      expect(screen.getByTestId(`list-item-${article.id}`)).toBeInTheDocument();
      expect(screen.getByText(article.title)).toBeInTheDocument();
    });
  });

  it('renders the correct number of ListItems', () => {
    render(<List />);
    const listItems = screen.getAllByTestId(/^list-item-/);
    expect(listItems).toHaveLength(MOCK_ARTICLES.length);
  });

  it('renders no ListItems when there are no articles', () => {
    (useNYTArticles as jest.Mock).mockReturnValue({ articles: [] });
    render(<List />);
    const listItems = screen.queryAllByTestId(/^list-item-/);
    expect(listItems).toHaveLength(0);
  });
});

