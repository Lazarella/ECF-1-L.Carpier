import { useRef, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

function DeleteProject() {
    const inputTitleProject = useRef();
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const id = params.get("id") ?? null;

    useEffect(() => {
        if (id !== null) {
            axios.get(`http://localhost:5000/projects/${id}`)
                .then(response => {
                    inputTitleProject.current.value = response.data.title; 
                })
                .catch(error => {
                    console.error("Error fetching project:", error);
                });
        }
    }, [id]);

    const handleSubmit = () => {
        if (id !== null) {
            axios.delete(`http://localhost:5000/projects/${id}`)
                .then(response => {
                    console.log(response.data);
                    navigate("/");
                })
                .catch(error => {
                    console.error("Error deleting project:", error);
                });
        } else {
            console.log("No project ID specified for deletion.");
        }
    }

    return (
        <>
            <h1>Delete Project</h1>
            <input placeholder="Project Title" ref={inputTitleProject} />
            <button onClick={handleSubmit}>Delete Project</button>
            <br></br>
            <Link to="/">Home</Link>
        </>
    );
}

// maybe adding a confirmation case?

export default DeleteProject;
