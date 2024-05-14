import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/shared/Input";
import UserContext from "../context/UserContext";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  // const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { setUserData } = useContext(UserContext);
  // const onSubmitHandler = (formData) => {
  //   console.log(formData);
  // };

  async function onSubmitHandler(formData) {
    // e.preventDefault();
    // setLoading(true);
    try {
      // const newUser = { email, password, confirmPassword, username };
      const { email, password } = formData;
      const loginRes = await axios.post(`http://localhost:3000/login`, {
        email,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      toast.success("Sucessfully Logged In");
      navigate("/dashboard");
    } catch (err) {
      // err.response.data.msg && setError(err.response.data.msg);
      console.log(err);
      toast.error(err.response.data.msg);
    }
  }

  return (
    <section>
      <div className="flex h-screen flex-col items-center justify-center border">
        <h1 className="my-3 text-center text-4xl uppercase tracking-wider">
          Welcome Back
        </h1>
        <form
          className="mt-5 flex  flex-col rounded-md bg-white p-20 "
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <Input
            name="email"
            type="email"
            placeholder="Email"
            className="rounded"
            {...register("email", {
              required: "Email is required",
              pattern: {
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
          <Input
            name="password"
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 0,
                message: "Password must be at least 8 characters",
              },
            })}
          />

          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
          <button className="formbold-btn">Submit</button>
          {/* <button className="btn">

            <span className="loading loading-spinner"></span>
            Submit
          </button> */}
          <p className="mt-4">
            Don’t have an account yet?
            <Link to="/register" className="ml-2  text-sky-300 underline">
              Sign up
            </Link>
          </p>
        </form>
        {/* <Link to="/forgot">
          <Button className="my-3">Forgot Password?</Button>
        </Link> */}
      </div>
    </section>
  );
};

export default Login;
