import {
  Badge, Dropdown, Nav, NavItem,
} from 'react-bootstrap'
import Image from 'next/image'
import Avatar from '~public/assets/img/avatars/default.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBell,
  faCreditCard,
  faEnvelopeOpen,
  faFile,
  faMessage,
  faUser,
} from '@fortawesome/free-regular-svg-icons'
import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faGear, faListCheck, faLock, faPowerOff,
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { logOut } from '~lib/auth'
import { getSession, useSession } from 'next-auth/react';
import ENDPOINT from '~constantes/enpoint';

type NavItemProps = {
  icon: IconDefinition;
} & PropsWithChildren

const ProfileDropdownItem = (props: NavItemProps) => {
  const { icon, children } = props

  return (
    <>
      <FontAwesomeIcon className="me-2" icon={icon} fixedWidth />
      {children}
    </>
  )
}

export default function HeaderProfileNav() {
  const handleLogout = () => {
    if(confirm('Se deconnecter ?')) {
      logOut()
    }
  }

  const {data: session} = useSession()
  
  return (
    <Nav>
      <Dropdown as={NavItem}>
        <Dropdown.Toggle variant="link" bsPrefix="shadow-none" className="py-0 px-2 rounded-0" id="dropdown-profile">
          <div className="avatar">
            <img
              width={"100%"}
              height={"100%"}
              className="rounded-circle"
              style={{objectFit: "cover"}}
              alt="user@email.com"
              src={ENDPOINT.MEDIA_PATH+(session as any)?.user?.img || '/assets/img/avatars/default.png'}/>
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu className="pt-0">
          {/* <Dropdown.Header className="bg-light fw-bold rounded-top">Account</Dropdown.Header>
          <Link href="/" passHref>
            <Dropdown.Item>
              <ProfileDropdownItem icon={faBell}>
                Updates
                <Badge bg="info" className="ms-2">42</Badge>
              </ProfileDropdownItem>
            </Dropdown.Item>
          </Link>
          <Link href="/" passHref>
            <Dropdown.Item>
              <ProfileDropdownItem icon={faEnvelopeOpen}>
                Updates
                <Badge bg="success" className="ms-2">42</Badge>
              </ProfileDropdownItem>
            </Dropdown.Item>
          </Link>
          <Link href="/" passHref>
            <Dropdown.Item>
              <ProfileDropdownItem icon={faListCheck}>
                Tasks
                <Badge bg="danger" className="ms-2">42</Badge>
              </ProfileDropdownItem>
            </Dropdown.Item>
          </Link>
          <Link href="/" passHref>
            <Dropdown.Item>
              <ProfileDropdownItem icon={faMessage}>
                Messages
                <Badge bg="warning" className="ms-2">42</Badge>
              </ProfileDropdownItem>
            </Dropdown.Item>
          </Link>

          <Dropdown.Header className="bg-light fw-bold">Settings</Dropdown.Header>
          <Link href="/" passHref>
            <Dropdown.Item>
              <ProfileDropdownItem icon={faUser}>Profile</ProfileDropdownItem>
            </Dropdown.Item>
          </Link>
          <Link href="/" passHref>
            <Dropdown.Item>
              <ProfileDropdownItem icon={faGear}>Settings</ProfileDropdownItem>
            </Dropdown.Item>
          </Link>
          <Link href="/" passHref>
            <Dropdown.Item>
              <ProfileDropdownItem icon={faCreditCard}>Payments</ProfileDropdownItem>
            </Dropdown.Item>
          </Link>
          <Link href="/" passHref>
            <Dropdown.Item>
              <ProfileDropdownItem icon={faFile}>Projects</ProfileDropdownItem>
            </Dropdown.Item>
          </Link> */}

          <Dropdown.Divider />

          {/* <Link href="/" passHref>
            <Dropdown.Item>
              <ProfileDropdownItem icon={faLock}>Lock Account</ProfileDropdownItem>
            </Dropdown.Item>
          </Link> */}
          <Link href="/dashboard/profile" passHref>
              <Dropdown.Item>
                <ProfileDropdownItem icon={faUser}>Mon Profil</ProfileDropdownItem>
              </Dropdown.Item>
          </Link>
          <div onClick={handleLogout}>
            <Link href="#" >
              <Dropdown.Item>
                <ProfileDropdownItem icon={faPowerOff}>Logout</ProfileDropdownItem>
              </Dropdown.Item>
            </Link>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </Nav>
  )
}
