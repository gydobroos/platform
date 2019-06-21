import { Defaults } from 'src/core/shopware';

/**
 * @module core/factory/context
 * @type factory
 */
export default function createContext(context = {}) {
    const isDevMode = (process.env.NODE_ENV !== 'production');
    const installationPath = getInstallationPath(context, isDevMode);
    const apiPath = `${installationPath}/api`;

    let languageId = Defaults.systemLanguageId;
    const storedLanguageId = localStorage.getItem('sw-admin-current-language');
    if (storedLanguageId) {
        languageId = storedLanguageId;
    }

    Object.assign(context, {
        installationPath,
        environment: process.env.NODE_ENV,
        apiPath: apiPath,
        apiResourcePath: `${apiPath}/v1`,
        currentUser: {},
        assetsPath: getAssetsPath(installationPath, isDevMode),
        languageId: languageId
    });

    if (isDevMode) {
        Object.assign(context, {
            systemLanguageId: Defaults.systemLanguageId,
            defaultLanguageIds: Defaults.defaultLanguageIds,
            liveVersionId: Defaults.versionId
        });
    }

    return context;
}

/**
 * Provides the installation path of the application. The path provides the scheme, host and sub directory.
 *
 * @param {Object} context
 * @param {Boolean} isDevMode
 * @returns {string}
 */
function getInstallationPath(context, isDevMode) {
    if (isDevMode) {
        return '';
    }

    let fullPath = '';
    if (context.schemeAndHttpHost && context.schemeAndHttpHost.length) {
        fullPath = `${context.schemeAndHttpHost}${context.basePath}`;
    }

    return fullPath;
}

/**
 * Provides the path to the assets directory.
 *
 * @param {String} installationPath
 * @param {Boolean} isDevMode
 * @returns {string}
 */
function getAssetsPath(installationPath, isDevMode) {
    if (isDevMode) {
        return '';
    }

    return `${installationPath}/bundles/`;
}
