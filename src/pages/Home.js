import { Link } from "react-router-dom";

function Home() {
  return (
      <div>
          <h1>Home</h1>
          <p>This is the home page of the React application that
          can connect to several serverless applications </p>

          <p>Navigate to <Link to="/info">Test</Link> to see which provider is currently connected.
          <Link to="/register">Register</Link> and/or <Link to="/login">Login</Link> in order to access the information
          behind the <Link to="/auth">Auth</Link> link. <Link to="/contact">About</Link> gives a short description of this project.</p>
      </div>
  );
}

export default Home;
