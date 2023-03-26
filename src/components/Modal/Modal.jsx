import { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
  static propTypes = {
    escFunction: PropTypes.func,
    src: PropTypes.string,
    alt: PropTypes.string,
  };
  componentDidMount() {
    document.addEventListener('keydown', this.props.escFunction, false);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.props.escFunction, false);
  }

  render() {
    return (
      <div className="overlay">
        <div className="modal">
          <img src={this.props.src} alt={this.props.alt} />
        </div>
      </div>
    );
  }
}

export default Modal;
