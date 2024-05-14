import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import UserContext from "../context/UserContext";
import { getLocation } from "../utils/location";

const CreateJob = () => {
  const [image, setFiles] = useState("");
  // const { user } = useUser();
  // const [images, setImages] = React.useState([]);
  const [pinCode, setPincode] = useState("");

  // const maxNumber = 69;
  const { userData } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  console.log(image);
  // FETCH ON MOUNT
  useEffect(() => {
    async function fetchLocation() {
      try {
        const { postcode } = await getLocation();
        setPincode(postcode);
      } catch (error) {
        console.error(error);
      }
    }

    fetchLocation();
  }, []);

  async function onSubmitHandler(formData) {
    console.log(formData);
    try {
      const { title, description, location, number } = formData;
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      await axios.post(
        `http://localhost:3000/upload`,
        {
          title,
          description,
          location,
          number,
          pincode: pinCode,
          user_id: userData.user.id,
          image,
          name: userData?.user?.username,
        },
        config,
      );

      toast.success("Sucessfully Added");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.msg);
    }
  }

  return (
    <section className="my-0">
      <div class="formbold-main-wrapper">
        <div class="formbold-form-wrapper m-3">
          <form
            className="rounded-xl p-10 md:p-20"
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            <div class="formbold-input-flex">
              <div>
                <label for="firstname" class="formbold-form-label">
                  Title{" "}
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Jane"
                  class="formbold-form-input"
                  {...register("title", {
                    required: "Title is required",
                  })}
                />
              </div>
              <div>
                <label for="location" class="formbold-form-label">
                  {" "}
                  Location{" "}
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  placeholder="Borvali"
                  class="formbold-form-input"
                  {...register("location", {
                    required: "Location is required",
                  })}
                />
              </div>
            </div>

            <div class="formbold-input-flex">
              {/* Upload Images */}
              <div>
                <label for="image" class="formbold-form-label">
                  Upload Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={(event) => {
                    setFiles(event.target.files[0]);
                  }}
                  className="my-1 w-full rounded border border-none file:cursor-pointer file:rounded file:border-none file:bg-slate-100 file:p-2"
                />
              </div>
              <div>
                <label for="number" class="formbold-form-label">
                  {" "}
                  Phone{" "}
                </label>
                <input
                  type="text"
                  name="number"
                  id="number"
                  placeholder="(00000000)"
                  class="formbold-form-input"
                  {...register("number", {
                    required: "Contact Number is required",
                  })}
                />
              </div>
            </div>

            <div>
              <label for="description" class="formbold-form-label">
                {" "}
                Description{" "}
              </label>
              <textarea
                rows="6"
                name="description"
                id="description"
                placeholder="Your Description"
                class="formbold-form-input"
                {...register("description", {
                  required: "Description is required",
                })}
              ></textarea>
            </div>

            <button class="formbold-btn">Upload</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateJob;
