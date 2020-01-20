import 'destyleCss/destyle.css';
import './scss/app.scss';
import App from './components/App.svelte';

const app = new App({
    target: document.body
});

export default app;