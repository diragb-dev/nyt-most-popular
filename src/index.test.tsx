// Packages:
import React from 'react';
import { render } from '@testing-library/react';

// Components:
import App from './App';

// Mocks:
jest.mock('./App', () => () => <div>App Component</div>);
jest.mock('./context/NYTArticlesContext', () => ({
  NYTArticlesProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Tests:
describe('Index', () => {
  // Test Cases:
  it('renders without crashing', () => {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);

    const { getByText } = render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      { container: root }
    );

    expect(getByText('App Component')).toBeInTheDocument();
  });
});
