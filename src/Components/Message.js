import React from 'react';
import './Message.css';

const Message = (props) =>(
    <div className="toast position-fixed" role="alert" data-bs-autohide="false" aria-live="assertive" aria-atomic="true">
        <div className="toast-header"> 
          <strong className="me-auto">1 Yeni Mesaj!</strong> 
          <button type="button" className="btn-close" onClick={props.messageHide} data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div className="toast-body">
          {props.message.description}
        </div>
    </div>
);

export default Message;