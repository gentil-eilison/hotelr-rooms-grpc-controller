function isObjectEmpty(obj) {
    if (typeof obj === 'object') {
        return obj.keys().length === 0;
    }
    return false;
}

module.exports = { isObjectEmpty: isObjectEmpty}