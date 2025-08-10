import { Swiper as SwiperType } from 'swiper';

export interface SwiperRef {
  swiper: SwiperType;
}

export interface SwiperEvent {
  activeIndex: number;
  realIndex: number;
  isBeginning: boolean;
  isEnd: boolean;
}
