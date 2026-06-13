import { TestBed, ComponentFixture } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { beforeEach, describe, vi, expect, it } from "vitest";
import { PurchaseComponent } from "../../component/client/purchase.component";
import { CommandeService } from "../../services/commande.service";
import { ArticleCommandeService } from "../../services/articleCommande.service";
import { MailService } from "../../services/mailer.service";
import { PaymentService } from "../../services/payment.service";
import { UserService } from "../../services/user.service";
import { RouterModule } from "@angular/router";
import { of } from "rxjs";
import { BehaviorSubject } from "rxjs";

describe("PurchaseComponent", () => {
    let component: PurchaseComponent;
    let fixture: ComponentFixture<PurchaseComponent>;

    const mockCommandeService = {
        getCommandes: vi.fn(),
        createCommande: vi.fn(),
        updatedFacture: vi.fn()
    };
    const mockArticleCommandeService = {
        getArticleCommandes: vi.fn(),
        getItems: vi.fn().mockReturnValue([]),
        cartItems$: new BehaviorSubject<any[]>([]),
        createArticleCommande: vi.fn(),
        assignCommande: vi.fn(),
        clearCart: vi.fn()
    };
    const mockMailService = {
        sendMail: vi.fn()
    };
    const mockPaymentService = {
        getPay: vi.fn()
    };
    const mockUserService = {
        getUserByPseudo: vi.fn()
    };

    beforeEach(async () => {
        vi.clearAllMocks();
        mockCommandeService.getCommandes.mockReturnValue(of([]));

        await TestBed.configureTestingModule({
            imports: [PurchaseComponent, ReactiveFormsModule, RouterModule.forRoot([])],
            providers: [
                { provide: CommandeService, useValue: mockCommandeService },
                { provide: ArticleCommandeService, useValue: mockArticleCommandeService },
                { provide: MailService, useValue: mockMailService },
                { provide: PaymentService, useValue: mockPaymentService },
                { provide: UserService, useValue: mockUserService }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(PurchaseComponent);
        component = fixture.componentInstance;
    });

    it('crée le composant', () => {
        expect(component).toBeTruthy();
    });

    it('charge les commandes au démarrage', () => {
        const mockData = [{ id: 1, articleCommandes: [], user: null, payement: 'mastercard', facture: null }];
        mockCommandeService.getCommandes.mockReturnValue(of(mockData));

        fixture.detectChanges();

        expect(mockCommandeService.getCommandes).toHaveBeenCalledOnce();
        expect(component.commandes).toEqual(mockData);
    });

    describe('getTotalByCommande', () => {
        it('calcule le total via les articleCommandes de la commande', () => {
            component.commandes = [
                {
                    id: 1,
                    articleCommandes: [
                        { id: 1, produit: { id: 1, nom: 'A', prix: 10 }, quantite: 3 } as any,
                        { id: 2, produit: { id: 2, nom: 'B', prix: 7 }, quantite: 2 } as any
                    ],
                    user: null as any,
                    payement: 'carte',
                    facture: null as any
                }
            ];

            const total = component.getTotalByCommande(component.commandes[0]);

            expect(total).toBe(44);
        });

        it('retourne 0 si la commande n\'a pas d\'articles', () => {
            const commande = { id: 1, articleCommandes: [], user: null as any, payement: '', facture: null as any };

            expect(component.getTotalByCommande(commande)).toBe(0);
        });
    });

    describe('sendConfirmationMail()', () => {
        it('envoie un mail avec le bon destinataire et sujet', () => {
            const commande = { id: 5, articleCommandes: [], user: null as any, payement: '', facture: null as any };
            mockMailService.sendMail.mockReturnValue(of(null));

            component.sendConfirmationMail(commande, 'test@example.com');

            expect(mockMailService.sendMail).toHaveBeenCalledWith({
                to: 'test@example.com',
                subject: 'Commande n° 5',
                body: 'Votre commande a bien été réalisée.'
            });
        });
    });

        describe('redirectionPayement()', () => {
        it('ouvre le popup de confirmation avec le bon total', () => {
            vi.useFakeTimers();

            component.cartItems = [
                { produit: { prix: 15 }, quantite: 2 },
                { produit: { prix: 5 }, quantite: 4 }
            ] as any;

            const openSpy = vi.fn();
            component.confirmationPopup = { open: openSpy } as any;

            const commande = { id: 1, articleCommandes: [], user: null as any, payement: '', facture: null as any };
            component.redirectionPayement(commande);
            vi.runAllTimers();

            expect(openSpy).toHaveBeenCalledWith(1, 50, expect.any(Function));
            vi.useRealTimers();
        });
    });
});