import ItemList  from '../../../src/components/item-list.sfc';
import renderer from 'sham-ui-test-helpers';
import { onclick } from 'sham-ui-directives';

it( 'renders correctly', () => {
    const meta = renderer( ItemList, {
        today: new Date( 2020, 3, 25, 15, 3, 30 ),
        value: new Date( 2020, 3, 23, 13, 2, 17 ),
        date: new Date( 2020, 3, 23, 13, 2, 17 )
    }, {
        directives: {
            onclick
        }
    } );
    expect( meta.toJSON() ).toMatchSnapshot();
} );
