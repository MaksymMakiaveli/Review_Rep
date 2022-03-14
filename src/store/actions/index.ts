import { ApplicationActions } from '@Types/application.types';
import { CheckFactorActions } from '@Types/checkFactors.type';
import { CompanyActions } from '@Types/company.types';
import { ContractActions } from '@Types/contract.types';
import { CostCenterActions } from '@Types/costCenters.type';
import { CurrencyActions } from '@Types/currency.type';
import { DefinitionActions } from '@Types/definition.types';
import { VendorActions } from '@Types/vendor.types';
import { TitleActions } from '@Types/title.types';

export type ActionsTypes =
  | ApplicationActions
  | CompanyActions
  | DefinitionActions
  | VendorActions
  | ContractActions
  | CurrencyActions
  | TitleActions
  | CostCenterActions
  | CheckFactorActions;
