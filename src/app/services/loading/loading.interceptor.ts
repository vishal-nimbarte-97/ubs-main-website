import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { defer, finalize } from 'rxjs';
import { LoadingService } from './loading.service';

export const loadingInterceptor: HttpInterceptorFn = (request, next) => {
  const loadingService = inject(LoadingService);

  return defer(() => {
    const releaseLoading = loadingService.start();
    return defer(() => next(request)).pipe(finalize(releaseLoading));
  });
};
