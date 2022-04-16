import Title from 'components/landing/Title';
import ContactCard from 'components/landing/ContactCard';
import Form from 'components/landing/Form';

export default function ContactSection() {
    return (
        <section className="pb-20 relative block bg-gray-100">
            <div className="container max-w-7xl mx-auto px-4 lg:pt-24">
                <Title heading="Nossos Diferenciais">
                    Nossa empresa possui alto potêncial de desenvolvimento de sistemas Web, tendo como nosso primeiro sitema lançado no mercado o Sertão Rural, tendo como eventual foco o produtor rural.
                </Title>

                <div className="flex flex-wrap -mt-12 justify-center">
                    <ContactCard icon="stars" title="Excelência em Serviços">
                        Serviços prestados sempre com eficiência e agilidade, proporcionando sempre o melhor ao cliente. 
                    </ContactCard>
                    <ContactCard icon="insert_chart" title="Aumente o seu mercado">
                        Sistema bem preparados e com boa funcionalidade ampliam o mercado de produção.
                    </ContactCard>
                    <ContactCard icon="launch" title="Time Preparado">
                        Nosso time de desenvolvimento oferece ótimos profissionais, tanto no Back-End quanto no Front-End.
                    </ContactCard>
                </div>

                <Form />
            </div>
        </section>
    );
}
