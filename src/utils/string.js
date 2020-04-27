/**
 * Title string 'april' -> 'April'
 * @param {string} str
 * @return string
 */
export const title = ( str ) => str[ 0 ].toUpperCase() + str.slice( 1 );

/**
 * @param {string[]} arr
 * @return {string}
 */
export const classes = ( arr ) => arr.filter( Boolean ).join( ' ' ).trim();
