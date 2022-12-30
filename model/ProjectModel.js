import mongoose from "mongoose";

const Project = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    deskripsi: {
        type: String,
        required: true
    },
    kategori: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
   
    urlweb: {
        type: String,
        required: true
    },
    database:{
        type:String,
        required: true
    },
});

Project.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object;
})

export default mongoose.model('Projects', Project)