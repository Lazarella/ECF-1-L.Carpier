import { useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { deleteProject, updateProject } from "./projectSlice"; 


const ProjectsItem = (props) => {
    const dispatch = useDispatch();
    const project = props.project;
    const titleRef = useRef();
    const statusRef = useRef();
    const detailRef = useRef();
    const [update, setUpdate] = useState(false); 

    // useEffect(() => {
    //     dispatch(fetchProjects());
    //   }, []);

    const updateProjectHandler = (event) => {
        event.preventDefault(); 

        const newTitle = titleRef.current.value || project.title; 
        const newStatus = statusRef.current.value || project.status;
        const newDetail = detailRef.current.value || project.details;

        const updatedProject = {
            id: project.id,
            title: newTitle,
            status: newStatus,
            details: newDetail,
        };


        dispatch(updateProject(updatedProject));
        setUpdate(!update);
    }

    console.log(project);

    return (
        <>
            {update ? (
                <tr>
                    <td>
                        <input
                            type="text"
                            placeholder={project.title}
                            className="form-control"
                            ref={titleRef}
                            defaultValue={project.title}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            placeholder={project.status}
                            className="form-control"
                            ref={statusRef}
                            defaultValue={project.status}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            placeholder={project.details}
                            className="form-control"
                            ref={detailRef}
                            defaultValue={project.details}
                        />
                    </td>
                    <td>
                        <button onClick={updateProjectHandler} className="btn btn-success me-1">Valid</button>
                        <button onClick={() => setUpdate(!update)} className="btn btn-danger">Abort</button>
                    </td>
                </tr>
            ) : (
                <tr>
                    <td>{project.title}</td>
                    <td>{project.status}</td>
                    <td>{project.details}</td>
                    <td>
                        <button onClick={() => setUpdate(!update)} className="btn btn-outline-light m-1 btn-lg btn-block">Edit</button>
                        <button onClick={() => dispatch(deleteProject(project.id))} className="btn btn-outline-danger m-1 btn-block">Delete</button>
                    </td>
                </tr>
            )}
        </>
    );
}

export default ProjectsItem;
