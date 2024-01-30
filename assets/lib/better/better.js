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