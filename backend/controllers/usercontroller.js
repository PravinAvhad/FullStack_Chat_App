const User = require("../models/UserModel");
const generateToken = require("../config/generateToken");
const cloudinary = require("cloudinary");

// Working
exports.registerUser = async (req, res) => {
    try {
        // console.log(req.body);
        const { name, email, password } = req.body;
        const mycloudaccount = await cloudinary.v2.uploader.upload(req.body.profile, { folder: "CHAT_WEBAPP_Profiles", width: 150, crop: "scale" });

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please Enter All Fields"
            })
        }
        const user = await User.create({
            name, email, password,
            profile: {
                public_id: mycloudaccount.public_id,
                url: mycloudaccount.secure_url
            }
        });
        const token = generateToken(user._id);
        const options = {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        res.status(200).cookie("token", token, options).json({
            message: "Sign Up SuccessFull",
            user,
            token
        })
    } catch (error) {
        console.log(`Backend Error : `, error)
        res.status(400).json({
            error
        })
    }
}

// Working
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please Enter Email & Password"
            })
        }
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({
                message: "Invalid Email or Password User Not Found"
            });
        }
        const isPasswordMatched = await user.comparePassword(password);
        if (!isPasswordMatched) {
            return res.status(401).json({
                message: "Invalid Email or Password"
            });
        }
        const token = generateToken(user._id);
        const options = {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        res.status(200).cookie("token", token, options).json({
            message: "Log In SuccessFull",
            user,
            token
        })
    } catch (error) {
        console.log(`Error : ${error}`)
        res.status(400).json({
            ErrorMessage: error
        })
    }
}

//LogOut User
exports.logoutUser = async (req, res) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        })
        res.status(200).json({
            success: true,
            message: "Log Out SuccessFully",
        })
    } catch (error) {
        console.log(`Error : ${error}`)
        res.status(400).json({
            ErrorMessage: error
        })
    }
}

// Working
exports.getusers = async (req, res) => {
    const keyword = req.query.name ? {
        $or: [
            {
                name: {
                    $regex: req.query.name,
                    $options: "i"
                }
            },
            {
                email: {
                    $regex: req.query.name,
                    $options: "i"
                }
            }
        ]
    } : {};

    try {
        const users = await User.find(keyword).find({
            _id: {
                $ne: req.user._id
            }
        });
        res.status(200).json({
            Total: users.length,
            users
        })

    } catch (error) {
        console.log(`Error : ${error}`)
        res.status(400).json({
            ErrorMessage: error
        })
    }
}

//Get Users Detail 
exports.getuserdetails = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        console.log(`Error : ${error}`)
        res.status(400).json({
            ErrorMessage: error
        })
    }
}