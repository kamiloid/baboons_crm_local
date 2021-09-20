// --------------------------------------------------------------------------------
// IMPORTS [ ONLY WITH WEBPACK ]
// --------------------------------------------------------------------------------
// import [class name | variable]('file_path[.js]');
import Rapp from '../relast.js';
// // --------------------------------------------------------------------------------
// // --------------------------------------------------------------------------------

export default class Settings extends Rapp
{
	_accounts_loaded = false;
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
		this.state('accounts', []);
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
		this.method('clear_accounts', ()=>
		{
			this.state('accounts', []);
		});
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
		this.action('run', (args)=>
			{
				this.call_action('load_accounts');
			});
		this.action('load_accounts', ()=>
			{
				this.api(this._main._api_main, 'sm_manager', 'get_accounts', {}, null, 'bind_accounts');
			});
		this.action('update_accounts', ()=>
			{
				this.call_action('load_accounts');
			});
		this.action('add_account', (args)=>
			{
				let accounts = this.get_state('accounts');
				accounts.push({
					k: accounts.length,
					v: args.username || '',
					p1: args.type || 'instagram',
					p3: args.id || '',
					p2: args.status || 1,
					p4: args.status ? 'Disable' : 'Enable',
					p5: args.type === 'instagram' ? `selected='true'` : '',
					p6: args.type === 'tiktok' ? `selected='true'` : ''
				});
				this.state('accounts', accounts).update();
			});
		this.action('save_account', (args)=>
			{
				let data = {
					id: args.target.token,
					type: this._id[`type_${args.target.token}`].value,
					username: this._id[`username_${args.target.token}`].value
				}
				// console.log(data, args);
				this.api(this._main._api_main, 'sm_manager', 'add_account', data, null, 'update_accounts');
			});
		this.action('bind_accounts', (args)=>
			{
				this._accounts_loaded = true;
				if(!args.accounts) return;

				this.call_method('clear_accounts');
				for(let a of args.accounts)
					this.call_action('add_account', a);
			});
		this.action('remove_account', (args)=>
			{
				let data = {
					id: args.target.token
				};
				this.api(this._main._api_main, 'sm_manager', 'remove_account', data, null, 'update_accounts');
			});
		this.action('toggle_account', (args)=>
			{
				let data = {
					id: args.target.token
				};
				this.api(this._main._api_main, 'sm_manager', 'toggle_account', data, null, 'update_accounts');
			});



		if(!this._accounts_loaded)
			this.call_action('run');

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
		this._view.iterators.accounts = `<form onsubmit='save_account' token='[p3]'>
			<select ref='type_[p3]'>
				<option value='instagram' [p5] >Instagram</option>
				<option value='tiktok' [p6] >Tiktok</option>
			</select>
			<input type='text' value='[v]' ref='username_[p3]'/>
			<input type='submit' value='Save'/>
			<button class='btn_link' onclick='toggle_account' token=[p3]>[p4]</button>
			<button class='btn_link btn_remove' onclick='remove_account' token=[p3]>Remove</button>
		</form>`;

		this._view.style =`
		.settings-bbox
		{
			padding: 5px;
		}
		.settings-panel-bbox
		{
			background-color: #EEE;
			border-radius: 5px;
		}
		.settings-panel-bbox > div
		{
			padding: 5px;
		}
		`;

		this._view.main = `<div class='settings-bbox'>
			<div class='settings-panel-bbox'>
				<h2 class='panel-title'>Accounts</h2>
				<div>
					<button onclick='add_account'>Add account</button>
					<button onclick='update_accounts'>Refresh</button>
				</div>
				<div>${this.render('accounts', 'accounts')}</div>
			</div>
		</div>`;
		// --------------------------------------------------------------------------------
		// --------------------------------------------------------------------------------
	}
}
Settings.default_props = {};


// --------------------------------------------------------------------------------
// INCLUDE INTO window OBJECT [ ONLY WITOUT WEBPACK ]
// --------------------------------------------------------------------------------
// window.Settings = Settings;