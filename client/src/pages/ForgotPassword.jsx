import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { forgotPass } from "../backend/actions/forgotPass";

import Button from "../components/shared/Button";
import Input from "../components/shared/Input";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  // Mutate question
  const { mutate: useForgotPass, isPending } = useMutation({
    mutationFn: (formData) => forgotPass(formData),
    onSuccess: () => {
      navigate("/update");
      toast.success("Email Sent Successfully.", {
        position: "bottom-center",
      });
    },
    onError: (error) => {
      toast.error(error.message, {
        position: "bottom-center",
      });
    },
  });

  const onSubmitHandler = (formData) => {
    useForgotPass(formData);
  };

  return (
    <section className="my-20">
      <h1 className="my-3 text-center text-4xl uppercase tracking-wider">
        FORGOT PASSWORD
      </h1>
      <div className="flex flex-col items-center justify-center">
        <form
          className="flex flex-col"
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

          <Button type="submit">
            {isPending && <span className="loading loading-spinner"></span>}
            Send Email
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
