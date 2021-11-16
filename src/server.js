const { createApp } = require("./app");

(async () => {
  const app = await createApp();
  const PORT = process.env.PORT || 3004;

  app.listen(PORT, () =>
    console.log(`Server started at port: http://localhost:${PORT}`)
  );
})();
