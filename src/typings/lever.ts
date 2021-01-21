type LeverEntity = {
  id: string
}

export type LeverPaginatedResponse<T extends LeverEntity> = {
  hasNext: boolean
  data: T[]
}

export type LeverResponse<T extends LeverEntity> = {
  data: T
}

export interface LeverUser extends LeverEntity {
  name: string
  username: string
  email: string
  accessRole: string
  photo: string
  createdAt: number
  deactivatedAt: string | null
  externalDirectoryId: string | null
}

export interface LeverOpportunity extends LeverEntity {
  name: string
  contact: string
  headline: string
  stage: string | Stage
  confidentiality: 'non-confidential' | 'confidential'
  location: string
  phones: Phone[]
  emails: string[]
  links: string[]
  archived: null
  tags: string[]
  sources: string[]
  stageChanges: StageChange[]
  origin: Origin
  sourcedBy: string | LeverUser
  owner: string | LeverUser
  followers: string[]
  applications: string[]
  createdAt: number
  updatedAt: number
  lastInteractionAt: number
  lastAdvancedAt: number
  snoozedUntil: null
  urls: Urls
  isAnonymized: boolean
  dataProtection: DataProtection | null
}

export interface LeverInterview extends LeverEntity {
  panel: string
  subject: string
  note: string
  date: number
  canceledAt: number | null
  feedbackTemplate: string
  interviewers: Interviewer[]
}

interface Interviewer extends LeverEntity {
  name: string
  email: string
}

interface Phone {
  type: string
  value: string
}

interface StageChange {
  toStageId: string
  toStageIndex: number
  updatedAt: number
  userId: string
}

interface Urls {
  list: string
  show: string
}

interface DataProtection {
  store: {
    allowed: boolean
    expiresAt: number
  }
  contact: {
    allowed: boolean
    expiresAt: number
  }
}

interface Stage extends LeverEntity {
  text: string
}

type Origin =
  | 'agency'
  | 'applied'
  | 'internal'
  | 'referred'
  | 'sourced'
  | 'university'
