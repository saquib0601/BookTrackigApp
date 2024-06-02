import { useState } from 'react';

const useViewMode = (initialMode = true) => {
  const [isGridView, setIsGridView] = useState(initialMode);

  const toggleViewMode = () => {
    setIsGridView((prevMode) => !prevMode);
  };

  return [isGridView, toggleViewMode];
};

export default useViewMode;