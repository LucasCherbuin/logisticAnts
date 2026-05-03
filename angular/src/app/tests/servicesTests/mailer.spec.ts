import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MailService } from './mailer.service';

describe('MailService', () => {
  let service: MailService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MailService]
    });

    service = TestBed.inject(MailService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should send email', () => {

    const mockMail = {
      to: 'test@mail.com',
      subject: 'Hello',
      body: 'Test message'
    };

    service.sendMail(mockMail).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:8080/mail/send');

    expect(req.request.method).toBe('POST');

    req.flush({ success: true });

    httpMock.verify();
  });
});