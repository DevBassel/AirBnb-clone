import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  ADMIN = 'admin',
  HOST = 'host',
  GUEST = 'guest',
}

export enum GraphQLUserRole {
  HOST = 'host',
  GUEST = 'guest',
}
registerEnumType(GraphQLUserRole, {
  name: 'UserRole',
  description: 'The roles available for a user',
  valuesMap: {
    HOST: { description: 'Standard user role' },
    GUEST: { description: 'Guest role' },
  },
});
