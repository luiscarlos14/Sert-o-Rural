import Card from '@material-tailwind/react/Card';
import CardImage from '@material-tailwind/react/CardImage';
import CardBody from '@material-tailwind/react/CardBody';
import Icon from '@material-tailwind/react/Icon';
import H4 from '@material-tailwind/react/Heading4';
import H6 from '@material-tailwind/react/Heading6';
import LeadText from '@material-tailwind/react/LeadText';
import Paragraph from '@material-tailwind/react/Paragraph';
import StatusCard from 'components/landing/StatusCard';

import Logo from "assets/img/ruralD.png";

import LogoSis from 'assets/img/logosis.png';

export default function WorkingSection() {
    return (
        <section className="pb-20 bg-gray-100 -mt-32">
            <div className="container max-w-7xl mx-auto px-4">
                <div className="flex flex-wrap relative z-50">
                    <StatusCard color="red" icon="archive" title="GERENCIAMENTO">
                    Processos de identificação, armazenamento, gerenciamento, busca e distribuição de informações, com intuito de possibilitar melhor produtividade.
                    </StatusCard>
                    <StatusCard
                        color="lightBlue"
                        icon="autorenew"
                        title="REUTILIZAÇÃO"
                    >
                        Com ajuda do sistema o produtor rural pode reutilizar todas suas informações já adicionadas ao sistema anteriormente, podendo realizar comparativos sobre suas plantações.
                    </StatusCard>
                    <StatusCard
                        color="teal"
                        icon="folder"
                        title="ARMAZENAMENTO"
                    >
                        O sistema é capaz de armazenar todas as informações já adicionadas anteriormente, para que assim seja acessada posteriormente, desde que o mesmo esteja conectado à Internet.
                    </StatusCard>
                </div>

                <div className="flex flex-wrap items-center mt-32">
                    <div className="w-full md:w-5/12 px-4 mx-auto">
                        <H4 color="gray"><img src={Logo} style={{width: '50%'}}></img></H4>
                        <LeadText color="blueGray">
                            O Sertão Rural é um sitema Web com intuito de fornecer cada vez mais facilidades para o pequeno produtor que muitas vezes se encontra "distante" da tencnologia, onde estamos vivendo atualmente, a era digital. 

                        </LeadText>
                        <LeadText color="blueGray">
                            O sistema será lançado pela Sertão System, uma startup que terá seu primeiro sistema disponibilizado na web. As principais características do mesmo são basicamente o gerenciamento, armazenamento e reutilização de dados. 
                        </LeadText>
                        <a
                            href="https://www.sertaosystem.com.br/"
                            className="font-medium text-light-blue-500 mt-2 inline-block"
                        >
                            Acesse nosso Site
                        </a>
                    </div>

                    <div className="w-full md:w-4/12 px-4 mx-auto flex justify-center mt-24 lg:mt-0">
                        <Card>
                            <CardImage alt="Card Image" src={LogoSis}  style={{backgroundColor: '#3f5378'}}/>
                            <CardBody>
                                <H6 color="gray">Sertão System</H6>
                                <Paragraph color="blueGray">
                                    A serão System é uma startup, fundada no ano de 2020, formada por alunos do If Sertão de Pernambuco, com intuito de desenvolver sistemas web para vários setores.
                                </Paragraph>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
