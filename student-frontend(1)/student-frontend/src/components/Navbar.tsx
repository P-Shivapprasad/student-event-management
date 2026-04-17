import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="font-bold">Student Event System</h1>
      <div className="space-x-4">
        <Link to="/">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/events">Events</Link>
      </div>
    </nav>
  );
};

export default Navbar;