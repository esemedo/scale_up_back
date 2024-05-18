function authorizedUser(token: any, request: any) {
    return token.hasRole( 'realm:buyer') || token.hasRole( 'realm:educational-assistant')|| token.hasRole( 'realm:management-controller')|| token.hasRole( 'realm:program-director')|| token.hasRole( 'realm:program-manager')
}

export default authorizedUser;