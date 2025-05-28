import React, { useState } from "react";
import type { IUserState } from "../interfaces/IUser";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { useAuthStore } from "../store/authStore";

const Signin = () => {
  const navigate = useNavigate();
  const { setToken } = useAuthStore();

  const [formData, setFormData] = useState<IUserState>({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/users/login", formData);
      setToken(res.data.access_token);
      navigate("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      setError(
        error.response?.data?.message || "Login Failed, Please Try Again Later"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h2>Sign in</h2>
      <form onSubmit={handleSubmit}>
        <label>
          username
          <input
            type="text"
            placeholder="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          password
          <input
            type="password"
            placeholder="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        <button disabled={loading} type="submit" className="mt-2 success">
          Sign In
        </button>

        <p className="text-center mt-1">
          Don't have an account ?<Link to="/signup">Sign up</Link>
        </p>
      </form>
      {error && <p className="error">{error}</p>}
    </main>
  );
};

export default Signin;
