import { NavLink } from "react-router";

const Sidebar = () => {
  // helper function to style active links
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-6 py-3 font-semibold rounded-r-3xl transition-colors ${
      isActive
        ? "bg-teal-100 text-teal-900 shadow-md"
        : "text-gray-600 hover:bg-teal-50 hover:text-teal-800"
    }`;

  return (
    <aside className="bg-teal-50 border-r border-teal-200 min-h-screen w-64 flex flex-col justify-between shadow-xl">
      <div>
        {/* Logo / App name */}
        <div className="p-6 font-bold text-2xl text-teal-800 tracking-wide">
          <span className="inline-block align-middle mr-2">🧮</span>
          EquiLink
        </div>

        {/* Navigation */}
        <nav className="mt-8">
          <ul className="space-y-1">
            <li>
              <NavLink to="/" className={linkClasses}>
                <span className="inline-block mr-3">🏠</span>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/simulation" className={linkClasses}>
                <span className="inline-block mr-3">📊</span>
                Simulate Portfolio
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" className={linkClasses}>
                <span className="inline-block mr-3">📈</span>
                Dashboard
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      {/* Footer badges */}
      <div className="p-6 flex flex-col items-center space-y-2">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs font-semibold">
          Powered by Chainlink
        </span>
        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-xs font-semibold">
          Demo Build - Sepolia Feeds
        </span>
      </div>
    </aside>
  );
};

export default Sidebar;
