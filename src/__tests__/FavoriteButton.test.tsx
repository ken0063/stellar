import { render, screen, fireEvent } from '@testing-library/react';
import { FavoriteButton } from '../components/shared/FavoriteButton';

const mockItem = {
  type: 'apod',
  id: '2023-10-27',
  url: 'https://example.com/image.jpg',
  title: 'Test Space Image',
};

describe('FavoriteButton', () => {
  it('renders correctly', () => {
    render(
      <FavoriteButton item={mockItem} />
    );
    
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('toggles favorite state on click', () => {
    render(
      <FavoriteButton item={mockItem} />
    );
    
    const button = screen.getByRole('button');
    
    // Initially not favorited
    expect(button).not.toHaveClass('bg-red-500');
    
    // Click to favorite
    fireEvent.click(button);
    expect(button).toHaveClass('bg-red-500');
    
    // Click to unfavorite
    fireEvent.click(button);
    expect(button).not.toHaveClass('bg-red-500');
  });
});
