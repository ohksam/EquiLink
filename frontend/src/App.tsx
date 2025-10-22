import { BrowserRouter, Routes, Route } from "react-router";
import Sidebar from "./Sidebar";
import Home from "./Home";
import Simulation from "./Simulation";
import Dashboard from "./Dashboard";

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
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;