const removeImports = require('next-remove-imports')();

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Required fix for @uiw/react-md-editor
    transpilePackages: ['@uiw/react-md-editor']
};

module.exports = removeImports(nextConfig);
