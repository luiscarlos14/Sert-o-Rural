import React, {useState, useEffect} from "react";

import Card from '@material-tailwind/react/Card';
import Image from '@material-tailwind/react/Image';
import H5 from '@material-tailwind/react/Heading5';
import Icon from '@material-tailwind/react/Icon';
import Button from '@material-tailwind/react/Button';
import ProfilePicture from 'assets/img/team-1-800x800.jpg';

import api, { TOKEN_KEY, ID } from "../api";


async function getUser(){
  const token = sessionStorage.getItem(TOKEN_KEY);
  const id = localStorage.getItem(ID);

  const res = (
    await api.get(`/users/${id}`, {
      headers: { Authorization: `token ${token}` },
    })
  ).data.response;
  return res;
}


export default function ProfileCard(props) {

    const [nameProfile, setNameProfile] = useState('');
    const [surnameProfile, setSurnameProfile] = useState('');
    const [neighborhoodProfile, setNeighborhoodProfile] = useState('');
    const [cityProfile, setCityProfile] = useState('');

    const Perfil = props.photo === "" ? "https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561_960_720.png" : props.photo

    useEffect(() => {
        getUser()
          .then((result) => {
            setNameProfile(result[0].name);
            setSurnameProfile(result[0].surname);
            setNeighborhoodProfile(result[0].neighborhood)
            setCityProfile(result[0].city)
          })
          .catch();
      }, []);

    return (
        <Card>
            <div className="flex flex-wrap justify-center">
                <div className="w-48 px-4 -mt-24">
                    <Image src={Perfil} rounded raised />
                </div>
            </div>
           
                <div style= {{marginTop: '1px'}} className="w-full flex justify-center -mt-8">
                    <a
                        href="#pablo"
                        className="mt-5"
                        onClick={(e) => e.preventDefault()}
                    >
                        <Button color="green" buttonType="link" ripple="dark">
                            Trocar foto do Perfil
                        </Button>
                    </a>
                </div>

            <div style={{marginTop: 10}} className="text-center">
                <H5 color="gray">{`${nameProfile} ${surnameProfile}`}</H5>
                <div className="mt-0 mb-2 text-gray-700 flex items-center justify-center gap-2">
                    <Icon name="place" size="xl" />
                    {`${cityProfile}, ${neighborhoodProfile}`}
                </div>
            </div>
           
          
        </Card>
    );
}
