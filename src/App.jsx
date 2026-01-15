import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import { useAuth } from "./context/AuthContext";
import Upload from "./pages/Upload";

function App() {

  const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();
    console.log("token", token)
    return token ? children : <Navigate to="/login" replace />
  }
  return (
    <Routes>
      <Route path="/" element={<div>App Initialized</div>} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <Upload />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
