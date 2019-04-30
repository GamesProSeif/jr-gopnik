> This product is not ready for usage,  
Neither the completion of this documentation.

# Gopnik

### Table of Contents
1. [Description](#description)
1. [Setting-up](#setting-up)
1. [Configuring](#configuring)
1. [Hosting](#hosting)
1. [Extra information](#extra-information)


___


### Description
A dynamic private Discord bot which is customizable and made out of pure JavaScript language. The application consists of two parts which are linked to each other. The `bot/` part which is responsible for the bot functionality, and the `server/` part which is responsible for the dashboard of the bot.  
As a user, you can only use the dashboard to customize the bot (which is a feature under development). If you are a developer, though, messing with both folders would benefit you more.

___


### Setting-up
You need to set up the environment needed for the bot to work in. If you are stuck with any step, you can search on YouTube on how to do them. Further description will be documented later.  
Please follow the steps provided (ticked steps are required, unticked are optional):

- [x] Make a bot account from [Discord Developers](https://discordapp.com/developers/).
- [x] Install [Node.js](https://nodejs.org/en/) and make sure you have a version of 10.0.0 or higher.
- [ ] Install a text editor such as [Atom](https://atom.io/).
- [x] Download the latest version of the bot from<!-- TODO: link release here -->.
- [x] Open the `setup.bat` file and run through the setup questions.
- [x] Open the `start.bat` file after doing all steps above.


Your bot should be up and running now.

___


### Configuring
Configuring the bot will allow you to customize some of its functionality, such as embed colors, default cooldown time, and even more. Check all customizable properties <!--TODO: add link for customizable links -->.  
You can use configure the bot by two methods.

a) [Configure using server](#configure-using-server)

b) [Configure using text editor](#configure-using-text-editor)

Both ways will get you done, it's only what you prefer.

##### Configure using server
If you want a user friendly interface, go to the configure endpoint on your server. If you are hosting the server on your local machine, you can go to `localhost:PORT/configure`, where `PORT` is the port number your bot is hosted on (default is `8080`). You will be able to customize the bot easily there from a bunch of lists.

> Note that a **restart** is required after changing values **and** hitting the *save* button.  
To restart, simply close the batch file `start.bat`, then open it again.

##### Configure using text editor
If you prefer to work under the hoods, then go and edit the `bot/config/config.json` file, and start changing the values. The customizable properties page has full documentation for keys and values used.  
You can add/modify/remove commands from the `bot/commands/` folder. The bot uses the [discord.js](https://discord.js.org) library, so you'd need to learn it before proceeding to working with commands. Working with commands is fully documented in <!-- TODO: add link for working with commands docs -->.

A simple example for a command file is:
```js
// Required function
exports.run = (bot, message, args) => {
  // Functions to be executed
}

// Optional value
exports.desc = 'Description for the command';
```

> Note that a **restart** is required after changing code **and** saving
To restart, simply close the batch file `start.bat`, then open it again.


___


### Hosting
A lot of options are valid for hosting the app. You can host it on your local machine, on a VPS, or a free service such as [Heroku](https://heroku.com). The app would work properly on all platforms. **BUT** consider hiding your bot's token, cause people can steal it, and use it to control your discord bot. The application supports environment variables, which will allow you to hide the token safely. You should remove the `token` property from the `bot/config/config.json` file, then have an environment variable key of `token` and set its value to your bot's token. A `.env` file is also supported, just put `token=yourtokenheresoyourbotcanwork` inside it and it should work fine.

After making sure your bot's token is hidden, you can run the bot by the command `npm start`. If there is no errors, the bot should be working fine. If the server isn't working, it's probably due to some scaling issues, which are related to the hoist company, you would read the documentation of how to upload the app to it, or contact their staff if you are still facing issues.

> Note that your `config.json` should be uploaded with the bot. Running the command `npm run setup` from the hoist would only ruin your configurations. Your bot should be already configured before uploading.


___


### Extra information
This is an open source project so contribution of any sort will be much appreciated. Whether it's a typo missing, an old link, modification in code, I'd love any help from you, as it helps make the app better.

This app is still under development, so some issues might be experienced, and some stuff above might not be even created yet. Please be patient while updates undergo.

The app is authored and maintained by [GamesProSeif](https://github.com/GamesProSeif "GamesProSeif GitHub page").


___


Copyright (c) 2019 GamesProSeif All Rights Reserved.
