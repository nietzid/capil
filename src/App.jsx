import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import { AuthProvider } from "./utils/AuthContext";
import CommonLayout from "./components/CommonLayout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Warga from "./pages/Warga.jsx";
import RT from "./pages/RT.jsx";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/warga" element={<Warga />} />
            {/*<Route path="/profile" element={<Profile />} />*/}
            <Route path="/rt" element={<RT />} /> 
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
