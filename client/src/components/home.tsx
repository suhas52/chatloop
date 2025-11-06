
import { useContext } from "react";
import { UserContext } from "./userContext";
import CurrentConversations from "./conversations";




function Home() {
    const context = useContext(UserContext);
    if (!context) throw new Error("UserContext not found");
    const { user } = context;

    return (
        <CurrentConversations />
    )
}

export default Home;