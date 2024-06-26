import React from "react";
import { createRoot } from "react-dom/client";
import ContentContainer from "./Components/ContentContainer/ContentContainer";



function App() {
  return (
      <ContentContainer />
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<App />);
