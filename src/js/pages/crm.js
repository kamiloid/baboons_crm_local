// --------------------------------------------------------------------------------
// IMPORTS [ ONLY WITH WEBPACK ]
// --------------------------------------------------------------------------------
// import [class name | variable]('file_path[.js]');
import Rapp from '../relast.js';
import CRM_mainmenu from './crm/main_menu.js';
import Tasks_manager from './crm/tasks_manager.js';
import Products_manager from './crm/products_manager.js';
// // --------------------------------------------------------------------------------
// // --------------------------------------------------------------------------------

export default class CRM extends Rapp
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
		this.add_comp('CRM_mainmenu', CRM_mainmenu);
		this.add_comp('Tasks_manager', Tasks_manager);
		this.add_comp('Products_manager', Products_manager);

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
		// - get state: this.state('state_key');
		// --------------------------------------------------------------------------------
		// --------------------------------------------------------------------------------
		this.state('section', 'Tasks_manager');
		this.state('title', 'Tasks');
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
		this.action('run', ()=>
			{
				this.call_action('route', {k: 'Tasks_manager', v: 'Tasks'});
			});
		this.action('route', (args)=>
			{
				this.state('section', args.k);
				this.state('title', args.v).update();
				this._main._mods[args.k].call_action('run');
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
		.crm-header
		{
			border-radius: 5px;
			display:unset;
		}
		.crm-header > div:first-child
		{
			/*top: 0px;
			position: sticky;
			position: -webkit-sticky;
			background-color: #FFF;*/
		}
		.crm-section
		{
			background-color: #EDEDED;
			margin: 5px;
			box-sizing: border-box;
			border-radius: 5px;
		}
		.crm-body
		{
			padding: 10px;
		}
		`;

		let section = this.state('section');
		let section_title = this.state('title');

		this._view.main = `<div>
			<div class='crm-header'>
				<CRM_mainmenu></CRM_mainmenu>
			</div>
			<div class='crm-section'>
				<h2 class='panel-title'>${section_title}</h2>
				<${section} class='crm-body'></${section}>
			</div>
		</div>`;
		// --------------------------------------------------------------------------------
		// --------------------------------------------------------------------------------
	}
}
CRM.default_props = {};


// --------------------------------------------------------------------------------
// INCLUDE INTO window OBJECT [ ONLY WITOUT WEBPACK ]
// --------------------------------------------------------------------------------
// window.CRM = CRM;