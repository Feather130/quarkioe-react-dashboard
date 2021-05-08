import request from '@/utils/request';

export async function getDashboard(id: number | string) {
  return request(`/inventory/managedObjects/${id}`);
}
