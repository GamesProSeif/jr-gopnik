> This product is not ready for usage,  
> Neither the completion of this documentation.

# Jr. Gopnik

### Table of Contents

1. [Description](#description)
1. [Setting-up](#setting-up)
1. [Customizing](#customizing)
1. [Hosting](#hosting)
1. [Extra information](#extra-information)
1. [Credits](#credits)

---

### Description

Dynamic customizable Discord bot, made purely from JavaScript. The application runs a Discord bot aside with a dashboard server for customizing and other multiple features. The application uses the [Discord.js](https://discord.js.org/) library, and the [Akairo](https://discord-akairo.github.io/) framework, both giving ease in customizing the bot.

---

### Setting-up

You need to set up the environment needed for the bot to work in. If you are stuck with any step, you can search on YouTube on how to do them. Further description will be documented later.  
Please follow the steps provided (ticked steps are required, unticked are optional):

- [x] Make a bot account from [Discord Developers](https://discordapp.com/developers/).
- [x] Install [Node.js](https://nodejs.org/en/) and make sure you have a version of 10.0.0 or higher.
- [ ] Install a text editor such as [Atom](https://atom.io/).
- [x] Set up a remote MongoDB database service (You can use [MongoDB Atlas](https://docs.atlas.mongodb.com/create-new-cluster/))
- [x] Get API Keys for:
  - [IPInfoDB](https://ipinfodb.com/api)
  - [YouTube Data API](https://developers.google.com/youtube/v3/getting-started)
  - [Bit.ly](https://bit.ly/)
- [x] Download the latest version of the bot from [here](https://github.com/GamesProSeif/jr-gopnik/releases).
- [x] Open the `setup.bat` file and run through the setup questions.
- [x] Open the `start.bat` file after doing all steps above.

Your bot should be up and running now.

---

### Customizing

Customizing the bot will allow you to modify some of its functionality, such as embed colors, default cooldown time, and even more. Check all customizable properties <!--TODO: add link for customizable links -->.  
You can use configure the bot by two methods.

a) [Customize using server](#customize-using-server)

b) [Customize using text editor](#customize-using-text-editor)

Both ways will get you done, it's only what you prefer.

##### Customize using server

If you want a user friendly interface, go to the configure endpoint on your server. If you are hosting the server on your local machine, you can go to `localhost:PORT/configure`, where `PORT` is the port number your bot is hosted on (default is `8080`). You will be able to customize the bot easily there from a bunch of lists.

> Note that a **restart** is required after changing values **and** hitting the _save_ button.  
> To restart, simply close the batch file `start.bat`, then open it again.

##### Customize using text editor

If you prefer to work under the hoods, then go and edit the `~/config/config.json` file, and start changing the values. The customizable properties page has full documentation for keys and values used.  
You can add/modify/remove commands from the `~/bot/commands/` folder. You would need to learn usage of [Akairo](https://discord-akairo.github.io/) before proceeding to working with commands. Command structures are documented in [Akairo's basic commands section](https://discord-akairo.github.io/#/docs/main/master/basics/commands).

A simple example for a command file is:

```js
const { Command } = require('discord-akairo');

class GreetCommand extends Command {
  constructor() {
    super('greet', {
      // Command ID
      aliases: ['greet', 'welcome', 'say-hi'], // Command Aliases that call the command
      description: 'Greets a user', // Description of command
      category: 'text', // Used in help command
      args: [
        // Argument array containing argument objects
        {
          id: 'user', // ID of the argument used in args.user
          type: 'user' // Type of argument to match
        }
      ]
    });
  }

  exec(message, args) {
    message.channel.send(`Welcome ${args.user}!`);
  }
}

module.exports = GreetCommand;
```

> Note that a **restart** is required after changing code **and** saving
> To restart, simply close the batch file `start.bat`, then open it again.

---

### Hosting

A lot of options are valid for hosting the app. You can host it on your local machine, on a VPS, or a free service such as [Heroku](https://heroku.com). The app would work properly on all platforms. **BUT** consider hiding your bot's token, cause people can steal it, and use it to control your discord bot. The application supports environment variables, which will allow you to hide the token safely. You should remove the `DISCORD_TOKEN` property from the `~/config/config.json` file, then have an environment variable key of `DISCORD_TOKEN` and set its value to your bot's token. A `.env` file is also supported, just put `DISCORD_TOKEN = yourtokenhere` inside it and it should work fine.

After making sure your bot's token is hidden, you can run the bot by the command `npm start`. If there is no errors, the bot should be working fine. If the server isn't working, it's probably due to some scaling issues, which are related to the hoist company, you would read the documentation of how to upload the app to it, or contact their staff if you are still facing issues.

> Note that your `~/config/config.json` file should be uploaded with the bot.  
> You can run the command `npm run setup` from the host service.

---

### Extra information

This is an open source project so contribution of any sort will be much appreciated. Whether it's a typo missing, an old link, modification in code, I'd love any help from you, as it helps make the app better.

This app is still under development, so some issues might be experienced, and some stuff above might not be even created yet. Please be patient while updates undergo.

The app is authored and maintained by [GamesProSeif](https://github.com/GamesProSeif 'GamesProSeif GitHub page').

---

### Credits

Big thanks to everyone below who helped me reach what I did. Much Love <3

- Pride - Designing application logo, and letting me test my bot on his server's community.
- Shadow - Coming up with the application name, suggested a couple of commands.
- BlastWarrior - Tons of suggestions and help in testing.
- Pride server's community - Testing bot.

---

Copyright (c) 2019 GamesProSeif All Rights Reserved.
