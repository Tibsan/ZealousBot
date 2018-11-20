const moment = require('moment');

class Commands {
	
	constructor(app) {
		this.app = app;
		this.knownDaylies = {
			"wooden": "Open 10 wooden chests\nMap: North Royal Road (Spawn: xx:00, xx:25, xx:55)",
			"golden": "Open 3 golden chests\nMap: North Royal Road",
			"freshwater": "Catch 10 freshwater fish\nMap: Tria (Beginner I)",
			"foulwater": "Catch 10 foulwater fish\nMap: Evansville (Beginner I)",
			"lava": "Catch 10 lava fish\nMap: Lavaworks (Beginner IV)",
			"beasts": "Kill 100 Beasts\nMap: Ellin Grove",
			"insects": "Kill 100 Insects\nMap: The Deck Skatepark",
			"undead": "Kill 100 Undead\nMap: Goldus Pharmaceuticals",
			"divine": "Kill 100 Divine\nMap: Aurora Laboratory",
			"humanoid": "Kill 100 Humanoid\nMap: Karnif's Fang",
			"inanimate": "Kill 100 Inanimate\nMap: Slumberland",
		};
	}

	commandHandler(msg) {
		
		const args = msg.content.slice(this.app.CONFIG.PREFIX.length).trim().split(/ +/g);
		const command = args.shift().toLowerCase();

		switch(command) {
			case 'status':
				this.getStatus(msg);
				break;
			case 'patchnotes':
				this.sendPatchNotes(msg);
				break;
			case 'help':
				this.getHelp(msg);
				break;
			case 'servertime':
				this.getServerTime(msg);
				break;
			case 'setdaily':
				this.setDailyGuildQuest(msg, command, args);
				break;
			case 'serverstatus':
				this.getServerStatus(msg);
				break;
			default:
				this.throwError(msg, command);
		}

	}

	getStatus(msg) {
		if(msg.author.id === '206829489387208704') {
			let guilds = this.app.client.guilds.array();
			let guildList = '';
			for(let i = 0; i < guilds.length; i++) {
				guildList = guildList + `\`- ${guilds[i].name} in region: ${guilds[i].region}\` \n`;
			}
			msg.channel.send(`\`${this.app.client.user.username} (${this.app.client.user.id})\` \n\`I'm currently connected to the following servers:\`\n \n${guildList}`)
		}
	}

	sendPatchNotes(msg) {
		msg.delete(500)
		if(msg.author.id === '206829489387208704') {
			this.app.client.channels.forEach(channel => {
				if(channel.name === this.app.CONFIG.DEFAULT) {
					channel.send(this.app.MESSAGES.PATCHNOTES);
				}
			});
		}
	}

	getHelp(msg) {
		msg.delete(500)
		msg.channel.send({
			embed: this.app.COMMANDS.HELP
		})
			.then(msg => {
				msg.delete(45000);
			})
			.catch(console.error);
	}

	getServerTime(msg) {
		msg.channel.send(`${this.app.MESSAGES.SERVER_TIME} ${this.app.util.prettyTime()}`);
	}

	setDailyGuildQuest(msg, command, args) {
		if(!args.length) {
			msg.channel.send(`${this.app.COMMANDS.INVALID_ARGS} (${this.app.CONFIG.PREFIX}${command})`)
				.then(msg => {
				msg.delete(5000);
			})
			.catch(console.error);

			return false;
		}

		this.app.methods.checkGuildQuestChannel(msg.guild, () => {
			var daily = args.join(' ');
			if (args.length == 1 && this.knownDaylies.hasOwnPropperty(args[0])) {
				daily = this.knownDaylies[args[0]];
			}
			const channel = msg.guild.channels.find(channel => channel.name === this.app.CONFIG.DAILYGQ);
			this.app.methods.truncateChannel(channel, () => {
				channel.send(`${this.app.util.prettyDate()} Daily guild quest objective: \n${daily}`);
			} );
		});

	}

	getServerStatus(msg) {
		this.app.checker.checkLoginServer(online => {
			if(online) {
				msg.channel.send(`Server appears to be online at ${this.app.util.prettyTime()}`);
			} else {
				msg.channel.send(`Server appears to be offline [${moment().utc().format('HH:mm:ss')}]`);
			}
		})
	}

	throwError(msg, command) {
		msg.delete(500)
		msg.channel.send(`${this.app.COMMANDS.UNKNOWN_COMMAND} (${this.app.CONFIG.PREFIX}${command})`)
			.then(msg => {
				msg.delete(5000);
			})
			.catch(console.error);
	}
}

module.exports = {Commands: Commands};//
