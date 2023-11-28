import User from '../models/user'
import { verifyAccessToken } from '../helpers/jwt'

async function authMiddleware(socket, next) {
  try {
    const accessToken = socket.handshake.auth.accessToken;
    if (!accessToken) {
      throw new Error("Invalid Token")
    }
  
    const { id } = verifyAccessToken(accessToken);

    const user = await User.findById(id);

    if (!user) {
      throw new Error("Invalid Token")
    }
  
    socket.user = user;
    next();
  } catch (error) {
    next(error)
  }
}

export default authMiddleware