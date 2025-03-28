import Keycloak from 'keycloak-js';

class KeycloakService {
  keycloak = null;

  initKeycloak(onAuthenticatedCallback) {
    this.keycloak = new Keycloak({
        url: 'http://localhost:8080',
        realm: 'patient-therapist-platform',
        clientId: 'frontend-client',
    });

    this.keycloak.init({ onLoad: "check-sso", }).then((authenticated) => {
      if (authenticated) {
        console.log('Authenticated');
        onAuthenticatedCallback();
      } else {
        console.log('Not authenticated');
        this.keycloak.login();
      }
    });
  }

  logout() {
    this.keycloak.logout();
  }

  getToken() {
    return this.keycloak.token;
  }

  isAuthenticated() {
    return this.keycloak.authenticated;
  }

  updateToken() {
    return this.keycloak.updateToken(70); 
  }

  getUserId() {
    if (this.keycloak && this.keycloak.tokenParsed) {
      return this.keycloak.tokenParsed.sub;
    }
    return null;
  }
}

const keycloakService = new KeycloakService();

export default keycloakService;
