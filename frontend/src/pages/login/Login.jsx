import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import InputCard from "../../components/sidebar/InputBox";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto gap-4">
      <div className="text-center">
        <h1 className="font-bold text-3xl">
          Login{" "}
          <span className="font-extrabold text-transparent text-3xl sm:text-4xl xl:text-5xl bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
            HeyYo
          </span>
        </h1>
      </div>

      <div className="card w-80 bg-base-200 py-3">
        <div className="card-body gap-3">
          <InputCard
            type="text"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            inputColor="secondary"
            onChange={handleChange}
          />

          <div className="relative">
            <InputCard
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              inputColor="secondary"
              onChange={handleChange}
            />
            <span
              className="absolute right-3 top-2.5 cursor-pointer text-gray-500 z-1"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <p>
            Don't have account?{" "}
            <span className="font-bold text-yellow-500 cursor-pointer">
              Signup
            </span>
          </p>
          <button className="btn btn-secondary">Let's Go !!</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
