import React, { useEffect } from 'react';

const ExitPopup = () => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const message = 'Are you sure you want to leave? Your changes may not be saved.';
      event.returnValue = message;
      return message;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className="exit-popup">
      <p>Are you sure you want to leave?</p>
      {/* Add your custom content, buttons, or actions */}
    </div>
  );
};

export default ExitPopup; 




