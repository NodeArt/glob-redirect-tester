
export function checkWildcardPatterns(wildCard: string, url: string, redirect: string) {
    let edited = '';
    let result: string[] = [];
    const picomatch = require('picomatch');
    // @ts-ignore
    const onMatch = ({regex, input}) => {
      result = regex.exec(input);
      if (!!redirect) {
        edited = redirect.replace('$1', result[1]);
        for (let index in result) {
          edited = edited.replace(`$${index}`, result[index]);
        }
      } else {
        edited = '$1/not-found'.replace('$1', result[1]);
      }
    };

    const isMatch = picomatch(wildCard, {capture: true, onMatch});
    isMatch(url);
    return {edited, result};
  }
// module.exports.matchService = new MatchService();
