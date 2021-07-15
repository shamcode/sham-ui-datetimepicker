import { $ } from 'sham-ui-macro/ref.macro';
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
        [ $.showChange ]: true,
        [ $.prevDelta ]: -100,
        [ $.nextDelta ]: 100,
        [ $.header ]( date ) {
            const century = getCentury( date );
            const from = new Date( century - 1, 0, 1 );
            const to = new Date( century + 99, 0, 1 );
            return `${formatDate( from, 1 )} - ${formatDate( to, 1 )}`;
        },
        [ $.items ]( current, date ) {
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
        [ $.change ]( delta ) {
            component[ $.changeDate ](
                change( component.options[ $.date ], 'FullYear', delta )
            );
        },
        [ $.select ]( date ) {
            component[ $.changeDate ]( date );
            component[ $.changeMode ]( 'year' );
        }
    };
}
