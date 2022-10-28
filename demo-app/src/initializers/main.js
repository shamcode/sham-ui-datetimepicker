import { createRootContext } from 'sham-ui';
import App from '../components/App.sfc';
import { onclick } from 'sham-ui-directives';

export default function( DI ) {
    new App(
        createRootContext( {
            DI,
            ID: 'app',
            container: document.querySelector( 'body' ),
            directives: {
                onclick
            }
        } )
    );
}
