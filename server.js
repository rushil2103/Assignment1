const express = require("express");
const mongoose = require('mongoose');
mongoose.set('debug', true);
const userRoutes = require("./routes/user.js");
const employeeRoutes = require("./routes/employee.js");

const app = express();
const DATABASE_URL = "mongodb+srv://rushtmk98:Rushil940221@cluster0.rnwk7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&tls=true";
const PORT = process.env.PORT || 8090;

mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    tls: true // Force TLS
})
.then(() => console.log("Connection successful!"))
.catch((error) => console.error("Connection error:", error));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/emp", employeeRoutes);

app.get("/", (req, res) => {
    res.send("<h1>MongoDB + Mongoose Example</h1>");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
