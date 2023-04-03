import React from "react";

const AddButton = ({ handler }) => {
    return (
        <div onClick={handler}> + </div>
    )
}

export default AddButton;