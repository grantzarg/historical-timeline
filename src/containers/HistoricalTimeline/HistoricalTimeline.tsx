import React from 'react';
import CircularNavigation from './CircularNavigation/CircularNavigation';
import EventsSlider from './EventsSlider/EventsSlider';
import { useTimeline } from '@/hooks/useTimeline';
import { TimelinePeriod } from '@/types/timeline';
import { ARROW_WIDTH, ARROW_HEIGHT, STROKE_WIDTH, VIEWBOX } from '@/constants/slider';
import './HistoricalTimeline.scss';

type Props = React.ComponentProps<'div'> & {
  periods: TimelinePeriod[];
};

const HistoricalTimeline: React.FC<Props> = (props) => {
  const { periods, ...restProps } = props;
  const {
    activePeriod,
    activePeriodIndex,
    activeSlideIndex,
    switchPeriod,
    nextSlide,
    prevSlide,
    goToSlide,
    nextPeriod,
    prevPeriod,
    currentPeriodNumber,
    totalPeriods,
  } = useTimeline({ periods });

  return (
    <div className="historical-timeline" {...restProps}>
      <div className="historical-timeline__header">
        <div className="historical-timeline__title">
          <div className="historical-timeline__title-line" />
          <h1 className="historical-timeline__title-text">
            Исторические даты
          </h1>
        </div>
      </div>

      <div className="historical-timeline__content">
        <div className="historical-timeline__period-navigation">
          <div className="historical-timeline__period-counter">
              {String(currentPeriodNumber).padStart(2, '0')}/{String(totalPeriods).padStart(2, '0')}
          </div>
          <div className='historical-timeline__period-navigation-buttons-wrapper'>
            <button
              className="historical-timeline__nav-btn historical-timeline__nav-btn--prev"
              onClick={prevPeriod}
              disabled={activePeriodIndex === 0}
              aria-label="Предыдущий период"
            >
              <svg width={ARROW_WIDTH} height={ARROW_HEIGHT} viewBox={VIEWBOX} fill="none">
                <path d="M7 1L2 6L7 11" stroke="currentColor" strokeWidth={STROKE_WIDTH}/>
              </svg>
            </button>
            
            <button
              className="historical-timeline__nav-btn historical-timeline__nav-btn--next"
              onClick={nextPeriod}
              disabled={activePeriodIndex === totalPeriods - 1}
              aria-label="Следующий период"
            >
              <svg width={ARROW_WIDTH} height={ARROW_HEIGHT} viewBox={VIEWBOX} fill="none">
                <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth={STROKE_WIDTH}/>
              </svg>
            </button>
          </div>
        </div>

        <CircularNavigation
          periods={periods}
          activeIndex={activePeriodIndex}
          onPeriodChange={switchPeriod}
          startYear={activePeriod.startYear}
          endYear={activePeriod.endYear}
        />

        <EventsSlider
          events={activePeriod.events}
          activeSlideIndex={activeSlideIndex}
          onSlideChange={goToSlide}
          onNextSlide={nextSlide}
          onPrevSlide={prevSlide}
        />
      </div>
    </div>
  );
};

export default HistoricalTimeline;
