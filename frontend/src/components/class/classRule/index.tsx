import React, { useState, useEffect } from "react";

const ClassRuleIndex = () => {
  // State to store the list of class rules
  const [classRules, setClassRules] = useState([]);

  useEffect(() => {
    const response = await classRuleIndex();
  }, []);

  return (
    <div>
      <h2>Class Rules</h2>
      <ul>
        {classRules.map((rule) => (
          <li
            key={rule.id}
          >{`Class ID: ${rule.class_id}, Allowed Days: ${rule.days_allowed}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default ClassRuleIndex;
