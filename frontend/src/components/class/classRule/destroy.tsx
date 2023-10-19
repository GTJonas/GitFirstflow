import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ClassRuleDestroy = () => {
  const { id } = useParams();
  const [classRule, setClassRule] = useState(null);

  useEffect(() => {
    // Fetch the class rule with the given ID from your API
    // Example: Axios.get(`/api/class-rules/${id}`).then(response => setClassRule(response.data));
  }, [id]);

  const handleDelete = () => {
    // Send a DELETE request to delete the class rule with the given ID
  };

  if (!classRule) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Delete Class Rule</h2>
      <p>{`Class ID: ${classRule.class_id}`}</p>
      <p>{`Allowed Days: ${classRule.days_allowed}`}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default ClassRuleDestroy;
