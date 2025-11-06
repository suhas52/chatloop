
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./userContext";
import CurrentConversations from "./conversations";
import Box from "@mui/material/Box";
import Messages from "./messages";




function Home() {
    const context = useContext(UserContext);
    if (!context) throw new Error("UserContext not found");
    const { user } = context;
    const [currentConvo, setCurrentConvo] = useState(null)

    return (
        <Box display={"flex"}>
        <CurrentConversations setCurrentConvo={setCurrentConvo}/>
        {currentConvo && <Messages currentConvo={currentConvo}/>}
        </Box>
    )
}

export default Home;