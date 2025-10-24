import { BrowserRouter, Routes, Route } from "react-router";
import { config } from "./config";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// components
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Simulation from "./components/Simulation";
import Dashboard from "./components/Dashboard";

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
          <Route path="/dashboard" element={<Dashboard />}></Route>
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
          <Layout />
        </BrowserRouter>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;