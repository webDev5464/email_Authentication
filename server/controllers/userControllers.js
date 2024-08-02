import { $userModel } from "../models/userModels.js";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.Admin_email,
    pass: process.env.Admin_email_password,
  },
});

function generateNumericOtp(length) {
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10); // Generate a random digit (0-9)
  }

  return otp;
}

const otps = new Map(); // To store OTPs temporarily

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) throw new Error("Email is required.");

    // const otp = crypto.randomBytes(3).toString("hex"); // Generate 6 digit OTP
    const otp = generateNumericOtp(6);
    const otpExpireTime = Date.now() + 60000; // OTP valid for 1 minute

    otps.set(email, { otp, otpExpireTime });

    await transporter.sendMail({
      from: process.env.Admin_email,
      to: email,
      subject: "Your OTP for registration",
      text: `Your OTP is ${otp}. It will expire in 1 minute.`,
    });

    res.status(200).send({
      process: true,
      msg: "OTP sent successfully to your email.",
    });
  } catch (err) {
    res.status(400).send({
      process: false,
      msg: err.message,
    });
  }
};

export const register = async (req, res) => {
  try {
    const { fullName, username, email, pass, conPass, otp } = req.body;
    if (!fullName) throw new Error("Full name is required.");
    if (!username) throw new Error("Username name is required.");
    if (!email) throw new Error("Email is required.");
    if (!pass) throw new Error("Password is required.");
    if (!conPass) throw new Error("Confirm password is required.");
    if (!otp) throw new Error("OTP is required.");

    const existUser = await $userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (existUser) {
      // throw Error("User already registered.");

      res.status(202).send({
        process: false,
        msg: "User already registered.",
      });

      return;
    }

    const storedOtpData = otps.get(email);
    // if (storedOtpData.otp !== otp) throw new Error("Invalid OTP");
    if (storedOtpData.otp !== otp || Date.now > storedOtpData.otpExpireTime) {
      res.status(401).send({
        process: false,
        msg: "Invalid OTP or OTP has expired.",
      });

      return;
    }

    if (pass !== conPass)
      throw new Error("Password and confirm password not match.");

    await $userModel({
      fullName,
      username,
      email,
      pass: await hash(pass, 10),
    }).save();

    otps.delete(email); // Remove the OTP after successful registration

    res.status(200).send({
      process: true,
      msg: "User register successfully",
    });
  } catch (err) {
    res.send({
      process: false,
      msg: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { validationName, pass } = req.body;

    if (!validationName) throw new Error("Username/Email is required.");
    if (!pass) throw new Error("Password is required.");

    const findUser = await $userModel.findOne({
      $or: [{ email: validationName }, { username: validationName }],
    });

    if (!findUser) {
      res.status(401).send({
        process: false,
        msg: "User not register",
      });

      return;
    }

    const checkPass = await compare(pass, findUser.pass);

    if (!checkPass) throw new Error("Password is incorrect");

    const generateToken = jwt.sign({ userId: findUser._id }, "userSecureKey", {
      expiresIn: "1h",
    });

    await $userModel.findByIdAndUpdate(findUser._id, {
      token: generateToken,
      loginDate: Date.now(),
    });

    res
      .status(200)
      .cookie("token", generateToken, { httpOnly: true })
      .send({
        process: true,
        msg: "Login successfully",
        UserData: await $userModel.findById(findUser._id),
      });
  } catch (err) {
    res.status(400).send({
      process: false,
      msg: err.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");

    res.send({
      process: true,
      msg: "User logout",
    });
  } catch (err) {
    res.status(401).send({
      process: false,
      msg: err.message,
    });
  }
};

export const userVerify = async (req, res) => {
  try {
    const id = req.userId;
    const findUser = await $userModel.findById(id);

    res.status(200).send({
      process: true,
      msg: "User Verified",
      UserData: findUser,
    });
  } catch (err) {
    res.status(401).send({
      process: false,
      msg: err.message,
    });
  }
};

export const requestPasswordReset = async (req, res) => {
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { email } = req.body;
    if (emailRegex.test(email)) {
      const user = await $userModel.findOne({ email });
      if (!user) throw new Error("User not found");

      const token = crypto.randomBytes(32).toString("hex");
      user.resetPasswordToken = token;
      user.resetPasswordExpire = Date.now() + 3600000; // 1h
      await user.save();

      // const transporter = nodemailer.createTransport({
      //   service: "Gmail",
      //   auth: {
      //     user: process.env.Admin_email,
      //     pass: process.env.Admin_email_password,
      //   },
      // });

      const mailOptions = {
        to: user.email,
        from: process.env.Admin_email,
        subject: "Password Reset",
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
               Please click on the following link, or paste this into your browser to complete the process:\n\n
                https://email-authentication-client.onrender.com/resetPassword/${token}\n\n
               If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) return res.status(500).send(err.message);
        res.status(200).send({
          process: true,
          msg: "Recovery email sent",
        });
      });
    } else throw new Error("Required Email");
  } catch (err) {
    res.status(201).send({
      process: false,
      msg: err.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword, confirmNewPassword } = req.body;
    if (!token) throw new Error("Token is required.");
    if (!newPassword) throw new Error("New password is required.");
    if (!confirmNewPassword)
      throw new Error("Confirm new password is required.");
    if (newPassword !== confirmNewPassword)
      throw new Error("Passwords do not match.");

    const user = await $userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user)
      throw new Error("Password reset token is invalid or has expired.");

    user.pass = await hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).send({
      process: true,
      msg: "Password has been reset",
    });
  } catch (err) {
    res.send({
      process: false,
      msg: err.message,
    });
  }
};

export const getAllUsers = async (req, res) =>
  res.send(await $userModel.find());
