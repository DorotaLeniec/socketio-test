import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import io from 'socket.io-client'
const socket = io.connect("http://localhost:3001");

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ],
}

export default function TextEditor() {
    const [value, setValue] = useState('');

    useEffect(() => {
        socket.on("change", (data) => {
            console.log('>> change', data.message);
            setValue(data.message)
        })

    }, [socket]);


    const sendMessage = () => {
        socket.emit("send_message", { message: value })
    }


    return (
        <>
            <button className="saveButton" onClick={sendMessage}>Save</button>
            <ReactQuill
                className="editor"
                theme="snow"
                value={value}
                modules={modules}
                onChange={setValue}
            />
        </>

    )

}
