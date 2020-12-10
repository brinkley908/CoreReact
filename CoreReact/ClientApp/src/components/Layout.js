import React, { useContext } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import { AuthContext } from '../service/authContext';
import '../custom.css';

export const Layout = props => {

    const [BannerText, setBannerText] = useContext(AuthContext);

    return (
        <>

            <NavMenu />

            <Container>
                {props.children}
            </Container>

        </>
    );

}