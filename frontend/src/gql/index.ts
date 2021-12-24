/* eslint-disable */
import * as graphql from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

const documents = {
  "\n    query whoAmI {\n        whoAmI\n    }\n": graphql.WhoAmIDocument,
  "\n    query developersRoleAction {\n        developersRoleAction\n    }\n":
    graphql.DevelopersRoleActionDocument,
  "\n    query managersRoleAction {\n        managersRoleAction\n    }\n":
    graphql.ManagersRoleActionDocument,
  "\n    query findUsers {\n        users {\n            id\n            username\n            email\n            phone\n            roles\n        }\n    }\n":
    graphql.FindUsersDocument,
  "\n    mutation deleteUser ($id: Long!) {\n        deleteUser(id: $id)\n    }\n":
    graphql.DeleteUserDocument,
};

export function gql(
  source: "\n    query whoAmI {\n        whoAmI\n    }\n"
): typeof documents["\n    query whoAmI {\n        whoAmI\n    }\n"];
export function gql(
  source: "\n    query developersRoleAction {\n        developersRoleAction\n    }\n"
): typeof documents["\n    query developersRoleAction {\n        developersRoleAction\n    }\n"];
export function gql(
  source: "\n    query managersRoleAction {\n        managersRoleAction\n    }\n"
): typeof documents["\n    query managersRoleAction {\n        managersRoleAction\n    }\n"];
export function gql(
  source: "\n    query findUsers {\n        users {\n            id\n            username\n            email\n            phone\n            roles\n        }\n    }\n"
): typeof documents["\n    query findUsers {\n        users {\n            id\n            username\n            email\n            phone\n            roles\n        }\n    }\n"];
export function gql(
  source: "\n    mutation deleteUser ($id: Long!) {\n        deleteUser(id: $id)\n    }\n"
): typeof documents["\n    mutation deleteUser ($id: Long!) {\n        deleteUser(id: $id)\n    }\n"];

export function gql(source: string): unknown;
export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
