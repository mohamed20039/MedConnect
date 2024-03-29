import { ChangeEvent, FormEvent, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import {
  signUpFailed,
  signUpStart,
  signUpSuccess,
} from "../Redux/Features/authSlice";
import { useAppDispatch } from "../Redux/Hooks/reduxhooks";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const apiUrl = "api/users/";
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "patient",
  });
  const [error, SetError] = useState<string | null>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      dispatch(signUpStart());

      if (
        formData.email === "" ||
        formData.username === "" ||
        formData.password === ""
      ) {
        SetError("Please fill all the required fields");
        return;
      }

      const res = await fetch(`${apiUrl}?role=${formData.role}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signUpFailed(true));
        SetError(data.message);
        return;
      }
      dispatch(signUpFailed(false));

      dispatch(signUpSuccess(data.rest));
      SetError(null);

      setFormData({
        username: "",
        email: "",
        password: "",
        role: "patient",
      });
      navigate("/signin");
    } catch (error) {
      dispatch(signUpFailed(true));
      SetError("Something went wrong!");
    }
    // Reset form data if needed
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="p-24 max-w-2xl mx-auto">
      <h1 className="text-xl text-center">∆edConnect</h1>
      <div>
        <p className="font-semibold mt-10">Create your account</p>
        <form onSubmit={handleSubmit} className="mt-5 space-y-2 flex flex-col">
          <div className="flex flex-col space-y-1">
            <label htmlFor="username" className="text-xs">
              username <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="username"
              className="p-2 border rounded-lg"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="username" className="text-xs">
              email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email"
              className="p-2 border rounded-lg"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="role" className="text-xs">
              role <span className="text-red-600">*</span>
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="p-2 border rounded-lg"
            >
              <option value="patient">Patient</option>
              <option value="hospital">Hospital</option>
            </select>
          </div>
          <div className="flex flex-col space-y-1 relative">
            <label htmlFor="password" className="text-xs">
              password <span className="text-red-600">*</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="password"
              className="p-2 border rounded-lg"
            />
            <span
              className="absolute right-3 top-[29px] cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </span>
          </div>
          <button
            type="submit"
            className="bg-blue-500 p-2 text-white rounded-lg"
          >
            Register
          </button>
        </form>
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
      <p className="text-sm mt-2">
        Already have an account{" "}
        <Link to="/signin" className="text-blue-500">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
