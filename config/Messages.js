const info = require('./../package.json');

const MESSAGES = {
	DAILY_RESET: 'The MapleStory 2 daily limit has been reset. You can now do your daily quests/raids/guildquests again',
	WEEKLY_RESET: 'The MapleStory 2 weekly limit has been reset. You can now do your daily quests/raids/guildquests again',
	PATCHNOTES: `\`ZealousBot v${info.version} is now live\` \n- Updates: So sorry for all the mentions guys, this is definitely the last one, some staging/production code got messed up while deploying. This version now has a working status checker. Happy Mapling!`,
	SERVER_TIME: "Current EU MapleStory2 server time:",
	SERVER_OFFLINE: "Hello @everyone, it seems the MS2 login server is offline, changing interval to checking every minute for updates!",
	SERVER_BACKONLINE: "Hello @everyone, it seems the MS2 login server is now back online!"
}

const COMMANDS = {
	HELP: {
		"description": "ZealousBot is a handy Discord bot that creates and resides in it's own channel `zealousbot`. It has several cronjobs informing users about daily resets etc and also includes a list of commands to request specific MS2 details. See the list below for more information. Want to contribute / report bugs? Please click this embedded message and create a new issue in the repository.",
		"color": 16777215,
		"timestamp": Date.now(),
		"footer": {
			"icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
			"text": `${info.name} ${info.version} | Created by ${info.author}`
		},
		"thumbnail": {
			"url": "https://cdn.discordapp.com/icons/438734880386449408/431d7c42aa812427fd7c280038c0aabd.webp"
		},
		"author": {
			"name": "ZealousBot for MapleStory 2",
			"url": "https://github.com/roberrrt-s/ZealousBot",
			"icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
		},
		"fields": [
			{
				"name": "**COMMANDS**",
				"value": "List of commands:"
			},
			{
				"name": "+help",
				"value": "Displays the general bot information and list of commands"
			},
			{
				"name": "+servertime",
				"value": "Returns the current servertime (GMT/UTC+0)"
			},
			{
				"name": "+serverstatus",
				"value": "Runs a check to see if the login server is reachable"
			},
			{
				"name": "+setdaily <mission>",
				"value": "Creates (if not found) a #daily-guildquest channel which sets one message at the top with the current daily guild quest objective. A new command resets the initial message"
			}
		]
	},
	UNKNOWN_COMMAND: ":no_entry_sign: Unrecognized command, please use `+help` more information",
	INVALID_ARGS: ":no_entry_sign: Command requires at least 1 argument",
}

module.exports = {MESSAGES, COMMANDS};