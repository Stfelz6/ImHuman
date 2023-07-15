/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createCampaign = /* GraphQL */ `
  mutation CreateCampaign(
    $input: CreateCampaignInput!
    $condition: ModelCampaignConditionInput
  ) {
    createCampaign(input: $input, condition: $condition) {
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
export const updateCampaign = /* GraphQL */ `
  mutation UpdateCampaign(
    $input: UpdateCampaignInput!
    $condition: ModelCampaignConditionInput
  ) {
    updateCampaign(input: $input, condition: $condition) {
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
export const deleteCampaign = /* GraphQL */ `
  mutation DeleteCampaign(
    $input: DeleteCampaignInput!
    $condition: ModelCampaignConditionInput
  ) {
    deleteCampaign(input: $input, condition: $condition) {
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
