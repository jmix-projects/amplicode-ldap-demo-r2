import {gql, useApolloClient, useQuery} from "@apollo/client";
import {Button, notification, Result, Row, Spin} from "antd";
import {observer} from "mobx-react";
import React from 'react';
import {FormattedMessage} from "react-intl";

const WHO_AM_I = gql`
    query whoAmI {
        whoAmI
    }
`;

const VERIFY_DEVELOPERS_ROLE = gql`
    query verifyDevelopersRole {
        verifyDevelopersRole
    }
`;

const VERIFY_MANAGERS_ROLE = gql`
    query verifyManagersRole {
        verifyManagersRole
    }
`;

export const RolesVerification = observer(() => {
    const {loading: whoAmILoading, error: whoAmIError, data: whoAmIData} = useQuery(WHO_AM_I,
        {
            fetchPolicy: "network-only"
        });

    const client = useApolloClient();

    if (whoAmILoading) {
        return <Spin/>;
    }

    if (whoAmIError) {
        return (
            <Result
                status="error"
                title={<FormattedMessage id="common.requestFailed"/>}
            />
        );
    }

    return (
        <div className="narrow-layout">
            <p>Your username is: <i>{whoAmIData?.["whoAmI"]}</i></p>
            <Row style={{marginBottom: "12px"}}>
                <Button
                    htmlType="button"
                    key="create"
                    title={"Verify Developers Role"}
                    type="primary"
                    style={{width: '180px'}}
                    onClick={() => {
                        client.query({
                            query: VERIFY_DEVELOPERS_ROLE,
                            fetchPolicy: "network-only"
                        }).then(() => {
                            notification.success({
                                message: 'Roles Verification',
                                duration: 2,
                                description: 'Your \'Developers\' role verified successfully'
                            })
                        }).catch(error => {
                            console.error(error)
                        });
                    }}
                >
                    <span>
                        Verify Developers Role
                    </span>
                </Button>
            </Row>
            <Row style={{marginBottom: "12px"}}>
                <Button
                    htmlType="button"
                    key="create"
                    title={"Verify Managers Role"}
                    type="primary"
                    style={{width: '180px'}}
                    onClick={() => {
                        client.query({
                            query: VERIFY_MANAGERS_ROLE,
                            fetchPolicy: "network-only"
                        }).then(() => {
                            notification.success({
                                message: 'Roles Verification',
                                duration: 2,
                                description: 'Your \'Managers\' role verified successfully'
                            })
                        }).catch(error => {
                            console.error(error)
                        });
                    }}
                >
                    <span>
                        Verify Managers Role
                    </span>
                </Button>
            </Row>
        </div>
    );
})
