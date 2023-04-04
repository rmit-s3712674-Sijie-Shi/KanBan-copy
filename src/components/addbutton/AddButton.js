import React from "react";

const style = {
    "paddingBottom" : '3px'
}

const AddButton = ({ handler }) => {
    return (
        <div onClick={handler} style={style}> + </div>
    )
}

export default AddButton;