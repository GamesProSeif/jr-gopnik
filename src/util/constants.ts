import { stripIndents } from 'common-tags';
import {
	Guild,
	GuildChannel,
	GuildEmoji,
	GuildMember,
	Message,
	Role,
	TextChannel,
	User,
	VoiceChannel
} from 'discord.js';
import * as moment from 'moment';
import { Emoji } from 'node-emoji';
import * as punycode from 'punycode';
import { URL } from 'url';
import { Response } from 'node-fetch';

export const PREFIX = 'j!';

export const COLORS = {
	PRIMARY: 0x2ecc71,
	SECONDARY: 0x8e44ad,
	INFO: 0x0891eb,
	WARNING: 0xf1c40e,
	ERROR: 0xe74c3c
};

export const EMOJIS = {
	TRASH: '🗑'
};

export const SHARDING = false;

export const DEVELOPMENT = process.env.NODE_ENV === 'development';

export const PRODUCTION = process.env.NODE_ENV === 'production';

export const OWNER_ID = '252829167320694784';

export const HUMAN_LEVELS = {
	NONE: 'None',
	LOW: 'Low',
	MEDIUM: 'Medium',
	HIGH: '(╯°□°）╯︵ ┻━┻',
	VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};

export enum TOPICS {
	UNHANDLED_REJECTION = 'UNHANDLED_REJECTION',
	DISCORD = 'DISCORD',
	DISCORD_AKAIRO = 'DISCORD_AKAIRO',
	MONGO_DB = 'MONGO_DB'
}

export enum EVENTS {
	INIT = 'INIT',
	ERROR = 'ERROR',
	READY = 'READY',
	RELOAD = 'RELOAD',
	WARN = 'WARN',
	DEBUG = 'DEBUG',
	COMMAND_STARTED = 'COMMAND_STARTED',
	COMMAND_BLOCKED = 'COMMAND_BLOCKED',
	COMMAND_FINISHED = 'COMMAND_FINISHED',
	COMMAND_CANCELLED = 'COMMAND_CANCELLED',
	SHARD_RESUMED = 'SHARD_RESUMED',
	SHARD_RECONNECTING = 'SHARD_RECONNECTING',
	SHARD_DISCONNECTED = 'SHARD_DISCONNECTED'
}

export const SRA_LINK = (endpoint: string) => `https://some-random-api.ml${endpoint}`;

export const MESSAGES = {
	CLIENT: {
		COMMAND_HANDLER: {
			LOADED: 'Command handler loaded',
			PROMPT_CANCEL: 'Command has been cancelled.',
			PROMPT_ENDED: 'Too many retries, command has been cancelled.',
			MODIFY_START: (message: Message, text: string) =>
				`${message.member}, ${text}\n\nType \`cancel\` to cancel this command.`,
			MODIFY_RETRY: (message: Message, text: string) =>
				`${message.member}, ${text}\n\nType \`cancel\` to cancel this command.`,
			TIMEOUT: 'Time ran out, command has been cancelled.'
		},
		LISTENER_HANDLER: {
			LOADED: 'Listener handler loaded'
		},
		INHIBITOR_HANDLER: {
			LOADED: 'Inhibitor handler loaded'
		},
		DB_CONNECTED: 'Connected to MongoDB'
	},
	COMMANDS: {
		GAMBLE: {
			FLIP: {
				DESCRIPTION: {
					CONTENT: 'Flips a coin'
				},
				RESPONSE: (final: string) => `Coin fell and hit \`${final}\``
			},
			PICK: {
				DESCRIPTION: {
					CONTENT: 'Chooses a value from a list (separate values by `|`)',
					USAGE: '<value 1> | <value 2> | <...>',
					EXAMPLES: ['Pizza | Burger | Stay on diet']
				},
				RESPONSE: (picked: string) => `I chose \`${picked}\``
			},
			RAFFLE: {
				DESCRIPTION: {
					CONTENT: 'Raffles a random member',
					USAGE: '[type:] [status:] [role:]',
					EXAMPLES: ['', 'type:bot', 'status:online role:Mods']
				},
				ARGS: {
					TYPE: {
						PROMPT: {
							START: 'Whats the type of the raffle? (all/user/bot)',
							RETRY: 'Invalid type! Try again. (all/user/bot)'
						}
					},
					STATUS: {
						PROMPT: {
							START: 'Whats the status of the members? (all/online/idle/dnd/offline)',
							RETRY: 'Invalid status! Try again. (all/online/idle/dnd/offline)'
						}
					},
					ROLE: {
						PROMPT: {
							START: 'Whats the role of the members?',
							RETRY: 'Invalid role! Try again'
						}
					}
				},
				ERROR_EMBED: {
					DESCRIPTION: 'No members matched your query'
				},
				SUCCESS_EMBED: {
					TITLE: '🎫 Raffled Member'
				}
			},
			ROLL: {
				DESCRIPTION: {
					CONTENT: 'Rolls a number (default of 6)',
					USAGE: '[max/min [max]]',
					EXAMPLES: ['', '100', '95 100']
				},
				RESPONSE: (num: number) => `I rolled \`${num}\``
			}
		},
		IMAGE: {
			SRA: {
				DESCRIPTION: {
					CONTENT: (animal: string) => `Sends a random ${animal} image`
				},
				POWERED_BY: 'Powered by Some Random API'
			}
		},
		INFO: {
			AVATAR: {
				DESCRIPTION: {
					CONTENT: 'Displays the avatar of a member\n**Available arguments**\n• Format: `webp`, `jpg`, `png`, `gif`\n• Size: `16`, `32`, `64`, `128`, `256`, `512`, `1024`, `2048`',
					USAGE: '[member] [format:] [size:]',
					EXAMPLES: ['format:jpg', 'xPLEBx size:64', 'Noob101 f:png s:512']
				},
				ARGS: {
					MEMBER: {
						PROMPT: {
							START: 'Who do you want to view the avatar of?',
							RETRY: 'Invalid member! Try again.'
						}
					},
					FORMAT: {
						PROMPT: {
							START: 'What is the format of the avatar? (auto, webp, jpg, png, gif)',
							RETRY: 'Invalid format! Try again. (auto, webp, jpg, png, gif)'
						}
					},
					SIZE: {
						PROMPT: {
							START: 'What is the size of the avatar? (16, 32, 64, 128, 256, 512, 1024, 2048)',
							RETRY: 'Invalid size! Try again. (16, 32, 64, 128, 256, 512, 1024, 2048)'
						}
					}
				},
				RESPONSE: (member: GuildMember) => `Viewing avatar of **${member.user.tag}** (ID: ${member.id})`
			},
			CHANNEL: {
				DESCRIPTION: {
					CONTENT: 'Displays information about a channel',
					USAGE: '<#channel>'
				},
				ARGS: {
					CHANNEL: {
						PROMPT: {
							START: '',
							RETRY: ''
						}
					}
				},
				RESPONSE: {
					GENERAL: {
						DESCRIPTION: (channel: GuildChannel) => `Info about **${channel.name}** (ID: ${channel.id})`,
						FIELD_NAME: '❯ General Info',
						FIELD_VALUE: (channel: GuildChannel) => stripIndents`
						• Type: ${channel.type}
						• Position: ${channel.position}
						• Creation Date: ${moment.utc(channel.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss A [UTC]')}
						`
					},
					TEXT: {
						FIELD_NAME: '❯ Text Info',
						FIELD_VALUE: (channel: TextChannel) => stripIndents`
						• Topic: ${channel.topic ? channel.topic : 'None'}
						• NSFW: ${Boolean(channel.nsfw)}
						• Viewable by: ${channel.members.size} members
						• Last message by: ${channel.lastMessage!.author}
						`
					},
					VOICE: {
						FIELD_NAME: '❯ Voice Info',
						FIELD_VALUE: (channel: VoiceChannel) => stripIndents`
						• Bitrate: ${channel.bitrate}
						• Limit: ${channel.userLimit ? channel.userLimit : 'unlimited'}
						• Member Count: ${channel.members.size}
						`
					}
				}
			},
			COLOR: {
				DESCRIPTION: {
					CONTENT: 'Displays information about a color\n**Available Formats:** Hex, RGB, HSL, HSV, HWB, CMYK, Integer, Ansi16, Ansi256, and CSS keywords',
					USAGE: '<color-value>',
					EXAMPLES: [
						'#FFFFFF',
						'rgb(255, 255, 255)',
						'hsl(350, 35%, 50%)',
						'ansi16(91)'
					]
				}
			},
			EMOJI: {
				DESCRIPTION: {
					CONTENT: 'Displays information about an emoji'
				},
				ARGS: {
					EMOJI: {
						PROMPT: {
							START: 'What is the emoji you want informationa about?',
							RETRY: 'Please provide a valid emoji!'
						}
					}
				},
				RESPONSE: {
					EMBED1: {
						DESCRIPTION: (emoji: GuildEmoji) => `Info about ${emoji.name} (ID: ${emoji.id})`,
						FIELD_NAME: '❯ Info',
						FIELD_VALUE: (emoji: GuildEmoji) => stripIndents`
						• Identifier: \`<${emoji.identifier}>\`
						• Creation Date: ${moment.utc(emoji.createdAt!).format('YYYY/MM/DD hh:mm:ss [UTC]')}
						• URL: ${emoji.url}
						`
					},
					EMBED2: {
						DESCRIPTION: ({ emoji }: Emoji) => `Info about ${emoji}`,
						FIELD_NAME: '❯ Info',
						FIELD_VALUE: (emoji: Emoji) => stripIndents`
						• Name: \`${emoji.key}\`
						• Raw: \`${emoji.emoji}\`
						• Unicode: \`${punycode.ucs2.decode(emoji.emoji).map(e => `\\u${e.toString(16).toUpperCase().padStart(4, '0')}`).join('')}\`
						`
					}
				}
			},
			INROLE: {
				DESCRIPTION: {
					CONTENT: 'Displays all members that have a role'
				},
				ARGS: {
					ROLE: {
						PROMPT: {
							START: 'What is the role?',
							RETRY: 'Invalid role! Try again.'
						}
					},
					PAGE: {
						PROMPT: {
							START: (total: number) => `What is the page? (1 - ${total})`,
							RETRY: (total: number) => `Invalid page number (1 - ${total})`
						}
					}
				},
				RESPONSE: {
					TITLE: (role: Role) => `Members in ${role.name}`,
					FOOTER: (page: number, totalPages: number, size: number) => `Page ${page}/${totalPages} • Total ${size} members`
				}
			},
			IP: {
				DESCRIPTION: {
					CONTENT: 'Gets information about an IP address',
					USAGE: '<IPv4/IPv6>',
					EXAMPLES: ['123.123.123.123', '2001:0db8:85a3:0000:0000:8a2e:0370:7334']
				},
				ARGS: {
					IP: {
						PROMPT: {
							START: 'What is the IP you want info about?',
							RETRY: 'That is not a valid IP! Try again.'
						}
					}
				},
				RESPONSE: {
					GETTING_INFO: 'Getting IP information...',
					TITLE: (json: any) => `Information about IP ${json.ipAddress}`,
					DESCRIPTION: (json: any) => stripIndents`
					• Country Code: ${json.countryCode}
					• Country Name: ${json.countryName}
					• Region Name: ${json.regionName}
					• Zip Code: ${json.zipCode}
					• Latitude: ${json.latitude}
					• Longitude: ${json.longitude}
					• Time Zone: ${json.timeZone}
					`
				}
			},
			ROLE: {
				DESCRIPTION: {
					CONTENT: 'Displays information about a role',
					USAGE: '<role>'
				},
				ARGS: {
					ROLE: {
						PROMPT: {
							START: 'What is the role you want information about?',
							RETRY: 'That is not a valid role! Try again.'
						}
					}
				},
				RESPONSE: {
					DESCRIPTION: (role: Role) => `Info about **${role.name}** (ID: ${role.id})`,
					FIELD_NAME: '❯ Info',
					FIELD_VALUE: (role: Role) => stripIndents`
					• Color: ${role.hexColor.toUpperCase()}\n• Hoisted: ${role.hoist ? 'Yes' : 'No'}
					• Position: ${role.position}
					• Mentionable: ${role.mentionable ? 'Yes' : 'No'}
					• Creation Date: ${moment.utc(role.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss A [UTC]')}
					`,
					FIELD2_NAME: '❯ Permissions'
				}
			},
			SERVER: {
				DESCRIPTION: {
					CONTENT: 'Displays information about a server'
				},
				RESPONSE: {
					DESCRIPTION: (guild: Guild) => `Info about **${guild.name}** (ID: ${guild.id})`,
					FIELD_VALUE: (guild: Guild) => stripIndents`
					• Roles: ${guild.roles.cache.size}
					• Region: ${guild.region}
					• Creation Date: ${moment.utc(guild.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss A [UTC]')}
					• Verification Level: ${HUMAN_LEVELS[guild.verificationLevel]}
					• Nitro Server Boosts: ${guild.premiumSubscriptionCount || 0}
					`
				}
			},
			USER: {
				DESCRIPTION: {
					CONTENT: 'Displays information about a user',
					USAGE: '[user]'
				},
				RESPONSE: {
					DESCRIPTION: (user: User) => `Info about **${user.tag}** (ID: ${user.id})`,
					MEMBER: {
						NAME: '❯ Member Details',
						VALUE: (member: GuildMember) => stripIndents`
						• Nickname: ${member.nickname ? member.nickname : 'None'}
						• Roles: ${member.roles.cache.map((r: Role) => `\`${r.name}\``).join(' ')}
						• Joined At: ${moment.utc(member.joinedAt!).format('dddd, MMMM Do YYYY, h:mm:ss A [UTC]')}
						`
					},
					USER: {
						NAME: '❯ User Details',
						VALUE: (user: User) => stripIndents`
						• ID: ${user.id}
						• Username: ${user.tag}
						• Creation Date: ${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss A [UTC]')}
						• Status: ${user.presence.status.toUpperCase()}
						• Activity: ${user.presence.activities.length > 0 ? user.presence.activities[0] : 'None'}
						`
					}
				}
			},
			WEBSITE: {
				DESCRIPTION: {
					CONTENT: 'Gets information about a website',
					USAGE: '<URL>'
				},
				ARGS: {
					URL: {
						PROMPT: {
							START: 'What is the website you want info about?',
							RETRY: 'Invalid URL! Try again.'
						}
					}
				},
				RESPONSE: {
					SUCCESS: {
						DESCRIPTION: (url: URL) => `Info about URL ${url.href}`,
						WEBSITE_NAME: '❯ Website Details',
						WEBSITE_VALUE: (res: Response) => stripIndents`
						• Online?: Yes
						• Status Code: ${res.status}
						• Content Type: ${res.headers.get('content-type')}
						`,
						URL_NAME: '❯ URL Details',
						URL_VALUE: (url: URL, family: number, address: string) => stripIndents`
						• Href: ${url.href}
						• Host: ${url.host}
						• Protocol: ${url.protocol}
						• IPv${family}: ${address}
						`
					},
					FAIL: {
						DESCRIPTION: (url: URL) => `Info about URL ${url.href}`,
						WEBSITE_NAME: '❯ Website Details',
						WEBSITE_VALUE: (res: Response) => stripIndents`
						• Online?: No
						• Status Code: ${res.status}
						`,
						URL_NAME: '❯ URL Details',
						URL_VALUE: (url: URL) => stripIndents`
						• Href: ${url.href}
						• Host: ${url.host}
						• Protocol: ${url.protocol}
						`
					},
					ERROR: 'An error occurred while getting information about the website'
				}
			}
		},
		MEME: {
			LATER: {
				DESCRIPTION: {
					CONTENT: 'Sends a random spongebob later photo'
				},
				RESPONSE: {
					NO_STORAGE: 'I have no later photos in my storage 😐'
				}
			}
		},
		MOD: {
			BAN: {
				DESCRIPTION: {
					CONTENT: 'Bans a member',
					USAGE: '<member> <reason>'
				},
				ARGS: {
					MEMBER: {
						PROMPT: {
							START: 'Who do you want to ban?',
							RETRY: 'Invalid member! Try again.'
						}
					},
					REASON: {
						PROMPT: {
							START: 'What is the reason? (Type `none` to leave empty)'
						}
					}
				},
				RESPONSE: {
					CONFIRM: {
						DESCRIPTION: 'This member is going to be **banned**. Do you wish to continue? (yes/no)',
						FIELD: (member: GuildMember) => `• Mention: ${member}\n• Tag: ${member.user.tag}\n• ID: ${member.id}`
					},
					DONE: (member: GuildMember) => `Member ${member.user.tag} banned`
				}
			},
			KICK: {
				DESCRIPTION: {
					CONTENT: 'Kicks a member',
					USAGE: '<member> <reason>'
				},
				ARGS: {
					MEMBER: {
						PROMPT: {
							START: 'Who do you want to kick?',
							RETRY: 'Invalid member! Try again.'
						}
					},
					REASON: {
						PROMPT: {
							START: 'What is the reason? (Type `none` to leave empty)'
						}
					}
				},
				RESPONSE: {
					CONFIRM: {
						DESCRIPTION: 'This member is going to be **kicked**. Do you wish to continue? (yes/no)',
						FIELD: (member: GuildMember) => `• Mention: ${member}\n• Tag: ${member.user.tag}\n• ID: ${member.id}`
					},
					DONE: (member: GuildMember) => `Member ${member.user.tag} kicked`
				}
			},
			PRUNE: {
				DESCRIPTION: {
					CONTENT: 'Deletes multiple messages with given options',
					USAGE: '<last-n-messages> [author:] [content:] [channel:]',
					EXAMPLES: [
						'5',
						'10 author:GamesProSeif --hide',
						'15 content:potato',
						'50 content:"wee wee" channel:general'
					]
				},
				ARGS: {
					AMOUNT: {
						PROMPT: {
							START: 'How many messages do you want to delete? (max 100)',
							RETRY: 'Invalid number! Try again (max 100)'
						}
					}
				},
				RESPONSE: {
					DELETED: (size: number, channel: TextChannel) => `Deleted \`${size}\` messages in ${channel}`
				}
			}
		},
		SPECIAL: {
			LYRICS: {
				DESCRIPTION: {
					CONTENT: 'Gets lyrics of a song',
					USAGE: '<song-title>'
				},
				ARGS: {
					TITLE: {
						PROMPT: {
							START: 'What is the song title you want?',
							RETRY: 'Invalid song title! Try again.'
						}
					}
				},
				RESPONSE: {
					ERROR: (title: string) => `Couldn't find results for song title \`${title}\``
				}
			},
			SHORTEN_URL: {
				DESCRIPTION: {
					CONTENT: 'Shortens a URL',
					USAGE: '<URL>'
				},
				ARGS: {
					URL: {
						PROMPT: {
							START: 'What is the URL you want to shorten?',
							RETRY: 'Invalid URL! Try again.'
						}
					}
				},
				RESPONSE: {
					ERROR: 'An error occurred while trying to shorten your URL.'
				}
			},
			YOUTUBE: {
				DESCRIPTION: {
					CONTENT: 'Searches a video on Youtube',
					USAGE: '<query>'
				},
				ARGS: {
					QUERY: {
						PROMPT: {
							START: 'What do you want me to search?'
						}
					}
				},
				RESPONSE: {
					ERROR: 'Could not fetch results'
				}
			}
		},
		TAGS: {
			ADD: {
				DESCRIPTION: {
					CONTENT: ''
				}
			},
			ALIAS: {
				DESCRIPTION: {
					CONTENT: ''
				}
			},
			DELETE: {
				DESCRIPTION: {
					CONTENT: ''
				}
			},
			DOWNLOAD: {
				DESCRIPTION: {
					CONTENT: ''
				}
			},
			EDIT: {
				DESCRIPTION: {
					CONTENT: ''
				}
			},
			INFO: {
				DESCRIPTION: {
					CONTENT: ''
				}
			},
			LIST: {
				DESCRIPTION: {
					CONTENT: ''
				}
			},
			SEARCH: {
				DESCRIPTION: {
					CONTENT: ''
				}
			},
			SHOW: {
				DESCRIPTION: {
					CONTENT: ''
				}
			},
			SOURCE: {
				DESCRIPTION: {
					CONTENT: ''
				}
			},
			TAG: {
				DESCRIPTION: {
					CONTENT: ''
				}
			}
		},
		TEXT: {
			CONTENT: {
				DESCRIPTION: {
					CONTENT: ''
				}
			},
			DELETE_SNIPE: {
				DESCRIPTION: {
					CONTENT: ''
				}
			},
			EDITS: {
				DESCRIPTION: {
					CONTENT: ''
				}
			},
			EMBED: {
				DESCRIPTION: {
					CONTENT: ''
				}
			},
			MOCK: {
				DESCRIPTION: {
					CONTENT: ''
				}
			},
			REVERSE: {
				DESCRIPTION: {
					CONTENT: ''
				}
			},
			SAY: {
				DESCRIPTION: {
					CONTENT: ''
				}
			},
			SNIPE: {
				DESCRIPTION: {
					CONTENT: ''
				}
			}
		},
		UTIL: {
			EVAL: {
				DESCRIPTION: {
					CONTENT: ''
				}
			},
			HELP: {
				DESCRIPTION: {
					CONTENT: ''
				}
			},
			INVITE: {
				DESCRIPTION: {
					CONTENT: ''
				}
			},
			PING: {
				DESCRIPTION: {
					CONTENT: ''
				}
			},
			PREFIX: {
				DESCRIPTION: {
					CONTENT: ''
				}
			},
			RELOAD: {
				DESCRIPTION: {
					CONTENT: ''
				}
			},
			STATS: {
				DESCRIPTION: {
					CONTENT: ''
				}
			},
			VIEW_LOGS: {
				DESCRIPTION: {
					CONTENT: ''
				}
			}
		}
	},
	LISTENERS: {}
};

export const COLORS_MAP = [
	'AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine',
	'Azure', 'Beige', 'Bisque', 'Black',
	'BlanchedAlmond', 'Blue', 'BlueViolet', 'Brown',
	'BurlyWood', 'CadetBlue', 'Chartreuse', 'Chocolate',
	'Coral', 'CornflowerBlue', 'Cornsilk', 'Crimson',
	'Cyan', 'DarkBlue', 'DarkCyan', 'DarkGoldenRod',
	'DarkGray', 'DarkGrey', 'DarkGreen', 'DarkKhaki',
	'DarkMagenta', 'DarkOliveGreen', 'DarkOrange', 'DarkOrchid',
	'DarkRed', 'DarkSalmon', 'DarkSeaGreen', 'DarkSlateBlue',
	'DarkSlateGray', 'DarkSlateGrey', 'DarkTurquoise', 'DarkViolet',
	'DeepPink', 'DeepSkyBlue', 'DimGray', 'DimGrey',
	'DodgerBlue', 'FireBrick', 'FloralWhite', 'ForestGreen',
	'Fuchsia', 'Gainsboro', 'GhostWhite', 'Gold',
	'GoldenRod', 'Gray', 'Grey', 'Green',
	'GreenYellow', 'HoneyDew', 'HotPink', 'IndianRed',
	'Indigo', 'Ivory', 'Khaki', 'Lavender',
	'LavenderBlush', 'LawnGreen', 'LemonChiffon', 'LightBlue',
	'LightCoral', 'LightCyan', 'LightGoldenRodYellow', 'LightGray',
	'LightGrey', 'LightGreen', 'LightPink', 'LightSalmon',
	'LightSeaGreen', 'LightSkyBlue', 'LightSlateGray', 'LightSlateGrey',
	'LightSteelBlue', 'LightYellow', 'Lime', 'LimeGreen',
	'Linen', 'Magenta', 'Maroon', 'MediumAquaMarine',
	'MediumBlue', 'MediumOrchid', 'MediumPurple', 'MediumSeaGreen',
	'MediumSlateBlue', 'MediumSpringGreen', 'MediumTurquoise', 'MediumVioletRed',
	'MidnightBlue', 'MintCream', 'MistyRose', 'Moccasin',
	'NavajoWhite', 'Navy', 'OldLace', 'Olive',
	'OliveDrab', 'Orange', 'OrangeRed', 'Orchid',
	'PaleGoldenRod', 'PaleGreen', 'PaleTurquoise', 'PaleVioletRed',
	'PapayaWhip', 'PeachPuff', 'Peru', 'Pink',
	'Plum', 'PowderBlue', 'Purple', 'RebeccaPurple',
	'Red', 'RosyBrown', 'RoyalBlue', 'SaddleBrown',
	'Salmon', 'SandyBrown', 'SeaGreen', 'SeaShell',
	'Sienna', 'Silver', 'SkyBlue', 'SlateBlue',
	'SlateGray', 'SlateGrey', 'Snow', 'SpringGreen',
	'SteelBlue', 'Tan', 'Teal', 'Thistle',
	'Tomato', 'Turquoise', 'Violet', 'Wheat',
	'White', 'WhiteSmoke', 'Yellow', 'YellowGreen'
];

export const REGEX = {
	EMOJI: /<(?:a)?:(?:\w{2,32}):(?<content>\d{17,19})>?/,
	IP: /((?:^\s*(?:(?:(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(?:^\s*(?:(?:(?:[0-9A-Fa-f]{1,4}:){7}(?:[0-9A-Fa-f]{1,4}|:))|(?:(?:[0-9A-Fa-f]{1,4}:){6}(?::[0-9A-Fa-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9A-Fa-f]{1,4}:){5}(?:(?:(?::[0-9A-Fa-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9A-Fa-f]{1,4}:){4}(?:(?:(?::[0-9A-Fa-f]{1,4}){1,3})|(?:(?::[0-9A-Fa-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9A-Fa-f]{1,4}:){3}(?:(?:(?::[0-9A-Fa-f]{1,4}){1,4})|(?:(?::[0-9A-Fa-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9A-Fa-f]{1,4}:){2}(?:(?:(?::[0-9A-Fa-f]{1,4}){1,5})|(?:(?::[0-9A-Fa-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9A-Fa-f]{1,4}:){1}(?:(?:(?::[0-9A-Fa-f]{1,4}){1,6})|(?:(?::[0-9A-Fa-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9A-Fa-f]{1,4}){1,7})|(?:(?::[0-9A-Fa-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$))/
};

export const PERMISSIONS_MAP = {
	ADD_REACTIONS: 'Add reactions',
	ADMINISTRATOR: 'Administrator',
	ATTACH_FILES: 'Attach files',
	BAN_MEMBERS: 'Ban members',
	CHANGE_NICKNAME: 'Change nickname',
	CONNECT: 'Connect',
	CREATE_INSTANT_INVITE: 'Create instant invite',
	DEAFEN_MEMBERS: 'Deafen members',
	EMBED_LINKS: 'Embed links',
	KICK_MEMBERS: 'Kick members',
	MANAGE_CHANNELS: 'Manage channels',
	MANAGE_EMOJIS: 'Manage emojis',
	MANAGE_GUILD: 'Manage server',
	MANAGE_MESSAGES: 'Manage messages',
	MANAGE_NICKNAMES: 'Manage nicknames',
	MANAGE_ROLES: 'Manage roles',
	MANAGE_WEBHOOKS: 'Manage webhooks',
	MENTION_EVERYONE: 'Mention everyone',
	MOVE_MEMBERS: 'Move members',
	MUTE_MEMBERS: 'Mute members',
	READ_MESSAGE_HISTORY: 'Read message history',
	SEND_MESSAGES: 'Send messages',
	SEND_TTS_MESSAGES: 'Send TTS messages',
	SPEAK: 'Speak',
	USE_EXTERNAL_EMOJIS: 'Use external emojis',
	USE_VAD: 'Use voice activity',
	VIEW_AUDIT_LOG: 'View audit log',
	VIEW_CHANNEL: 'Read text channels and see voice channels'
};
