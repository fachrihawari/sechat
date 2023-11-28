import { generateAccessToken } from "../helpers/jwt"
import { sendEmail } from "../helpers/mail"
import { generateOtp } from "../helpers/otp"
import User from "../models/user"

export default class AuthController {
  static async login(req, res) {
    try {
      const { email } = req.body

      // Find the user with the given email
      let user = await User.findOne({ email })

      if (!user) {
        user = await User.create({ username: email, email })
        console.log({ user })
      }

      // Generate a 6-digit OTP
      const otp = generateOtp()

      // add expiry date 30 minutes from now
      const expiry = new Date()
      expiry.setMinutes(expiry.getMinutes() + 30)

      // Save the OTP and its expiry date to the user's document
      user.otp = {
        code: otp,
        expiry
      }
      await user.save()

      // TODO: Move to queue
      // Send the OTP to the user's email
      await sendEmail(email, "Your OTP", `Your OTP is ${otp}`)

      res.sendStatus(200)
    } catch (error) {
      next(error)
    }
  }
  static async verify(req, res, next) {
    try {
      const { email, otp } = req.body

      // Find the user with the given email
      let user = await User.findOne({ email })

      if (!user) {
        throw new Error("InvalidUser")
      }

      // Check if the OTP is valid and not expired
      if (user.otp.code !== otp || user.otp.expiry < new Date()) {
        throw new Error("InvalidOtp")
      }

      // Generate a JWT token
      const accessToken = generateAccessToken({ id: user._id })

      // Send the JWT token to the user
      res.json({ accessToken })

      // Remove the OTP from the user's document
      user.otp = undefined
      user.save()
    } catch (error) {
      next(error)
    }
  }
}
