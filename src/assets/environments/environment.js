/**
 * This mechanism allows to configure the client application with environment specific property values.
 * The active environment is the value of the environment variable SYSTEM_ENV, see the Dockerfile.
 *
 * Note: To use dynamic property values, you can set as value a token that is replaced just before
 * starting the server based on an environment variable. This can be done in the Dockerfile.
 */
const environment = {
    someProperty: 'Value for LOCAL DEV'
};
