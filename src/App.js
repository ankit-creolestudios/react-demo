import logo from "./logo.svg";
import "./styles/App.scss";
import LoginForm from "./components/User/LoginForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/user/login" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
