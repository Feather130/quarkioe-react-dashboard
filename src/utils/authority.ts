import { LoginParamsType } from '@/services/login';

export function setAuthority(authority: LoginParamsType) {
  const { tenant, userName, password } = authority;
  sessionStorage.setItem('q6e', btoa(`${tenant}/${userName}:${password}`));
}

export function clearAuthority() {
  sessionStorage.removeItem('q6e');
}
