// --------------------------------------------------------------------------------
// IMPORTS [ ONLY WITH WEBPACK ]
// --------------------------------------------------------------------------------
// import [class name | variable]('file_path[.js]');
import Rapp from '../../relast.js';
import view from './index.html';
import scss from './main.scss';
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
export default class Login extends Rapp
{
    constructor(conf)
    {
        super(conf);
        // --------------------------------------------------------------------------------
        // ADD COMPONENTS [ ONLY WITH WEBPACK ]
        // --------------------------------------------------------------------------------
        // this.add_comp([class_name:string], [class:class]);
        // this.add_comps([classes:Array]); --> item array: {name: [class_name:string], class: [class:imported-object]}
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
		this.state('username', '');
		this.state('pass', '');
		this.state('response', '');
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
        // --------------------------------------------------------------------------------
        // ACTIONS
        // --------------------------------------------------------------------------------
        // this.action('action_key', (args)=>{...});
        // this.call_action('action_key', args[object]);
        // --------------------------------------------------------------------------------
        // --------------------------------------------------------------------------------
        this.action('login', (args)=>
			{
				let data = {
					username: this.state('username'),
					pass: this.state('pass')
				};
				if(data.pass.trim() === '')
					return alert('No password');
				data.pass = Rapp.MD5(data.pass);
				this.api(props.api, props.addon, props.cmd, data, null, 'login_rep', 'login_error_resp');
			});
		this.action('login_error_resp', (args)=>
			{
				this.state('response', args.message);
				this.state('pass', '').update();
			});
		this.action('login_rep', (args)=>
			{
				this._parent.call_action(props.resp, args);
				this.state('username', '');
				this.state('pass', '').update();
			});


		this.action('set_username', (args)=>
			{
				this.state('username', args.target.value);
			});
		this.action('set_password', (args)=>
			{
				this.state('pass', args.target.value);
			});

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
Login.default_props = {};
// --------------------------------------------------------------------------------
// INCLUDE INTO window OBJECT [ ONLY WITOUT WEBPACK ]
// --------------------------------------------------------------------------------
// window.Login = Login;