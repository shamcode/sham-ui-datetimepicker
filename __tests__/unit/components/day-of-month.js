import DayOfMonth  from '../../../src/components/day-of-month.sfc';
import { onclick } from 'sham-ui-directives';
import renderer from 'sham-ui-test-helpers';

it( 'renders correctly', () => {
    const meta = renderer( DayOfMonth, {
        today: new Date( 2020, 3, 25, 15, 3, 30 ),
        value: new Date( 2015, 1, 23, 13, 2, 17 ),
        date: new Date( 2015, 1, 23, 13, 2, 17 )
    }, {
        directives: {
            onclick
        }
    } );
    expect( meta.toJSON() ).toMatchSnapshot();
} );


it( 'changeMonth', () => {
    const meta = renderer( DayOfMonth, {
        today: new Date( 2020, 3, 25, 15, 3, 30 ),
        value: new Date( 2015, 1, 23, 13, 2, 17 ),
        date: new Date( 2015, 1, 23, 13, 2, 17 )
    }, {
        directives: {
            onclick
        }
    } );
    meta.ctx.container.querySelector( 'thead tr:first-child th:last-child' ).click();
    expect( meta.toJSON() ).toMatchSnapshot();
    meta.ctx.container.querySelector( 'thead tr:first-child th:first-child' ).click();
    expect( meta.toJSON() ).toMatchSnapshot();
} );
