import React from 'react';
import FullUrl from './full-url.js';

const {func, object, number} = React.PropTypes;

export default class Request extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.request.id !== nextProps.request.id ||
      this.props.positionTop !== nextProps.positionTop ||
      this.done !== nextProps.request.done;
  }

  _getLabels(request) {
    const {labels} = this.props.config;
    const url = request.fullUrl();
    const labelElements = [];

    if (request.mapped) {
      labelElements.push(
        <span className="label mapped" key="mapped">
          <i className="fa fa-warning"></i>
          mapped
        </span>
      );
    }

    labels.forEach(function(label, index) {
      if (label.regex.test(url)) {
        const classes = ['label'];
        classes.push(label.className);
        labelElements.push(
          <span className={classes.join(' ')} key={index}>
            {label.name}
          </span>
        );
      }
    });

    return labelElements;
  }

  render() {
    const {request, response, handleClick, positionTop} = this.props;

    this.done = request.done;

    let took = <i className="fa fa-gear fa-spin"></i>;
    if (request.took) {
      took = request.took + 'ms';
    }

    const style = {
      top: positionTop
    };

    return <div className="request" onClick={handleClick} style={style}>
      <span className="method property">{request.method}</span>
        <span className="time property">
          {took}
        </span>
        <span className="status-code property">
          {response.statusCode}
        </span>
      <FullUrl request={request} />

      <div className="labels">
        {this._getLabels(request)}
      </div>
    </div>;
  }
}

Request.propTypes = {
  config: object.isRequired,
  request: object.isRequired,
  response: object.isRequired,
  handleClick: func.isRequired,
  positionTop: number.isRequired
};
