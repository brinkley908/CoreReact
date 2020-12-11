import React, { useContext } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import { GlobalContext } from '../infrastructure/globalContext';
import '../custom.css';

export const Layout = props => {

    const [globalSettings, setGlobalSettings] = useContext(GlobalContext);

    return (
        <>

            <NavMenu />

            <Container>
                {props.children}
            </Container>

        </>
    );

}