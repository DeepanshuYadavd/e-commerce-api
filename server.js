import app from "./app.js";
import { db } from "./utils/db.js";

// db cnnection:
db();

//  localhost run:
app.listen(process.env.PORT, () => {
  console.log(`localhost running at port ${process.env.PORT}`);
});
