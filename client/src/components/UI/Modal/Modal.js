import React from  'react';
import cssClasses from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends React.Component{

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show || ( this.props.show && nextProps.children !== this.props.children);
    }

    render(){
        return(
            <React.Fragment>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div
                    style={{
                        transform: this.props.show ? 'translateY(0)':'translateY(-100vh)',
                        opacity:this.props.show ? 1: 0
                    }}
                    className={cssClasses.Modal}>
                    {this.props.children}
                </div>
            </React.Fragment>
        );
    }
}

export default Modal;