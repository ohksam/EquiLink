const Sidebar = () => {
  
  return (
    <aside className="bg-teal-50 border-r border-teal-200 min-h-screen w-64 flex flex-col justify-between shadow-xl">
      <div>
        <div className="p-6 font-bold text-2xl text-teal-800 tracking-wide">
          {/* App logo/name */}
          <span className="inline-block align-middle mr-2">🧮</span>
          EquiLink
        </div>
        <nav className="mt-8">
          <ul>
            <li>
              <span className="flex items-center px-6 py-3 text-teal-900 font-semibold bg-teal-100 rounded-r-3xl shadow-md">
                {/* Placeholder icon, maybe Heroicon later?*/}
                <span className="inline-block mr-3">📊</span>
                Simulate Portfolio
              </span>
            </li>
            {/* <li className="px-6 py-3 text-gray-400">TEMP 1</li>
            <li className="px-6 py-3 text-gray-400">TEMP 2</li> */}
          </ul>
        </nav>
      </div>
      <div className="p-6 flex flex-col items-center space-y-2">
        {/* Get Chainlink's badge/logo */}
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs font-semibold">Powered by Chainlink</span>
        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-xs font-semibold">Demo Build - Sepolia Feeds</span>
        {/* <span className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-lg text-xs">Testnet Only</span> */}
      </div>
    </aside>
  );
};

export default Sidebar;
