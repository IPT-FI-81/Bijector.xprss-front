// export * from './workflow'
// export * from './service'
// export * from './user'
// export * from './user-auth'

module.exports = {
    MOCK_SERVICES: require('./service'),
    MOCK_USERS: require('./user'),
    MOCK_USERS_AUTH: require('./user-auth'),
    MOCK_WORKFLOWS: require('./workflow'),
};