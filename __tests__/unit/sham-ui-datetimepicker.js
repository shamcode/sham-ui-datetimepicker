import renderer from 'sham-ui-test-helpers';
import { onclick } from 'sham-ui-directives';
import DateTimePicker from '../../src/sham-ui-datetimepicker.sfc';

it( 'renders correctly', () => {
    const meta = renderer( DateTimePicker, {
        today: new Date( 2020, 3, 25, 15, 3, 30 ),
        value: new Date( 2020, 3, 23, 13, 2, 17 )
    }, {
        directives: {
            onclick
        }
    } );
    expect( meta.toJSON() ).toMatchSnapshot();
} );


it( 'isDateSelectable options', () => {
    const meta = renderer( DateTimePicker, {
        today: new Date( 2020, 3, 25, 15, 3, 30 ),
        value: new Date( 2020, 3, 23, 13, 2, 17 ),
        isDateSelectable( date ) {
            return date.getMonth() === 3;
        }
    }, {
        directives: {
            onclick
        }
    } );
    expect( meta.toJSON() ).toMatchSnapshot();
} );


it( 'classForDate', () => {
    const meta = renderer( DateTimePicker, {
        today: new Date( 2020, 3, 25, 15, 3, 30 ),
        value: new Date( 2020, 3, 23, 13, 2, 17 ),
        classForDate( date ) {
            const dom = date.getDate();
            return (
                date.getMonth() === 3 &&
                dom > 15 &&
                dom < 30
            ) ? 'range' : '';
        }
    }, {
        directives: {
            onclick
        }
    } );
    expect( meta.toJSON() ).toMatchSnapshot();
} );


it( 'onChange', () => {
    let component;
    const onChange = jest.fn().mockImplementation(
        ( date ) => component.update( { value: date } )
    );
    const meta = renderer( DateTimePicker, {
        today: new Date( 2020, 3, 25, 15, 3, 30 ),
        value: new Date( 2020, 3, 23, 13, 2, 17 ),
        onChange
    }, {
        directives: {
            onclick
        }
    } );
    component = meta.component;
    meta.ctx.container.querySelector( 'tr:nth-child(3) td.day:nth-child(5)' ).click();
    expect( onChange ).toHaveBeenCalledTimes( 1 );
    expect( onChange.mock.calls[ 0 ] ).toEqual( [
        new Date( 2020, 3, 17, 0, 0, 0 )
    ] );
    expect( meta.toJSON() ).toMatchSnapshot();
} );

it( 'onChange for not allowed', () => {
    const onChange = jest.fn();
    const meta = renderer( DateTimePicker, {
        today: new Date( 2020, 3, 25, 15, 3, 30 ),
        value: new Date( 2020, 3, 23, 13, 2, 17 ),
        onChange,
        isDateSelectable: () => false
    }, {
        directives: {
            onclick
        }
    } );
    meta.ctx.container.querySelector( 'tr:nth-child(3) td.day:nth-child(5)' ).click();
    expect( onChange ).toHaveBeenCalledTimes( 0 );
    expect( meta.toJSON() ).toMatchSnapshot();
} );

it( 'change month & time', () => {
    let component;
    const onChange = jest.fn().mockImplementation(
        ( date ) => component.update( { value: date } )
    );
    const meta = renderer( DateTimePicker, {
        today: new Date( 2020, 3, 25, 15, 3, 30 ),
        value: new Date( 2020, 3, 23, 13, 2, 17 ),
        onChange
    }, {
        directives: {
            onclick
        }
    } );
    component = meta.component;
    meta.ctx.container.querySelector( 'thead tr th:nth-child(2)' ).click();
    meta.ctx.container.querySelector( 'tr .month:nth-child(5)' ).click();
    meta.ctx.container.querySelector( 'tr:nth-child(3) td.day:nth-child(5)' ).click();
    expect( onChange ).toHaveBeenCalledTimes( 1 );
    expect( onChange.mock.calls[ 0 ][ 0 ].toISOString() ).toBe( '2020-05-14T17:00:00.000Z' );

    meta.ctx.container.querySelector( 'tfoot tr th' ).click();

    document.querySelector( 'tr:nth-child(1) td.change:nth-child(1)' ).click();
    expect( onChange ).toHaveBeenCalledTimes( 2 );
    expect( onChange.mock.calls[ 1 ][ 0 ].toISOString() ).toBe( '2020-05-14T18:00:00.000Z' );

    document.querySelector( 'tr:nth-child(1) td.change:nth-child(3)' ).click();
    expect( onChange ).toHaveBeenCalledTimes( 3 );
    expect( onChange.mock.calls[ 2 ][ 0 ].toISOString() ).toBe( '2020-05-14T18:01:00.000Z' );

    document.querySelector( 'tr:nth-child(3) td.change:nth-child(5)' ).click();
    expect( onChange ).toHaveBeenCalledTimes( 4 );
    expect( onChange.mock.calls[ 3 ][ 0 ].toISOString() ).toBe( '2020-05-14T18:00:59.000Z' );
    expect( meta.toJSON() ).toMatchSnapshot();

    meta.ctx.container.querySelector( 'thead tr th' ).click();

    expect( meta.toJSON() ).toMatchSnapshot();
} );

it( 'default onChange', () => {
    const meta = renderer( DateTimePicker, {
        today: new Date( 2020, 3, 25, 15, 3, 30 ),
        value: new Date( 2020, 3, 23, 13, 2, 17 )
    }, {
        directives: {
            onclick
        }
    } );
    meta.ctx.container.querySelector( 'tr:nth-child(3) td.day:nth-child(5)' ).click();
    expect( meta.toJSON() ).toMatchSnapshot();
} );
