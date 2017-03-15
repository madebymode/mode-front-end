var map = require('./array/map');

map(document.querySelectorAll('a'), function(el) {
  el.addEventListener('click', function(e) {
    console.log('Clicked anchor: ', this);
  });
});
