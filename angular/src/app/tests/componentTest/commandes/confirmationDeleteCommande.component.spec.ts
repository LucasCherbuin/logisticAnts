import { TestBed, ComponentFixture } from "@angular/core/testing";
import { beforeEach, describe, vi, expect, it, afterEach } from "vitest";
import { ConfirmationDeleteCommandeComponent } from "../../../component/client/commandes/confirmationDeleteCommande.component";

describe("ConfirmationDeleteCommandeComponent", () => {
    let component: ConfirmationDeleteCommandeComponent;
    let fixture: ComponentFixture<ConfirmationDeleteCommandeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ConfirmationDeleteCommandeComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(ConfirmationDeleteCommandeComponent);
        component = fixture.componentInstance;
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("devrait créer le composant avec isVisible à false par défaut", () => {
        expect(component).toBeTruthy();
        expect(component.isVisible).toBe(false);
    });

    describe("Méthode open()", () => {
        it("devrait passer isVisible à true et stocker le callback", () => {
            const callbackSpy = vi.fn();
            component.open(callbackSpy);
            expect(component.isVisible).toBe(true);
            expect(callbackSpy).not.toHaveBeenCalled();
        });

        it("devrait afficher le template HTML lorsque isVisible est à true", () => {
            component.open(() => {});
            fixture.detectChanges();
            const overlayElement = fixture.nativeElement.querySelector('.overlay');
            const textElement = fixture.nativeElement.querySelector('.popup p');
            expect(overlayElement).toBeTruthy();
            expect(textElement.textContent).toContain("Cette action est irréversible.");
        });
    });

    describe("Méthode confirm() avec gestion du Timer", () => {
        it("devrait masquer le composant (isVisible = false) après confirmation", () => {
            const callbackSpy = vi.fn();
            component.open(callbackSpy);
            component.confirm();
            expect(component.isVisible).toBe(false);
            expect(callbackSpy).toHaveBeenCalledOnce();
        });

        it("devrait masquer l'overlay du DOM HTML après confirmation", () => {
            component.open(() => {});
            expect(fixture.nativeElement.querySelector('.overlay')).toBeTruthy();
            component.confirm();
            expect(fixture.nativeElement.querySelector('.overlay')).toBeNull();
        });
    });
});