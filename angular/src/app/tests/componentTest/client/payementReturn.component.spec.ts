import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { of, throwError } from 'rxjs';
import { PaymentReturnComponent } from '../../../component/client/PaymentReturn.component';

describe('PaymentReturnComponent', () => {
  let component: PaymentReturnComponent;
  let commandeServiceSpy: any;
  let articleCommandeServiceSpy: any;
  let mailServiceSpy: any;
  let factureServiceSpy: any;
  let routerSpy: any;

  const pendingOrder = {
    userId: 1,
    userEmail: 'alice@mail.com',
    payement: 'paypal',
    items: [
      { produitId: 10, produitNom: 'set de fourchette', quantite: 2, prix: 5 }
    ],
    facture: {
      entreprise: 'ACME',
      adresse: 'Rue du Lac 1',
      ville: 'Zürich',
      NPA: '8000'
    }
  };

  beforeEach(() => {
    commandeServiceSpy = { createCommande: vi.fn() };
    articleCommandeServiceSpy = {
      createArticleCommande: vi.fn(),
      assignCommande: vi.fn(),
      clearCart: vi.fn()
    };
    mailServiceSpy = { sendMail: vi.fn() };
    factureServiceSpy = { generateBillPDF: vi.fn() };
    routerSpy = { navigate: vi.fn() };

    component = new PaymentReturnComponent(
      commandeServiceSpy,
      articleCommandeServiceSpy,
      mailServiceSpy,
      factureServiceSpy,
      routerSpy
    );

    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to home if no pendingOrder in localStorage', () => {
    component.ngOnInit();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
    expect(commandeServiceSpy.createCommande).not.toHaveBeenCalled();
  });

  it('should create commande from pendingOrder data', () => {
    localStorage.setItem('pendingOrder', JSON.stringify(pendingOrder));
    commandeServiceSpy.createCommande.mockReturnValue(of({ id: 99 }));
    articleCommandeServiceSpy.createArticleCommande.mockReturnValue(of({ id: 1 }));
    articleCommandeServiceSpy.assignCommande.mockReturnValue(of({}));
    mailServiceSpy.sendMail.mockReturnValue(of({}));

    component.ngOnInit();

    expect(commandeServiceSpy.createCommande).toHaveBeenCalledWith(
      expect.objectContaining({
        user: { id: 1 },
        payement: 'paypal'
      })
    );
  });

  it('should create one article per item and assign it to the created commande', () => {
    localStorage.setItem('pendingOrder', JSON.stringify(pendingOrder));
    commandeServiceSpy.createCommande.mockReturnValue(of({ id: 99 }));
    articleCommandeServiceSpy.createArticleCommande.mockReturnValue(of({ id: 5 }));
    articleCommandeServiceSpy.assignCommande.mockReturnValue(of({}));
    mailServiceSpy.sendMail.mockReturnValue(of({}));

    component.ngOnInit();

    expect(articleCommandeServiceSpy.createArticleCommande).toHaveBeenCalledWith(
      expect.objectContaining({ produit: { id: 10 }, quantite: 2 })
    );
    expect(articleCommandeServiceSpy.assignCommande).toHaveBeenCalledWith(5, 99);
  });

  it('should clear cart, remove pendingOrder, send mail and navigate to /purchase on success', () => {
    localStorage.setItem('pendingOrder', JSON.stringify(pendingOrder));
    commandeServiceSpy.createCommande.mockReturnValue(of({ id: 99 }));
    articleCommandeServiceSpy.createArticleCommande.mockReturnValue(of({ id: 5 }));
    articleCommandeServiceSpy.assignCommande.mockReturnValue(of({}));
    mailServiceSpy.sendMail.mockReturnValue(of({}));

    component.ngOnInit();

    expect(articleCommandeServiceSpy.clearCart).toHaveBeenCalled();
    expect(localStorage.getItem('pendingOrder')).toBeNull();
    expect(mailServiceSpy.sendMail).toHaveBeenCalledWith(
      expect.objectContaining({ to: 'alice@mail.com', subject: 'Commande n° 99' })
    );
    expect(factureServiceSpy.generateBillPDF).toHaveBeenCalledWith(
      99,
      pendingOrder.facture,
      [{ nom: 'set de fourchette', quantite: 2, prix: 5 }]
    );
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/purchase']);
  });

  it('should log error and not navigate if createCommande fails', () => {
    localStorage.setItem('pendingOrder', JSON.stringify(pendingOrder));
    commandeServiceSpy.createCommande.mockReturnValue(throwError(() => ({ status: 500 })));
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    component.ngOnInit();

    expect(consoleSpy).toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalledWith(['/purchase']);
    expect(mailServiceSpy.sendMail).not.toHaveBeenCalled();
    expect(factureServiceSpy.generateBillPDF).not.toHaveBeenCalled();
  });

  it('should log error if article creation/assignment fails, without blocking on mail', () => {
    localStorage.setItem('pendingOrder', JSON.stringify(pendingOrder));
    commandeServiceSpy.createCommande.mockReturnValue(of({ id: 99 }));
    articleCommandeServiceSpy.createArticleCommande.mockReturnValue(
      throwError(() => ({ status: 500 }))
    );
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    component.ngOnInit();

    expect(consoleSpy).toHaveBeenCalled();
    expect(mailServiceSpy.sendMail).not.toHaveBeenCalled();
    expect(factureServiceSpy.generateBillPDF).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalledWith(['/purchase']);
  });

  it('sendConfirmationMail should build the correct mail payload', () => {
    mailServiceSpy.sendMail.mockReturnValue(of({}));
    component.sendConfirmationMail({ id: 42 } as any, 'bob@mail.com');

    expect(mailServiceSpy.sendMail).toHaveBeenCalledWith({
      to: 'bob@mail.com',
      subject: 'Commande n° 42',
      body: 'Votre commande a bien été réalisée.'
    });
  });

  it('sendConfirmationMail should log error on failure', () => {
    mailServiceSpy.sendMail.mockReturnValue(throwError(() => ({ status: 500 })));
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    component.sendConfirmationMail({ id: 42 } as any, 'bob@mail.com');

    expect(consoleSpy).toHaveBeenCalled();
  });
});