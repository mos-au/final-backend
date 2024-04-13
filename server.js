const jsonServer = require("json-server");
const cors = require("cors");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults({ noCors: true });
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const path = require("path");

server.use(cors());
server.use(middlewares);

server.post("/upload", upload.single("image"), function (req, res, next) {
  // req.file is the `image` file
  // req.body will hold the text fields, if there were any
  res.json(req.file);
});

server.get("/files/:file_id", (req, res, next) => {
  const { file_id } = req.params;
  console.log(req.params);
  res.set("Content-Type", "image/jpeg");
  res.sendFile(path.join(__dirname, "uploads/" + file_id));
});

server.use(jsonServer.bodyParser);
server.use(router);

server.listen(5000, () => {
  console.log("Customized JSON-Server is running at http://localhost:5000/");
});
