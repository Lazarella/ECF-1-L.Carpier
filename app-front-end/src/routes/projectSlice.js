import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    projects: [],
    loading: "idle",
    error: null,
};

export const fetchProjects = createAsyncThunk("projects/fetchProjects", async () => {
    const response = await axios.get("http://localhost:5000/projects");
    console.log("the db is sending the info");
    return response.data;
});

export const createProject = createAsyncThunk("projects/createProject", async (projectData) => {
    const response = await axios.post("http://localhost:5000/projects", projectData);
    return response.data;
});

export const updateProject = createAsyncThunk("projects/updateProject", async (projectData) => {
    const response = await axios.put(`http://localhost:5000/projects/${projectData.id}`, projectData);
    return response.data;
});

export const deleteProject = createAsyncThunk("projects/deleteProject", async (projectId) => {
    const response = await axios.delete(`http://localhost:5000/projects/${projectId}`);
    return projectId;
});

const projectSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.pending, (state) => {
                state.loading = "pending";
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.loading = "fulfilled";
                state.projects = action.payload;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.loading = "rejected";
                state.error = action.error.message;
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.projects.push(action.payload);
            })
            .addCase(updateProject.fulfilled, (state, action) => {
                const updatedProjectIndex = state.projects.findIndex((project) => project.id === action.payload.id);
                if (updatedProjectIndex !== -1) {
                    state.projects[updatedProjectIndex] = action.payload;
                }
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.projects = state.projects.filter((project) => project.id !== action.payload);
            });
    },
});

export default projectSlice.reducer;
