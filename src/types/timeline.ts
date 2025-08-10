export interface Event {
  id: number;
  year: number;
  title: string;
  description: string;
}

export interface TimelinePeriod {
  id: number;
  category: string;
  categoryNumber: number;
  startYear: number;
  endYear: number;
  events: Event[];
}


