import { useState, useEffect } from 'react';
import NewsStudio from './components/NewsStudio';
import { LandingPage } from './components/LandingPage';

export default function App() {
  const [hasLaunched, setHasLaunched] = useState(false);
  const [isAutoStart, setIsAutoStart] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('obs') === 'true' || params.get('autoplay') === 'true') {
      setHasLaunched(true);
      setIsAutoStart(true);
    }
  }, []);

  if (!hasLaunched) {
    return <LandingPage onLaunch={() => setHasLaunched(true)} />;
  }

  return <NewsStudio autoStart={isAutoStart} />;
}
