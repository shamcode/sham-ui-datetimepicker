import ItemsList  from '../../../src/components/item-list.sfc';
import { hoursOptions } from '../../../src/options/hours';
import renderer from 'sham-ui-test-helpers';
import { onclick } from 'sham-ui-directives';

it( 'renders correctly', () => {
    const meta = renderer( ItemsList, {
        today: new Date( 2020, 3, 25, 15, 3, 30 ),
        value: new Date( 2020, 3, 23, 13, 2, 17 ),
        date: new Date( 2020, 3, 23, 13, 2, 17 ),
        directives: {
            onclick
        },
        ...hoursOptions()
    } );
    expect( meta.toJSON() ).toMatchSnapshot();
} );


it( 'change', () => {
    const changeValue = jest.fn();
    const changeMode = jest.fn();
    const meta = renderer( ItemsList, {
        today: new Date( 2020, 3, 25, 15, 3, 30 ),
        value: new Date( 2020, 3, 23, 13, 2, 17 ),
        date: new Date( 2020, 3, 23, 13, 2, 17 ),
        directives: {
            onclick
        },
        isDateSelectable( date ) {
            return date.getHours() < 5;
        },
        ...hoursOptions( {
            changeValue,
            changeMode
        } )
    } );
    expect( meta.toJSON() ).toMatchSnapshot();

    meta.component.container.querySelector( 'tbody span:nth-child(3)' ).click();
    expect( changeValue ).toHaveBeenCalledTimes( 1 );
    expect( changeValue.mock.calls[ 0 ][ 0 ].toISOString() ).toBe( '2020-04-22T19:02:17.000Z' );
    expect( changeMode ).toHaveBeenCalledTimes( 1 );
    expect( changeMode.mock.calls[ 0 ][ 0 ] ).toBe( 'time' );

    meta.component.container.querySelector( 'thead th:nth-child(2)' ).click();
    expect( changeValue ).toHaveBeenCalledTimes( 1 );
    expect( changeMode ).toHaveBeenCalledTimes( 2 );
    expect( changeMode.mock.calls[ 1 ][ 0 ] ).toBe( 'dom' );
} );
