import { faShieldAlt, faUserGroup, IconDefinition } from "@fortawesome/free-solid-svg-icons"

export const ROLE_TYPES: RoleTypes[] = [
  {
    name: 'Administrateur',
    value: 32,
    icon: faShieldAlt
  },
  {
    name: 'Membre',
    value: 1,
    icon: faUserGroup
  }
]

type RoleTypes = {
  name: string,
  value: 1 | 32,
  icon: IconDefinition
}