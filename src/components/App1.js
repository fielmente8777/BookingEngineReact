import React, { useState } from 'react';

function App1() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDiv = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <h2>Button Example</h2>

      <button onClick={toggleDiv}>Open Div</button>

      {isOpen && (
        <div className="content">
          <h3>Hidden Content</h3>
          <p>This div is initially hidden and will be shown when the button is clicked.</p>
        </div>
      )}
    </div>
  );
}

export default App1;
