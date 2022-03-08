import React from "react";
import { useGlobalContext } from "../context";

const Stories = () => {
  const { isLoading } = useGlobalContext();

  if (isLoading) {
    return <div className="loading"></div>;
  }
  return (
    <div>
      <h1>stories component</h1>
    </div>
  );
};

export default Stories;
