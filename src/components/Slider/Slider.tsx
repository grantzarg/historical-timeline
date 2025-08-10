import React, { forwardRef } from 'react';
import { Swiper } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { SwiperRef } from '@/types/swiper';
import { Swiper as SwiperType } from 'swiper';
import './Slider.scss';

interface SliderProps {
  children: React.ReactNode;
  slidesPerView?: number | 'auto';
  spaceBetween?: number;
  slidesPerGroup?: number;
  navigation?: boolean;
  pagination?: boolean;
  onSlideChange?: (swiper: SwiperType) => void;
  onSwiperInit?: (swiper: SwiperType) => void;
  className?: string;
  key?: string | number;
  breakpoints?: Record<number, {
    slidesPerView?: number;
    spaceBetween?: number;
    centeredSlides?: boolean;
  }>;
  watchSlidesProgress?: boolean;
  watchOverflow?: boolean;
}

export const Slider = forwardRef<SwiperRef, SliderProps>(({
  children,
  slidesPerView = 1,
  spaceBetween = 0,
  slidesPerGroup = 1,
  navigation = false,
  pagination = false,
  onSlideChange,
  onSwiperInit,
  className = '',
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
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        slidesPerGroup={slidesPerGroup}
        navigation={navigation}
        pagination={pagination}
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
