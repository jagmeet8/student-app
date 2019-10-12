const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
require("dotenv").config();

const API_PORT = 3001;
const app = express();
const router = express.Router();
app.use(cors());

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

var data = [
  {
    _id: 1,
    course: "Accounting",
    code: 1111
  },
  {
    _id: 2,
    course: "Actuarial Science",
    code: 1112
  },
  {
    _id: 3,
    course: "Applied Data Science",
    code: 1113
  },
  {
    _id: 4,
    course: "Applied Data Science Advanced",
    code: 1114
  },
  {
    _id: 5,
    course: "Architectural Design",
    code: 1115
  },
  {
    _id: 6,
    course: "Art and Design",
    code: 1116
  },
  {
    _id: 7,
    course: "Arts",
    code: 1234
  },
  {
    _id: 8,
    course: "Arts and Fine Art",
    code: 1324
  },
  {
    _id: 9,
    course: "Biomedical Science",
    code: 1156
  },
  {
    _id: 10,
    course: "Business (Business Education)",
    code: 1243
  },
  {
    _id: 11,
    course: "Commerce and Actuarial Science",
    code: 1563
  },
  {
    _id: 12,
    course: "Education and Arts",
    code: 1325
  },
  {
    _id: 13,
    course: "Emergency Health (Paramedic)",
    code: 1452
  },
  {
    _id: 14,
    course: "Finance",
    code: 1627
  }
];

// this is our get method
// this method fetches all available data in our database
router.post("/getData", (req, res) => {
  const { searchText } = req.body;
  const query = new RegExp(searchText, "ig");
  const respData = data.filter(_course => {
    return _course.course.match(query) || _course.code.toString().match(query);
  });
  return res.json({ success: true, data: respData });
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
