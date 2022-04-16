import Title from 'components/landing/Title';
import TeamCard from 'components/landing/TeamCard';
import Vinicius from 'assets/img/integrantes/ViniciusSouza.png';
import Luis from 'assets/img/integrantes/LuisCarlos.png';
import Marcos from 'assets/img/integrantes/Marcos.jpg';
import Luciano from 'assets/img/integrantes/Luciano.jpg';

export default function TeamSection() {
    return (
        <section className="pt-20 pb-48">
            <div className="container max-w-7xl mx-auto px-4">
                <Title heading="Nosso Time">
                    Nossa equipe de desenvolvimento, localizada logo abaixo, visa sempre desenvolver sistemas de alta qualidade, focando sempre na funcionalidade e usabilidade do mesmo.
                </Title>
                <div className="flex flex-wrap" >
                    <TeamCard
                        img={Vinicius}
                        name="Vinícius Souza"
                        position="Analista Desenvolvedor"
                        style={{width: '100%'}}

                    />
                    <TeamCard
                        img={Luis}
                        name="Luís Carlos"
                        position="Gerente"
                    />
                    <TeamCard
                        img={Marcos}
                        name="Marcos Antônio"
                        position="UI/UX Designer"
                    />
                    <TeamCard
                        img={Luciano}
                        name="Luciano Barbosa"
                        position="DBA"
                    />
                </div>
            </div>
        </section>
    );
}
