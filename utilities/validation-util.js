const ValidationUtil = {

    isPositiveInteger: (value) => {
        return (value !== 'undefined' && Number.isInteger(value) && value >= 0);
    },

    isPositiveNumber: (value) => {
        return (value !== 'undefined' && (typeof value === 'number') && value >= 0);
    }
};


module.exports = ValidationUtil;