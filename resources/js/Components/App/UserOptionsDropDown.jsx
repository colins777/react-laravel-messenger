import EllipsisVerticalIcon from "@heroicons/react/16/solid/EllipsisVerticalIcon";
import {Transition} from "@headlessui/react";
import clsx from "clsx";
import LockOpenIcon from "@heroicons/react/16/solid/LockOpenIcon";
import LockClosedIcon from "@heroicons/react/16/solid/LockClosedIcon";
import React from "react";
import UserIcon from "@heroicons/react/16/solid/UserIcon";
import {Menu} from "@headlessui/react";
import {useState} from "react";
import ShieldCheckIcon from "@heroicons/react/16/solid/ShieldCheckIcon";

const UserOptionsDropDown = function({conversation}) {

    const [open, setOpen] = useState(false);

    const changeUserRole = () => {
        if (!conversation.is_user) {
            return;
        }

        axios.post(route('user.changeRole', conversation.id))
            .then((res) => {
                console.log(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const onBlockUser = () => {
        if (!conversation.is_user) {
            return;
        }

        axios.post(route('user.blockUnblock', conversation.id))
            .then((res) => {
                console.log(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (

        <div>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="flex justify-center items-center w-8 h-8 rounded-full hover:bg-black/40"
                         onClick={() => setOpen((open) => !open)}
                    >
                        <EllipsisVerticalIcon className="h-5 w-5" />
                    </Menu.Button>

                </div>
                        <Menu.Items className="absolute right-0 mt-2 w-48 rounded-md bg-gray-800 shadow-lg z-50" >
                            <div className="px-1 py-1">
                                <Menu.Item>
                                    {({active}) => (
                                        <button onClick={onBlockUser}
                                                className={`${
                                                            active ? ' bg-black/30 text-white'
                                                                   : ' text-gray-100'
                                                            } group flex w-full items-center rounded-md px-2 
                                                            py-2 text-sm`
                                                            }
                                        >
                                            {conversation.blocked_at && (
                                                <>
                                                    <LockOpenIcon className='w-4 h-4 mr-2' />
                                                    Unblock user
                                                </>
                                            )}

                                            {!conversation.blocked_at && (
                                                <>
                                                    <LockClosedIcon className='w-4 h-4 mr-2' />
                                                    Block user

                                                </>
                                            )}
                                        </button>
                                    )

                                    }
                                </Menu.Item>
                            </div>

                            <div className="px-1 py-1">
                                <Menu.Item>
                                    {({active}) => (
                                        <button onClick={changeUserRole}
                                                className={`${
                                                    active ? ' bg-black/30 text-white'
                                                        : ' text-gray-100'
                                                } group flex w-full items-center rounded-md px-2 
                                                            py-2 text-sm`
                                                }
                                        >
                                            {conversation.is_admin && (
                                                <>
                                                    <UserIcon className='w-4 h-4 mr-2' />
                                                    Make Regular User
                                                </>
                                            )}

                                            {!conversation.is_admin && (
                                                <>
                                                    <ShieldCheckIcon className='w-4 h-4 mr-2' />
                                                    Add to admin users
                                                </>
                                            )}
                                        </button>
                                    )

                                    }
                                </Menu.Item>
                            </div>
                        </Menu.Items>
            </Menu>
        </div>


    );
}

export default UserOptionsDropDown;
