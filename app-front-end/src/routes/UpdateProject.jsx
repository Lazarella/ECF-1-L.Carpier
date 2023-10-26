import { useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProject, fetchProjects } from "./your-project-slice-path"; 

function UpdateProject() {
    const inputTitleProject = useRef();
    const inputStatusProject = useRef();
    const inputDetailsProject = useRef();
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const id = params.get("id") ?? null;
    const dispatch = useDispatch();
    const projects = useSelector((state) => state.projects.projects);

    useEffect(() => {
        if (id !== null) {
            dispatch(fetchProjects());
        }
    }, [id, dispatch]);

    const project = projects.find((project) => project.id == id);

    useEffect(() => {
        if (project) {
            inputTitleProject.current.value = project.title;
            inputStatusProject.current.value = project.status;
            inputDetailsProject.current.value = project.details; 
        }
    }, [project]);

    const handleSubmit = () => {
        const projectData = {
            id: id,
            title: inputTitleProject.current.value,
            status: inputStatusProject.current.value,
            details: inputDetailsProject.current.value, 
        };

        if (id !== null) {
            dispatch(updateProject(projectData));
        }
        navigate("/");
    }

    return (
        <>
            <h1>Edit Project</h1>
            <input placeholder="Project Title" ref={inputTitleProject} />
            <label htmlFor="statusProject">Status:</label>
            <select id="statusProject" ref={inputStatusProject} name="statusProject">
                <option value="New">New Project</option>
                <option value="In progress">Work in Progress</option>
                <option value="Pending">Pending Work</option>
                <option value="Finished">Finished</option>
            </select>
            <textarea
                placeholder="Project Details"
                ref={inputDetailsProject}
                rows="4"
                cols="50"
            ></textarea>
            <button onClick={handleSubmit}>Edit Project</button>
            <br></br>
        </>
    );
}

export default UpdateProject;

