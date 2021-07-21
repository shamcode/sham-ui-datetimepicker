import { $ } from 'sham-ui-macro/ref.macro';
import { title, classes } from '../utils/string';
import { clone, change, compare, formatDate } from '../utils/date';

export function monthOptions( component ) {
    return {
        [ $.showChange ]: true,
        [ $.prevDelta ]: -1,
        [ $.nextDelta ]: 1,
        [ $.header ]( date ) {
            return formatDate( date, 1 );
        },
        [ $.items ]( current, date, classForDate, isDateSelectable ) {
            const months = new Array( 12 );
            let d = new Date( date.getFullYear(), 0, 1 );
            for ( let i = 0; i < 12; i++ ) {
                const month = clone( d );
                months[ i ] = {
                    date: month,
                    class: classes( [
                        'month',
                        classForDate( month ),
                        compare( current, month, 1 + 2 ) ? 'active' : '',
                        isDateSelectable( month ) ? '' : 'disabled'
                    ] ),
                    label: title(
                        formatDate( month, 256 )
                    )
                };
                d = change( d, 'Month', 1 );
            }
            return months;
        },
        [ $.clickOnHeader ]() {
            component[ $.changeMode ]( 'year' );
        },
        [ $.change ]( delta ) {
            component[ $.changeDate ](
                change( component.options[ $.date ], 'FullYear', delta )
            );
        },
        [ $.select ]( date ) {
            component[ $.changeDate ]( date );
            component[ $.changeMode ]( 'dom' );
        }
    };
}
