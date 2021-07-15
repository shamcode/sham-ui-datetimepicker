import { $ } from 'sham-ui-macro/ref.macro';
import { formatDate, change, clone, compare } from '../utils/date';
import { classes } from '../utils/string';

export function yearOptions( component ) {
    return {
        [ $.showChange ]: true,
        [ $.prevDelta ]: -10,
        [ $.nextDelta ]: 10,
        [ $.header ]( date ) {
            const from = new Date( date.getFullYear() - 5, 0, 1 );
            const to = new Date( date.getFullYear() + 6, 0, 1 );
            return `${formatDate( from, 1 )} - ${formatDate( to, 1 )}`;
        },
        [ $.items ]( current, date, classForDate, isDateSelectable ) {
            const years = new Array( 12 );
            let d = new Date( date.getFullYear() - 5, 0, 1 );
            for ( let i = 0; i < 12; i++ ) {
                const year = clone( d );
                years[ i ] = {
                    date: year,
                    class: classes( [
                        'year',
                        classForDate( year ),
                        compare( current, year, 1 ) ? 'active' : '',
                        isDateSelectable( year ) ? '' : 'disabled'
                    ] ),
                    label: formatDate( year, 1 )
                };
                d = change( d, 'FullYear', 1 );
            }
            return years;
        },
        [ $.clickOnHeader ]() {
            component[ $.changeMode ]( 'yearRange' );
        },
        change( delta ) {
            component[ $.changeDate ](
                change( component.options[ $.date ], 'FullYear', delta )
            );
        },
        select( date ) {
            component[ $.changeDate ]( date );
            component[ $.changeMode ]( 'months' );
        }
    };
}
