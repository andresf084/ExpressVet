const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

var userMasterSchema = new mongoose.Schema
({
    userName: {type: String, lowercase: true},
    id_type: {type: String, lowercase: true},
    userId: {type: String, required: true, unique: true},
    userEmail: {type: String, lowercase: true, required: true, unique: true},
    userPhone1: {type: Number},
    userPhone2: {type: Number},
    user: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    userRol: {type: String, required: true},
    status: {type: Boolean, default: true},
    created_at: {type: Date, default: Date.now()}
})

userMasterSchema.methods.generarJWT = () => {
    return jwt.sign({ _id: this._id, userName: this.userName, user: this.user },"ExpressVet")
}

module.exports = mongoose.model ('Users_Master', userMasterSchema)