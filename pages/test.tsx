import React, { useState } from "react";

function MyComponent() {
  const [list, setList] = useState(["apple", "banana", "cherry"]);

  const handleSort = () => {
    const sortedList = [...list].sort((a, b) => a.localeCompare(b));
    setList(sortedList);
  };

  return (
    <div>
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={handleSort}>Sort</button>
    </div>
  );
}

export default MyComponent;
