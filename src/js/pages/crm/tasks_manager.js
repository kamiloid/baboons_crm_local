// --------------------------------------------------------------------------------
// IMPORTS [ ONLY WITH WEBPACK ]
// --------------------------------------------------------------------------------
// import [class name | variable]('file_path[.js]');
import Rapp from '../../relast.js';
// // --------------------------------------------------------------------------------
// // --------------------------------------------------------------------------------

export default class Tasks_manager extends Rapp
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
		this.state('tasks', []);
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
				this.call_action('bind_task', [{
					token: '4325352352345',
					label: 'Test 1',
					campaign: 'Test deal 1',
					campaign_token: '5453254253452',
					client: 'Andres Camilo Lopez',
					client_token: '4523452354345',
					state: 'Distribution',
					temperature: 'Hot'
				},{
					token: '4325352352345',
					label: 'Test 1',
					campaign: 'Test deal 1',
					campaign_token: '5453254253452',
					client: 'Andres Camilo Lopez',
					client_token: '4523452354345',
					state: 'Distribution',
					temperature: 'Hot'
				},{
					token: '4325352352345',
					label: 'Test 1',
					campaign: 'Test deal 1',
					campaign_token: '5453254253452',
					client: 'Andres Camilo Lopez',
					client_token: '4523452354345',
					state: 'Distribution',
					temperature: 'Hot'
				},{
					token: '4325352352345',
					label: 'Test 1',
					campaign: 'Test deal 1',
					campaign_token: '5453254253452',
					client: 'Andres Camilo Lopez',
					client_token: '4523452354345',
					state: 'Distribution',
					temperature: 'Hot'
				}]);
			});
		this.action('bind_task', (args)=>
			{
				if(!args) return;

				let buffer = [];
				for(let t of args)
				{
					buffer.push({
						k: t.token,
						v: t.campaign,
						p0: t.client_token,
						p1: t.client,
						p2: t.campaign_token,
						p4: t.state,
						p5: t.temperature
					});
				}

				this.state('tasks', buffer);
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
		this._view.iterators.task = `<div key='[k]' token='[k]' class='crm-task'>
			<div>
				<div>
					<div>
						<button><h3>[v] | Phase: [p4]</h3></button>
					</div>
					<div>
						<button class='client-btn'>Client: [p1]</button>
					</div>
					<div>
						
					</div>
				</div>
				<div>Temp: [p5]</div>
			</div>
		</div>`;

		this._view.style =`
		.crm-task
		{
			margin: 10px;
		    padding: 0px;
		    background-color: #DDD;
		    border-radius: 5px;
		    transition: all 0.3s;
		    border: solid 1px #CCC;
		}
		.crm-task:hover
		{
			border: solid 1px #92c1b0;
		}
		.crm-task > div:first-child
		{
			display:flex;
			flex-wrap: wrap;
			justify-content: space-between;
		}
		.crm-task > div:first-child > div:first-child
		{
			flex-grow: 2;
		}
		.crm-task h3, .crm-task p
		{
			margin: 0px;
    		padding: 0px;
		}
		.crm-task .task-client
		{
			padding: 5px;
    		margin: 0px;
		}
		.crm-task button
		{
			margin: 0px;
		    width: 100%;
		    text-align: left;
		    border-radius: 5px 5px 0px 0px;
	        background-color: #92c1b0;
    		color: #2b5c52;
		}
		.crm-task .client-btn
		{
			background-color: #EDEDED;
			color: #666;
    		border-radius: 0px 0px 5px 5px;
		}
		`;

		this._view.main = `<div>
			${this.render('tasks', 'task')}
		</div>`;
		// --------------------------------------------------------------------------------
		// --------------------------------------------------------------------------------
	}
}
Tasks_manager.default_props = {};


// --------------------------------------------------------------------------------
// INCLUDE INTO window OBJECT [ ONLY WITOUT WEBPACK ]
// --------------------------------------------------------------------------------
// window.Tasks_manager = Tasks_manager;