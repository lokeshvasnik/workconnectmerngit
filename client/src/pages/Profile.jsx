import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UserContext from "../context/UserContext";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
  const [profile, setProfileData] = useState([]);
  const { userData } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const getUserJobsDetails = async () => {
      try {
        const userJobs = await axios.get(
          `http://localhost:3000/getUserProfile?user_id=${userData.user.id}`,
        );
        setProfileData(userJobs.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    getUserJobsDetails();
  }, [userData]);

  const onSubmitHandler = async (formData) => {
    try {
      const { username, number } = formData;
      await axios.put(
        `http://localhost:3000/updateUserProfile/${userData.user.id}`,
        {
          username,
          number,
        },
      );
      toast.success("Successfully Updated");
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  return (
    <>
      <div className="px-6 py-8">
        <div className="mb-10 rounded-xl bg-white p-6">
          {profile && profile.length > 0 && (
            <div className="flex items-center justify-start space-x-2">
              <img
                className="w-20"
                src="https://www.reshot.com/preview-assets/icons/9E63DBP5AS/smile-9E63DBP5AS.svg"
                alt=""
              />
              <div>
                <h2 className="text-2xl">Hi, {profile[0].username}</h2>
                <p>{profile[0].number}</p>
              </div>
            </div>
          )}
        </div>

        {/* Update Profile */}

        <h2 className="mb-4 text-2xl font-bold">Update Profile</h2>
        <div className="formbold-form-wrapper">
          <form onSubmit={handleSubmit(onSubmitHandler)} className="p-5">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="formbold-form-label" htmlFor="username">
                  Full Name
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Full Name"
                  className="formbold-form-input"
                  {...register("username", {
                    required: "Username is required",
                  })}
                />
                {errors.username && (
                  <p className="text-red-500">{errors.username.message}</p>
                )}
              </div>
              <div>
                <label className="formbold-form-label" htmlFor="number">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="number"
                  placeholder="000 000 0000"
                  className="formbold-form-input"
                  {...register("number", { required: "Number is required" })}
                />
                {errors.number && (
                  <p className="text-red-500">{errors.number.message}</p>
                )}
              </div>
            </div>
            <button className="formbold-btn my-4">Save Changes</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
