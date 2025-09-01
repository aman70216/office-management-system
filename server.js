const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Department = require("./models/Department");
const Employee = require("./models/Employee");
const path = require("path");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
const departmentRoutes = require("./routes/departmentRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

app.use("/departments", departmentRoutes);
app.use("/employees", employeeRoutes);

// Home route with stats
app.get("/", async (req, res) => {
  try {
    const departmentCount = await Department.countDocuments();
    const employeeCount = await Employee.countDocuments();

    res.render("index", { departmentCount, employeeCount });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
