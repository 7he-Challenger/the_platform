import React from "react";
import Link from "next/link";
// reactstrap components
import {
    UncontrolledCollapse,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    Row,
    Col,
} from "reactstrap";
import Image from 'next/image'

function AdminNavbar() {
    return (
        <>
            <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
                <Container className="px-4">
                    <Link href="/admin/dashboard">
                        <span>
                            <NavbarBrand href="#pablo">
                                <Image
                                    alt="..."
                                    src={require("assets/img/brand/logo_techzara_with_text.png")}
                                    width={205.625}
                                    height={50}
                                />
                            </NavbarBrand>
                        </span>
                    </Link>
                    <button className="navbar-toggler" id="navbar-collapse-main">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
                        <div className="navbar-collapse-header d-md-none">
                            <Row>
                                <Col className="collapse-brand" xs="6">
                                    <Link href="/admin/dashboard">
                                        <Image
                                            alt="..."
                                            src={require("assets/img/brand/logo_techzara_with_text.png")}
                                        />
                                    </Link>
                                </Col>
                                <Col className="collapse-close" xs="6">
                                    <button className="navbar-toggler" id="navbar-collapse-main">
                                        <span />
                                        <span />
                                    </button>
                                </Col>
                            </Row>
                        </div>
                        <Nav className="ml-auto" navbar>
                            
                            <NavItem>
                                <Link href="/auth/register">
                                    <NavLink href="#pablo" className="nav-link-icon">
                                        <i className="ni ni-circle-08" />
                                        <span className="nav-link-inner--text">S&apos;enregistrer</span>
                                    </NavLink>
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link href="/auth/login">
                                    <NavLink href="#pablo" className="nav-link-icon">
                                        <i className="ni ni-key-25" />
                                        <span className="nav-link-inner--text">Se connecter</span>
                                    </NavLink>
                                </Link>
                            </NavItem>
                        </Nav>
                    </UncontrolledCollapse>
                </Container>
            </Navbar>
        </>
    );
}

export default AdminNavbar;
