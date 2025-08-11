import React from 'react';
import { render, screen } from '@testing-library/react';
import Slider from './Slider';

jest.mock('swiper/react', () => ({
  Swiper: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="swiper" className={className}>
      {children}
    </div>
  ),
  SwiperSlide: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="swiper-slide">{children}</div>
  ),
}));

jest.mock('swiper/modules', () => ({
  Navigation: {},
}));

describe('Slider', () => {
  it('renders slider with children', () => {
    render(
      <Slider>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </Slider>
    );
    
    expect(screen.getByTestId('swiper')).toBeInTheDocument();
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
    expect(screen.getByText('Slide 2')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Slider className="custom-slider">Content</Slider>);
    const slider = screen.getByTestId('swiper').parentElement;
    expect(slider).toHaveClass('custom-slider');
  });

  it('renders with default props', () => {
    render(<Slider>Content</Slider>);
    const slider = screen.getByTestId('swiper');
    expect(slider).toBeInTheDocument();
  });
});
