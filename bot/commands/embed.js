exports.run = (bot, message, args) => {
  if (!args[0]) {
    message.channel.send({
      embed: {
        title: 'Error',
        description: `Invalid usage. Please refer to \`${prefix}embed help\``,
        color: bot.config.colors.error
      }
    });
  }
  let final = args.join(' ');
  if (final.toUpperCase() === 'HELP') {
    message.author.send('Example by https://leovoel.github.io/embed-visualizer/')
    let embed = {
      "title": "title ~~(did you know you can have markdown here too?)~~",
      "description": "this supports [named links](https://discordapp.com) on top of the previously shown subset of markdown.",
      "url": "https://discordapp.com",
      "color": 9815557,
      "timestamp": "2019-01-31T08:59:33.935Z",
      "footer": {
        "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
        "text": "footer text"
      },
      "thumbnail": {
        "url": "https://cdn.discordapp.com/embed/avatars/0.png"
      },
      "image": {
        "url": "https://cdn.discordapp.com/embed/avatars/0.png"
      },
      "author": {
        "name": "author name",
        "url": "https://discordapp.com",
        "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
      },
      "fields": [{
          "name": "🤔",
          "value": "some of these properties have certain limits..."
        },
        {
          "name": "😱",
          "value": "try exceeding some of them!"
        },
        {
          "name": "🙄",
          "value": "an informative error should show up, and this view will remain as-is until all issues are fixed"
        },
        {
          "name": "<:thonkang:219069250692841473>",
          "value": "these last two",
          "inline": true
        },
        {
          "name": "<:thonkang:219069250692841473>",
          "value": "are inline fields",
          "inline": true
        }
      ]
    }
    message.author.send(`\`\`\`json\n${JSON.stringify(embed,null,2)}\n\`\`\``);
    message.author.send({embed});
  } else {
    async function f() {
      try {
        let embed = await JSON.parse(final);
        if (embed.color) {
          embed.color = parseInt(embed.color.replace('#', '0x'));
        }
        await message.channel.send({embed});
      } catch (e) {
        message.channel.send({
          embed: {
            title: 'Error',
            description: `**Error name:** ${e.name}\n**Type:** ${e.message}`,
            color: bot.config.colors.error
          }
        });
      }
    }
    f();
  }

}

exports.desc = 'Generates an embed from a JSON input and sends it. Use `embed help` to see an example';
exports.usage = '<JSON-OBJECT>';
exports.aliases = ['e'];
