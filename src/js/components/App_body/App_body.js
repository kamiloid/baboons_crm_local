// --------------------------------------------------------------------------------
// IMPORTS [ ONLY WITH WEBPACK ]
// --------------------------------------------------------------------------------
// import [class name | variable]('file_path[.js]');
import Rapp from '../../relast.js';
import view from './App_body.html';
import scss from './main.scss';

import Connection_status from '../Connection_status/index.js';
import Login from '../Login/index.js';
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
export default class App_body extends Rapp
{
    constructor(conf)
    {
        super(conf);
        // --------------------------------------------------------------------------------
        // ADD COMPONENTS [ ONLY WITH WEBPACK ]
        // --------------------------------------------------------------------------------
        // this.add_comp([class_name:string], [class:class]);
        // this.add_comps([classes:Array]); --> item array: {name: [class_name:string], class: [class:imported-object]}
        this.add_comps([
            {name: 'Connection_status', class: Connection_status},
            {name: 'Login', class: Login}
        ]);
        // --------------------------------------------------------------------------------
        // --------------------------------------------------------------------------------
        // --------------------------------------------------------------------------------
        // INCLUDES [ ONLY WITHOUT WEBPACK ]
        // --------------------------------------------------------------------------------
        // this.include('file_path[.js]', [class_name]);
        // --------------------------------------------------------------------------------
        // --------------------------------------------------------------------------------
    }
    states()
    {
        // --------------------------------------------------------------------------------
        // STATES
        // --------------------------------------------------------------------------------
        // - create or change state: this.state('state_key', [value]);
        // - get state: this.get_state('state_key');
        // --------------------------------------------------------------------------------
        // --------------------------------------------------------------------------------
		this.state('logged', false);
    }
    methods()
    {
        // --------------------------------------------------------------------------------
        // METHODS: THESE METHODS DO NOT HAVE THE ABILITY TO CHANGE THE DOM OF THE COMPONENTS
        // BUT THEIR CAN CHANGE THE COMPONENT's STATES WITHOUT ANY CONSECUENCE
        // --------------------------------------------------------------------------------
        // - create a method: this.method('state_key', (args)=>{...});
        // - call a method: this.call_method('state_key', args...);
        // --------------------------------------------------------------------------------
        // --------------------------------------------------------------------------------
    }
    created(){}
    rendered(){}
    run = function(props)
    {
        this.state('api', props.api);
        // --------------------------------------------------------------------------------
        // ACTIONS
        // --------------------------------------------------------------------------------
        // this.action('action_key', (args)=>{...});
        // this.call_action('action_key', args[object]);
        // --------------------------------------------------------------------------------
        // --------------------------------------------------------------------------------

        // --------------------------------------------------------------------------------
        // HTML VIEWs
        // - include view:
        //		- this._view.[var] = `[html string]`;
        // - include styles:
        // 		- this._view.style = ``;
        // - include iterators: (ITERATORS MUST TO BE BEFORE TO this._view.main)
        // 		- this._view.iterators.[var] = `<tag key='[k]'>[v]</tag>`
        // - include components: THE TAG MUST TO BE THE SAME NAME TO THE NAME COMPONENT AND PROPERTIES AS ATTRIBUTES
        // --------------------------------------------------------------------------------
        //this._view.iterators.items = `<p key='[k]'>[v]</p>`;

        this._view.style =``;

        this._view.main = view;
        // --------------------------------------------------------------------------------
        // --------------------------------------------------------------------------------
    }
}
App_body.default_props = {};
// --------------------------------------------------------------------------------
// INCLUDE INTO window OBJECT [ ONLY WITOUT WEBPACK ]
// --------------------------------------------------------------------------------
// window.App_body = App_body;