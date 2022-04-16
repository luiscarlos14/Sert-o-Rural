import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import constantes from 'constantes';
import { flexbox } from '@material-ui/system';

export default function CardTable({ title, color, children }) {
    return (
        <Card>
           
            <div className="header" 
                style={{
                    backgroundColor: color,
                    height: 100,
                    borderRadius: 10,
                    paddingTop: 35,
                    paddingLeft: 30,
                    position: 'relative',
                    top: -40
                    }}>

                <h2 className="text-white text-2xl">{title}</h2>
            </div>

            <CardBody>
                <div className="overflow-x-auto">
                    {children}
                </div>
            </CardBody>

        </Card>
    );
}
