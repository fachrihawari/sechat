import User from '../models/user'
import { verifyAccessToken } from '../helpers/jwt'

export async function authMiddlewareSocket(socket, next) {
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

export async function authMiddlewareExpress(req, _res, next) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw new Error("Invalid Token")
    }

    const [type, accessToken] = authorization.split(" ");
    if (type !== "Bearer") {
      throw new Error("Invalid Token")
    }

    const { id } = verifyAccessToken(accessToken);

    const user = await User.findById(id);

    if (!user) {
      throw new Error("Invalid Token")
    }

    req.user = user;
    next();
  } catch (error) {
    next(error)
  }
}
