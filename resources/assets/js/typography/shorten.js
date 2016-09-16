module.exports = (function() {
  /**
   * Shorten long text, add ellipsis.
   * @param  {String}  text
   * @param  {Number}  maxLength
   * @return {String}
   */
  function shorten(text, maxLength) {
    maxLength = maxLength || 220;

    if (text.length <= maxLength) {
      return text;
    }

    text = text.substr(0, maxLength);

    // If text ends in whitespace, trim
    if (/^\S/.test(text.substr(maxLength))) {
      text = text.replace(/\s+\S*$/, '');
    }

    // Remove trailing punctuation
    text = text.replace(/[^a-zA-Z]+$/, '');

    return text + '...';
  }

  return shorten;
})();
