const corsConfig = {
  origin: [
    "http://localhost:5173",
    "https://admin.socket.io",
    process.env.CLIENT_URL
  ],
  credentials: true
};

export default corsConfig
