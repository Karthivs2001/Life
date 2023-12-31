import express, { Request, Response,NextFunction} from 'express';
import asyncHandler from 'express-async-handler';
import { User, UserModel } from '../models/user.model';
import bcrypt from 'bcryptjs';
import { generateToken, isAdmin, isAuth,baseUrl} from '../utils';
import nodemailer from 'nodemailer';
import jwt, { Secret }  from "jsonwebtoken";


export const userRouter = express.Router();

userRouter.post(
  '/login',
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        return res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

userRouter.post(
  '/register',
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    } as User);

    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);

userRouter.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);
userRouter.put(
  '/update-profile',
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    }
  })
);

userRouter.get(
  '/',
  isAuth,
  isAdmin,
  asyncHandler(async (req: Request, res: Response) => {
    const users = await UserModel.find({});
    res.send(users);
  })
);

userRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findById(req.params.id);
    if (user) {
      if (user.email === 'admin@example.com') {
        res.status(400).send({ message: 'Can Not Delete Admin User' });
        return;
      }
      const deleteUser = await user.remove();
      res.send({ message: 'User Deleted', user: deleteUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

userRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = Boolean(req.body.isAdmin);
      // user.isAdmin = req.body.isAdmin || user.isAdmin;
      const updatedUser = await user.save();
      res.send({ message: 'User Updated', user: updatedUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

userRouter.post(
  '/forgot-password',
  asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;

    // Validate the email
    if (!email) {
      res.status(400).send({ message: 'Invalid request. Email is required.' });
      return;
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET || 'somethingsecret', {
        expiresIn: '3h',
      });

      // Construct the reset link using baseUrl
      const resetLink = `${baseUrl()}/reset-password/${token}`;
      console.log('Reset Link:', resetLink);

      user.resetToken = token;
      await user.save();

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'pharmacylifecare12@gmail.com',
          pass: 'okvy xjjz frox vauu',
        },
      });

      const mailOptions = {
        from: 'pharmacylifecare12@gmail.com',
        to: email,
        subject: 'Reset Password',
        text: resetLink,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          res.status(500).send({ message: 'Error sending reset password email.' });
        } else {
          console.log('Email sent: ' + info.response);
          res.send({ message: 'We sent a reset password link to your email.' });
        }
      });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  })
);


userRouter.post('/reset-password', async (req: Request, res: Response) => {
  const token = req.body.token;
  const newPassword = req.body.password;
  const newPasswordHash = bcrypt.hashSync(newPassword, 8);
  const user = await UserModel.findOneAndUpdate(
    { resetToken: token },
    { $set: { password: newPasswordHash, resetToken: undefined } },
    { new: true }
  );
});
