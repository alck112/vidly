import React from "react";

const LikeButton = (props) => {
    // const getHeartClasses = () => {
    //     let classes = "";
    //     classes = props.movie.isLiked ? "fa fa-heart" : "fa fa-heart-o";
    //     return classes;
    // }

    let classes = "fa fa-heart";
    if (!props.movie.isLiked) {
        classes += "-o";
    }

    return (
        <div>
            <i onClick={props.onLikeClick}
                className={classes}
                style={{cursor: "pointer"}}
            ></i>
        </div>
    );
};

export default LikeButton;