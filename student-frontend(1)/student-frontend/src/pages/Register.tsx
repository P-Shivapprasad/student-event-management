import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerStudent } from "../api/studentApi";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    rollNumber: "",
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await registerStudent(form);
    alert("Registered successfully!");
    navigate("/login");
  } catch (error: any) {
    alert(error.message); // 👈 REAL backend error will show
  }
};
  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl mb-4 font-bold">Register</h2>

        <input
          name="rollNumber"
          placeholder="Roll Number"
          onChange={handleChange}
          className="w-full p-2 border mb-2"
          required
        />
        <input
          name="name"
          placeholder="Name"
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

        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Register
        </button>

        <p className="mt-3 text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="text-green-500 underline">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
