import {
  AppClient,
  InstanceOptions,
  IOContext,
  CacheType,
  ExternalClient,
  IOClient,
} from '@vtex/api'

import {
  LeverInterview,
  LeverOpportunity,
  LeverPaginatedResponse,
  LeverResponse,
  LeverUser,
} from '../typings'

const routes = {
  base: () => '/proxy/lever',
  users: () => `${routes.base()}/users`,
  stage: (stageId: string) => `${routes.base()}/stages/${stageId}`,
  opportunity: (opportunityId: string) =>
    `${routes.base()}/opportunities/${opportunityId}`,
  interview: (opportunityId: string, interviewId: string) =>
    `${routes.opportunity(opportunityId)}/interviews/${interviewId}`,
}

class BaseAppClient extends AppClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('hiring.lever-gateway@0.x', context, {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: context.authToken,
      },
    })
  }
}

class BaseExternalClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('http://api.lever.co', context, {
      ...options,
      headers: {
        ...options?.headers,
        'x-vtex-use-https': 'true',
      },
    })
  }
}

export default (isIO: boolean) => {
  const Base = isIO ? BaseAppClient : BaseExternalClient

  return class Lever extends BaseExternalClient {
    public getUserFromEmailCached(email: string) {
      return this.http.get<LeverPaginatedResponse<LeverUser>>(routes.users(), {
        params: { email },
        cacheable: CacheType.Memory,
      })
    }

    public getOpportunity(opportunityId: string) {
      return this.http.get<LeverResponse<LeverOpportunity>>(
        routes.opportunity(opportunityId)
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
}
