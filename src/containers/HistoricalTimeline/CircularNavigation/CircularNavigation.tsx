import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TimelinePeriod } from '@/types/timeline';
import { 
  CIRCLE_RADIUS,
  FULL_CIRCLE_DEGREES,
  HALF_CIRCLE_DEGREES,
  QUARTER_CIRCLE_DEGREES,
  ANIMATION_DURATION,
  MIN_ROTATION_DIFF,
  ANIMATION_START_PROGRESS,
  ANIMATION_END_PROGRESS,
  ANIMATION_PROGRESS_RANGE,
  YEAR_ANIMATION_STEPS,
  RADIANS_CONVERSION,
  CATEGORY_OFFSET_X,
  CATEGORY_OFFSET_Y,
  EASING
} from '@/constants/navigation';
import './CircularNavigation.scss';

type Props = Pick<
  React.ComponentProps<'div'>,
  'className'
> & {
  periods: TimelinePeriod[];
  activeIndex: number;
  onPeriodChange: (index: number) => void;
  startYear?: number;
  endYear?: number;
};

const CircularNavigation: React.FC<Props> = ({
  periods,
  activeIndex,
  onPeriodChange,
  startYear,
  endYear,
}) => {
  const radius = CIRCLE_RADIUS;
  
  const targetAngle = HALF_CIRCLE_DEGREES / periods.length;
  const activePointAngle = (activeIndex * FULL_CIRCLE_DEGREES) / periods.length;
  const targetRotation = targetAngle - activePointAngle;
  

  const [state, setState] = useState({
    currentRotation: targetRotation,
    displayStartYear: startYear,
    displayEndYear: endYear
  });

  const { currentRotation, displayStartYear, displayEndYear } = state;

  const updateState = (updates: Partial<typeof state>) => {
    setState(prev => ({ ...prev, ...updates }));
  };
  const yearsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let diff = targetRotation - currentRotation;
    
    while (diff > HALF_CIRCLE_DEGREES) {
      diff -= FULL_CIRCLE_DEGREES;
    }
    while (diff < -HALF_CIRCLE_DEGREES) {
      diff += FULL_CIRCLE_DEGREES;
    }
    
    const newRotation = currentRotation + diff;
    
    if (Math.abs(diff) > MIN_ROTATION_DIFF) {
      
      gsap.to({}, {
        duration: ANIMATION_DURATION,
        ease: EASING.CUBIC_BEZIER,
        onUpdate: function() {
          const progress = this.progress();
          const currentRot = currentRotation + (diff * progress);
          updateState({ currentRotation: currentRot });
          
          if (progress > ANIMATION_START_PROGRESS && progress < ANIMATION_END_PROGRESS && startYear && endYear) {
            const tickProgress = (progress - ANIMATION_START_PROGRESS) / ANIMATION_PROGRESS_RANGE;
            const steps = YEAR_ANIMATION_STEPS;
            const currentStep = Math.floor(tickProgress * steps);
            const stepProgress = (tickProgress * steps) % 1;
            

            const yearDiff = endYear - startYear;
            const stepSize = yearDiff / steps;
            

            const currentStartValue = startYear + (stepSize * currentStep);
            const nextStartValue = startYear + (stepSize * (currentStep + 1));
            

            const currentStart = Math.floor(currentStartValue + (nextStartValue - currentStartValue) * stepProgress);
            const currentEnd = Math.floor(currentStart + yearDiff);
            
            updateState({ 
              displayStartYear: currentStart,
              displayEndYear: currentEnd 
            });
          }
        },
        onComplete: function() {
          updateState({ 
            currentRotation: newRotation,
            displayStartYear: startYear,
            displayEndYear: endYear 
          });
        }
      });
    } else {
      updateState({ currentRotation: newRotation });
    }
  }, [activeIndex, targetRotation, startYear, endYear]);

  const calculatePosition = (index: number, total: number) => {
    const angle = (index * FULL_CIRCLE_DEGREES) / total - QUARTER_CIRCLE_DEGREES;
    const radians = angle * RADIANS_CONVERSION;
    
    return {
      x: radius * Math.cos(radians),
      y: radius * Math.sin(radians),
    };
  };


  const getCategoryPosition = () => {
    const position = calculatePosition(activeIndex, periods.length);
    const radians = currentRotation * RADIANS_CONVERSION;
    

    const rotatedX = position.x * Math.cos(radians) - position.y * Math.sin(radians);
    const rotatedY = position.x * Math.sin(radians) + position.y * Math.cos(radians);
    
    return {
      x: CIRCLE_RADIUS + rotatedX + CATEGORY_OFFSET_X,
      y: CIRCLE_RADIUS + rotatedY + CATEGORY_OFFSET_Y,
    };
  };

  const activePeriod = periods[activeIndex];
  const categoryPosition = getCategoryPosition();

  return (
    <div className="circular-navigation__wrapper">
      
      <div className="circular-navigation__circle"></div>
      
      {displayStartYear && displayEndYear && (
        <div className="circular-navigation__years" ref={yearsRef}>
          <span className="circular-navigation__year circular-navigation__year--start">
            {displayStartYear}
          </span>
          <span className="circular-navigation__year-separator">&nbsp;&nbsp;</span>
          <span className="circular-navigation__year circular-navigation__year--end">
            {displayEndYear}
          </span>
        </div>
      )}

      <div 
        className="circular-navigation__dots-container"
        style={{
          '--current-rotation': `${currentRotation}deg`,
        } as React.CSSProperties}
      >
        {periods.map((period, index) => {
          const position = calculatePosition(index, periods.length);
          const isActive = index === activeIndex;
          
          return (
            <div
              title={!isActive ? period.category : ''}
              key={period.id}
              className={`circular-navigation__dot ${
                isActive ? 'circular-navigation__dot--active' : ''
              }`}
              style={{
                '--dot-x': `${position.x}px`,
                '--dot-y': `${position.y}px`,
              } as React.CSSProperties}
              onClick={() => onPeriodChange(index)}
            >
              <span 
                className="circular-navigation__number-text"
                style={{
                  '--text-rotation': `${-currentRotation}deg`,
                } as React.CSSProperties}
              >
                {period.categoryNumber}
              </span>
            </div>
          );
        })}
      </div>

      <div 
        className="circular-navigation__category"
        style={{
          '--category-x': `${categoryPosition.x}px`,
          '--category-y': `${categoryPosition.y}px`,
        } as React.CSSProperties}
      >
        {activePeriod.category}
      </div>
    </div>
  );
};

export default CircularNavigation;
