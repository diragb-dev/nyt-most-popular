// Packages:
import { render, screen, fireEvent } from '@testing-library/react';
import useNYTArticles from '../hooks/useNYTArticles';

// Constants:
import { MOCK_ARTICLES } from '../constants/tests';

// Components:
import ListItem from './ListItem';

// Mocks:
jest.mock('../hooks/useNYTArticles');

// Tests:
describe('ListItem', () => {
  const mockSetFocusedArticleID = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test Cases:
  it('renders article details correctly', () => {
    (useNYTArticles as jest.Mock).mockReturnValue({
      focusedArticleID: null,
      setFocusedArticleID: mockSetFocusedArticleID
    });

    render(<ListItem article={MOCK_ARTICLES[0]} />);

    expect(screen.getByText(MOCK_ARTICLES[0].title)).toBeInTheDocument();
    expect(screen.getByText(MOCK_ARTICLES[0].abstract)).toBeInTheDocument();

    const imageContainer = screen.getByRole('img', { name: '' });
    expect(imageContainer).toHaveStyle({
      backgroundImage: `url(${ MOCK_ARTICLES[0].media[0]['media-metadata'][1].url })`
    });
  });

  it('applies correct styling when article is not focused', () => {
    (useNYTArticles as jest.Mock).mockReturnValue({
      focusedArticleID: null,
      setFocusedArticleID: mockSetFocusedArticleID
    });

    render(<ListItem article={MOCK_ARTICLES[0]} />);

    const listItem = screen.getByRole('img', { name: '' }).parentElement;
    expect(listItem).toHaveClass('bg-white');
    expect(listItem).toHaveClass('hover:bg-zinc-200');
  });

  it('applies correct styling when article is focused', () => {
    (useNYTArticles as jest.Mock).mockReturnValue({
      focusedArticleID: 1,
      setFocusedArticleID: mockSetFocusedArticleID
    });

    render(<ListItem article={MOCK_ARTICLES[0]} />);

    const listItem = screen.getByRole('img', { name: '' }).parentElement;
    expect(listItem).toHaveClass('bg-zinc-300');
    expect(listItem).toHaveClass('hover:bg-zinc-300');
  });

  it('calls setFocusedArticleID with article id when clicked and not focused', () => {
    (useNYTArticles as jest.Mock).mockReturnValue({
      focusedArticleID: null,
      setFocusedArticleID: mockSetFocusedArticleID
    });

    render(<ListItem article={MOCK_ARTICLES[0]} />);

    fireEvent.click(screen.getByRole('img', { name: '' }).parentElement!);

    expect(mockSetFocusedArticleID).toHaveBeenCalledWith(1);
  });

  it('calls setFocusedArticleID with undefined when clicked and already focused', () => {
    (useNYTArticles as jest.Mock).mockReturnValue({
      focusedArticleID: 1,
      setFocusedArticleID: mockSetFocusedArticleID
    });

    render(<ListItem article={MOCK_ARTICLES[0]} />);

    fireEvent.click(screen.getByRole('img', { name: '' }).parentElement!);

    expect(mockSetFocusedArticleID).toHaveBeenCalledWith(undefined);
  });
});
