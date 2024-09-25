import validator from "validator";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import partnerModel from "../model/partnerModel.js";

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// partner user login
const partnerlogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await partnerModel.findOne({email});
        if (!user) {
            return res.json({success: false, message: "User not found"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = createToken(user._id)
            return res.json({success: true, token,user})
        } else {
            return res.json({success: false, message: "Incorrect password"})
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({success: false, message: "An error occurred during login"})
    }
}

// partner  user signup
const partnersignup = async (req, res) => {
    const { name,fathername, email, password,phone,altphone,address,service,addhar } = req.body;
    try {
        // checking user already exists or not
        const exists = await partnerModel.findOne({email});
        if (exists) {
            return res.json({success: false, message: "User already exists"})
        }
        // email and password checking
        if (!validator.isEmail(email)) {
            return res.json({success: false, message: "Please enter a valid email"})
        }
        if (password.length < 8) {
            return res.json({success: false, message: "Please enter a strong password (at least 8 characters)"})
        }
        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new partnerModel({
            name,
            fathername,
             email,
              password:hashedPassword,
              phone,
              altphone,
              address,
              service,
              addhar
        })

        const user = await newUser.save()

        const token = createToken(user._id)
        res.json({success: true, token,user})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}


export { partnerlogin, partnersignup };