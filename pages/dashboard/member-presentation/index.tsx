import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getSession } from "next-auth/react";
import React, { useCallback } from "react";
import ENDPOINT from "~constantes/enpoint";
import { RESPONSE_ATTR } from "~constantes/response-attr";
import { USER_TYPES } from "~constantes/user-types";
import { AdminLayout } from "~layout";
import {  User } from "~models/user";
import { getAllUser } from "~repositories/user";


type TMemberProps = {
    users: User[];
};
const MemberPresentation = (props: TMemberProps) => {
    const { users } = props;

    const userTypes = useCallback((userTypeId: number)=>USER_TYPES.find(item => item.value === userTypeId),[users])

    return (
        <AdminLayout noMargin>
          <div className="full-width flex-center main-pres-bg " >
            <h1 className="pres-header-title">Les membres de <span>Techzara communauté</span></h1>
            <div className="all-users-pres-wrap flex-wrap flex-center">
                {users?.map((user) => (
                    <div className="user-card-informations flex-center flex-column">
                        <div className="user-pres-picture-wrapper flex-center">
                            <div className="gap"></div>
                            <img
                                className="user-pres-picture"
                                src={user?.cover?.contentUrl ? ENDPOINT.MEDIA_PATH+(user?.cover?.contentUrl ||"") : "/assets/img/avatars/default.png"}
                            />
                        </div>
                        <div className="user-pres-name flex-center">
                            {user?.firstname || ""} {user?.lastname || ""}
                        </div>
                        <div className="user-pres-type flex-center">
                            <FontAwesomeIcon icon={userTypes(user?.userType || 0)?.icon || faEllipsis} /> {userTypes(user?.userType || 0)?.name || ""}
                        </div>
                    </div>
                ))}
            </div>
          </div>
        </AdminLayout>
    );
};

export const getServerSideProps = async (context: any) => {
    const session: any = await getSession(context);
    try {
        const data: User[] = await getAllUser(session.accessToken);

        return {
            props: {
                users: (data as any)?.[RESPONSE_ATTR.data] || [],
            },
        };
    } catch (e) {
        console.log(e);
        return {
            props: {
                users: [],
            },
        };
    }
};

export default MemberPresentation;
