import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "./projectSlice";


function AddProject() {
const dispatch = useDispatch();
const projects = useSelector(state => state.projects.projects);
const [titleError, setTitleError] = useState(false);
const [statusError, setStatusError] = useState(false);
const [detailsError, setDetailsError] = useState(false);
const inputTitleProject = useRef();
const inputStatusProject = useRef();
const inputDetailsProject = useRef();

const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!inputTitleProject.current.value) {
        setTitleError(true);
        return;
    }
    if (!inputStatusProject.current.value) {
        setStatusError(true);
        return;
    }
    if (!inputDetailsProject.current.value) {
        setDetailsError(true);
        return;
    }

    const projectData = {
        title: inputTitleProject.current.value,
        status: inputStatusProject.current.value,
        details: inputDetailsProject.current.value,
    };

    dispatch(createProject(projectData));

    inputTitleProject.current.value = "";
    inputStatusProject.current.value = "";
    inputDetailsProject.current.value = "";


    setTitleError(false);
    setStatusError(false);
    setDetailsError(false);
}
console.log(projects);
    return (
    <>
        <form onSubmit={formSubmitHandler} className="container p-4 border rounded bg-white">
        <h1 className="display-6 text-center">Change the World</h1>
        <div className="form-group p-4">
        <input
            placeholder="Project Title"
            className={`form-control ${titleError ? "is-invalid" : ""}`}
            ref={inputTitleProject}
        />
        </div>
        <div className="form-group p-4">
        <label htmlFor="statusProject">Status:</label>
        <select
            id="statusProject"
            name="statusProject"
            className={`form-control ${statusError ? "is-invalid" : ""}`}
            ref={inputStatusProject}
            >
            <option value="New">New Project</option>
            <option value="In progress">Work in Progress</option>
            <option value="Pending">Pending Work</option>
            <option value="Finished">Finished</option>
        </select>
            </div>
        <div className="form-group p-4">
        <textarea
            placeholder="Project Details"
            rows="4"
            cols="50"
            className={`form-control ${detailsError ? "is-invalid" : ""}`}
            ref={inputDetailsProject}
            ></textarea>
            </div>
        <button type="submit" className="btn btn-outline-info m-4 ">
            Add Project
        </button >
        </form>
    </>
    );
}

export default AddProject;
