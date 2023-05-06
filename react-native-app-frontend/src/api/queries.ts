import { gql } from "@apollo/client";

//USERS

export const GET_USERS_COUNT = gql`
  query GetUsersCount {
    userCount
  }
`;
export const GET_ALL_USERS = gql`
  query GetAllUsersInfo {
    allUsers {
      id
      name
      email
      followers {
        id
        name
      }
      following {
        id
        name
      }
    }
  }
`;
export const GET_ONE_USER = gql`
  query GetOneUser($idUser: ID!) {
    findUser(idUser: $idUser) {
      id
      name
      email
      followers {
        id
        name
      }
      following {
        id
        name
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($credentials: LoginUserInput) {
    loginUser(credentials: $credentials) {
      value
    }
  }
`;
export const REGISTER_USER = gql`
  mutation RegisterUser($credentials: CreateUserInput) {
    createUser(credentials: $credentials) {
      id
    }
  }
`;

//CATEGORIES

export const GET_ONE_RECIPE = gql`
  query GetOneRecipe($idRecipe: ID!) {
    findRecipe(idRecipe: $idRecipe) {
      id
      author {
        id
        name
      }
      name
      description
      category {
        id
        name
      }
      duration
      ingredients
      steps {
        description
        step_number
      }
      images
      likes {
        id
        name
      }
    }
  }
`;

export const GET_ALL_CATEGORIES = gql`
  query getAllCategories {
    allCategories {
      id
      name
    }
  }
`;

//RECIPE
export const GET_ALL_RECIPES = gql`
  query GetAllRecipes {
    allRecipes {
      id
      author {
        id
        name
      }
      name
      description
      category {
        id
        name
      }
      duration
      ingredients
      steps {
        description
        step_number
      }
      images
      likes {
        id
        name
      }
    }
  }
`;
export const POST_RECIPE = gql`
  mutation PostRecipe($info: RecipeInput) {
    createRecipe(info: $info) {
      name
      description
      duration
      author {
        id
        name
      }
      category {
        id
        name
      }
      ingredients
      steps {
        description
        step_number
      }
      images
    }
  }
`;
