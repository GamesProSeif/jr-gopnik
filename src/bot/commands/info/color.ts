import convert from 'color-convert';
import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';

const COLORS = [
  'AliceBlue',
  'AntiqueWhite',
  'Aqua',
  'Aquamarine',
  'Azure',
  'Beige',
  'Bisque',
  'Black',
  'BlanchedAlmond',
  'Blue',
  'BlueViolet',
  'Brown',
  'BurlyWood',
  'CadetBlue',
  'Chartreuse',
  'Chocolate',
  'Coral',
  'CornflowerBlue',
  'Cornsilk',
  'Crimson',
  'Cyan',
  'DarkBlue',
  'DarkCyan',
  'DarkGoldenRod',
  'DarkGray',
  'DarkGrey',
  'DarkGreen',
  'DarkKhaki',
  'DarkMagenta',
  'DarkOliveGreen',
  'DarkOrange',
  'DarkOrchid',
  'DarkRed',
  'DarkSalmon',
  'DarkSeaGreen',
  'DarkSlateBlue',
  'DarkSlateGray',
  'DarkSlateGrey',
  'DarkTurquoise',
  'DarkViolet',
  'DeepPink',
  'DeepSkyBlue',
  'DimGray',
  'DimGrey',
  'DodgerBlue',
  'FireBrick',
  'FloralWhite',
  'ForestGreen',
  'Fuchsia',
  'Gainsboro',
  'GhostWhite',
  'Gold',
  'GoldenRod',
  'Gray',
  'Grey',
  'Green',
  'GreenYellow',
  'HoneyDew',
  'HotPink',
  'IndianRed',
  'Indigo',
  'Ivory',
  'Khaki',
  'Lavender',
  'LavenderBlush',
  'LawnGreen',
  'LemonChiffon',
  'LightBlue',
  'LightCoral',
  'LightCyan',
  'LightGoldenRodYellow',
  'LightGray',
  'LightGrey',
  'LightGreen',
  'LightPink',
  'LightSalmon',
  'LightSeaGreen',
  'LightSkyBlue',
  'LightSlateGray',
  'LightSlateGrey',
  'LightSteelBlue',
  'LightYellow',
  'Lime',
  'LimeGreen',
  'Linen',
  'Magenta',
  'Maroon',
  'MediumAquaMarine',
  'MediumBlue',
  'MediumOrchid',
  'MediumPurple',
  'MediumSeaGreen',
  'MediumSlateBlue',
  'MediumSpringGreen',
  'MediumTurquoise',
  'MediumVioletRed',
  'MidnightBlue',
  'MintCream',
  'MistyRose',
  'Moccasin',
  'NavajoWhite',
  'Navy',
  'OldLace',
  'Olive',
  'OliveDrab',
  'Orange',
  'OrangeRed',
  'Orchid',
  'PaleGoldenRod',
  'PaleGreen',
  'PaleTurquoise',
  'PaleVioletRed',
  'PapayaWhip',
  'PeachPuff',
  'Peru',
  'Pink',
  'Plum',
  'PowderBlue',
  'Purple',
  'RebeccaPurple',
  'Red',
  'RosyBrown',
  'RoyalBlue',
  'SaddleBrown',
  'Salmon',
  'SandyBrown',
  'SeaGreen',
  'SeaShell',
  'Sienna',
  'Silver',
  'SkyBlue',
  'SlateBlue',
  'SlateGray',
  'SlateGrey',
  'Snow',
  'SpringGreen',
  'SteelBlue',
  'Tan',
  'Teal',
  'Thistle',
  'Tomato',
  'Turquoise',
  'Violet',
  'Wheat',
  'White',
  'WhiteSmoke',
  'Yellow',
  'YellowGreen'
];

export default class ColourCommand extends Command {
  constructor() {
    super('color', {
      aliases: ['color', 'colour', 'color-info', 'colour-info', 'c'],
      description: {
        content:
          'Displays information about a color\n**Available Formats:** Hex, RGB, HSL, HSV, HWB, CMYK, Integer, Ansi16, Ansi256, and CSS keywords',
        usage: '<color-value>',
        examples: [
          '#FFFFFF',
          'rgb(255, 255, 255)',
          'hsl(350, 35%, 50%)',
          'ansi16(91)'
        ]
      },
      category: 'info'
    });
  }

  public *args() {
    const keyword = yield {
      type: COLORS
    };

    if (keyword) {
      return {
        type: 'keyword',
        color: convert.keyword.hex(keyword.toLowerCase())
      };
    }

    const rgb = yield {
      type: /rgb\( *(?<red>[0-9]{1,2}|[01][0-9]{1,2}|2[0-4][0-9]|25[0-5]) *, *(?<green>[0-9]{1,2}|[01][0-9]{1,2}|2[0-4][0-9]|25[0-5]) *, *(?<blue>[0-9]{1,2}|[01][0-9]{1,2}|2[0-4][0-9]|25[0-5]) *\)/,
      match: 'text'
    };

    if (rgb) {
      return {
        type: 'rgb',
        color: convert.rgb.hex(rgb.match.groups)
      };
    }

    const hsl = yield {
      type: /hsl\( *(?<hue>[0-9]{1,2}|[0-2][0-9]{1,2}|3[0-5][0-9]|360) *, *(?<sat>[0-9]{1,2}|100) *%? *, *(?<light>[0-9]{1,2}|100) *%? *\)/,
      match: 'text'
    };

    if (hsl) {
      return {
        type: 'hsl',
        color: convert.hsl.hex(hsl.match.groups)
      };
    }

    const hsv = yield {
      type: /hsv\( *(?<hue>[0-9]{1,2}|[0-2][0-9]{1,2}|3[0-5][0-9]|360) *, *(?<sat>[0-9]{1,2}|100) *%? *, *(?<value>[0-9]{1,2}|100) *%? *\)/,
      match: 'text'
    };

    if (hsv) {
      return {
        type: 'hsv',
        color: convert.hsv.hex(hsv.match.groups)
      };
    }

    const hwb = yield {
      type: /hwb\( *(?<hue>[0-9]{1,2}|[0-2][0-9]{1,2}|3[0-5][0-9]|360) *, *(?<white>[0-9]{1,2}|100) *%? *, *(?<black>[0-9]{1,2}|100) *%? *\)/,
      match: 'text'
    };

    if (hwb) {
      return {
        type: 'hwb',
        color: convert.hwb.hex(hwb.match.groups)
      };
    }

    const cmyk = yield {
      type: /cmyk\( *(?<cyan>[0-9]{1,2}|100) *%? *, *(?<magneta>[0-9]{1,2}|100) *%? *, *(?<yellow>[0-9]{1,2}|100) *%? *, *(?<black>[0-9]{1,2}|100) *%? *\)/,
      match: 'text'
    };

    if (cmyk) {
      return {
        type: 'cymk',
        color: convert.cmyk.hex(hwb.match.groups)
      };
    }

    const hex = yield {
      type: /\b#?(?<hex>[A-Fa-f0-9]{6})\b/,
      match: 'text'
    };

    if (hex) {
      return {
        type: 'hex',
        color: hex.match.groups.hex.toUpperCase()
      };
    }

    const int = yield {
      type: /int\((?<int>[0-9]+)\)/,
      match: 'text'
    };

    if (int) {
      return {
        type: 'int',
        color: parseInt(int.match.groups.int)
          .toString(16)
          .toUpperCase()
      };
    }

    const ansi16 = yield {
      type: /ansi16\((?<ansi16>[0-9]+)\)/,
      match: 'text'
    };

    if (ansi16) {
      return {
        type: 'ansi16',
        color: convert.ansi16.hex(ansi16.match.groups.ansi16)
      };
    }

    const ansi256 = yield {
      type: /ansi256\((?<ansi256>[0-9]+)\)/,
      match: 'text'
    };

    if (ansi256) {
      return {
        type: 'ansi256',
        color: convert.ansi256.hex(ansi256.match.groups.ansi256)
      };
    }

    return { error: true };
  }

  public exec(message: Message, args: any) {
    if (args.error) {
      return message.util!.send({
        embed: {
          title: 'Error',
          description: `That's not a valid color! Try the command again.`,
          color: this.client.config.colors!.error
        }
      });
    }

    const colors: any = {};

    colors.hex = `**Hex:** #${args.color}`;
    colors.rgb = `**RGB:** rgb(${convert.hex.rgb(args.color)})`;
    colors.hsl = `**HSL:** hsl(${convert.hex.hsl(args.color)})`;
    colors.hsv = `**HSV:** hsv(${convert.hex.hsv(args.color)})`;
    colors.hwb = `**HWB:** hwb(${convert.hex.hwb(args.color)})`;
    colors.cmyk = `**CMYK:** cmyk(${convert.hex.cmyk(args.color)})`;
    colors.int = `**Integer:** int(${parseInt(args.color, 16)})`;
    colors.ansi16 = `**Ansi16:** ansi16(${convert.hex.ansi16(args.color)})`;
    colors.ansi256 = `**Ansi256:** ansi256(${convert.hex.ansi256(args.color)})`;

    const cssColor =
      COLORS[
        COLORS.findIndex(
          c => c.toLowerCase() === convert.hex.keyword(args.color)
        )
      ];

    colors.css = `**CSS:** ${cssColor}`;

    const embed = new MessageEmbed()
      .setColor(parseInt(args.color, 16))
      .setTitle('❯ Colors')
      .setDescription(
        Object.values(colors)
          .map(c => `• ${c}`)
          .join('\n')
      );

    return message.util!.send(embed);
  }
}
