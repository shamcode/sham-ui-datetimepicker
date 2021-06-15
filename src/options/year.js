import { ref } from 'sham-ui-macro/ref.macro';
import { formatDate, change, clone, compare } from '../utils/date';
import { classes } from '../utils/string';

export function yearOptions( component ) {
    return {
        [ ref( 'showChange' ) ]: true,
        [ ref( 'prevDelta' ) ]: -10,
        [ ref( 'nextDelta' ) ]: 10,
        [ ref( 'header' ) ]( date ) {
            const from = new Date( date.getFullYear() - 5, 0, 1 );
            const to = new Date( date.getFullYear() + 6, 0, 1 );
            return `${formatDate( from, 1 )} - ${formatDate( to, 1 )}`;
        },
        [ ref( 'items' ) ]( current, date, classForDate, isDateSelectable ) {
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
        [ ref( 'clickOnHeader' ) ]() {
            component[ ref( 'changeMode' ) ]( 'yearRange' );
        },
        change( delta ) {
            component[ ref( 'changeDate' ) ](
                change( component.options[ ref( 'date' ) ], 'FullYear', delta )
            );
        },
        select( date ) {
            component[ ref( 'changeDate' ) ]( date );
            component[ ref( 'changeMode' ) ]( 'months' );
        }
    };
}
