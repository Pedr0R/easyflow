import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Read directly from localStorage to prevent Circular Dependency with HttpClient
  const token = localStorage.getItem('accessToken');
  const tenantId = localStorage.getItem('tenantId');
  const userId = localStorage.getItem('userId');

  const isApiRequest = req.url.includes('localhost:3000'); // Fast check

  if (isApiRequest) {
    const headers: Record<string, string> = {};

    if (tenantId) {
      headers['x-tenant-id'] = tenantId;
    }

    if (userId) {
      headers['x-user-id'] = userId;
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const clonedReq = req.clone({ setHeaders: headers });
    return next(clonedReq);
  }

  return next(req);
};
