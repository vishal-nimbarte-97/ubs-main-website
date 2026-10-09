import { isPlatformBrowser } from '@angular/common';
import { Inject, Pipe, PipeTransform, PLATFORM_ID, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import DOMPurify from 'dompurify';

export function sanitizeRichTextHtml(
  value: string,
  sanitizer: DomSanitizer,
  platformId: object | string,
): string {
  if (isPlatformBrowser(platformId) && typeof DOMPurify.sanitize === 'function') {
    return DOMPurify.sanitize(value, { USE_PROFILES: { html: true } });
  }

  return sanitizer.sanitize(SecurityContext.HTML, value) ?? '';
}

@Pipe({
  name: 'safeRichText',
  standalone: true,
})
export class SafeRichTextPipe implements PipeTransform {
  constructor(
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  transform(value: string | null | undefined): SafeHtml {
    const safeHtml = sanitizeRichTextHtml(value ?? '', this.sanitizer, this.platformId);
    return this.sanitizer.bypassSecurityTrustHtml(safeHtml);
  }
}
