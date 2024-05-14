import User from "../models/user.js";
// Models
// Rest...
import express from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth.js";
const userRouter = express.Router();

// Signup Route

userRouter.post("/signup", async (req, res) => {
    try {
        const { email, password, username, number } = req.body;
        // Validations im doing it from frontned
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json({ msg: "User with the same email already exists" });
        }
        const hashedPassword = await bcryptjs.hash(password, 8);
        const newUser = new User({
            email,
            password: hashedPassword,
            username,
            number,
        });

        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login Route
userRouter.post("/login", async (req, res) => {
    try {
        const { email, password, number } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .send({ msg: "User with this email does not exist" });
        }

        const isMatch = await bcryptjs.compare(password, user.password);

        if (!isMatch) {
            return res
                .status(400)
                .send({ msg: "Incorrect Email Or Password." });
        }
        const token = jwt.sign({ id: user._id }, "passwordKey");
        res.json({ token, user: { id: user._id, username: user.username } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// TO CHECK IF TOKEN IS VALID
userRouter.post("/tokenIsValid", async (req, res) => {
    try {
        const token = req.header("x-auth-token");

        if (!token) return res.json(false);

        const verified = jwt.verify(token, "passwordKey");

        if (!verified) return res.json(false);

        const user = await User.findById(verified.id);

        if (!user) return res.json(false);

        return res.json(true);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// to get the users credentials
userRouter.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user);
        res.json({
            number: user.number,
            username: user.username,
            id: user._id,
        });
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
});

// Get only the logged in user data
userRouter.get("/getUserProfile", async (req, res) => {
    try {
        const { user_id } = req.query; // Assuming user_id is provided as a query parameter

        if (!user_id) {
            return res.status(400).json({ message: "User ID is required." });
        }

        try {
            const jobs = await User.find({ _id: user_id });
            res.status(200).json(jobs);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

userRouter.put("/updateUserProfile/:id", async (req, res) => {
    try {
        const id = req.params.id;
        // const updatedJobData = req.body;
        const { username, number } = req.body;

        //

        const updateUserProfile = await User.findByIdAndUpdate(
            { _id: id },
            {
                username,
                number,
            },
            {
                new: true,
            }
        );

        if (!updateUserProfile) {
            return res.status(404).json({ message: "Job not found." });
        }

        res.status(200).json(updateUserProfile);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default userRouter;
