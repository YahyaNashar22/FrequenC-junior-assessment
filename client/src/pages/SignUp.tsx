import React, { useState } from "react";
import type { IUserState } from "../interfaces/IUser";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/axios";

const SignUp = () => {
  const navigate = useNavigate();

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
      await api.post("/users/register", formData);
      alert("User registered successfully, please login!");
      navigate("/signin");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Registration Failed, Please Try Again Later"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h2>Sign up</h2>
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
          Sign Up
        </button>

        <p className="text-center mt-1 ">
          Already have an account ?<Link to="/signin">Sign in</Link>
        </p>
      </form>
      {error && <p className="error">{error}</p>}
    </main>
  );
};

export default SignUp;
