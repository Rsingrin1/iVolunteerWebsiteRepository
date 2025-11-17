import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>

      {/* Link to About page */}
      <Link to="/about">Go to About Page</Link>
    </div>
  );
}
