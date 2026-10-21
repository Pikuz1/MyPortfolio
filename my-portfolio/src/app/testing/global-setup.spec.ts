// Runs around every spec: the saved language lives in localStorage, which is shared by all specs
beforeEach(() => localStorage.removeItem('portfolio-language'));
afterEach(() => localStorage.removeItem('portfolio-language'));
