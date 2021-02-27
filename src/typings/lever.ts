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
  archived: {
    reason: string
    archivedAt: number
  } | null
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
  snoozedUntil: number | null
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
  feedbackForms: string[]
  timezone: string
  createdAt: number
  duration: number
  location: string | null
  feedbackReminder: string
  user: string
  stage: string
  postings: string[]
  gcalEventUrl: string | null
}

export interface LeverNote extends LeverEntity {
  text: string
  fields: NoteField[]
  user: string
  secret: boolean
  completedAt: number
  createdAt: number
  deletedAt: number
}

export interface NoteField {
  type: string
  text: string
  value: string
  createdAt: number
  user: string
  stage: string
  description?: string
  score?: number
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

export interface LeverFeedback {
  id: string
  type: string
  text: string
  instructions: string
  fields: Field[]
  baseTemplateId: string
  interview?: string
  panel: string
  user: string | LeverUser
  createdAt: number
  completedAt: number | null
  updatedAt: number
  deletedAt: number | null
}

export interface Field {
  description: string
  required: boolean
  text: string
  type: FieldType
  id: string
  value: ValueElement[] | null | string
  scores?: Score[]
  prompt?: string
  options?: Option[]
}

export interface Option {
  text: string
  optionId: string
}

export interface Score {
  text: string
  description: string
}

type FieldType = 'score-system' | 'scorecard' | 'textarea'

export interface ValueElement {
  comment: string | null
  score: string | null
}

export interface LeverApplication {
  id: string
  type: string
  candidateId: string
  opportunityId: string
  posting: string | Posting
  postingHiringManager: string
  postingOwner: string
  name: string | null
  company: string | null
  phone: {
    type: string | null
    value: string | null
  } | null
  email: string | null
  links: any[]
  comments: string | null
  user: string
  customQuestions: any[]
  createdAt: number
  archived: {
    archivedAt: number
    reason: string
  } | null
  requisitionForHire: {
    id: string
    requisitionCode: string
    hiringManagerOnHire: string
  } | null
}

export interface Posting {
  id: string
  text: string
  state: string
  distributionChannels: string[]
  user: string
  owner: string
  hiringManager: string
  categories: Categories
  tags: any[]
  content: Content
  followers: string[]
  reqCode: string
  requisitionCodes: any[]
  urls: Urls
  confidentiality: string
  createdAt: number
  updatedAt: number
}

export interface Categories {
  commitment: string
  department: string
  level: string | null
  location: string
  team: string
}

export interface Content {
  description: string
  descriptionHtml: string
  lists: List[]
  closing: string
  closingHtml: string
}

export interface List {
  content: string
  text: string
}

export interface Urls {
  list: string
  show: string
  apply?: string
}
