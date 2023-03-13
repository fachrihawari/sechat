const corsConfig = {
  origin: [
    "http://localhost:5173",
    "http://192.168.100.67:5173",
    "https://admin.socket.io",
    process.env.CLIENT_URL
  ]
};

export default corsConfig