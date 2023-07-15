/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      wallet
      herotag
      totalDonated
      role
      date_joined
      Campaigns {
        items {
          id
          wallet
          title
          description
          amountNeeded
          amountCurrent
          deadline
          photo
          docs
          isActive
          needsValidation
          urgencyLevel
          userID
          category
          noPeople
          date
          bankAccounts
          revolutAccounts
          phoneContact
          emailContact
          address
          latitude_longitude
          beneficiaryName
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        wallet
        herotag
        totalDonated
        role
        date_joined
        Campaigns {
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        wallet
        herotag
        totalDonated
        role
        date_joined
        Campaigns {
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getCampaign = /* GraphQL */ `
  query GetCampaign($id: ID!) {
    getCampaign(id: $id) {
      id
      wallet
      title
      description
      amountNeeded
      amountCurrent
      deadline
      photo
      docs
      isActive
      needsValidation
      urgencyLevel
      userID
      category
      noPeople
      date
      bankAccounts
      revolutAccounts
      phoneContact
      emailContact
      address
      latitude_longitude
      beneficiaryName
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listCampaigns = /* GraphQL */ `
  query ListCampaigns(
    $filter: ModelCampaignFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCampaigns(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        wallet
        title
        description
        amountNeeded
        amountCurrent
        deadline
        photo
        docs
        isActive
        needsValidation
        urgencyLevel
        userID
        category
        noPeople
        date
        bankAccounts
        revolutAccounts
        phoneContact
        emailContact
        address
        latitude_longitude
        beneficiaryName
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncCampaigns = /* GraphQL */ `
  query SyncCampaigns(
    $filter: ModelCampaignFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCampaigns(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        wallet
        title
        description
        amountNeeded
        amountCurrent
        deadline
        photo
        docs
        isActive
        needsValidation
        urgencyLevel
        userID
        category
        noPeople
        date
        bankAccounts
        revolutAccounts
        phoneContact
        emailContact
        address
        latitude_longitude
        beneficiaryName
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const campaignsByUserID = /* GraphQL */ `
  query CampaignsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCampaignFilterInput
    $limit: Int
    $nextToken: String
  ) {
    campaignsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        wallet
        title
        description
        amountNeeded
        amountCurrent
        deadline
        photo
        docs
        isActive
        needsValidation
        urgencyLevel
        userID
        category
        noPeople
        date
        bankAccounts
        revolutAccounts
        phoneContact
        emailContact
        address
        latitude_longitude
        beneficiaryName
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
