import ProjectItem from './ProjectItem'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchProjects } from './projectSlice'


const ProjectList =()=> {
    const projects = useSelector(state => state.projects.projects)

    const dispatch = useDispatch(); 

    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);

    return (
        <>
            <table className="table mt-5 table-dark block">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Detail</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody  className="table-group-divider">
                    {
                        projects.map((project, index) => (
                            <ProjectItem project={project} key={index} />
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default ProjectList