import Project from '../model/ProjectModel.js'
import { validationResult } from 'express-validator'
import path from 'path'
import { fileURLToPath } from "url";
import fs from 'fs'
import crypto from 'crypto'

export const getProject = async (req, res) => {
    try {
        let content = await Project.find();
        res.send(content);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const getProjectByCategory = async ( req, res) => {
    const kategori = req.params.kategori
    try {
        const data = await Project.find({ kategori: kategori });
        res.send(data);
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
}
export const getProjectById = async (req, res) => {
    try {
        const projects = await Project.findById(req.params.id);
        res.json(projects)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const saveProject = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        const err = new Error("Input Value Tidak Sesuai ")
        err.errorStatus = 400
        err.data = errors.array()
        throw err;
    }
    if (!req.file) {
        const err = new Error("Image harus di upload")
        err.errorStatus = 422
        throw err;
    }

    const title = req.body.title;
    const deskripsi = req.body.deskripsi;
    const kategori = req.body.kategori;
    const urlweb = req.body.urlweb;
    const database = req.body.database

    const Posting = new Project({
        title: title,
        deskripsi: deskripsi,
        kategori: kategori,
        urlweb: urlweb,
        database: database,
    })

    if (req.file) {
        Posting.image = req.file.path.replace(/\\/g, "/")
    }

    Posting.save()
        .then(result => {
            res.status(201).json({
                message: 'Create Project Post SuccesFully',
                data: result
            })
        }).catch((err) => {
            console.log('error', err)
        });
};

export const updateProjects = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        const err = new Error("Input Value Tidak Sesuai ")
        err.errorStatus = 400
        err.data = errors.array()
        throw err;
    }
    if (!req.file) {
        const err = new Error("Image harus di upload")
        err.errorStatus = 422
        throw err;
    }

    const title = req.body.title;
    const deskripsi = req.body.deskripsi;
    const kategori = req.body.kategori;
    const urlweb = req.body.urlweb;
    const projectId = req.params.id;
    const database = req.body.database;

    Project.findById(projectId)
        .then(post => {
            if (!post) {
                const err = new Error('Project Tidak Ditemukan')
                err.errorStatus = 404;
                throw err
            }
            post.title = title
            post.deskripsi = deskripsi
            post.kategori = kategori
            post.urlweb = urlweb
            post.database = database

            if (req.file) {
                post.image = req.file.path.replace(/\\/g, "/")
            }

            return post.save();
        })
        .then((result) => {
            res.status(200).json({
                message: 'Update Sukses',
                data: result
            })
        }).catch((err) => {
            res.status(501).json({
                message: err
            })
        });
}
export const deleteProjects = async (req, res) => {
    const projectId = req.params.id
    Project.findById(projectId)
        .then(post => {
            if (!post) {
                const err = new Error('Project Tidak Ditemukan')
                err.errorStatus = 404;
                throw err
            }
            removeImage(post.image);
            return Project.findByIdAndRemove(projectId)

        })
        .then(result => {
            res.status(200).json({
                message: `Project dengan ID: ${projectId} telah di hapus`,
                data: result
            })
        })
        .catch((err) => {
            console.log(err.message)
        });
}
const removeImage = (filePath) => {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)

    filePath = path.join(__dirname, '../.', filePath)
    fs.unlink(filePath, err => console.log(err));
}

const iv = crypto.randomBytes(16)
const key = crypto.randomBytes(32)

const encrypt= (data) => {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
   }

