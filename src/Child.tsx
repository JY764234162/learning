import React, { memo, useEffect } from "react";
import { useCountStore } from "./state/count";

const Child = () => {
  const { count, loading } = useCountStore();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <span>Child</span>
      <span>{count}</span>
    </div>
  );
};
export default memo(Child);
