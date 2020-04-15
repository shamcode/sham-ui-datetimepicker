import App from '../components/App.sfc';

export default function() {
    new App( {
        ID: 'app',
        container: document.querySelector( 'body' )
    } );
}
