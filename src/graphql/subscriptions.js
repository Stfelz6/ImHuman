/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateCampaign = /* GraphQL */ `
  subscription OnCreateCampaign($filter: ModelSubscriptionCampaignFilterInput) {
    onCreateCampaign(filter: $filter) {
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
export const onUpdateCampaign = /* GraphQL */ `
  subscription OnUpdateCampaign($filter: ModelSubscriptionCampaignFilterInput) {
    onUpdateCampaign(filter: $filter) {
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
export const onDeleteCampaign = /* GraphQL */ `
  subscription OnDeleteCampaign($filter: ModelSubscriptionCampaignFilterInput) {
    onDeleteCampaign(filter: $filter) {
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
