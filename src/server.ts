import express from "express";

const app = express();

let session: express.Response[] = [];

app.set("views", `${process.cwd()}/src/views`);
app.set("view engine", "pug");

app.use(express.json());
app.use("/assets", express.static("dist/client"));

app.get("/", (req: express.Request, res: express.Response) => {
  return res.render("main");
});

app
  .route("/api")
  .get((req: express.Request, res: express.Response) => {
    session.push(res);
    res.status(200);
  })
  .post((req: express.Request, res: express.Response) => {
    const { content } = req.body;

    for (const data of session) {
      data.json({ content });
    }
    session = [];
    return res.json({ content });
  });

app.listen(5000, () => console.log("now listen 5000"));
