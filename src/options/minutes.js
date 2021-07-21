import { $ } from 'sham-ui-macro/ref.macro';
import { formatDate, change, clone } from '../utils/date';
import { classes } from '../utils/string';

export function minutesOptions( component ) {
    return {
        [ $.showChange ]: false,
        [ $.header ]( date ) {
            return formatDate( date, 1 + 2 + 4 + 8 );
        },
        [ $.items ]( current, date, classForDate, isDateSelectable ) {
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
        [ $.clickOnHeader ]() {
            component[ $.changeMode ]( 'dom' );
        },
        [ $.select ]( date ) {
            component[ $.changeValue ]( date );
            component[ $.changeMode ]( 'time' );
        }
    };
}
