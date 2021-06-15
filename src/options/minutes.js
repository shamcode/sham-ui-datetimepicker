import { ref } from 'sham-ui-macro/ref.macro';
import { formatDate, change, clone } from '../utils/date';
import { classes } from '../utils/string';

export function minutesOptions( component ) {
    return {
        [ ref( 'showChange' ) ]: false,
        [ ref( 'header' ) ]( date ) {
            return formatDate( date, 1 + 2 + 4 + 8 );
        },
        [ ref( 'items' ) ]( current, date, classForDate, isDateSelectable ) {
            const minutes = new Array( 12 );
            let d = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                date.getHours(),
                0,
                date.getSeconds()
            );
            for ( let i = 0; i < 12; i++ ) {
                const minute = clone( d );
                minutes[ i ] = {
                    date: minute,
                    class: classes( [
                        classForDate( minute ),
                        isDateSelectable( minute ) ? '' : 'disabled'
                    ] ),
                    label: formatDate( minute, 32 )
                };
                d = change( d, 'Minutes', 5 );
            }
            return minutes;
        },
        [ ref( 'clickOnHeader' ) ]() {
            component[ ref( 'changeMode' ) ]( 'dom' );
        },
        select( date ) {
            component[ ref( 'changeValue' ) ]( date );
            component[ ref( 'changeMode' ) ]( 'time' );
        }
    };
}
