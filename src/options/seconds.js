import { ref } from 'sham-ui-macro/ref.macro';
import { formatDate, change, clone } from '../utils/date';
import { classes } from '../utils/string';

export function secondsOptions( component ) {
    return {
        [ ref( 'showChange' ) ]: false,
        [ ref( 'header' ) ]( date ) {
            return formatDate( date, 1 + 2 + 4 + 8 );
        },
        [ ref( 'items' ) ]( current, date, classForDate, isDateSelectable ) {
            const seconds = new Array( 12 );
            let d = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                date.getHours(),
                date.getMinutes()
            );
            for ( let i = 0; i < 12; i++ ) {
                const second = clone( d );
                seconds [ i ] = {
                    date: second,
                    class: classes( [
                        classForDate( second ),
                        isDateSelectable( second ) ? '' : 'disabled'
                    ] ),
                    label: formatDate( second, 64 )
                };
                d = change( d, 'Seconds', 5 );
            }
            return seconds;
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
