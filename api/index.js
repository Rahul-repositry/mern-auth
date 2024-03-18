import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("helloword");
});

app.listen(3003, () => console.log("serrover running"));
