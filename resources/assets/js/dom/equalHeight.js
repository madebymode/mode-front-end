module.exports = (function(window, document, undefined) {

  const attribute = 'data-equal-height';

  function equalize(elements) {
    // Reset all elements
    let maxHeight = elements.reduce((max, el) => {
      el.style.height = '';
      return Math.max(max, el.offsetHeight);
    }, 0);

    // But only resize elements with either a blank or matching media rule
    elements.forEach((el) => {
      let data = el.equalHeightData;

      if (!data.media || window.matchMedia(data.media).matches) {
        el.style.height = maxHeight + 'px';
      }
    });

    return elements;
  }

  function equalizeGroups() {
    let elements = Array.from(document.querySelectorAll('[' + attribute + ']'));

    // ✅ data-equal-height="myGroup"
    // ✅ data-equal-height='{ "group": "myGroup", "media": "(min-width: 480px)" }'
    let groups = elements.reduce((grouped, el) => {
      let group = el.getAttribute(attribute);
      let data;

      try {
        data = JSON.parse(group);
      } catch(e) {
        data = {
          group: group,
          media: null
        };
      }

      el.equalHeightData = data;

      (grouped[data.group] = grouped[data.group] || []).push(el);

      return grouped;
    }, {});

    for (let group in groups) {
      equalize(groups[group]);
    }

    return groups;
  }

  equalizeGroups();
  window.addEventListener('resize', equalizeGroups);

  return equalizeGroups;

})(window, document);
