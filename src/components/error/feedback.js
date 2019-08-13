export const ErrorFeedback = code => {
  return graphQLErrors[code];
};

const graphQLErrors = {
  3010: 'Email already registered'
};
