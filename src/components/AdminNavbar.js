import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import NavbarInput from '@material-tailwind/react/NavbarInput';
import Image from '@material-tailwind/react/Image';
import Dropdown from '@material-tailwind/react/Dropdown';
import ProfilePicture from '../assets/user.png';
import { UseAuth } from '../hooks/auth';
import api, { TOKEN_KEY, ID, SERVER } from "../api";

import constante from '../constantes';

const token = sessionStorage.getItem(TOKEN_KEY);
const id = localStorage.getItem(ID);

export async function getUser() {
  const res = (
    await api.get(`/users/${id}`, {
      headers: { Authorization: `token ${token}` },
    })
  ).data.response;
  return res;
}

export default function AdminNavbar({ showSidebar, setShowSidebar }) {
    const location = useLocation().pathname;
    const {logout} = UseAuth();

    const [foto, setFoto] = useState("");

    const Perfil = foto === null ? ProfilePicture : `${SERVER}/${foto}`

    useEffect(() => {
        getUser()
          .then((result) => {
            setFoto(result[0].profile);
          })
          .catch();
      }, []);
  

    return (
        <nav style={{backgroundColor: constante.colors.primary}} className="md:ml-64 py-6 px-3">

            <div className="container max-w-full mx-auto flex items-center justify-between md:pr-8 md:pl-10">
                <div className="md:hidden">
                    <Button
                        color="transparent"
                        buttonType="link"
                        size="lg"
                        iconOnly
                        rounded
                        ripple="light"
                        onClick={() => setShowSidebar('left-0')}
                    >
                        <Icon name="menu" size="2xl" color="white" />
                    </Button>
                    <div
                        className={`absolute top-2 md:hidden ${
                            showSidebar === 'left-0' ? 'left-64' : '-left-64'
                        } z-50 transition-all duration-300`}
                    >
                        <Button
                            color="transparent"
                            buttonType="link"
                            size="lg"
                            iconOnly
                            rounded
                            ripple="light"
                            onClick={() => setShowSidebar('-left-64')}
                        >
                            <Icon name="close" size="2xl" color="white" />
                        </Button>
                    </div>
                </div>

                <div className="flex justify-between items-center w-full">
                    <h4 className="uppercase text-white text-sm tracking-wider mt-1">
                        {location === '/'
                            ? 'DASHBOARD'
                            : location.toUpperCase().replace('/', '')}
                    </h4>

                    <div className="flex">
                        <NavbarInput placeholder="Search" />

                        <div className="-mr-4 ml-6">
                            <Dropdown
                                color="transparent"
                                buttonText={
                                    <div className="w-12">
                                        <Image src={Perfil} rounded />
                                    </div>
                                }
                                rounded
                                style={{
                                    padding: 0,
                                    color: 'transparent',
                                }}
                            >
                                <Button
                                color="teal"
                                buttonType="link"
                                type='submit'
                                onClick={() => (window.location.href = "/profile")}>
                                Perfil
                                </Button>

                        
                                <Button
                                color="teal"
                                buttonType="link"
                                ripple="dark"
                                type='submit'
                                onClick={logout}>
                                Sair
                                </Button>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
