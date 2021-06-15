import { ref } from 'sham-ui-macro/ref.macro';
import { formatDate, change } from '../utils/date';
import { classes } from '../utils/string';

const getCentury = ( date ) => 100 * Math.floor( date.getFullYear() / 100 );

const isCurrentYearRange = ( current, yearRange ) => {
    const year = current.getFullYear();
    return yearRange.from <= year &&
        yearRange.to >= year;
};

export function yearsRangeOptions( component ) {
    return {
        [ ref( 'showChange' ) ]: true,
        [ ref( 'prevDelta' ) ]: -100,
        [ ref( 'nextDelta' ) ]: 100,
        [ ref( 'header' ) ]( date ) {
            const century = getCentury( date );
            const from = new Date( century - 1, 0, 1 );
            const to = new Date( century + 99, 0, 1 );
            return `${formatDate( from, 1 )} - ${formatDate( to, 1 )}`;
        },
        [ ref( 'items' ) ]( current, date ) {
            const years = new Array( 10 );
            const century = getCentury( date );
            let d = new Date( century, 0, 1 );
            for ( let i = 0; i < 10; i++ ) {
                const from  = d.getFullYear();
                const to = from + 9;
                const date = new Date( from + 5, 0, 1 );
                const range = {
                    from,
                    to,
                    date,
                    label: `${formatDate( new Date( from, 0, 1 ), 1 )} - ${formatDate( new Date( to, 0, 1 ), 1 )}`
                };
                range.class = classes( [
                    'decade',
                    isCurrentYearRange( current, range ) ? 'active' : ''
                ] );
                years[ i ] = range;
                d = change( d, 'FullYear', 10 );
            }
            return years;
        },
        [ ref( 'change' ) ]( delta ) {
            component[ ref( 'changeDate' ) ](
                change( component.options[ ref( 'date' ) ], 'FullYear', delta )
            );
        },
        [ ref( 'select' ) ]( date ) {
            component[ ref( 'changeDate' ) ]( date );
            component[ ref( 'changeMode' ) ]( 'year' );
        }
    };
}
