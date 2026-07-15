import { TestBed } from "@angular/core/testing";
import { provideHttpClient } from "@angular/common/http";
import {
  provideHttpClientTesting,
  HttpTestingController,
} from "@angular/common/http/testing";
import { beforeEach, describe, expect, it, afterEach } from "vitest";
import { MailService, MailRequest } from "../../services/mailer.service";

describe("MailService", () => {
  let service: MailService;
  let httpMock: HttpTestingController;

  const mockMail: MailRequest = {
    to: "test@mail.com",
    subject: "Hello",
    body: "Test message",
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MailService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(MailService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should POST to /mail/send with Authorization header (sendMailWithToken)", () => {
    service.sendMailWithToken(mockMail, "my-token").subscribe((res) => {
      expect(res).toEqual('{"success":true}');
    });
    const req = httpMock.expectOne("http://localhost:8080/mail/send");
    expect(req.request.method).toBe("POST");
    expect(req.request.headers.get("Authorization")).toBe("Bearer my-token");
    expect(req.request.body).toEqual(mockMail);
    req.flush({ success: true });
  });

  it("should POST to /mail/send using token from localStorage (sendMail)", () => {
    localStorage.setItem("token", "stored-token");
    service.sendMail(mockMail).subscribe((res) => {
      expect(res).toEqual('{"success":true}');
    });
    const req = httpMock.expectOne("http://localhost:8080/mail/send");
    expect(req.request.method).toBe("POST");
    expect(req.request.headers.get("Authorization")).toBe(
      "Bearer stored-token",
    );
    req.flush({ success: true });
  });

  it("should send with empty Bearer token if localStorage has no token", () => {
    service.sendMail(mockMail).subscribe();
    const req = httpMock.expectOne("http://localhost:8080/mail/send");
    expect(req.request.headers.get("Authorization")).toBe("Bearer ");
    req.flush({});
  });
});
