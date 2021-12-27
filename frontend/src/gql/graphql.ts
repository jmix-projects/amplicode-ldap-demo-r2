/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** BigDecimal */
  BigDecimal: any;
  /** BigInteger */
  BigInteger: any;
  /** Byte */
  Byte: any;
  /** Char */
  Char: any;
  /** Date */
  Date: any;
  /** DateTime */
  DateTime: any;
  /** LocalDate */
  LocalDate: any;
  /** LocalDateTime */
  LocalDateTime: any;
  /** LocalTime */
  LocalTime: any;
  /** Long */
  Long: any;
  /** OffsetDateTime */
  OffsetDateTime: any;
  /** OffsetTime */
  OffsetTime: any;
  /** Short */
  Short: any;
  /** Time */
  Time: any;
  /** UUID */
  UUID: any;
  /** Void */
  Void: any;
};

export type ConnectionSettingsDto = {
  __typename?: "ConnectionSettingsDto";
  baseDn: Scalars["String"];
  connectionDomainName: Scalars["String"];
  connectionPassword: Scalars["String"];
  urls: Array<Scalars["String"]>;
};

export type ConnectionSettingsDtoInput = {
  baseDn: Scalars["String"];
  connectionDomainName: Scalars["String"];
  connectionPassword: Scalars["String"];
  urls: Array<StringInput>;
};

export type LdapLogEventDto = {
  __typename?: "LdapLogEventDto";
  date: Scalars["OffsetDateTime"];
  id: Scalars["Long"];
  level: LogLevel;
  logger: Scalars["String"];
  loggerSimpleName: Scalars["String"];
  message: Scalars["String"];
  thread: Scalars["String"];
  throwableClass?: Maybe<Scalars["String"]>;
  throwableMessage?: Maybe<Scalars["String"]>;
};

export enum LogLevel {
  Debug = "DEBUG",
  Error = "ERROR",
  Fatal = "FATAL",
  Info = "INFO",
  Off = "OFF",
  Trace = "TRACE",
  Warn = "WARN",
}

export type MatchingRuleDto = {
  __typename?: "MatchingRuleDto";
  description?: Maybe<Scalars["String"]>;
  entityAttribute: Scalars["String"];
  id?: Maybe<Scalars["Long"]>;
  ldapAttribute: Scalars["String"];
};

export type MatchingRuleDtoInput = {
  description?: InputMaybe<Scalars["String"]>;
  entityAttribute: Scalars["String"];
  id?: InputMaybe<Scalars["Long"]>;
  ldapAttribute: Scalars["String"];
};

/** Mutation root */
export type Mutation = {
  __typename?: "Mutation";
  deleteMatchingRule: Scalars["Boolean"];
  deleteUser?: Maybe<Scalars["Void"]>;
  updateConnectionSettings?: Maybe<ConnectionSettingsDto>;
  updateMatchingRule?: Maybe<MatchingRuleDto>;
};

/** Mutation root */
export type MutationDeleteMatchingRuleArgs = {
  id?: InputMaybe<Scalars["Long"]>;
};

/** Mutation root */
export type MutationDeleteUserArgs = {
  id?: InputMaybe<Scalars["Long"]>;
};

/** Mutation root */
export type MutationUpdateConnectionSettingsArgs = {
  connectionSettings?: InputMaybe<ConnectionSettingsDtoInput>;
};

/** Mutation root */
export type MutationUpdateMatchingRuleArgs = {
  matchingRule?: InputMaybe<MatchingRuleDtoInput>;
};

/** Query root */
export type Query = {
  __typename?: "Query";
  connectionSettings?: Maybe<ConnectionSettingsDto>;
  findMatchingRule?: Maybe<MatchingRuleDto>;
  ldapLogEventList?: Maybe<Array<Maybe<LdapLogEventDto>>>;
  listMatchingRules?: Maybe<Array<Maybe<MatchingRuleDto>>>;
  users?: Maybe<Array<Maybe<UserDto>>>;
  verifyDevelopersRole?: Maybe<Scalars["Boolean"]>;
  verifyManagersRole?: Maybe<Scalars["Boolean"]>;
  whoAmI: Scalars["String"];
};

/** Query root */
export type QueryFindMatchingRuleArgs = {
  id?: InputMaybe<Scalars["Long"]>;
};

export type StringInput = {
  hash: Scalars["Int"];
};

export type UserDto = {
  __typename?: "UserDto";
  email?: Maybe<Scalars["String"]>;
  id: Scalars["Long"];
  phone?: Maybe<Scalars["String"]>;
  roles?: Maybe<Array<Maybe<Scalars["String"]>>>;
  username: Scalars["String"];
};

export type WhoAmIQueryVariables = Exact<{ [key: string]: never }>;

export type WhoAmIQuery = { __typename?: "Query"; whoAmI: string };

export type VerifyDevelopersRoleQueryVariables = Exact<{
  [key: string]: never;
}>;

export type VerifyDevelopersRoleQuery = {
  __typename?: "Query";
  verifyDevelopersRole?: boolean | null | undefined;
};

export type VerifyManagersRoleQueryVariables = Exact<{ [key: string]: never }>;

export type VerifyManagersRoleQuery = {
  __typename?: "Query";
  verifyManagersRole?: boolean | null | undefined;
};

export type FindUsersQueryVariables = Exact<{ [key: string]: never }>;

export type FindUsersQuery = {
  __typename?: "Query";
  users?:
    | Array<
        | {
            __typename?: "UserDto";
            id: any;
            username: string;
            email?: string | null | undefined;
            phone?: string | null | undefined;
            roles?: Array<string | null | undefined> | null | undefined;
          }
        | null
        | undefined
      >
    | null
    | undefined;
};

export type DeleteUserMutationVariables = Exact<{
  id: Scalars["Long"];
}>;

export type DeleteUserMutation = {
  __typename?: "Mutation";
  deleteUser?: any | null | undefined;
};

export const WhoAmIDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "whoAmI" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "whoAmI" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<WhoAmIQuery, WhoAmIQueryVariables>;
export const VerifyDevelopersRoleDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "verifyDevelopersRole" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "verifyDevelopersRole" },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  VerifyDevelopersRoleQuery,
  VerifyDevelopersRoleQueryVariables
>;
export const VerifyManagersRoleDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "verifyManagersRole" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "verifyManagersRole" },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  VerifyManagersRoleQuery,
  VerifyManagersRoleQueryVariables
>;
export const FindUsersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "findUsers" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "users" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "username" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "phone" } },
                { kind: "Field", name: { kind: "Name", value: "roles" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FindUsersQuery, FindUsersQueryVariables>;
export const DeleteUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "deleteUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Long" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteUser" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;
