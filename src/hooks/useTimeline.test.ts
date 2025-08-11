import { renderHook, act } from '@testing-library/react';
import { useTimeline } from './useTimeline';

const mockPeriods = [
  {
    id: 1,
    category: 'Наука',
    categoryNumber: 1,
    startYear: 1900,
    endYear: 1950,
    events: [
      { id: 1, year: 1905, title: 'Событие 1', description: 'Событие 1' },
      { id: 2, year: 1910, title: 'Событие 2', description: 'Событие 2' },
    ],
  },
  {
    id: 2,
    category: 'Технологии',
    categoryNumber: 2,
    startYear: 1950,
    endYear: 2000,
    events: [
      { id: 3, year: 1960, title: 'Событие 3', description: 'Событие 3' },
    ],
  },
];

describe('useTimeline', () => {
  it('initializes with first period', () => {
    const { result } = renderHook(() => useTimeline({ periods: mockPeriods }));
    
    expect(result.current.activePeriodIndex).toBe(0);
    expect(result.current.activeSlideIndex).toBe(0);
    expect(result.current.activePeriod).toEqual(mockPeriods[0]);
    expect(result.current.totalPeriods).toBe(2);
    expect(result.current.currentPeriodNumber).toBe(1);
  });

  it('switches between periods', () => {
    const { result } = renderHook(() => useTimeline({ periods: mockPeriods }));
    
    act(() => {
      result.current.switchPeriod(1);
    });
    
    expect(result.current.activePeriodIndex).toBe(1);
    expect(result.current.activeSlideIndex).toBe(0);
    expect(result.current.activePeriod).toEqual(mockPeriods[1]);
    expect(result.current.currentPeriodNumber).toBe(2);
  });

  it('navigates between slides', () => {
    const { result } = renderHook(() => useTimeline({ periods: mockPeriods }));
    
    act(() => {
      result.current.nextSlide();
    });
    
    expect(result.current.activeSlideIndex).toBe(1);
    
    act(() => {
      result.current.prevSlide();
    });
    
    expect(result.current.activeSlideIndex).toBe(0);
  });

  it('goes to specific slide', () => {
    const { result } = renderHook(() => useTimeline({ periods: mockPeriods }));
    
    act(() => {
      result.current.goToSlide(1);
    });
    
    expect(result.current.activeSlideIndex).toBe(1);
  });

  it('navigates between periods', () => {
    const { result } = renderHook(() => useTimeline({ periods: mockPeriods }));
    
    act(() => {
      result.current.nextPeriod();
    });
    
    expect(result.current.activePeriodIndex).toBe(1);
    
    act(() => {
      result.current.prevPeriod();
    });
    
    expect(result.current.activePeriodIndex).toBe(0);
  });
});
