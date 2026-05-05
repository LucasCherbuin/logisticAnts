import { TestBed } from "@angular/core/testing";
import { provideHttpClient } from "@angular/common/http";
import {
  provideHttpClientTesting,
  HttpTestingController,
} from "@angular/common/http/testing";
import { beforeEach, describe, vi, expect, it, afterEach } from "vitest";
import { RegisterService } from "../../services/register.service";

describe("RegisterService", () => {
  let service: RegisterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RegisterService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(RegisterService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should POST to /login and store parsed JSON token", () => {
    const fakeResponse = JSON.stringify({
      token: "jwt-abc",
      username: "alice",
    });
    service.login("alice", "abcd").subscribe((res) => {
      expect(res).toBe(fakeResponse);
    });
    const req = httpMock.expectOne("http://localhost:8080/login");
    expect(req.request.method).toBe("POST");
    expect(req.request.body).toEqual({ pseudo: "alice", password: "abcd" });
    req.flush(fakeResponse);
    expect(localStorage.getItem("token")).toBe("jwt-abc");
  });

  it("should store raw token if response is not valid JSON", () => {
    service.login("alice", "abcd").subscribe();
    const req = httpMock.expectOne("http://localhost:8080/login");
    req.flush("raw-token-string");
    expect(localStorage.getItem("token")).toBe("raw-token-string");
  });

  it("should POST to /register with correct body", () => {
    service
      .register("alice", "alice@mail.com", "abcd", "CLIENT")
      .subscribe((res) => {
        expect(res).toBe("ok");
      });
    const req = httpMock.expectOne("http://localhost:8080/register");
    expect(req.request.method).toBe("POST");
    expect(req.request.body).toEqual({
      pseudo: "alice",
      email: "alice@mail.com",
      password: "abcd",
      role: "CLIENT",
    });
    req.flush("ok");
  });

  it("should save token in localStorage", () => {
    service.saveToken("my-token");
    expect(localStorage.getItem("token")).toBe("my-token");
  });

  it("should return token from localStorage", () => {
    localStorage.setItem("token", "stored-token");
    expect(service.getToken()).toBe("stored-token");
  });

  it("should remove token from localStorage on logout", () => {
    localStorage.setItem("token", "stored-token");
    service.logout();
    expect(localStorage.getItem("token")).toBeNull();
  });
});
