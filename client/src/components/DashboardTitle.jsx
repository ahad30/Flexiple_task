"use client"
import { useEffect } from "react";

const DashboardTitle = ({ text, children, windowTitle }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = `${windowTitle ? windowTitle : "Cluster"} | Cluster`;
    }
  }, [windowTitle]);

  return (
     <div>
     <h2 className="text-xl font-Poppins">
        {text} {children}
      </h2>
     </div>

  );
};

export default DashboardTitle;
