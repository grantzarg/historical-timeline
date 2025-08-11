import React, { useEffect, useRef, useState } from 'react';
import Slider from '@/components/Slider/Slider';
import { SwiperSlide } from 'swiper/react';
import { Event } from '@/types/timeline';
import { SwiperRef } from '@/types/swiper';
import { Swiper as SwiperType } from 'swiper';
import Button from '@/components/Button/Button';
import LeftArrow from '@/components/icons/LeftArrow';
import RightArrow from '@/components/icons/RightArrow';
import {
  INITIAL_PERIOD_KEY,
  PERIOD_KEY_INCREMENT,
  ANIMATION_START_DELAY,
  PERIOD_CHANGE_TIMEOUT,
  RESIZE_DELAY,
  SLIDE_ANIMATION_DELAY,
  DESKTOP_SPACE_BETWEEN,
  DESKTOP_SLIDES_PER_VIEW,
  SLIDES_PER_GROUP,
  MOBILE_BREAKPOINT,
  TABLET_BREAKPOINT,
  DESKTOP_BREAKPOINT,
  MOBILE_SLIDES_PER_VIEW,
  MOBILE_SPACE_BETWEEN,
  TABLET_SLIDES_PER_VIEW,
  TABLET_SPACE_BETWEEN,
  DESKTOP_SLIDES_PER_VIEW_LARGE,
  DESKTOP_SPACE_BETWEEN_LARGE,
} from '@/constants/slider';
import './EventsSlider.scss';

type State = {
  canSlidePrev: boolean;
  canSlideNext: boolean;
  animatingSlides: Set<number>;
  isChangingPeriod: boolean;
  periodKey: number;
};

type Props = {
  events: Event[];
  activeSlideIndex: number;
  onSlideChange: (index: number) => void;
  onNextSlide: () => void;
  onPrevSlide: () => void;
};

const DEFAULT_STATE: State = {
  canSlidePrev: false,
  canSlideNext: false,
  animatingSlides: new Set(),
  isChangingPeriod: false,
  periodKey: INITIAL_PERIOD_KEY
};

const EventsSlider: React.FC<Props> = ({ 
  events, 
  activeSlideIndex, 
  onSlideChange, 
  onNextSlide, 
  onPrevSlide 
}) => {
  const swiperRef = useRef<SwiperRef>(null);
  const [state, setState] = useState<State>(DEFAULT_STATE);

  const { canSlidePrev, canSlideNext, animatingSlides, isChangingPeriod, periodKey } = state;

  const updateState = (newState: Partial<State>) => {
    setState(prevState => ({ ...prevState, ...newState }));
  };

  useEffect(() => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slideTo(activeSlideIndex);
    }
  }, [activeSlideIndex]);

  useEffect(() => {
    updateState({ 
      periodKey: periodKey + PERIOD_KEY_INCREMENT,
      isChangingPeriod: true 
    });
    
    if (swiperRef.current?.swiper) {
      updateNavigationState(swiperRef.current.swiper);
    }
    
    updateState({ animatingSlides: new Set() });
    
    const timer = setTimeout(() => {
      startSlideAnimation();
    }, ANIMATION_START_DELAY);
    
    const changeTimer = setTimeout(() => {
      updateState({ isChangingPeriod: false });
    }, PERIOD_CHANGE_TIMEOUT);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(changeTimer);
    };
  }, [events]);

  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;
    
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (swiperRef.current?.swiper) {
          updateNavigationState(swiperRef.current.swiper);
        }
      }, RESIZE_DELAY);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  const handleSlideChange = (swiper: SwiperType) => {
    onSlideChange(swiper.activeIndex);
    updateNavigationState(swiper);
  };

  const updateNavigationState = (swiper: SwiperType) => {
    updateState({ 
      canSlidePrev: !swiper.isBeginning,
      canSlideNext: !swiper.isEnd 
    });
  };

  const handleSwiperInit = (swiper: SwiperType) => {
    updateNavigationState(swiper);
    startSlideAnimation();
  };

  const startSlideAnimation = () => {
    updateState({ animatingSlides: new Set() });
    
    events.forEach((_, index) => {
      setTimeout(() => {
        setState(prev => ({ 
          ...prev,
          animatingSlides: new Set([...prev.animatingSlides, index]) 
        }));
      }, index * SLIDE_ANIMATION_DELAY);
    });
  };

  return (
    <div className={`events-slider ${isChangingPeriod ? 'events-slider--changing' : ''}`}>
      <div className="events-slider__content">
                {([
                  [
                    canSlidePrev,
                    onPrevSlide,
                    'Предыдущий слайд',
                    'events-slider__nav-btn--prev',
                    LeftArrow
                  ] as const,
                  [
                    canSlideNext,
                    onNextSlide,
                    'Следующий слайд',
                    'events-slider__nav-btn--next',
                    RightArrow
                  ] as const
                ] as const).map(([canShow, onClick, ariaLabel, className, Icon]) => 
                  canShow && (
                    <Button
                      key={ariaLabel}
                      className={`events-slider__nav-btn ${className}`}
                      onClick={onClick}
                      aria-label={ariaLabel}
                      variant="nav"
                      icon={<Icon />}
                    />
                  )
                )}
        <Slider
          ref={swiperRef}
          key={`period-${periodKey}`}
          spaceBetween={DESKTOP_SPACE_BETWEEN}
          slidesPerView={DESKTOP_SLIDES_PER_VIEW}
          slidesPerGroup={SLIDES_PER_GROUP}
          onSwiper={handleSwiperInit}
          onSlideChange={handleSlideChange}
          className="events-slider__swiper"
          watchSlidesProgress={true}
          watchOverflow={true}
          breakpoints={{
            [MOBILE_BREAKPOINT]: {
              slidesPerView: MOBILE_SLIDES_PER_VIEW,
              spaceBetween: MOBILE_SPACE_BETWEEN,
              centeredSlides: false,
            },
            [TABLET_BREAKPOINT]: {
              slidesPerView: TABLET_SLIDES_PER_VIEW,
              spaceBetween: TABLET_SPACE_BETWEEN,
              centeredSlides: false,
            },
            [DESKTOP_BREAKPOINT]: {
              slidesPerView: DESKTOP_SLIDES_PER_VIEW_LARGE,
              spaceBetween: DESKTOP_SPACE_BETWEEN_LARGE,
              centeredSlides: false,
            },
          }}
        >
          {events.map((event, index) => (
            <SwiperSlide 
              key={`${periodKey}-${event.id}`} 
              className={`events-slider__slide ${
                animatingSlides.has(index) ? 'events-slider__slide--animate-in' : ''
              }`}
            >
              <div className="event-card">
                <div className="event-card__year">{event.year}</div>
                <div className="event-card__description">{event.description}</div>
              </div>
            </SwiperSlide>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default EventsSlider;
