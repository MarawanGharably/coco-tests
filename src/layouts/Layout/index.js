import { Container } from 'react-bootstrap';

export default function Layout({title, children}){
    return(<Container>
        {title && (<h2  className="text-center">{title}</h2>)}
        {children}
    </Container>)
}