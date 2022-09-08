import logo from "./logo.svg";
import "./styles/App.scss";
import LoginForm from "./components/User/LoginForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/login" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
