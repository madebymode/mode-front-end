module.exports = (function(window, document, undefined) {
  /**
   * How many days has it been since a given timestamp?
   * @see https://stackoverflow.com/a/32200171/1786459
   * @param  {String}    timestamp
   * @return {Boolean}
   */
  function daysSince(timestamp) {
    if (Object.prototype.toString.call(timestamp) === '[object Date]') {
      timestamp = timestamp.getTime();
    } else {
      timestamp = parseInt(timestamp, 10);
    }

    let then = new Date(timestamp);
    then.setHours(0);
    then.setMinutes(0);
    then.setSeconds(0, 0);

    let now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0, 0);

    // time / 1000ms / 60sec / 60min / 24hr = days
    return (now.getTime() - then.getTime()) / 1000 / 60 / 60 / 24;
  }

  // Example:
  // let today = new Date();
  // let yesterday = new Date();
  // yesterday.setDate(yesterday.getDate() - 1);
  // let lastWeek = new Date();
  // lastWeek.setDate(lastWeek.getDate() - 7);
  // let tomorrow = new Date();
  // tomorrow.setDate(tomorrow.getDate() + 1);
  // console.log(daysSince(today));
  // console.log(daysSince(yesterday));
  // console.log(daysSince(lastWeek));
  // console.log(daysSince(tomorrow));

  return daysSince;
})(window, document);
