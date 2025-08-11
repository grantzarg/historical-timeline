import React from 'react';
import CircularNavigation from './CircularNavigation/CircularNavigation';
import EventsSlider from './EventsSlider/EventsSlider';
import { useTimeline } from '@/hooks/useTimeline';
import { TimelinePeriod } from '@/types/timeline';
import Button from '@/components/Button/Button';
import LeftArrow from '@/components/icons/LeftArrow';
import RightArrow from '@/components/icons/RightArrow';
import './HistoricalTimeline.scss';

type Props = React.ComponentProps<'div'> & {
  periods: TimelinePeriod[];
};

const HistoricalTimeline: React.FC<Props> = ({ 
  periods, 
  ...restProps 
}) => {
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
            <Button
              className="historical-timeline__nav-btn historical-timeline__nav-btn--prev"
              onClick={prevPeriod}
              disabled={activePeriodIndex === 0}
              aria-label="Предыдущий период"
              variant="nav"
              icon={<LeftArrow width={12} height={12} viewBox="0 0 12 12" strokeWidth={2} />}
            />
            
            <Button
              className="historical-timeline__nav-btn historical-timeline__nav-btn--next"
              onClick={nextPeriod}
              disabled={activePeriodIndex === totalPeriods - 1}
              aria-label="Следующий период"
              variant="nav"
              icon={<RightArrow width={12} height={12} viewBox="0 0 12 12" strokeWidth={2} />}
            />
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
