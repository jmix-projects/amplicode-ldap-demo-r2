import {observer} from "mobx-react";
import {Empty, message, Modal, Table, Typography} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {gql, useMutation, useQuery} from "@apollo/client";
import {useCallback, useEffect, useState} from "react";

const FIND_USERS_QUERY = gql`
    query findUsers {
        users {
            id
            username
            email
            phone
            roles
        }
    }
`;

const DELETE_USER_MUTATION = gql`
    mutation deleteUser ($id: Long!) {
        deleteUser(id: $id)
    }
`;

interface User {
    id: number
    username: string
    email?: string
    phone?: string
    roles?: string[]
}

export const UserList = observer(() => {

            const {data, refetch} = useQuery<{ users: User[] }>(FIND_USERS_QUERY);

            const [deleteUser] = useMutation<{ deleteUser: Boolean }>(DELETE_USER_MUTATION,
                {
                    onError: e => message.error(e.message + "\n User with ID " + deletedUser?.id +
                        " was not deleted")
                });

            let items = data?.users;

            const defaultSortFn = (a: string, b: string) => a.localeCompare(b)

            const [deletedUser, setDeletedUser] = useState<User>();

            const confirmDeletion = useCallback(() => {
                if (deletedUser) {
                    deleteUser({
                        variables: {
                            id: deletedUser.id
                        }
                    }).then(() => refetch()
                        .then(r => items = r?.data.users)
                        .catch(error => {
                            message.error(error.message + "\n Users data refetching failed");
                        })
                    )
                        .catch(error => {
                                message.error(error.message);
                            }
                        )
                }
            }, [deletedUser]);

            const config = {
                title: "Confirm User deletion",
                content: (
                    <>
                        {"The User with ID " + deletedUser?.id + " will be deleted. Click OK to continue"}
                    </>
                ),
                onOk: () => confirmDeletion(),
                onCancel: () => setDeletedUser(undefined)
            }

            useEffect(() => {
                if (deletedUser) {
                    Modal.confirm(config);
                }
            }, [deletedUser]);

            const tableColumns: any = [
                {
                    title: "Username",
                    dataIndex: "username",
                    sorter: (a: any, b: any) => defaultSortFn(a.username, b.username),
                    sortDirections: ["descend", "ascend"],
                    ellipsis: true
                },
                {
                    title: "Email",
                    dataIndex: "email",
                    sorter: (a: any, b: any) => defaultSortFn(a.componentId, b.componentId),
                    ellipsis: true
                },
                {
                    title: "Phone",
                    dataIndex: "phone",
                    sorter: (a: any, b: any) => defaultSortFn(a.componentId, b.componentId),
                    ellipsis: true
                },
                {
                    title: "Roles",
                    dataIndex: "roles",
                    render: (array: string[] | undefined) => {
                        if (array) {
                            return formatStringArray(array)
                        }
                    }
                },
                {
                    title: "Actions",
                    key: "actions",
                    render: (record: User) => {
                        return <div style={{textAlign: "center"}}>
                            <Typography.Link style={{margin: 0, color: "red"}}
                                             onClick={() => setDeletedUser(record)}
                            >
                                <DeleteOutlined/>
                            </Typography.Link>
                        </div>
                    }
                }
            ]

            if (items == null) {
                return <Empty/>;
            } //TODO

            return (
                <div className="narrow-layout">
                    <Table<User>
                        columns={tableColumns}
                        dataSource={items}
                        rowKey="username"
                    />
                </div>
            );
        }
    )
;

function formatStringArray(arr: string[]) {
    let result = "";

    for (const item of arr) {
        result = result + item + ", ";
    }

    return result.slice(0, result.length - 2);
}