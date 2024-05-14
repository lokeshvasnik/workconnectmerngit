import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import UserContext from "../context/UserContext";

const CreateJobs = () => {
  const { userData } = useContext(UserContext);
  const [userJobData, setdata] = useState([]);
  const [jobId, setJobId] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setFiles] = useState("");

  console.log(userJobData);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const getUserJobsDetails = async () => {
      try {
        const userJobs = await axios.get(
          `http://localhost:3000/getUserJob?user_id=${userData?.user?.id}`,
        );
        setdata(userJobs.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getUserJobsDetails();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/delete/${id}`,
        {
          method: "DELETE",
        },
      );

      toast.success("Deleted Successfully.");
      if (!response.ok) {
        throw new Error("Failed to delete job");
      }
      // Filter out the deleted job from the state
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const editHandler = (id) => {
    console.log(id);
    setJobId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const onSubmitHandler = async (formData) => {
    const { title, description, location, number } = formData;
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    try {
      const response = await axios.put(
        `http://localhost:3000/update/${jobId}`,
        {
          title,
          description,
          location,
          number,
          user_id: userData.user.id,
          image,
        },
        config,
      );

      // Check if the request was successful
      if (response.status === 200) {
        toast.success("Changes Saved.");

        setdata((prevState) => {
          const updatedData = prevState.map((item) => {
            if (item._id === jobId) {
              return {
                ...item,
                ...formData,
              };
            }
            return item;
          });
          return updatedData;
        });
        closeModal();
      } else {
        throw new Error("Failed to update job");
      }
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("Failed to update job.");
    }
  };

  console.log(userJobData.length);
  return (
    <section className="px-6 py-8">
      <div>
        <h1 className="text-bold text-[34px] font-bold md:w-[752px]">
          Your Uploads
        </h1>
      </div>
      <div className="grid grid-cols-9 grid-rows-1 gap-12">
        {loading ? (
          <div className="col-span-12 flex items-center justify-center">
            <span className="loading loading-spinner loading-lg text-3xl text-warning"></span>
          </div>
        ) : (
          <>
            {userJobData.length === 0 ? (
              <div className="col-span-9 text-center text-2xl">
                No uploads yet.
              </div>
            ) : (
              userJobData?.map((item) => (
                <div className="col-span-3" key={item._id}>
                  <div className="mb-5 w-80 rounded-lg bg-white p-8">
                    <div>
                      <img
                        src={`http://localhost:3000/${item.image}`}
                        className="w-32 rounded-md"
                        alt=""
                      />
                      <div className="mt-4">
                        <p>{item.title}</p>
                        <p>
                          Location: {item.location} {item.pincode}
                        </p>
                        <p>{item.description}</p>
                      </div>
                      <div className="mt-4  flex items-center justify-between rounded-md bg-[#ffdd00c9] p-4 ">
                        <button
                          className="rounded-[7px] bg-white px-[24px] py-[7px] hover:bg-green-300"
                          onClick={() => editHandler(item._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="rounded-[7px] bg-white px-[24px] py-[7px] hover:bg-red-400"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="relative rounded-lg bg-white p-8">
              <div className="grid grid-cols-1 gap-4">
                {/* <button className="col-start-2" onClick={closeModal}>
                  Close
                </button> */}

                <form
                  className="rounded-xl"
                  onSubmit={handleSubmit(onSubmitHandler)}
                >
                  <div className="formbold-input-flex">
                    <div>
                      <label htmlFor="firstname" class="formbold-form-label">
                        Title{" "}
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Jane"
                        className="formbold-form-input"
                        {...register("title", {
                          required: "Title is required",
                        })}
                      />
                    </div>
                    <div>
                      <label htmlFor="location" className="formbold-form-label">
                        {" "}
                        Location{" "}
                      </label>
                      <input
                        type="text"
                        name="location"
                        id="location"
                        placeholder="Borvali"
                        className="formbold-form-input"
                        {...register("location", {
                          required: "Location is required",
                        })}
                      />
                    </div>
                  </div>

                  <div className="formbold-input-flex">
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
                        placeholder="(9766202976)"
                        class="formbold-form-input"
                        {...register("number", {
                          required: "Contact Number is required",
                        })}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="formbold-form-label"
                    >
                      {" "}
                      Description{" "}
                    </label>
                    <textarea
                      rows="6"
                      name="description"
                      id="description"
                      placeholder="Type your message"
                      className="formbold-form-input"
                      {...register("description", {
                        required: "Description is required",
                      })}
                    ></textarea>
                  </div>

                  <button
                    // type="submit"
                    className="formbold-btn"
                  >
                    Save Changes
                  </button>

                  <div className="modal-action">
                    {/* if there is a button in form, it will close the modal */}
                    <button onClick={closeModal} className="btn">
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CreateJobs;
