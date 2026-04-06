import type { MollieClient } from '@mollie/api-client';

export interface CancelSubscriptionParams {
  mollieClient: MollieClient;
  customerId: string;
  subscriptionId: string;
}

type DeleteFunction = (subscriptionId: string, params: { customerId: string }) => Promise<unknown>;
type BinderWithDelete = {
  delete?: DeleteFunction;
};

export async function cancelSubscription({ mollieClient, customerId, subscriptionId }: CancelSubscriptionParams) {
  const binder = mollieClient.customerSubscriptions;

  const tryCancel = async () => {
    if (typeof binder.cancel === 'function') {
      return await binder.cancel(subscriptionId, { customerId });
    }
    throw new Error('Mollie method customerSubscriptions.cancel is not available');
  };

  const tryDelete = async () => {
    const binderWithDelete = binder as unknown as BinderWithDelete;

    if (typeof binderWithDelete.delete === 'function') {
      return await binderWithDelete.delete(subscriptionId, { customerId });
    }

    throw new Error('Mollie method customerSubscriptions.delete is not available');
  };

  try {
    return await tryCancel();
  } catch (cancelError) {
    console.warn('[mollie/cancelSubscription] cancel failed, trying delete', cancelError);
    try {
      return await tryDelete();
    } catch (deleteError) {
      console.error('[mollie/cancelSubscription] delete also failed', deleteError);
      throw new Error(`Failed to cancel subscription: ${cancelError instanceof Error ? cancelError.message : cancelError} / ${deleteError instanceof Error ? deleteError.message : deleteError}`);
    }
  }
}
