import { Link } from "react-router-dom";

export default function About() {
  return (
    <div>
      <h1>About Page</h1>
      <p>This is the About page of the application.</p>

      {/* Link back to Home page */}
      <Link to="/">Back to Home</Link>
    </div>
  );
}
