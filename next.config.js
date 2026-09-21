const removeImports = require('next-remove-imports')();

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Required fix for @uiw/react-md-editor
    transpilePackages: ['@uiw/react-md-editor'],
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    }
};

module.exports = removeImports(nextConfig);
