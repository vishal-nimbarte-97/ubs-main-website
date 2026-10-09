import { PLATFORM_ID, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import { sanitizeRichTextHtml } from './safe-rich-text.pipe';

describe('sanitizeRichTextHtml', () => {
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
    });
    sanitizer = TestBed.inject(DomSanitizer);
  });

  it('preserves supported notification formatting and removes executable content', () => {
    const html = sanitizeRichTextHtml(
      '<p class="ql-align-center"><span style="color: rgb(230, 0, 0); font-size: 18px"><strong>Bold</strong></span><span class="ql-size-large"> Large</span><script>alert(1)</script><a href="javascript:alert(2)">link</a></p>',
      sanitizer,
      TestBed.inject(PLATFORM_ID),
    );

    expect(html).toContain('class="ql-align-center"');
    expect(html).toContain('color: rgb(230, 0, 0)');
    expect(html).toContain('font-size: 18px');
    expect(html).toContain('class="ql-size-large"');
    expect(html).toContain('<strong>Bold</strong>');
    expect(html).not.toContain('<script');
    expect(html).not.toContain('javascript:');
  });

  it('uses Angular sanitization outside the browser', () => {
    const safeHtml = sanitizeRichTextHtml(
      '<p>Safe</p><script>alert(1)</script>',
      sanitizer,
      'server',
    );

    expect(safeHtml).toContain('<p>Safe</p>');
    expect(safeHtml).not.toContain('<script');
    expect(sanitizer.sanitize(SecurityContext.HTML, safeHtml)).toContain('<p>Safe</p>');
  });
});
