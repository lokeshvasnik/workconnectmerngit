<div className="flex items-center justify-center">
  <form
    className="flex flex-col items-center justify-center rounded-[24px] bg-white px-40 py-10 text-black"
    onSubmit={handleSubmit(onSubmitHandler)}
  >
    <div className="-mx-3 md:flex md:flex-col md:flex-wrap">
      <div className="mb-6 w-80 px-3 md:mb-0 md:w-full">
        {/* <label
        className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
        for="grid-first-name"
      >
        First Name
      </label> */}
        <Input
          name="title"
          type="text"
          className="mb-3 block w-full appearance-none rounded border  px-4 py-3 leading-tight"
          placeholder="Title"
          {...register("title", {
            required: "Title is required",
          })}
        />
        {/* <p className="text-xs italic text-red-500">testing.</p> */}
      </div>

      <div className="w-80 px-3 md:w-full">
        <textarea
          placeholder="description"
          className="textarea textarea-bordered textarea-lg w-full max-w-xs"
          {...register("description", {
            required: "Description is required",
          })}
        ></textarea>
      </div>
    </div>
    <div className="-mx-3 md:flex md:flex-wrap">
      <div className="mb-6 w-80 px-3 md:mb-0 md:w-1/2">
        <Input
          name="number"
          type="number"
          className="mb-3 block w-full appearance-none rounded border  px-4 py-3 leading-tight"
          placeholder="Contact Number"
          {...register("number", {
            required: "Contact Number is required",
          })}
        />
      </div>

      <div className="w-80 px-3 md:w-1/2">
        <Input
          name="location"
          type="text"
          className="mb-3 block w-full appearance-none rounded border  px-4 py-3 leading-tight"
          placeholder="Location"
          {...register("location", {
            required: "Location is required",
          })}
        />
      </div>
    </div>
    {/* <div className="-mx-3 md:flex md:flex-wrap">
    <div className="w-80 px-3 md:w-full">
      <Input
        name="days"
        type="number"
        className="mb-3 block w-full appearance-none rounded border  px-4 py-3 leading-tight"
        placeholder="Days to delete"
        {...register("days", {
          required: "required",
        })}
      />
    </div>
  </div> */}
    <Button type="submit" className="w-full">
      {isPending ? <span className="loading loading-spinner"></span> : ""}
      Submit
    </Button>
  </form>
</div>;

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { createJob } from "../backend/actions/job";
import { useUser } from "../backend/hooks/useUser";

import Button from "../components/shared/Button";
import Input from "../components/shared/Input";
import { useState } from "react";

const CreateJob = () => {
  const [image, setFiles] = useState([]);
  const { user } = useUser();

  const createdBy = `${user.user_metadata.first_name} ${user.user_metadata.last_name}`;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //*  Mutate function ? CREATE JOB API REQUEST
  const { mutate, isPending } = useMutation({
    mutationFn: (formData) => createJob(formData),
    onSuccess: () => {
      toast.success("Job Created Successfully!");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const onSubmitHandler = async (formData) => {
    console.log(formData);
    mutate({ ...formData, image, person: createdBy, user_id: user.id });
    // reset();
  };

  return (
    <section className="my-0">
      <div class="formbold-main-wrapper">
        <div class="formbold-form-wrapper">
          <form className="p-20" onSubmit={handleSubmit(onSubmitHandler)}>
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
              <div>
                <label for="email" class="formbold-form-label">
                  {" "}
                  Mail{" "}
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="jhon@mail.com"
                  class="formbold-form-input"
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
              <label for="description" class="formbold-form-label">
                {" "}
                Description{" "}
              </label>
              <textarea
                rows="6"
                name="description"
                id="description"
                placeholder="Type your message"
                class="formbold-form-input"
                {...register("description", {
                  required: "Description is required",
                })}
              ></textarea>
            </div>
            <div>
              <label for="image" class="formbold-form-label">
                {" "}
                Upload Images{" "}
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("image", {
                  required: true,
                })}
                onChange={(event) => {
                  setFiles(event.target.files);
                }}
                className="my-4 w-full rounded border border-none file:cursor-pointer file:rounded file:border-none file:bg-slate-100 file:p-2"
              />
            </div>

            <button class="formbold-btn">Upload</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateJob;

// Search bar

{
  /* Search Bar */
}
{
  /* <div className="my-5 flex flex-col items-center justify-center space-x-4 space-y-3  px-5 md:flex-row md:space-y-0">
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <Search />
            <input
              type="text"
              className="custom-input grow border-0"
              placeholder="Search By Name & Location"
              onChange={(e) => setInput(e.target.value)}
            />
          </label>
        </div>
      </div> */
}
{
  /* Cards */
}
{
  /* <div className="flex flex-col items-center justify-center">
        {isLoading ? (
          <Loader />
        ) : (
          (() => {
            //* SEARCH ON TYPE
            const lowerCaseSearch = search.toLowerCase();
            const filteredJobs = jobs?.filter(
              (item) =>
                lowerCaseSearch === "" ||
                item.title.toLowerCase().includes(lowerCaseSearch) ||
                item.description.toLowerCase().includes(lowerCaseSearch) ||
                item.location.toLowerCase().includes(lowerCaseSearch),
            );

            //* SORTING BY LOCATION
            const sortedJobs = sortedByLocation
              ? filteredJobs?.sort((a, b) =>
                  a.location === location
                    ? -1
                    : b.location === location
                      ? 1
                      : 0,
                )
              : filteredJobs;

            return sortedJobs?.length > 0 ? (
              sortedJobs.map((singleJob) => (
                <Card
                  key={singleJob.id}
                  title={singleJob.title}
                  description={singleJob.description}
                  number={singleJob.number}
                  location={singleJob.location}
                  person={singleJob.person}
                />
              ))
            ) : search !== "" && sortedByLocation ? (
              <p className="text-4xl">{` No Jobs Found :)`}</p>
            ) : (
              <p className="text-4xl">{` No Jobs Found :)`}</p>
            );
          })()
        )}
      </div> */
}

// The category and search bar

{
  /* <div className="flex flex-col items-center justify-center space-x-4 space-y-1  px-5 md:flex-row md:space-y-0">
          <div>
            <label className="input input-bordered flex items-center gap-2">
              <Search />
              <input type="text" placeholder="Type here" />
            </label>
          </div>
        </div> */
}
{
  /* <div className="my-6 flex space-x-3 py-4">
          <button className="w-44 rounded-[7px] bg-white px-[24px] py-[7px]">
            All Services
          </button>
          <button className="w-44 rounded-[7px] bg-white px-[24px] py-[7px]">
            Car Washer
          </button>
          <button className="w-44 rounded-[7px] bg-white px-[24px] py-[7px]">
            Chef
          </button>
          <button className="w-44 rounded-[7px] bg-white px-[24px] py-[7px]">
            Cook
          </button>
          <button className="w-44 rounded-[7px] bg-white px-[24px] py-[7px]">
            Tutor
          </button>
          <button className="min-w-44 rounded-[7px] bg-white px-[24px] py-[7px]">
            Personal Trainer
          </button>
          <button className="w-44 rounded-[7px] bg-[#FFDD00] px-[24px] py-[7px]">
            Wall Painter
          </button>
        </div> */
}



// main modal form uploadJobs data

import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UserContext from "../context/UserContext";
import axios from "axios";
import toast from "react-hot-toast";

const CreateJobs = () => {
  const { userData } = useContext(UserContext);
  // const [images, setImages] = React.useState([]);
  const [userJobData, setdata] = useState([]);
  const [image, setFiles] = useState([]);
  const [jobId, setJobId] = useState("");
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
        setdata(userJobs);
      } catch (error) {
        console.log(error);
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
    document.getElementById("my_modal_5").showModal();
  };
  // const { mutate, isPending } = useMutation({
  //   mutationFn: (formData) => deleteJob(formData),
  //   onSuccess: () => {
  //     toast.success("Deleted Successfully!");
  //   },
  //   onError: () => {
  //     toast.error("Something went wrong!");
  //   },
  // });

  // //*  Mutate function ? CREATE JOB API REQUEST
  // const { mutate: updateJobMutate } = useMutation({
  //   mutationFn: (formData) => updateJob(formData),
  //   onSuccess: () => {
  //     toast.success("Job Created Successfully!");
  //   },
  //   onError: () => {
  //     toast.error("Something went wrong!");
  //   },
  // });

  // const onSubmitHandler = async (formData) => {
  //   console.log(formData);
  //   try {
  //     const response = await axios.put(
  //       `http://localhost:3000/update/${jobId}`,
  //       formData,
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to delete job");
  //     }

  //     toast.success("Changes Saved.");
  //     // Filter out the deleted job from the state
  //   } catch (error) {
  //     console.error("Error deleting job:", error);
  //   }
  //   // console.log(formData);
  //   // console.log("Update");
  //   // updateJobMutate({
  //   //   ...formData,
  //   //   image: image[0],
  //   //   person: createdBy,
  //   //   user_id: user.id,
  //   // });
  //   // // reset();
  // };

  const onSubmitHandler = async (formData) => {
    console.log(formData);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/update/${jobId}`,
        formData,
      );

      // Check if the request was successful
      if (response.status === 200) {
        toast.success("Changes Saved.");

        // Update the userJobData state with the updated job
        setdata((prevState) => {
          const updatedData = prevState.data.map((item) => {
            if (item._id === jobId) {
              return {
                ...item,
                ...formData, // Update only the fields that were changed
              };
            }
            return item;
          });
          return { ...prevState, data: updatedData };
        });
      } else {
        throw new Error("Failed to update job");
      }
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("Failed to update job.");
    }
  };

  return (
    <section className="px-6 py-8">
      <div>
        <h1 className="text-bold text-[34px] font-bold md:w-[752px]">
          Your Uploads
        </h1>
      </div>
      <div className="grid grid-cols-9 grid-rows-1 gap-12">
        {userJobData.length === 0 ? (
          <div className="col-span-9 text-center text-2xl">No uploads yet.</div>
        ) : (
          userJobData?.data?.map((item) => (
            <div className="col-span-3" key={item._id}>
              <div className="mb-5 w-80 rounded-lg bg-white p-8">
                <div>
                  <div>
                    <img src={item.image} className="w-16 rounded-md" alt="" />
                  </div>
                  <div className="mt-4">
                    <p>{item.title}</p>
                    <p>Location: Vasai</p>
                    <p>{item.description}</p>
                  </div>
                  <div className="mt-4  flex items-center justify-between rounded-md bg-[#ffdd00c9] p-4 ">
                    <button
                      className="rounded-[7px] bg-white px-[24px] py-[7px] hover:bg-green-300"
                      onClick={() => editHandler(item._id)}
                    >
                      Edit
                    </button>
                    <dialog
                      id="my_modal_5"
                      className="modal modal-bottom sm:modal-middle"
                    >
                      <div className="modal-box">
                        <div>
                          <div class="formbold-main-wrapper">
                            <div class="formbold-form-wrapper">
                              <form
                                className="rounded-xl"
                                onSubmit={handleSubmit(onSubmitHandler)}
                              >
                                <div className="formbold-input-flex">
                                  <div>
                                    <label
                                      htmlFor="firstname"
                                      class="formbold-form-label"
                                    >
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
                                    <label
                                      htmlFor="location"
                                      className="formbold-form-label"
                                    >
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

                                <div>
                                  <label
                                    htmlFor="pincode"
                                    className="formbold-form-label"
                                  >
                                    Pincode{" "}
                                  </label>
                                  <input
                                    type="text"
                                    name="pincode"
                                    id="pincode"
                                    placeholder="pincode"
                                    className="formbold-form-input"
                                    {...register("pincode", {
                                      required: "Pincode is required",
                                    })}
                                  />
                                </div>

                                {/* <div class="formbold-input-flex">
                                  <div>
                                    <label
                                      for="image"
                                      class="formbold-form-label"
                                    >
                                      {" "}
                                      Upload Image{" "}
                                    </label>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      {...register("image", {
                                        required: true,
                                      })}
                                      onChange={(event) => {
                                        setFiles(event.target.files);
                                      }}
                                      className="my-4 w-full rounded border border-none file:cursor-pointer file:rounded file:border-none file:bg-slate-100 file:p-2"
                                    />
                                  </div>
                                  <div>
                                    <label
                                      for="number"
                                      class="formbold-form-label"
                                    >
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
                                </div> */}

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

                                <button type="submit" className="formbold-btn">
                                  Save Changes
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                        <div className="modal-action">
                          <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                          </form>
                        </div>
                      </div>
                    </dialog>
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
      </div>
    </section>
  );
};

export default CreateJobs;
