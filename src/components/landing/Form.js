import H3 from '@material-tailwind/react/Heading3';
import Paragraph from '@material-tailwind/react/Paragraph';
import Input from '@material-tailwind/react/Input';
import Textarea from '@material-tailwind/react/Textarea';
import Button from '@material-tailwind/react/Button';

export default function Form() {
    return (
        <div className="flex flex-wrap justify-center mt-24">
            <div className="w-full lg:w-8/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6">
                    <div className="flex-auto p-5 lg:p-10">
                        <div className="w-full text-center">
                            <H3 color="gray">Deseja entrar em contato conosco?</H3>
                            <Paragraph color="blueGray">
                            Preencha este formulário e entraremos em contato com você em até 24 horas.
                            </Paragraph>
                        </div>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="flex gap-8 mt-16 mb-12">
                                <Input
                                    type="text"
                                    placeholder="Seu nome completo"
                                    color="lightBlue"
                                />
                                <Input
                                    type="email"
                                    placeholder="Seu E-mail"
                                    color="lightBlue"
                                />
                            </div>

                            <Textarea color="lightBlue" placeholder="Mensagem" />

                            <div className="flex justify-center mt-10">
                                <Button color="lightBlue" ripple="light">
                                    Enviar 
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
