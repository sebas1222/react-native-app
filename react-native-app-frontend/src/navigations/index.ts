const mainRoutes = {
  home: "Home",
  login: "Login",
  register: "Register",
  forgotPassword: "ForgotPassword",
  home_tab: "Home Tab",
  search: "Search",
  recipes: "Recipes",
  settings: "Settings",
};

export const routes = {
  authRoutes: {
    login: {
      init: `${mainRoutes.login}`,
      title: "Iniciar Sesión",
    },
    register: {
      init: `${mainRoutes.register}`,
      title: "Registrarse",
    },
    forgotPassword: {
      init: `${mainRoutes.forgotPassword}`,
      label: "Recuperar contraseña",
    },
    home: {
      init: `${mainRoutes.home}`,
      title: "Inicio",
    }, //nestedhome
  },
  homeRoutes: {
    homeTab: {
      init: `${mainRoutes.home_tab}`,
      label: "Inicio",
    },
    recipes: {
      init: `${mainRoutes.recipes}`,
      label: "Recetas",
    },
    search: {
      init: `${mainRoutes.search}`,
      label: "Buscar",
    },
  },
};
