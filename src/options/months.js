import { ref } from 'sham-ui-macro/ref.macro';
import { title, classes } from '../utils/string';
import { clone, change, compare, formatDate } from '../utils/date';

export function monthOptions( component ) {
    return {
        [ ref( 'showChange' ) ]: true,
        [ ref( 'prevDelta' ) ]: -1,
        [ ref( 'nextDelta' ) ]: 1,
        [ ref( 'header' ) ]( date ) {
            return formatDate( date, 1 );
        },
        [ ref( 'items' ) ]( current, date, classForDate, isDateSelectable ) {
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
        [ ref( 'clickOnHeader' ) ]() {
            component[ ref( 'changeMode' ) ]( 'year' );
        },
        change( delta ) {
            component[ ref( 'changeDate' ) ](
                change( component.options[ ref( 'date' ) ], 'FullYear', delta )
            );
        },
        select( date ) {
            component[ ref( 'changeDate' ) ]( date );
            component[ ref( 'changeMode' ) ]( 'dom' );
        }
    };
}
