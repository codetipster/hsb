const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const baseOption = {
    collection: "employee",
    timestamps: true,
};

const status = Object.freeze(["ACCEPTED", "PENDING", "DELETED"]);

const Employee = new Schema(
    {
        clientId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "user",
        },
        company: { type: String, required: [true, "please provide betrieb"] },
        name: { type: String, required: [true, "please provide name"] },
        firstName: { type: String, required: [true, "please provide vorName"] },
        birthName: { type: String, required: [true, "please provide Geburtsname"] },
        birthDate: { type: String, required: [true, "please provide Geburtsdatum"] },
        birthPlace: { type: String, required: [true, "please provide Geburtsort"] },
        nationality: { type: String, required: [true, "please provide Staatsangehörigkeit"] },
        homeNumber: { type: String, required: [true, "please provide Straße/ Hausnummer"] },
        postalCode: { type: String, required: [true, "please provide Postleitzahl/ Ort"] },
        jobTitle: { type: String, required: [true, "please provide Berufsbezeichnung"] },
        healthInsurance: { type: String, required: [true, "please provide Krankenkasse"] },
        bankName: { type: String, required: [true, "please provide your bank name"] },
        iban: { type: String, required: [true, "please provide your IBAN"] },
        salary: { type: String, required: [true, "please provide Gehalt (Brutto)"] },
        employmentType: { type: String, required: [true, "please provide Beschäftigungsverhältnis"] },
        beginning: { type: String, required: [true, "please provide Beginn"] },
        taxNumber: { type: String, required: [true, "please provide Steuer – Identifikationsnummer"] },
        socialNumber: { type: String, required: [true, "please provide Sozialversicherungsnummer"] },
        status: {
            type: String,
            trim: true,
            enum: status,
            required: true,
            default: "PENDING",
        },
    },
    baseOption
);


Employee.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const EmployeeModel = module.exports = mongoose.model('employee', Employee);