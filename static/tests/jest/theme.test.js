const { beforeEach } = require('node:test');
const { toggleTheme } = require('static/js/theme');

beforeEach(() => {
    document.body.innerHTML =       `
        <button id="theme-toggle">
            <span id="theme-icon">🌞</span>
        </button>
        `
});

describe("")
