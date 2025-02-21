//MemorizeTable is a Component used to memorize the table data and prevent rendering in each changes of state
//PS: It is useful in larger data size

import React, { useMemo } from "react";

const MemorizeTable = ({ dependencies = [], children }) => {
  const cache_table = useMemo(() => {
    return children;
  }, dependencies);

  return <>{cache_table}</>;
};

export default MemorizeTable;
