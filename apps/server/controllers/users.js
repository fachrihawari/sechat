import User from "../models/user"

export default class UsersController {
  static async all(req, res) {
    try {
      const users = await User.find({
        _id: { $ne: req.user._id }
      })
      res.json(users)
    } catch (error) {
      next(error)
    }
  }
}
