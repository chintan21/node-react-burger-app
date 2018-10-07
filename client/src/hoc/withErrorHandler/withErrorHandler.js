import React from 'react';
import Modal from '../../components/UI/Modal/Modal';


const errorHandler = (WrappedComponent, axios) => {
  return  class extends React.Component {

      state = {
        error: null
      };

      componentWillMount(){
           this.requestInterceptors =  axios.interceptors.request.use(null, error => {
             this.setState({error:null});
             console.log('did mount [req]');
          });

          this.responceInterceptors = axios.interceptors.response.use(null, error => {
            this.setState({error:error});
            console.log('did mount [res]')
          });
      }

      componentWillUnmount(){
          axios.interceptors.request.eject(this.requestInterceptors);
          axios.interceptors.response.eject(this.responceInterceptors);
      }

      errorConfirmedHandler = () => {
          this.setState({error:null})
      };

    render(){
        return(
            <React.Fragment>
                <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler} >
                    {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrappedComponent {...this.props}/>
            </React.Fragment>
        );
    }
  }
};

export default errorHandler;