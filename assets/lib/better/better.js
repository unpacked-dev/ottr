/* better.js includes useful functions JS should have by default */

function cloneObject(object) {
    if (typeof structuredClone === "function") {
        return structuredClone(object);
    }

    try {
        return JSON.parse(JSON.stringify(object));
    } catch(err) {
        return undefined;
    }
}

async function sleep(wait) {
    return new Promise(resolve => setTimeout(resolve, wait));
}

function debounce(func, wait) {
    let timeout;

    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const dynamicEventListeners = [];
function addDynamicEventListener(event, selector, handler) {
  if (!dynamicEventListeners[event]) {
    dynamicEventListeners[event] = [];
    document.addEventListener(event, function (e) {
      for (const listener of dynamicEventListeners[event]) {
        if (e.target.matches(listener.selector)) {
          listener.handler(e);
        }
      }
    });
  }
  dynamicEventListeners[event].push({ selector: selector, handler: handler });
}