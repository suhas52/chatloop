
import { useContext } from "react";
import { UserContext } from "./userContext";




function Home() {
    const context = useContext(UserContext);
    if (!context) throw new Error("UserContext not found");
    const { user } = context;

    return (
        <>{user?.username}</>
    )
}

export default Home;