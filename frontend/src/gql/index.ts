/* eslint-disable */
import * as graphql from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

const documents = {
  "\r\n    query findUsers {\r\n        users {\r\n            id\r\n            username\r\n            email\r\n            phone\r\n            roles\r\n        }\r\n    }\r\n":
    graphql.FindUsersDocument,
  "\r\n    mutation deleteUser ($id: Long!) {\r\n        deleteUser(id: $id)\r\n    }\r\n":
    graphql.DeleteUserDocument,
};

export function gql(
  source: "\r\n    query findUsers {\r\n        users {\r\n            id\r\n            username\r\n            email\r\n            phone\r\n            roles\r\n        }\r\n    }\r\n"
): typeof documents["\r\n    query findUsers {\r\n        users {\r\n            id\r\n            username\r\n            email\r\n            phone\r\n            roles\r\n        }\r\n    }\r\n"];
export function gql(
  source: "\r\n    mutation deleteUser ($id: Long!) {\r\n        deleteUser(id: $id)\r\n    }\r\n"
): typeof documents["\r\n    mutation deleteUser ($id: Long!) {\r\n        deleteUser(id: $id)\r\n    }\r\n"];

export function gql(source: string): unknown;
export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
