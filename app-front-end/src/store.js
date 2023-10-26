import { configureStore} from "@reduxjs/toolkit";
import projectSlice from "./routes/projectSlice";

export default configureStore ({
    reducer: {
        projects : projectSlice
    }
})