// Packages:
import { render, screen } from '@testing-library/react';
import useNYTArticles from './hooks/useNYTArticles';

// Components:
import App from './App';

// Mocks:
jest.mock('./hooks/useNYTArticles');
jest.mock('./components/List', () => () => <div data-testid='list-component'>List Component</div>);
jest.mock('./components/Details', () => () => <div data-testid='details-component'>Details Component</div>);

// Tests:
describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test Cases:
  it('renders List and Details components', () => {
    (useNYTArticles as jest.Mock).mockReturnValue({ isFetchingArticles: false });
    render(<App />);
    
    expect(screen.getByTestId('list-component')).toBeInTheDocument();
    expect(screen.getByTestId('details-component')).toBeInTheDocument();
  });

  it('applies correct classes when not fetching articles', () => {
    (useNYTArticles as jest.Mock).mockReturnValue({ isFetchingArticles: false });
    render(<App />);
    
    const mainDiv = screen.getByTestId('list-component').parentElement?.parentElement;
    expect(mainDiv).toHaveClass('select-auto');
    expect(mainDiv).toHaveClass('brightness-100');
  });

  it('applies correct classes when fetching articles', () => {
    (useNYTArticles as jest.Mock).mockReturnValue({ isFetchingArticles: true });
    render(<App />);
    
    const mainDiv = screen.getByTestId('list-component').parentElement?.parentElement;
    expect(mainDiv).toHaveClass('select-none');
    expect(mainDiv).toHaveClass('brightness-75');
  });

  it('renders List component with correct width', () => {
    (useNYTArticles as jest.Mock).mockReturnValue({ isFetchingArticles: false });
    render(<App />);
    
    const listDiv = screen.getByTestId('list-component').parentElement;
    expect(listDiv).toHaveClass('w-[25vw]');
  });

  it('renders Details component with correct width', () => {
    (useNYTArticles as jest.Mock).mockReturnValue({ isFetchingArticles: false });
    render(<App />);
    
    const detailsDiv = screen.getByTestId('details-component').parentElement;
    expect(detailsDiv).toHaveClass('w-[75vw]');
  });
});
