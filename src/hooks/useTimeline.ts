import { useState, useCallback } from 'react';
import { TimelinePeriod } from '@/types/timeline';

interface UseTimelineProps {
  periods: TimelinePeriod[];
}

export const useTimeline = ({ periods }: UseTimelineProps) => {
  const [state, setState] = useState({
    activePeriodIndex: 0,
    activeSlideIndex: 0
  });

  const { activePeriodIndex, activeSlideIndex } = state;

  const updateState = (newState: Partial<typeof state>) => {
    setState(prevState => ({ ...prevState, ...newState }));
  };

  const activePeriod = periods[activePeriodIndex];

  const switchPeriod = useCallback((index: number) => {
    updateState({ activePeriodIndex: index, activeSlideIndex: 0 });
  }, []);

  const nextSlide = useCallback(() => {
    if (activeSlideIndex < activePeriod.events.length - 1) {
      updateState({ activeSlideIndex: activeSlideIndex + 1 });
    }
  }, [activeSlideIndex, activePeriod.events.length]);

  const prevSlide = useCallback(() => {
    if (activeSlideIndex > 0) {
      updateState({ activeSlideIndex: activeSlideIndex - 1 });
    }
  }, [activeSlideIndex]);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < activePeriod.events.length) {
      updateState({ activeSlideIndex: index });
    }
  }, [activePeriod.events.length]);

  const nextPeriod = useCallback(() => {
    if (activePeriodIndex < periods.length - 1) {
      switchPeriod(activePeriodIndex + 1);
    }
  }, [activePeriodIndex, periods.length, switchPeriod]);

  const prevPeriod = useCallback(() => {
    if (activePeriodIndex > 0) {
      switchPeriod(activePeriodIndex - 1);
    }
  }, [activePeriodIndex, switchPeriod]);

  return {
    activePeriod,
    activePeriodIndex,
    activeSlideIndex,
    switchPeriod,
    nextSlide,
    prevSlide,
    goToSlide,
    nextPeriod,
    prevPeriod,
    currentPeriodNumber: activePeriodIndex + 1,
    totalPeriods: periods.length,
  };
};
