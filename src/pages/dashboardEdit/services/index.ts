import request from '@/utils/request';
import { DashboardConfig } from '@/global';

export async function getDashboard(id: number | string) {
  return request(`/inventory/managedObjects/${id}`);
}

export async function sendDashboard(id: number | string, data: DashboardConfig) {
  return request(`/inventory/managedObjects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/vnd.com.nsn.cumulocity.managedObject+json;',
      },
      data,
    },
  );
}
