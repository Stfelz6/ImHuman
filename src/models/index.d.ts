import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";





type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly wallet?: string | null;
  readonly herotag?: string | null;
  readonly totalDonated?: number | null;
  readonly role?: string | null;
  readonly date_joined?: string | null;
  readonly Campaigns?: (Campaign | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly wallet?: string | null;
  readonly herotag?: string | null;
  readonly totalDonated?: number | null;
  readonly role?: string | null;
  readonly date_joined?: string | null;
  readonly Campaigns: AsyncCollection<Campaign>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerCampaign = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Campaign, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly wallet?: string | null;
  readonly title?: string | null;
  readonly description?: string | null;
  readonly amountNeeded?: number | null;
  readonly amountCurrent?: number | null;
  readonly deadline?: string | null;
  readonly photo?: string | null;
  readonly docs?: string | null;
  readonly isActive?: string | null;
  readonly needsValidation?: string | null;
  readonly urgencyLevel?: string | null;
  readonly userID: string;
  readonly category?: string | null;
  readonly noPeople?: string | null;
  readonly date?: string | null;
  readonly bankAccounts?: string | null;
  readonly revolutAccounts?: string | null;
  readonly phoneContact?: string | null;
  readonly emailContact?: string | null;
  readonly address?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCampaign = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Campaign, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly wallet?: string | null;
  readonly title?: string | null;
  readonly description?: string | null;
  readonly amountNeeded?: number | null;
  readonly amountCurrent?: number | null;
  readonly deadline?: string | null;
  readonly photo?: string | null;
  readonly docs?: string | null;
  readonly isActive?: string | null;
  readonly needsValidation?: string | null;
  readonly urgencyLevel?: string | null;
  readonly userID: string;
  readonly category?: string | null;
  readonly noPeople?: string | null;
  readonly date?: string | null;
  readonly bankAccounts?: string | null;
  readonly revolutAccounts?: string | null;
  readonly phoneContact?: string | null;
  readonly emailContact?: string | null;
  readonly address?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Campaign = LazyLoading extends LazyLoadingDisabled ? EagerCampaign : LazyCampaign

export declare const Campaign: (new (init: ModelInit<Campaign>) => Campaign) & {
  copyOf(source: Campaign, mutator: (draft: MutableModel<Campaign>) => MutableModel<Campaign> | void): Campaign;
}