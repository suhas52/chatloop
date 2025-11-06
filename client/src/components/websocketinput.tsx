import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField"
import { ChangeEvent, useState } from "react"
import { socket } from "../socket";

function WebsocketInput({conversation_id, sender_id, receiver_id}: any) {
    const [textValue, setTextValue] = useState('');

    function handleChange(e: any) {
        
        setTextValue(e.target.value)
    }

    function handleSend() {
        socket.emit("message", {
            msg: textValue,
            conversation_id: conversation_id,
            sender_id: sender_id,
            receiver_id: receiver_id
        })
        setTextValue("")
    }

    return (<>
        <TextField value={textValue} onChange={handleChange} />
        <Button onClick={handleSend}>Send</Button>
        </>
    )
}

export default WebsocketInput