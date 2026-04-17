import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginStudent } from "../api/studentApi";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    rollNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginStudent({ email: form.email, password: form.password });
      // Backend returns { token }
      localStorage.setItem("token", data.token);
      localStorage.setItem("rollNumber", form.rollNumber);
      navigate("/events");
    } catch {
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white p-6 rounded shadow w-96" onSubmit={handleSubmit}>
        <h2 className="text-xl mb-4 font-bold">Login</h2>

        <input
          name="rollNumber"
          placeholder="Roll Number"
          onChange={handleChange}
          className="w-full p-2 border mb-2"
          required
        />
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-2 border mb-2"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-2 border mb-2"
          required
        />

        <button type="submit" className="bg-green-500 text-white p-2 w-full">
          Login
        </button>

        <p className="mt-3 text-sm text-center">
          Don't have an account?{" "}
          <a href="/" className="text-blue-500 underline">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
