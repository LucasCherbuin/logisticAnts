import { TestBed, ComponentFixture } from "@angular/core/testing";
import { ReactiveFormsModule} from "@angular/forms";
import { NO_ERRORS_SCHEMA as NG_NO_ERRORS_SCHEMA } from "@angular/core";
import { beforeEach, describe, vi, expect, it } from "vitest";
import { LoginComponent } from "../../component/login.component";
import { RegisterService } from "../../services/register.service";
import { Router } from "@angular/router";
import { of, throwError } from "rxjs";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let registerSpy: any;
  let routerSpy: any;

  beforeEach(async () => {
    registerSpy = { login: vi.fn(), saveToken: vi.fn() };
    routerSpy = { navigate: vi.fn() };

    TestBed.overrideComponent(LoginComponent, {
      set: { template: "<div></div>", styles: [] },
    });

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        { provide: RegisterService, useValue: registerSpy },
        { provide: Router, useValue: routerSpy },
      ],
      schemas: [NG_NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the component with an invalid empty form", () => {
    expect(component).toBeTruthy();
    expect(component.loginForm.invalid).toBe(true);
  });

  it("should be valid when pseudo (≥3) and password (≥4) are filled", () => {
    component.loginForm.setValue({ pseudo: "alice", password: "abcd" });
    expect(component.loginForm.valid).toBe(true);
  });

  it("should not call login if form is invalid (empty fields)", () => {
    component.loginForm.setValue({ pseudo: "", password: "" });
    component.login();
    expect(registerSpy.login).not.toHaveBeenCalled();
  });

  it("should not call login if pseudo is too short (< 3 chars)", () => {
    component.loginForm.setValue({ pseudo: "ab", password: "abcd" });
    component.login();
    expect(registerSpy.login).not.toHaveBeenCalled();
  });

  it("should parse JSON token, save it and navigate to /app", () => {
    registerSpy.login.mockReturnValue(
      of(JSON.stringify({ token: "fake-jwt", username: "alice" })),
    );
    component.loginForm.setValue({ pseudo: "alice", password: "abcd" });
    component.login();
    expect(registerSpy.login).toHaveBeenCalledWith("alice", "abcd");
    expect(registerSpy.saveToken).toHaveBeenCalledWith("fake-jwt");
    expect(routerSpy.navigate).toHaveBeenCalledWith(["/app"]);
  });

  it("should save raw string token if response is not JSON", () => {
    registerSpy.login.mockReturnValue(of("raw-token"));
    component.loginForm.setValue({ pseudo: "alice", password: "abcd" });
    component.login();
    expect(registerSpy.saveToken).toHaveBeenCalledWith("raw-token");
    expect(routerSpy.navigate).toHaveBeenCalledWith(["/app"]);
  });

  it("should set errorMessage on login failure", () => {
    registerSpy.login.mockReturnValue(throwError(() => ({ status: 401 })));
    component.loginForm.setValue({ pseudo: "alice", password: "wrong" });
    component.login();
    expect(component.errorMessage).toBe("Login ou mot de passe incorrect.");
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
