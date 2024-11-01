const express = require("express");
const EmployeeModel = require("../models/employee");
const routes = express.Router();

routes.get("/employee", async (req, res) => {
    try {
        const employees = await EmployeeModel.find();
        res.send(employees);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

routes.post("/employee", async (req, res) => {
    const newEmployee = new EmployeeModel(req.body);
    try {
        const employee = await newEmployee.save();
        res.status(201).send(employee);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

routes.put("/employee/:eid", async (req, res) => {
    try {
        const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
            req.params.eid,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedEmployee) {
            return res.status(404).send({ message: "Employee not found" });
        }
        res.send(updatedEmployee);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

routes.delete("/employee/:eid", async (req, res) => {
    try {
        const deletedEmployee = await EmployeeModel.findByIdAndDelete(req.params.eid);
        if (!deletedEmployee) {
            return res.status(404).send({ message: "Employee not found" });
        }
        res.send({ message: "Employee deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

routes.get("/employee/:eid", async (req, res) => {
    try {
        const employee = await EmployeeModel.findById(req.params.eid);
        if (!employee) {
            return res.status(404).send({ message: "Employee not found" });
        }
        res.send(employee);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

module.exports = routes;
