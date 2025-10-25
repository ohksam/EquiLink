import { BrowserRouter, Routes, Route } from "react-router";
import { config } from "./config";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PriceProvider from "./context/PriceContext";

// components
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Simulation from "./components/Simulation";
import Dashboard from "./components/Dashboard";
import About from "./components/About";

const queryClient = new QueryClient();

function Layout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-64 sticky top-0 h-screen bg-gray-100">
        <Sidebar />
      </aside>
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/market" element={<Dashboard />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <PriceProvider>
            <Layout />
          </PriceProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;