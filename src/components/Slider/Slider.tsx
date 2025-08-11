import React, { forwardRef } from 'react';
import { Swiper } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { SwiperRef } from '@/types/swiper';
import { Swiper as SwiperType } from 'swiper';
import './Slider.scss';

type Props = React.ComponentProps<typeof Swiper> & {
  children: React.ReactNode;
  className?: string;
  key?: string | number;
};

const Slider = forwardRef<SwiperRef, Props>((props, ref) => {
  const { children, className, key, ...swiperProps } = props;
  return (
    <div className={`slider ${className}`}>
      <Swiper
        ref={ref}
        key={`slider-${key}`}
        modules={[Navigation]}
        className="slider__swiper"
        {...swiperProps}
      >
        {children}
      </Swiper>
    </div>
  );
});

Slider.displayName = 'Slider';

export default Slider;
