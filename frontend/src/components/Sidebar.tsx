import { NavLink } from "react-router";
import SidebarConverter from "./SidebarConverter";

const Sidebar = () => {
  // helper function to style active links
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-6 py-3 font-semibold rounded-r-3xl transition-colors ${isActive
      ? "bg-teal-200 text-teal-900 shadow-md"
      : "text-gray-600 hover:bg-teal-100 hover:text-teal-800"
    }`;

  return (
    <aside className="bg-teal-50 border-r border-teal-200 min-h-screen w-64 flex flex-col justify-between shadow-xl">
      {/* TOP: Logo and navigation */}
      <div>
        {/* Logo / App name */}
        <div className="p-6 font-bold text-2xl text-teal-800 tracking-wide">
          <span className="inline-block align-middle mr-2">🧮</span>
          EquiLink
        </div>
        {/* Navigation */}
        <nav className="mt-2">
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
              <NavLink to="/market" className={linkClasses}>
                <span className="inline-block mr-3">📈</span>
                Market
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={linkClasses}>
                <span className="inline-block mr-3">ℹ️</span>
                About
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      {/* BOTTOM: Converter, badges, and GitHub link */}
      <div className="flex flex-col items-center gap-0 w-full px-2 mb-0">
        <SidebarConverter />

        <div className="p-6 flex flex-col items-center space-y-2 w-full">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs font-semibold">
            Powered by Chainlink
          </span>
          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-xs font-semibold">
            Demo Build - Sepolia Feeds
          </span>

          <a
            href="https://github.com/ohksam/EquiLink"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-500 text-xs mt-2 hover:text-gray-800 transition"
          >
            <img src="../../github-mark.svg" alt="GitHub" className="w-6 h-6 opacity-80" />
            {/* <span>View Source</span> */}
          </a>
        </div>
      </div>
    </aside >
  );

};

export default Sidebar;
