export default function NavBar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <a href="https://github.com/FabianSanter" className="hover:underline">
            About
          </a>
          <a href="/report-bug" className="hover:underline">
            Report Bug
          </a>
          <a
            href="https://github.com/FabianSanter/EasyView"
            className="hover:underline"
          >
            Documentation
          </a>
        </div>
        <div>Login</div>
      </div>
    </nav>
  );
}
