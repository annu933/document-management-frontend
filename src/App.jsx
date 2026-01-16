import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import { useAuth } from "./context/AuthContext";
import Upload from "./pages/Upload";
import DocumentList from "./pages/DocumentTable";
import AdminUser from "./pages/RegisterUser";
import Navbar from "./pages/Navbar";
import LaunchPage from "./pages/LaunchPage";

function App() {

  const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();
    console.log("token", token)
    return token ? children : <Navigate to="/login" replace />
  }
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LaunchPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/list"
          element={
            <ProtectedRoute>
              <DocumentList />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<AdminUser />} />
      </Routes>
    </>

  );
}

export default App;
