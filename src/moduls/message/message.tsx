
function Message(){
    const name = "Abdoul";
    if (name)
        return <h1>Hello {name} - by message</h1>;
    return <h1>Name not FOUND</h1>;
}

export default Message;