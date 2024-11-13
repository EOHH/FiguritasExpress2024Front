import React from 'react';

const TopBar = ({ title }) => (
  <header className="top-bar">
    <h1>{title}</h1>
    <div className="user-info">
      <span>Admin</span>
    </div>
  </header>
);

export default TopBar;
