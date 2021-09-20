// --------------------------------------------------------------------------------
// IMPORTS [ ONLY WITH WEBPACK ]
// --------------------------------------------------------------------------------
// import [class name | variable]('file_path[.js]');
import Rapp from '../relast.js';
// // --------------------------------------------------------------------------------
// // --------------------------------------------------------------------------------

export default class Connection_status extends Rapp
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
		// - get state: this.state('state_key');
		// --------------------------------------------------------------------------------
		// --------------------------------------------------------------------------------
		this.state('status', true);
		this.state('internet', window.navigator.onLine);
		this.state('server_sync', 10);
		this.state('sync_temp', 1000);
		this.state('server_attempts', 0);
		this.state('server_max_attempts', 2);
		this.state('sync', null);
		this.state('checker_lb_styles', '');
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
		this.method('run', ()=>
		{
			this.call_action('start_sync');
		});
	}
	created(){}
	rendered(){}
	run = function(props)
	{
		this.state('sync_temp', props.sync_temp || this.state('sync_temp'), false);
		this.state('server_sync', props.server_sync || this.state('server_sync'), false);

		// --------------------------------------------------------------------------------
		// ACTIONS
		// --------------------------------------------------------------------------------
		// this.action('action_key', (args)=>{...});
		// this.call_action('action_key', args[object]);
		// --------------------------------------------------------------------------------
		// --------------------------------------------------------------------------------
		this.action('start_sync', ()=>
			{
				let cont_sync = 0;
				this.state('sync', window.setInterval(()=>
					{
						this.state('internet', window.navigator.onLine);
						if(!this.state('internet'))
							return this.call_action('ping_error');
						else
							this.call_action('ping_ok');
							
						if(cont_sync % this.state('server_sync') === 0)
						{
							cont_sync = 0;
							if(this.state('server_attempts') >= this.state('server_max_attempts'))
								this.call_action('ping_error');
							else
								this.state('server_attempts', this.state('server_attempts') + 1);
							this.call_action('ping');
						}
						cont_sync++;
					}, this.state('sync_temp')));
			});
		this.action('ping', ()=>
			{
				this.api(this._main._api_main, 'app', 'run', {}, null, 'ping_ok', null, 'ping_error');
			});
		this.action('ping_ok', (resp)=>
			{
				if(resp !== undefined && resp !== null)
					this.state('server_attempts', 0, false);
				if(this.state('server_attempts') === 0)
				{
					this.state('checker_lb_styles', `display:none`);
					this.state('status', true);
					this.state('checker_view', this.state('internet') ? 'on' : 'off');
					this.state('checker_txt', this.state('internet') ? 'Connected' : 'No internet connection').update();
				}else if(this.state('server_attempts') < this.state('server_max_attempts')){
					this.state('checker_view', 'check');
					this.state('checker_txt', this.state('internet') ? `Connecting with server: ${this.state('server_attempts')}` : 'No internet connection').update();
				}
			});
		this.action('ping_error', (resp)=>
			{
				this.state('checker_lb_styles', `display:block;position:fixed;top:0px;left:0px;width:100%;height:100%;z-index:1000`);

				this.state('status', false);
				this.state('checker_view', 'off');
				this.state('checker_txt', this.state('internet') ? `No connection with server` : 'No internet connection').update();
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
		.status-bbox
		{
			padding: 10px;
			box-sizing: border-box;
			margin: 5px 0px 0px 0px;
			border-radius: 5px 0px 0px 0px;
		}
		.status-bbox > p
		{
			margin: 0px;
			font-size: 0.6rem;
		}
		.status-on
		{
			background-color: #208f7d;
			color: #FFF;
		}
		.status-off
		{
			background-color: #c70e0e;
			color: #FFF;
		}
		.status-check
		{
			background-color: #ffa600;
			color: #000;
		}
		.conn-validator
		{
			background-color:rgba(255, 255, 255, 0.7);
		}
		`;

		this._view.main = `<div>
			<div class='status-bbox status-${this.state('checker_view')}'>
				<p>${this.state('checker_txt')}</p>
			</div>
			<div class='conn-validator' style='${this.state('checker_lb_styles')}'></div>
		</div>`;
		// --------------------------------------------------------------------------------
		// --------------------------------------------------------------------------------
	}
}
Connection_status.default_props = {};


// --------------------------------------------------------------------------------
// INCLUDE INTO window OBJECT [ ONLY WITOUT WEBPACK ]
// --------------------------------------------------------------------------------
// window.Connection_status = Connection_status;