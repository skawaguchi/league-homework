import React from 'react';
import PropTypes from 'prop-types';

const ErrorContainer = (props) =>
    props.errors &&
        <p className='errors'>
            {props.errors}
        </p>;

ErrorContainer.propTypes = {
    errors: PropTypes.string
};

export default ErrorContainer;
