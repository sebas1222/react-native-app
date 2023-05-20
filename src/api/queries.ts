import { gql } from '@apollo/client';

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
      avatar
      followers {
        id
        name
        avatar
      }
      following {
        id
        name
        avatar
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
      avatar
      following {
        id
        name
        avatar
        followers {
          id
          name
          avatar
        }
        following {
          id
          name
          avatar
        }
      }
      followers {
        id
        name
        avatar
        followers {
          id
          name
          avatar
        }
        following {
          id
          name
          avatar
        }
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($credentials: LoginUserInput) {
    loginUser(credentials: $credentials) {
      authToken
      userInfo {
        id
        name
        email
        avatar
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
  }
`;
export const REGISTER_USER = gql`
  mutation RegisterUser($credentials: CreateUserInput) {
    createUser(credentials: $credentials) {
      id
    }
  }
`;

export const UPDATE_USER_AVATAR = gql`
  mutation UpdateUserAvatar($avatarUri: String!) {
    updateAvatar(avatarUri: $avatarUri) {
      id
      avatar
    }
  }
`;

export const FOLLOW_USER = gql`
  mutation FollowUser($idUser: ID!) {
    followUser(idUser: $idUser) {
      id
      name
      email
      avatar
      following {
        id
        name
      }
      followers {
        id
        name
      }
    }
  }
`;
export const UNFOLLOW_USER = gql`
  mutation UnfollowUser($idUser: ID!) {
    unFollowUser(idUser: $idUser) {
      id
      name
      email
      avatar
      following {
        id
        name
      }
      followers {
        id
        name
      }
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
export const GET_USER_RECIPES = gql`
  query ($idUser: ID!) {
    recipesByUser(idUser: $idUser) {
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
      id
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
