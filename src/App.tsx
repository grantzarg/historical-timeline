import React from 'react';
import { HistoricalTimeline } from './containers/HistoricalTimeline/HistoricalTimeline';
import { periods } from './data/config';
import './styles/global.scss';
import './App.scss';

const App: React.FC = () => {
  return (
    <div className="app">
      <HistoricalTimeline periods={periods} />
    </div>
  );
};

export default App;
