import gql from "graphql-tag";

export const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    postLink(description: $description, url: $url) {
      id
      createdAt
    }
  }
`;

export const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

export const POST_ARTICLE_MUTATION = gql`
  mutation PostMutation($title: String!, $description: String!, $author: String!, $topic: String!) {
    postArticle(title: $title, description: $description, author: $author, topic: $topic) {
      id
      createdAt
    }
  }
`;

export const VOTE_ARTICLE_MUTATION = gql`
  mutation VoteMutation($articleId: ID!) {
    voteArticle(articleId: $articleId) {
      id
      article {
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        links {
          url
          description
        }
      }
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation SignupMutation($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`;
