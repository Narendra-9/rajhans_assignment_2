import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-loading-skeleton/dist/skeleton.css';
import { UserProvider } from "./contexts/UserContext.jsx";
import { BrowserRouter as Router } from "react-router-dom";


createRoot(document.getElementById("root")).render(
  <UserProvider>
    <Router>
      <App />
    </Router>
  </UserProvider>
);
