import React from 'react';
const Model = ({refe,onClose,title,children}) =>{
    return(
        <div className="modal">
            <div className="modal-content animate" ref={refe}>
                <span className="close-button" onClick={onClose}>&times;</span>
                {title && <h3>{title}</h3>}
                {children}
            </div>
        </div>
    )
}

export default Model;