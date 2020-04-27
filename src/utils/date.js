/**
 * Format date
 * @param {Date} date
 * @param {number} mode
 * @return {string}
 */
export const formatDate = ( date, mode ) => {
    const param = {
        hour12: false
    };
    if ( mode & 1 ) {
        param.year = 'numeric';
    }
    if ( mode & 2 ) {
        param.month = 'long';
    }
    if ( mode & 4 ) {
        param.day = 'numeric';
    }
    if ( mode & 8 ) {
        param.weekday = 'long';
    }
    if ( mode & 16 ) {
        param.hour = '2-digit';
    }
    if ( mode & 32 ) {
        param.minute = '2-digit';
    }
    if ( mode & 64 ) {
        param.second = '2-digit';
    }
    if ( mode & 128 ) {
        param.weekday = 'short';
    }
    if ( mode & 256 ) {
        param.month = 'short';
    }
    return date.toLocaleString( 'default', param );
};


/**
 * @param {Date} date
 * @param {string} type
 * @param {number} delta
 * @return {Date}
 */
export const change = ( date, type, delta ) => new Date(
    date[ `set${type}` ](
        date[ `get${type}` ]() + delta
    )
);


/**
 * @param {Date} date
 * @return {Date}
 */
export const clone = ( date ) => new Date( date.getTime() );


/**
 * Compare two date with mode
 * @param {Date} a
 * @param {Date} b
 * @param {number} mode bitwise mask
 */
export const compare = ( a, b, mode ) => {
    if ( ( mode & 1 ) && a.getFullYear() !== b.getFullYear() ) {
        return false;
    }
    if ( ( mode & 2 ) && a.getMonth() !== b.getMonth() ) {
        return false;
    }
    if ( ( mode & 4 ) && a.getDate() !== b.getDate() ) {
        return false;
    }
    if ( ( mode & 8 ) && a.getHours() !== b.getHours() ) {
        return false;
    }
    return true;
};
