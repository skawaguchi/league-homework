import React from 'react';
import PropTypes from 'prop-types';

const Errors = (props) =>
    props.errors &&
        <p className='errors'>
            {props.errors}
        </p>;

Errors.propTypes = {
    errors: PropTypes.string
};

export default Errors;
