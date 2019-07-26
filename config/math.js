const { create, all } = require('mathjs');

const math = create(all);
const limitedEval = math.evaluate;

math.import(
  {
    import: () => {
      throw new Error('Function import is disabled');
    },
    createUnit: () => {
      throw new Error('Function createUnit is disabled');
    },
    evaluate: () => {
      throw new Error('Function evaluate is disabled');
    }
    // parse: () => {
    //   throw new Error('Function parse is disabled');
    // }
  },
  { override: true }
);

try {
  const evaled = limitedEval(process.argv[2]);
  console.log(JSON.stringify({ evaled: evaled.toString() }));
} catch (error) {
  console.error(error.message);
}
