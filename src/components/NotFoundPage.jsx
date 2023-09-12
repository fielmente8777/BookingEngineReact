import React from 'react';
import "../style/NotFound.css"
function NotFound(props) {
  // className="not-found-container"
  return (
    <div className={`${props.display}`} >
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}

export default NotFound;
