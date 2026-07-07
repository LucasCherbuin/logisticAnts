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

    it('crée le composant avec isVisible à false par défaut', () => {
        expect(component).toBeTruthy();
        expect(component.isVisible).toBe(false);
    });

    describe('open()', () => {
        it('passe isVisible à true sans exécuter le callback', () => {
            const callbackSpy = vi.fn();

            component.open(callbackSpy);

            expect(component.isVisible).toBe(true);
            expect(callbackSpy).not.toHaveBeenCalled();
        });

        it('affiche l\'overlay dans le DOM', () => {
            component.open(() => {});
            fixture.detectChanges();

            const overlay = fixture.nativeElement.querySelector('.overlay');
            expect(overlay).toBeTruthy();
        });
    });

    describe('confirm()', () => {
        it('exécute le callback et masque le composant', () => {
            const callbackSpy = vi.fn();
            component.open(callbackSpy);

            component.confirm();

            expect(callbackSpy).toHaveBeenCalledOnce();
            expect(component.isVisible).toBe(false);
        });

       it("devrait masquer l'overlay du DOM HTML après confirmation", () => {
            component.open(() => {});
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('.overlay')).toBeTruthy();
            component.confirm();
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('.overlay')).toBeNull();
        });
    });

    describe('cancel()', () => {
        it('masque le composant sans exécuter le callback', () => {
            const callbackSpy = vi.fn();
            component.open(callbackSpy);

            component.cancel();

            expect(component.isVisible).toBe(false);
            expect(callbackSpy).not.toHaveBeenCalled();
        });

        it("devrait masquer l'overlay du DOM HTML après confirmation", () => {
            component.open(() => {});
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('.overlay')).toBeTruthy();
            component.confirm();
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('.overlay')).toBeNull();
        });

       
    });
});