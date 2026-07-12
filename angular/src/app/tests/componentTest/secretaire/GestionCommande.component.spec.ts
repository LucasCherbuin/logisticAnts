import { describe, it, expect, vi, beforeEach } from 'vitest';
import { of } from 'rxjs';
import { GestionCommandeComponent } from '../../../component/secretaire/gestionCommande.component';
import { Commande } from '../../../models/commande.model';
import { User } from '../../../models/user.model'; 

describe('GestionCommandeComponent', () => {
  let component: GestionCommandeComponent;
  let commandeServiceMock: any;
  let articleCommandeServiceMock: any;
  let produitServiceMock: any;
  let userServiceMock: any;
  let mailServiceMock: any;
  let adminDashboardServiceMock: any;
  let cdrMock: any;

  const commandesFixture: Commande[] = [
    { id: 1 } as Commande,
    { id: 2 } as Commande
  ];
  const usersFixture: User[] = [
    { id: 1, pseudo: 'admin', email: 'admin@mail.com', password: 'x', role: 'ADMIN' as any }
  ];

  beforeEach(() => {
    commandeServiceMock = {
      getCommandes: vi.fn().mockReturnValue(of(commandesFixture)),
      searchCommandes: vi.fn().mockReturnValue(of(commandesFixture))
    };
    articleCommandeServiceMock = {
      getArticleCommandes: vi.fn().mockReturnValue(of([]))
    };
    produitServiceMock = {
      getProduits: vi.fn().mockReturnValue(of([]))
    };
    userServiceMock = {
      getUsers: vi.fn().mockReturnValue(of(usersFixture))
    };
    mailServiceMock = {
      sendMail: vi.fn().mockReturnValue(of({}))
    };
    adminDashboardServiceMock = {
      createPrix: vi.fn().mockReturnValue(of({}))
    };
    cdrMock = {
      detectChanges: vi.fn()
    };

    component = new GestionCommandeComponent(
      commandeServiceMock,
      articleCommandeServiceMock,
      produitServiceMock,
      userServiceMock,
      mailServiceMock,
      adminDashboardServiceMock,
      cdrMock
    );
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('loadCommandes should populate commandes and trigger change detection', () => {
    component.loadCommandes();
    expect(component.commandes).toEqual(commandesFixture);
    expect(cdrMock.detectChanges).toHaveBeenCalled();
  });

  it('loadArticleCommandes should populate articleCommandes', () => {
    component.loadArticleCommandes();
    expect(component.articleCommandes).toEqual([]);
    expect(articleCommandeServiceMock.getArticleCommandes).toHaveBeenCalled();
  });

  it('loadProduits should populate produits', () => {
    component.loadProduits();
    expect(component.produits).toEqual([]);
    expect(produitServiceMock.getProduits).toHaveBeenCalled();
  });

  it('loadUser should set the first user from the list', () => {
    component.loadUser();
    expect(component.user).toEqual(usersFixture[0]);
  });

  it('ngOnInit should call all load methods and populate filteredCommande$', async () => {
    const loadCommandesSpy = vi.spyOn(component, 'loadCommandes');
    const loadArticleCommandesSpy = vi.spyOn(component, 'loadArticleCommandes');
    const loadProduitsSpy = vi.spyOn(component, 'loadProduits');
    const loadUserSpy = vi.spyOn(component, 'loadUser');

    component.ngOnInit();

    expect(loadCommandesSpy).toHaveBeenCalled();
    expect(loadArticleCommandesSpy).toHaveBeenCalled();
    expect(loadProduitsSpy).toHaveBeenCalled();
    expect(loadUserSpy).toHaveBeenCalled();

    const result = await new Promise<Commande[]>(resolve => {
      component.filteredCommande$.subscribe(resolve);
    });
    expect(result).toEqual(commandesFixture);
  });

  it('setCurrentAntrag should set currentCommande and currentIndex', () => {
    const commande = commandesFixture[0];
    component.setCurrentAntrag(commande, 0);
    expect(component.currentCommande).toBe(commande);
    expect(component.currentIndex).toBe(0);
  });
});