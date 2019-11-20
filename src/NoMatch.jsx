import React from "react";
import { useLocation } from "react-router-dom";

function NoMatch() {
  const { pathname } = useLocation();
  return (
    <h3>
      <span>No match for</span>
      <code>{pathname}</code>
    </h3>
  );
}

export default NoMatch;
