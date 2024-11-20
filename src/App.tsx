import "@/global.css";
import { Routes } from "./routes/index";
import { Providers } from "./providers";

function App() {
  return (
    <Providers>
      <Routes />
    </Providers>
  );
}

export default App;
