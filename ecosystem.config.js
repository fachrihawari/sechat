module.exports = {
  apps : [
    {
      name   : "sechat-server",
      cwd: "./apps/server",
      script : "bun",
      args: "run start"
    },
    {
      name   : "sechat-client",
      cwd: "./apps/client",
      script : "bun",
      args: "run preview --port 3002"
    }
  ]
}
