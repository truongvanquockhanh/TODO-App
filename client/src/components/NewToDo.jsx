import React from "react";

function NewToDo(data){
    return (
        <form  className="item" onSubmit={data.handleSubmit}>
            <input type="text" name="newItem" value={data.newItems} onChange={data.handleInput} placeholder="new item" autoComplete="off" />
            <button type="submit">+</button>
        </form>
    )
}
export default NewToDo;