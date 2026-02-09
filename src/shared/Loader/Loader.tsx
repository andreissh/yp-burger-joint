import React from "react";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "calc(100vh - 89px)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      Загрузка...
    </div>
  );
};

export default Loader;
