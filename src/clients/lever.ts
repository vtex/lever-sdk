import { AppClient, InstanceOptions, IOContext, CacheType } from '@vtex/api'

import {
  LeverInterview,
  LeverOpportunity,
  LeverPaginatedResponse,
  LeverResponse,
  LeverUser,
  LeverFeedback,
  LeverApplication,
} from '../typings'

const routes = {
  base: () => '/proxy/lever',
  users: () => `${routes.base()}/users`,
  stage: (stageId: string) => `${routes.base()}/stages/${stageId}`,
  opportunity: (opportunityId: string) =>
    `${routes.base()}/opportunities/${opportunityId}`,
  interviews: (opportunityId: string) =>
    `${routes.opportunity(opportunityId)}/interviews`,
  feedbacks: (opportunityId: string) =>
    `${routes.opportunity(opportunityId)}/feedback/`,
  applications: (opportunityId: string) =>
    `${routes.opportunity(opportunityId)}/applications/`,
  interview: (opportunityId: string, interviewId: string) =>
    `${routes.interviews(opportunityId)}/${interviewId}`,
}

export default class Lever extends AppClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('hiring.lever-gateway@0.x', context, {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: context.authToken,
      },
    })
  }

  public getUserFromEmailCached(email: string) {
    return this.http.get<LeverPaginatedResponse<LeverUser>>(routes.users(), {
      params: { email },
      cacheable: CacheType.Memory,
    })
  }

  public getOpportunity(opportunityId: string, expand?: string[]) {
    return this.http.get<LeverResponse<LeverOpportunity>>(
      routes.opportunity(opportunityId),
      {
        params: {
          expand,
        },
      }
    )
  }

  public getInterviews(opportunityId: string) {
    return this.http.get<LeverPaginatedResponse<LeverInterview>>(
      routes.interviews(opportunityId)
    )
  }

  public getFeedbacks(opportunityId: string, expand?: string[]) {
    return this.http.get<LeverPaginatedResponse<LeverFeedback>>(
      routes.feedbacks(opportunityId),
      {
        params: {
          expand,
        },
      }
    )
  }

  public getApplications(opportunityId: string, expand?: string[]) {
    return this.http.get<LeverPaginatedResponse<LeverApplication>>(
      routes.applications(opportunityId),
      {
        cacheable: CacheType.Memory,
        params: {
          expand,
        },
      }
    )
  }

  public getInterview({
    opportunityId,
    interviewId,
  }: {
    opportunityId: string
    interviewId: string
  }) {
    return this.http.get<LeverResponse<LeverInterview>>(
      routes.interview(opportunityId, interviewId)
    )
  }
}
