import express from "express";
import { ProjectDao } from "./Dao/ProjectDao.js";
import { Project } from "./models/Projects.js";
import cors from 'cors'

const app = express();

const projectDao = new ProjectDao();

app.use(express.json());

app.use(cors());

app.get('/projects', (req, res) => {
    res.json(projectDao.getAll());
});

app.get('/projects/:projectId', (req, res) => {
    let project = projectDao.findById(req.params.projectId);

    if(project == undefined) {
        res.status(404).json({code: 404, message: "no project with this id"});
    }

    res.json(project);
});

app.post('/projects', (req, res) => {
    const {title, status, details} = req.body;
    let project = new Project(null, title, details, status);
    res.json(projectDao.save(project));
});

app.put('/projects/:projectId', (req, res) => {

    const {id, title, status, details} = req.body;


    if(req.params.projectId != id) res.sendStatus(409);


    let project = new Project(id, title, status, details);


    projectDao.updateProject (project) ? res.sendStatus(200) : res.status(400).json({code: 400, message: "problème lors de la mise à jour du project"})
});

app.patch('/projects/:projectId/status', (req, res) => {
    projectDao.updateStatus(req.params.projectId) ? res.sendStatus(200) : res.sendStatus(400);
});


app.delete('/projects/:projectId', (req, res) => {
    projectDao.deleteProject(req.params.projectId);
    res.sendStatus(200);
});


app.listen(5000, () => {
    projectDao.readFile();
    console.log('listening to the grooviest port : http://127.0.0.1:5000');
});