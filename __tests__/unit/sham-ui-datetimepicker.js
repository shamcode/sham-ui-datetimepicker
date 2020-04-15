import renderer from 'sham-ui-test-helpers';
import DateTimePicker from '../../src/sham-ui-datetimepicker.sfc';

it( 'renders correctly', () => {
    const meta = renderer( DateTimePicker, {} );
    expect( meta.toJSON() ).toMatchSnapshot();
} );
