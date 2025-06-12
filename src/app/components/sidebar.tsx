



const Sidebar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-20 p-6 flex justify-between items-center">
    <div className="text-2xl font-bold text-cyan-400">Obeaj</div>
    <div className="flex space-x-6">
      {/* <a href="#home" className="text-gray-300 hover:text-cyan-400 transition-colors">Home</a>
      <a href="#about" className="text-gray-300 hover:text-cyan-400 transition-colors">About</a>
      <a href="#projects" className="text-gray-300 hover:text-cyan-400 transition-colors">Projects</a>
      <a href="#contact" className="text-gray-300 hover:text-cyan-400 transition-colors">Contact</a> */}
    </div>
    <button className="border border-cyan-400 text-cyan-400 px-4 py-2 rounded hover:bg-cyan-400 hover:text-black transition-colors">
      Contact
    </button>
  </nav>
  );
};

export default Sidebar;