import request from '@/utils/request';

interface InventoryObjType {
  pageSize?: number;
  query?: string;
  fields?: string;
}

export async function queryDashboardList(params: InventoryObjType) {
  return request('/inventory/managedObjects', {
    params,
  });
}

export async function addDashboard(data: object) {
  return request('/inventory/managedObjects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/vnd.com.nsn.cumulocity.managedObject+json;',
    },
    data,
  });
}
