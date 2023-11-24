module.exports = {
  apps : [
    {
      name   : "sechat-server",
      cwd: "./apps/server",
      script : "bun",
      args: "run start",
      env: {
        PORT: 3001,
        CLIENT_URL: "https://sechat.hawari.dev"
      }
    },
    {
      name   : "sechat-client",
      cwd: "./apps/client",
      script : "bun",
      args: "run preview --port 3002"
    }
  ]
}
