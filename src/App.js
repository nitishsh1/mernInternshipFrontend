import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Edit from "./pages/Edit/Edit";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import Header from "./components/Header/Header";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/user-profile/:id" element={<Profile />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
