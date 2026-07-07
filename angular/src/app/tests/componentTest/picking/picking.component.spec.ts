import { describe, it, expect, vi, beforeEach } from 'vitest';
import { of, throwError } from 'rxjs';
import { PickingComponent } from '../../../component/logisiticien/picking/picking.component';

describe('PickingComponent', () => {
  let component: PickingComponent;
  let commandeServiceMock: any;
  let pickingServiceMock: any;

  const makeArticle = (id: number, produitId: number, quantite: number) => ({
    id,
    quantite,
    produit: { id: produitId, nom: `Produit ${produitId}` },
  });

  const makeCommande = (id: number, articles: any[]) => ({
    id,
    user: { email: 'client@mail.com' },
    articleCommandes: articles,
  });

  beforeEach(() => {
    commandeServiceMock = { getCommandes: vi.fn() };
    pickingServiceMock = {
      decrementStock: vi.fn(),
      deleteArticleCommande: vi.fn(),
    };

    component = new PickingComponent(commandeServiceMock, pickingServiceMock);

    // Le popup de confirmation dépend du template réel (@ViewChild),
    // on le simule ici pour tester la logique indépendamment du DOM.
    (component as any).confirmationPickingPopup = { open: vi.fn((cb: () => void) => cb()) };
  });

  it('devrait se créer', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit / loadCommandes', () => {
    it('devrait charger les commandes en cas de succès', () => {
      const commandes = [makeCommande(1, [makeArticle(1, 10, 2)])];
      commandeServiceMock.getCommandes.mockReturnValue(of(commandes));

      component.ngOnInit();

      expect(component.commandes).toEqual(commandes);
    });

    it('devrait logger une erreur en cas d\'échec', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      commandeServiceMock.getCommandes.mockReturnValue(throwError(() => new Error('fail')));

      component.loadCommandes();

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('commencerCommande', () => {
    it('devrait assigner la commande sélectionnée', () => {
      const commande = makeCommande(1, []);
      component.commencerCommande(commande as any);
      expect(component.commandeSelectionnee).toBe(commande);
    });
  });

  describe('pickerArticle', () => {
    it('devrait ouvrir le popup de confirmation', () => {
      const article = makeArticle(1, 10, 2);
      pickingServiceMock.decrementStock.mockReturnValue(of({}));
      pickingServiceMock.deleteArticleCommande.mockReturnValue(of(void 0));

      component.pickerArticle(article as any);

      expect((component as any).confirmationPickingPopup.open).toHaveBeenCalled();
    });

    it('devrait décrémenter le stock avec le bon produit et la bonne quantité', () => {
      const article = makeArticle(1, 10, 3);
      pickingServiceMock.decrementStock.mockReturnValue(of({}));
      pickingServiceMock.deleteArticleCommande.mockReturnValue(of(void 0));

      component.pickerArticle(article as any);

      expect(pickingServiceMock.decrementStock).toHaveBeenCalledWith(10, 3);
    });

    it('devrait supprimer l\'articleCommande après décrément du stock', () => {
      const article = makeArticle(1, 10, 3);
      pickingServiceMock.decrementStock.mockReturnValue(of({}));
      pickingServiceMock.deleteArticleCommande.mockReturnValue(of(void 0));

      component.pickerArticle(article as any);

      expect(pickingServiceMock.deleteArticleCommande).toHaveBeenCalledWith(1);
    });

    it('devrait retirer l\'article de commandes et filtrer les commandes vides', () => {
      const article1 = makeArticle(1, 10, 3);
      const commande = makeCommande(1, [article1]);
      component.commandes = [commande as any];
      pickingServiceMock.decrementStock.mockReturnValue(of({}));
      pickingServiceMock.deleteArticleCommande.mockReturnValue(of(void 0));

      component.pickerArticle(article1 as any);

      expect(component.commandes.length).toBe(0);
    });

    it('devrait conserver la commande si elle a encore des articles', () => {
      const article1 = makeArticle(1, 10, 3);
      const article2 = makeArticle(2, 11, 1);
      const commande = makeCommande(1, [article1, article2]);
      component.commandes = [commande as any];
      pickingServiceMock.decrementStock.mockReturnValue(of({}));
      pickingServiceMock.deleteArticleCommande.mockReturnValue(of(void 0));

      component.pickerArticle(article1 as any);

      expect(component.commandes.length).toBe(1);
      expect(component.commandes[0].articleCommandes).toEqual([article2]);
    });

    it('devrait synchroniser commandeSelectionnee quand des articles restent', () => {
      const article1 = makeArticle(1, 10, 3);
      const article2 = makeArticle(2, 11, 1);
      const commande = makeCommande(1, [article1, article2]);
      component.commandes = [commande as any];
      component.commandeSelectionnee = commande as any;
      pickingServiceMock.decrementStock.mockReturnValue(of({}));
      pickingServiceMock.deleteArticleCommande.mockReturnValue(of(void 0));

      component.pickerArticle(article1 as any);

      expect(component.commandeSelectionnee?.articleCommandes).toEqual([article2]);
    });

    it('devrait vider articleCommandes de commandeSelectionnee quand le dernier article est retiré', () => {
      const article1 = makeArticle(1, 10, 3);
      const commande = makeCommande(1, [article1]);
      component.commandes = [commande as any];
      component.commandeSelectionnee = commande as any;
      pickingServiceMock.decrementStock.mockReturnValue(of({}));
      pickingServiceMock.deleteArticleCommande.mockReturnValue(of(void 0));

      component.pickerArticle(article1 as any);

      expect(component.commandeSelectionnee?.articleCommandes).toEqual([]);
    });

    it('devrait logger une erreur si le décrement du stock échoue', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const article = makeArticle(1, 10, 3);
      pickingServiceMock.decrementStock.mockReturnValue(throwError(() => new Error('fail')));

      component.pickerArticle(article as any);

      expect(consoleSpy).toHaveBeenCalled();
      expect(pickingServiceMock.deleteArticleCommande).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('devrait logger une erreur si la suppression de l\'articleCommande échoue', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const article = makeArticle(1, 10, 3);
      pickingServiceMock.decrementStock.mockReturnValue(of({}));
      pickingServiceMock.deleteArticleCommande.mockReturnValue(throwError(() => new Error('fail')));

      component.pickerArticle(article as any);

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});