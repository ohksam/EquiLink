const Home = () => {
    
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-10">
      <h1 className="text-4xl font-bold mb-4">Welcome to EquiLink</h1>
      <p className="text-gray-600 max-w-lg mb-8">
        EquiLink lets you simulate and visualize how an automated portfolio 
        rebalancing strategy could protect you during market volatility, 
        using real Chainlink price feeds.
        *add instructions here maybe*
      </p>
      <p className="text-gray-500">
        Use the sidebar to explore the <span className="font-medium">Dashboard</span> 
        or run a <span className="font-medium">Simulation</span>.
      </p>
    </div>
  );
}

export default Home;