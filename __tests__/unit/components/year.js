import ItemsList  from '../../../src/components/item-list.sfc';
import { yearOptions } from '../../../src/options/year';
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
        ...yearOptions()
    } );
    expect( meta.toJSON() ).toMatchSnapshot();
} );


it( 'change', () => {
    const changeDate = jest.fn();
    const changeMode = jest.fn();
    const value =  new Date( 2020, 3, 23, 13, 2, 17 );
    const meta = renderer( ItemsList, {
        today: new Date( 2020, 3, 25, 15, 3, 30 ),
        value,
        date: new Date( 2020, 3, 23, 13, 2, 17 ),
        directives: {
            onclick
        },
        isDateSelectable( date ) {
            return date.getFullYear() <= 2020;
        },
        ...yearOptions( {
            changeMode,
            changeDate,
            options: {
                date: new Date( value.getTime() )
            }
        } )
    } );
    expect( meta.toJSON() ).toMatchSnapshot();

    meta.component.container.querySelector( 'thead tr th:first-child' ).click();
    expect( changeDate ).toHaveBeenCalledTimes( 1 );
    expect( changeDate.mock.calls[ 0 ][ 0 ].toISOString() ).toBe( '2010-04-23T06:02:17.000Z' );
    expect( meta.toJSON() ).toMatchSnapshot();

    meta.component.container.querySelector( 'thead tr th:last-child' ).click();
    expect( changeDate ).toHaveBeenCalledTimes( 2 );
    expect( changeDate.mock.calls[ 1 ][ 0 ].toISOString() ).toBe( '2020-04-23T06:02:17.000Z' );
    expect( meta.toJSON() ).toMatchSnapshot();

    meta.component.container.querySelector( 'tbody span:nth-child(3)' ).click();
    expect( changeDate ).toHaveBeenCalledTimes( 3 );
    expect( changeDate.mock.calls[ 2 ][ 0 ].toISOString() ).toBe( '2016-12-31T17:00:00.000Z' );
    expect( changeMode ).toHaveBeenCalledTimes( 1 );
    expect( changeMode.mock.calls[ 0 ][ 0 ] ).toBe( 'months' );

    meta.component.container.querySelector( 'thead tr th:nth-child(2)' ).click();
    expect( changeMode ).toHaveBeenCalledTimes( 2 );
    expect( changeMode.mock.calls[ 1 ][ 0 ] ).toBe( 'yearRange' );
} );
