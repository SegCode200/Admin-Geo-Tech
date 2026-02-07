import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import useLoginStore from "../../store/useLoginStore"; // Zustand store (below)
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { login } from "../../global/authActions";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setIsloading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { email, password, setEmail, setPassword, validateForm, resetForm } =
    useLoginStore();
    const [showPassword, setShowPassword] = useState(false);
      const [showValidation, setShowValidation] = useState(false);
  const validationError = showValidation
    ? validateForm()
    : { isValid: true, error: null };
    
    const handleSubmit = async(e: React.FormEvent) => {
    setIsloading(true);
    e.preventDefault();
    setShowValidation(true);
    const validation = validateForm();
    if (!validation.isValid) {
      setIsloading(false);
      return;
    }
      try {
      await dispatch(login(email, password));
        Swal.fire({
         icon: "success",
          title: "Login Successful",
          text: "You have been logged in successfully.",
        }).then(()=>{
          setIsloading(false)
          navigate("/dashboard");
        })
    } catch (err: any) {
       Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: err || "An error occurred during login.",
        });
        setIsloading(false)
    }
    resetForm();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-white to-gray-100 px-4">
      <div className="bg-white rounded-xl shadow-card p-6 w-full max-w-sm sm:max-w-md">
        <h1 className="text-center text-2xl font-bold text-primary mb-2">GeTech</h1>
        <p className="text-center text-gray-600 mb-6">Login to your account</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border text-lg rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full text-lg border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          {!validationError?.isValid && validationError?.error && (
            <p className="mb-3 text-sm text-red-500">{validationError.error}</p>
          )}
          {/* Submit */}
          <button
            type="submit"
            className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition${
              loading ? "bg-opacity-40" : "bg-opacity-0"
            }`}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
