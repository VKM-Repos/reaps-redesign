import "@/global.css";
import { Routes } from "./routes/index";
import { Providers } from './providers';
import { Worker } from '@react-pdf-viewer/core';


function App() {
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <Providers>
        <Routes />
      </Providers>
    </Worker>
  );
}

export default App;
