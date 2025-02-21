import { Divider } from "antd";
import React from "react";

const Container = ({
  title,
  children,
  all_radius_border = false,
  style = {
    background: "#fff",
    padding: 24,
    minHeight: 280,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
}) => {
  return (
    <div
      style={{
        ...style,
        ...(all_radius_border && {
          borderRadius: 10,
        }),
      }}
    >
      {title && (
        <>
          <span className="module-title">{title}</span>
          <Divider />
        </>
      )}
      {children}
    </div>
  );
};

export default Container;
