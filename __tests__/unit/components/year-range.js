import ItemsList  from '../../../src/components/item-list.sfc';
import { yearsRangeOptions } from '../../../src/options/year-range';
import renderer from 'sham-ui-test-helpers';
import { onclick } from 'sham-ui-directives';

it( 'renders correctly', () => {
    const meta = renderer( ItemsList, {
        today: new Date( 2020, 3, 25, 15, 3, 30 ),
        value: new Date( 2020, 3, 23, 13, 2, 17 ),
        date: new Date( 2020, 3, 23, 13, 2, 17 ),
        ...yearsRangeOptions()
    }, {
        directives: {
            onclick
        }
    } );
    expect( meta.toJSON() ).toMatchSnapshot();
} );


it( 'change', () => {
    const changeDate = jest.fn();
    const changeMode = jest.fn();
    const value = new Date( 2020, 3, 23, 13, 2, 17 );
    const meta = renderer( ItemsList, {
        today: new Date( 2020, 3, 25, 15, 3, 30 ),
        value,
        date: new Date( 2020, 3, 23, 13, 2, 17 ),
        ...yearsRangeOptions( {
            changeDate,
            changeMode,
            options: {
                date: new Date( value.getTime() )
            }
        } )
    }, {
        directives: {
            onclick
        }
    } );

    meta.ctx.container.querySelector( 'thead tr th:first-child' ).click();
    expect( changeDate ).toHaveBeenCalledTimes( 1 );
    expect( changeDate.mock.calls[ 0 ][ 0 ].toISOString() ).toBe( '1920-04-23T07:02:17.000Z' );
    expect( meta.toJSON() ).toMatchSnapshot();

    meta.ctx.container.querySelector( 'thead tr th:last-child' ).click();
    expect( changeDate ).toHaveBeenCalledTimes( 2 );
    expect( changeDate.mock.calls[ 1 ][ 0 ].toISOString() ).toBe( '2020-04-23T06:02:17.000Z' );
    expect( meta.toJSON() ).toMatchSnapshot();

    meta.ctx.container.querySelector( 'tbody span:nth-child(3)' ).click();
    expect( changeDate ).toHaveBeenCalledTimes( 3 );
    expect( changeDate.mock.calls[ 2 ][ 0 ].toISOString() ).toBe( '2024-12-31T17:00:00.000Z' );
    expect( changeMode ).toHaveBeenCalledTimes( 1 );
    expect( changeMode.mock.calls[ 0 ][ 0 ] ).toBe( 'year' );

    meta.ctx.container.querySelector( 'thead tr th:nth-child(2)' ).click();
    expect( changeMode ).toHaveBeenCalledTimes( 1 );
} );
