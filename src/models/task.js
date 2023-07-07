const mongoose = require('mongoose');
const checklist = require('./checklist');

const TaskSchema = mongoose.Schema({
    name: {type: String, required:true},
    done: {type: Boolean, default:false},
    checklist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'checklist',
        required: true
    }
})

module.exports = mongoose.model('task', TaskSchema);