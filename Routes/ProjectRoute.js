import express from 'express'
import { deleteProjects, getProject, getProjectByCategory, getProjectById, saveProject, updateProjects } from "../controller/ProjectController.js"
import upload from '../middleware/Upload.js'
const router = express.Router()

router.get('/', getProject);
router.get('/projects/:id', getProjectById);
router.get('/projects/category/:kategori', getProjectByCategory);
router.post('/projects', upload.single('image'), saveProject);
router.patch('/projects/:id', upload.single('image'), updateProjects)
router.delete('/projects/:id', upload.single('image'), deleteProjects)

export default router