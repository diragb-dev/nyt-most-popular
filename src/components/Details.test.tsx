// Packages:
import { render, screen } from '@testing-library/react';
import useNYTArticles from '../hooks/useNYTArticles';

// Components:
import Details from './Details';

// Mocks:
jest.mock('../hooks/useNYTArticles');

// Tests:
describe('Details', () => {
  // Test Cases:
  it('renders a message when no article is selected', () => {
    (useNYTArticles as jest.Mock).mockReturnValue({ focusedArticle: null });

    render(<Details />);
    
    expect(screen.getByText('Please select an article to view its details')).toBeInTheDocument();
  });

  it('renders article details when an article is selected', () => {
    const mockArticle = {
      title: 'Biden Tests Positive for Covid',
      byline: 'By Michael D. Shear',
      abstract: 'President Biden will “self-isolate and will continue to carry out all of his duties fully during that time,” a White House spokeswoman said.',
      url: 'https://www.nytimes.com/2024/07/17/us/politics/biden-covid-positive.html',
      media: [
        {
          'media-metadata': [
            null,
            null,
            { url: 'https://static01.nyt.com/images/2024/07/16/multimedia/00nat-vance-yale-lzht/00nat-vance-yale-lzht-mediumThreeByTwo440.jpg' }
          ]
        }
      ]
    };

    (useNYTArticles as jest.Mock).mockReturnValue({ focusedArticle: mockArticle });

    render(<Details />);
    
    expect(screen.getByText('Biden Tests Positive for Covid')).toBeInTheDocument();
    expect(screen.getByText('By Michael D. Shear')).toBeInTheDocument();
    expect(screen.getByText('President Biden will “self-isolate and will continue to carry out all of his duties fully during that time,” a White House spokeswoman said.')).toBeInTheDocument();
    
    const link = screen.getByText('Read more.');
    expect(link).toHaveAttribute('href', 'https://www.nytimes.com/2024/07/17/us/politics/biden-covid-positive.html');
    expect(link).toHaveAttribute('target', '_blank');

    const imageContainer = screen.getByRole('img', { name: '' });
    expect(imageContainer).toHaveStyle({
      backgroundImage: 'url(https://static01.nyt.com/images/2024/07/16/multimedia/00nat-vance-yale-lzht/00nat-vance-yale-lzht-mediumThreeByTwo440.jpg)'
    });
  });
});
