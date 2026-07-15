import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { beforeEach, describe, vi, expect, it, afterEach } from 'vitest';
import { of, throwError } from 'rxjs';
import { PurchaseComponent } from '../../../component/client/purchase.component';
import { ArticleCommandeService } from '../../../services/articleCommande.service';
import { CommandeService } from '../../../services/commande.service';
import { PaymentService } from '../../../services/payment.service';
import { FactureService } from '../../../services/facture.service';
import { UserService } from '../../../services/user.service';
import { AdminDashboardService } from '../../../services/adminDashboard.service';

vi.mock('jwt-decode', () => ({
  jwtDecode: () => ({ sub: 'alice' })
}));

describe('PurchaseComponent - payment flow', () => {
  let component: PurchaseComponent;
  let fixture: ComponentFixture<PurchaseComponent>;
  let articleCommandeSpy: any;
  let commandeSpy: any;
  let paymentSpy: any;
  let factureServiceSpy: any;
  let userSpy: any;
  let adminDashboardSpy: any;
  let confirmationPopupSpy: any;

  const fakeUser = { id: 1, email: 'alice@mail.com', pseudo: 'alice' };
  const fakeCartItems = [
    { produit: { id: 10, nom: 'set de fourchette', prix: 5 }, quantite: 2 }
  ];

  beforeEach(async () => {
    articleCommandeSpy = {
      getItems: vi.fn().mockReturnValue(fakeCartItems),
      getArticleCommandes: vi.fn().mockReturnValue(of([])),
      createArticleCommande: vi.fn(),
      assignCommande: vi.fn(),
      clearCart: vi.fn()
    };
    commandeSpy = {
      getCommandes: vi.fn().mockReturnValue(of([])),
      createCommande: vi.fn()
    };
    paymentSpy = { getPay: vi.fn() };
    factureServiceSpy = { generateBillPDF: vi.fn() };
    userSpy = { getUserByPseudo: vi.fn() };
    adminDashboardSpy = { createPrix: vi.fn(), createProduitPhare: vi.fn() };

    TestBed.overrideComponent(PurchaseComponent, {
      set: { template: '<div></div>', styles: [] }
    });

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ArticleCommandeService, useValue: articleCommandeSpy },
        { provide: CommandeService, useValue: commandeSpy },
        { provide: PaymentService, useValue: paymentSpy },
        { provide: FactureService, useValue: factureServiceSpy },
        { provide: UserService, useValue: userSpy },
        { provide: AdminDashboardService, useValue: adminDashboardSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PurchaseComponent);
    component = fixture.componentInstance;

    component.form.setValue({
      entreprise: 'ACME',
      adresse: 'Rue du Lac 1',
      ville: 'Zürich',
      NPA: '8000'
    });

    localStorage.setItem('token', 'fake-token');
    fixture.detectChanges();

    confirmationPopupSpy = { open: vi.fn((total: number, cb: () => void) => cb()) };
    component.confirmationPopup = confirmationPopupSpy;
  });

  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  describe('Facture payment', () => {
    beforeEach(() => {
      component.selectedPayement = 'Facture';
      userSpy.getUserByPseudo.mockReturnValue(of(fakeUser));
    });

    it('should create commande directly without touching pendingOrder', () => {
      commandeSpy.createCommande.mockReturnValue(of({ id: 99 }));
      articleCommandeSpy.createArticleCommande.mockReturnValue(of({ id: 5 }));
      articleCommandeSpy.assignCommande.mockReturnValue(of({}));

      component.onSubmit();

      expect(commandeSpy.createCommande).toHaveBeenCalledWith(
        expect.objectContaining({ user: fakeUser, payement: 'Facture' })
      );
      expect(localStorage.getItem('pendingOrder')).toBeNull();
    });

    it('should not open the confirmation popup nor call the payment service', () => {
      commandeSpy.createCommande.mockReturnValue(of({ id: 99 }));
      articleCommandeSpy.createArticleCommande.mockReturnValue(of({ id: 5 }));
      articleCommandeSpy.assignCommande.mockReturnValue(of({}));

      component.onSubmit();

      expect(confirmationPopupSpy.open).not.toHaveBeenCalled();
      expect(paymentSpy.getPay).not.toHaveBeenCalled();
    });

    it('should clear the cart, generate the bill PDF and reload commandes on success', () => {
      commandeSpy.createCommande.mockReturnValue(of({ id: 99 }));
      articleCommandeSpy.createArticleCommande.mockReturnValue(of({ id: 5 }));
      articleCommandeSpy.assignCommande.mockReturnValue(of({}));

      component.onSubmit();

      expect(articleCommandeSpy.clearCart).toHaveBeenCalled();
      expect(factureServiceSpy.generateBillPDF).toHaveBeenCalledWith(
        99,
        {
          entreprise: 'ACME',
          adresse: 'Rue du Lac 1',
          ville: 'Zürich',
          NPA: '8000'
        },
        [{ nom: 'set de fourchette', quantite: 2, prix: 5 }]
      );
      expect(commandeSpy.getCommandes).toHaveBeenCalled();
    });

    it('should log error if commande creation fails', () => {
      commandeSpy.createCommande.mockReturnValue(throwError(() => ({ status: 500 })));
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      component.onSubmit();

      expect(consoleSpy).toHaveBeenCalled();
      expect(factureServiceSpy.generateBillPDF).not.toHaveBeenCalled();
    });

    it('should not generate the bill PDF if article creation/assignment fails', () => {
      commandeSpy.createCommande.mockReturnValue(of({ id: 99 }));
      articleCommandeSpy.createArticleCommande.mockReturnValue(
        throwError(() => ({ status: 500 }))
      );
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      component.onSubmit();

      expect(consoleSpy).toHaveBeenCalled();
      expect(factureServiceSpy.generateBillPDF).not.toHaveBeenCalled();
    });
  });

  describe('Online payment (carte / paypal / twint)', () => {
    beforeEach(() => {
      component.selectedPayement = 'paypal';
      userSpy.getUserByPseudo.mockReturnValue(of(fakeUser));
      paymentSpy.getPay.mockReturnValue(of(JSON.stringify({})));
    });

    it('should store pendingOrder in localStorage instead of creating the commande', () => {
      vi.useFakeTimers();
      component.onSubmit();
      vi.runAllTimers();

      expect(commandeSpy.createCommande).not.toHaveBeenCalled();
      const stored = JSON.parse(localStorage.getItem('pendingOrder')!);
      expect(stored).toEqual(
        expect.objectContaining({
          userId: 1,
          userEmail: 'alice@mail.com',
          payement: 'paypal'
        })
      );
      expect(stored.items).toEqual([
        { produitId: 10, produitNom: 'set de fourchette', quantite: 2, prix: 5 }
      ]);
      expect(stored.facture).toEqual({
        entreprise: 'ACME',
        adresse: 'Rue du Lac 1',
        ville: 'Zürich',
        NPA: '8000'
      });
      vi.useRealTimers();
    });

    it('should not generate the bill PDF directly (deferred to payment return)', () => {
      vi.useFakeTimers();
      component.onSubmit();
      vi.runAllTimers();

      expect(factureServiceSpy.generateBillPDF).not.toHaveBeenCalled();
      vi.useRealTimers();
    });

    it('should open the confirmation popup and call the payment service', () => {
      vi.useFakeTimers();
      paymentSpy.getPay.mockReturnValue(of(JSON.stringify({ redirectUrl: 'https://paypal.test/checkout' })));

      component.onSubmit();
      vi.runAllTimers();

      expect(confirmationPopupSpy.open).toHaveBeenCalled();
      expect(paymentSpy.getPay).toHaveBeenCalledWith(10, 'paypal');
      vi.useRealTimers();
    });

    it('should use selectedCarte as payment method when selectedPayement is carte', () => {
      vi.useFakeTimers();
      component.selectedPayement = 'carte';
      component.selectedCarte = 'Visa';
      paymentSpy.getPay.mockReturnValue(of(JSON.stringify({})));

      component.onSubmit();
      vi.runAllTimers();

      expect(paymentSpy.getPay).toHaveBeenCalledWith(10, 'Visa');
      vi.useRealTimers();
    });

    it('should log error if payment service call fails', () => {
      vi.useFakeTimers();
      paymentSpy.getPay.mockReturnValue(throwError(() => ({ status: 500 })));
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      component.onSubmit();
      vi.runAllTimers();

      expect(consoleSpy).toHaveBeenCalled();
      vi.useRealTimers();
    });
  });

  it('should not proceed if the form is invalid', () => {
    component.form.get('entreprise')!.setValue('');
    component.selectedPayement = 'Facture';

    component.onSubmit();

    expect(userSpy.getUserByPseudo).not.toHaveBeenCalled();
  });

  it('should not proceed if no token is present', () => {
    localStorage.removeItem('token');
    component.selectedPayement = 'Facture';

    component.onSubmit();

    expect(userSpy.getUserByPseudo).not.toHaveBeenCalled();
  });
});