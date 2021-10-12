import React from "react";

function List(data){

    
    return (
            <form >
                <div className="item">
                    <input type="checkbox" onChange={data.handleChange} name="checkbox" value={data.id} />
                    <p>{data.name}</p>
                </div>
                <input type="hidden" name="listName" value="" />
            </form>
    );

};

export default List;
