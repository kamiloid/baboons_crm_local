// --------------------------------------------------------------------------------
// IMPORTS [ ONLY WITH WEBPACK ]
// --------------------------------------------------------------------------------
// import [class name | variable]('file_path[.js]');
import Rapp from '../../relast.js';
// // --------------------------------------------------------------------------------
// // --------------------------------------------------------------------------------

export default class CRM_mainmenu extends Rapp
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
		this.action('route', (args)=>
			{
				this._parent.call_action('route', args);
			});	
		this.action('load_tasks', ()=>
			{
				this.call_action('route', {k: 'Tasks_manager', v: 'Tasks'});
			});	
		this.action('load_products', ()=>
			{
				this.call_action('route', {k: 'Products_manager', v: 'Products'});
			});
		this.action('load_clients', ()=>
			{
				this.call_action('route', {k: 'Clients', v: 'Clients'});
			});
		this.action('load_campaigns', ()=>
			{
				this.call_action('route', {k: 'Campaigns', v: 'Campaigns'});
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

		this._view.style =`
		.crm-mainmenu
		{
		}
		`;

		this._view.main = `<div class='crm-mainmenu'>
			<button onclick='load_tasks'>Tasks</button>
			<button onclick='load_products'>Products</button>
			<button onclick='load_clients'>Clients</button>
			<button onclick='load_campaigns'>Campaigns</button>
		</div>`;
		// --------------------------------------------------------------------------------
		// --------------------------------------------------------------------------------
	}
}
CRM_mainmenu.default_props = {};


// --------------------------------------------------------------------------------
// INCLUDE INTO window OBJECT [ ONLY WITOUT WEBPACK ]
// --------------------------------------------------------------------------------
// window.CRM_mainmenu = CRM_mainmenu;