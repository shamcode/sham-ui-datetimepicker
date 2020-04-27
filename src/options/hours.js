import { formatDate, clone, change, compare } from '../utils/date';
import { classes } from '../utils/string';

export function hoursOptions( component ) {
    return {
        showChange: false,
        header( date ) {
            return formatDate( date, 1 + 2 + 4 + 8 );
        },
        items( current, date, classForDate, isDateSelectable ) {
            const hours = new Array( 24 );
            let d = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                0,
                date.getMinutes(),
                date.getSeconds()
            );
            for ( let i = 0; i < 24; i++ ) {
                const hour = clone( d );
                hours[ i ] = {
                    date: hour,
                    class: classes( [
                        classForDate( hour ),
                        compare( current, hour, 1 + 2 + 4 + 8 ) ? 'active' : '',
                        isDateSelectable( hour ) ? '' : 'disabled'
                    ] ),
                    label: formatDate( hour, 16 )
                };
                d = change( d, 'Hours', 1 );
            }
            return hours;
        },
        clickOnHeader() {
            component.changeMode( 'dom' );
        },
        select( date ) {
            component.changeValue( date );
            component.changeMode( 'time' );
        }
    };
}
