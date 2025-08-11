import React, { forwardRef } from 'react';
import { Swiper } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { SwiperRef } from '@/types/swiper';
import { Swiper as SwiperType } from 'swiper';
import './Slider.scss';

type Props = Pick<
  React.ComponentProps<'div'>,
  'children' | 'className'
> & {
  slidesPerView?: number | 'auto';
  spaceBetween?: number;
  slidesPerGroup?: number;
  navigation?: boolean;
  pagination?: boolean;
  onSlideChange?: (swiper: SwiperType) => void;
  onSwiperInit?: (swiper: SwiperType) => void;
  key?: string | number;
  breakpoints?: Record<number, {
    slidesPerView?: number;
    spaceBetween?: number;
    centeredSlides?: boolean;
  }>;
  watchSlidesProgress?: boolean;
  watchOverflow?: boolean;
};

const Slider = forwardRef<SwiperRef, Props>(({
  children,
  slidesPerView,
  spaceBetween,
  slidesPerGroup,
  navigation,
  pagination,
  onSlideChange,
  onSwiperInit,
  className,
  key,
  breakpoints,
  watchSlidesProgress,
  watchOverflow,
}, ref) => {
  return (
    <div className={`slider ${className}`}>
      <Swiper
        ref={ref}
        key={`slider-${key}`}
        modules={[Navigation]}
        spaceBetween={spaceBetween || 0}
        slidesPerView={slidesPerView || 1}
        slidesPerGroup={slidesPerGroup || 1}
        navigation={navigation || false}
        pagination={pagination || false}
        onSlideChange={onSlideChange}
        onSwiper={onSwiperInit}
        className="slider__swiper"
        breakpoints={breakpoints}
        watchSlidesProgress={watchSlidesProgress}
        watchOverflow={watchOverflow}
      >
        {children}
      </Swiper>
    </div>
  );
});

Slider.displayName = 'Slider';

export default Slider;
