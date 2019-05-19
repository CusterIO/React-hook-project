import gql from "graphql-tag";

export const FEED_QUERY = gql`
  {
    feedLinks {
      links {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

export const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feedLinks(filter: $filter) {
      links {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

export const USER_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feedUser(filter: $filter) {
      user {
        id
        email
        name
        links {
          url
          description
        }
        articles {
          title
          author
          description
          topic
        }
      }
    }
  }
`;

export const ARTICLE_QUERY = gql`
  {
    feedArticles {
      articles {
        id
        title
        author
        description
        topic
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

export const ARTICLE_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feedArticles(filter: $filter) {
      articles {
        id
        title
        author
        description
        topic
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;
