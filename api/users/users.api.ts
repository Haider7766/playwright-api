import { APIRequestContext } from '@playwright/test';
import { UsersEndpoints as E } from './users.endpoints';

/** The customer details that the checkout form needs. */
export type Customer = {
  firstName: string;
  lastName: string;
  postalCode: string;
};

export class UsersApi {
  constructor(private readonly request: APIRequestContext) {}

  /** GET: fetches one user and picks out the three fields the UI needs. */
  async getCustomer(id: number): Promise<Customer> {
    const response = await this.request.get(E.byId(id));
    const body = await response.json();
    return {
      firstName: body.firstName,
      lastName: body.lastName,
      postalCode: String(body.address.postalCode),
    };
  }
}