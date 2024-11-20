
"use client";
import { createContext, useState } from 'react';

export const PartnerContext = createContext();

export const PartnerProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <PartnerContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </PartnerContext.Provider>
  );
};

