// Models
import Jobs from "../models/jobs.js";
// Rest...
import express from "express";
import multer from "multer";
const jobRouter = express.Router();

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads", function (error, success) {
            if (error) {
                console.log(error);
            }
        }); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        const name = Date.now() + "-" + file.originalname;
        cb(null, name, function (error, success) {
            if (error) {
                console.log(error);
            }
        });
    },
});

// Get only the logged in user data
jobRouter.get("/getUserJob", async (req, res) => {
    try {
        const { user_id } = req.query; // Assuming user_id is provided as a query parameter

        if (!user_id) {
            return res.status(400).json({ message: "User ID is required." });
        }

        try {
            const jobs = await Jobs.find({ user_id: user_id });
            res.status(200).json(jobs);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all data
jobRouter.get("/getJobs", async (req, res) => {
    try {
        try {
            const job = await Jobs.find();
            res.status(201).json(job);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create Job Route
// jobRouter.post("/upload", async (req, res) => {
//     try {
//         try {
//             const job = await Jobs.create(req.body);
//             res.status(201).json(job);
//         } catch (err) {
//             res.status(400).json({ message: err.message });
//         }
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

const upload = multer({ storage: storage });

jobRouter.post("/upload", upload.single("image"), async (req, res) => {
    try {
        const { title, description, location, pincode, user_id, name, number } =
            req.body;
        console.log(req.file.path);
        // const image = req.file.path; // Path of the uploaded image

        const job = await Jobs.create({
            title,
            description,
            location,
            pincode,
            user_id,
            number,
            image: req.file.path,
            name,
        });

        res.status(201).json(job);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete Job

jobRouter.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;

        await Jobs.deleteOne({ _id: id });

        res.status(201).json({ message: "Sucessfully deleted" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update Job

jobRouter.put("/update/:id", upload.single("image"), async (req, res) => {
    try {
        const id = req.params.id;
        // const updatedJobData = req.body;
        const { title, description, location, pincode, user_id, image } =
            req.body;

        // Ensure that required fields are provided
        // if (!updatedJobData) {
        //     return res
        //         .status(400)
        //         .json({ message: "Updated job data is required." });
        // }

        const updatedJob = await Jobs.findByIdAndUpdate(
            { _id: id },
            {
                title,
                description,
                location,
                pincode,
                user_id,
                image: req.file.path,
            },
            {
                new: true,
            }
        );

        if (!updatedJob) {
            return res.status(404).json({ message: "Job not found." });
        }

        res.status(200).json(updatedJob);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default jobRouter;
