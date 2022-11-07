import { faLeanpub } from "@fortawesome/free-brands-svg-icons"
import { faBriefcase, faEllipsis, faUserGraduate, IconDefinition } from "@fortawesome/free-solid-svg-icons"

export const USER_TYPES: TUserTypes[] = [
  {
    name: 'Etudiant',
    value: 1,
    icon: faUserGraduate
  },
  {
    name: 'Employé',
    value: 2,
    icon: faBriefcase
  },
  {
    name: 'Autodidacte',
    value: 3,
    icon: faLeanpub

  },
  {
    name: 'Autre',
    value: 4,
    icon: faEllipsis
  }
]

type TUserTypes = {
  name: string,
  value: 1 | 2 | 3 | 4
  icon: IconDefinition
}