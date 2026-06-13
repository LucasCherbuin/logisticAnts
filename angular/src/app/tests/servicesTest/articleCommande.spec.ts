import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { beforeEach, describe, vi, expect, it, afterEach } from "vitest";
import { ArticleCommandeService } from "../../services/articleCommande.service";
import { API_BASE_URL } from "../../services/api.config";

describe("ArticleCommandeService", () => {
    let service: ArticleCommandeService;
    let httpMock: HttpTestingController;

    const apiUrl = `${API_BASE_URL}/ArticleCommandes`;
    const commandeUrl = `${API_BASE_URL}/Commandes`;

    beforeEach(() => {
        localStorage.clear();

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ArticleCommandeService]
        });

        service = TestBed.inject(ArticleCommandeService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
        localStorage.clear();
    });

    it('crée le service', () => {
        expect(service).toBeTruthy();
    });

    describe('localStorage', () => {
        it('charge le panier depuis le localStorage au démarrage', () => {
            const saved = [{ produit: { id: 1, nom: 'A', prix: 10 }, quantite: 2 }];
            localStorage.setItem('cart', JSON.stringify(saved));

            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule],
                providers: [ArticleCommandeService]
            });
            const freshService = TestBed.inject(ArticleCommandeService);
            httpMock = TestBed.inject(HttpTestingController);

            expect(freshService.getItems()).toEqual(saved);
        });

        it('retourne un tableau vide si le localStorage est vide', () => {
            expect(service.getItems()).toEqual([]);
        });
    });

    describe('addToCart()', () => {
        it('ajoute un produit au panier', () => {
            const produit = { id: 1, nom: 'Assiette', prix: 10 } as any;

            service.addToCart(produit);

            expect(service.getItems()).toEqual([{ produit, quantite: 1 }]);
        });

        it('incrémente la quantité si le produit existe déjà', () => {
            const produit = { id: 1, nom: 'Assiette', prix: 10 } as any;

            service.addToCart(produit);
            service.addToCart(produit);

            expect(service.getItems()[0].quantite).toBe(2);
            expect(service.getItems().length).toBe(1);
        });

        it('émet la nouvelle liste via cartItems$', () => {
            const produit = { id: 1, nom: 'Assiette', prix: 10 } as any;
            const emitted: any[] = [];
            service.cartItems$.subscribe(items => emitted.push(items));

            service.addToCart(produit);

            expect(emitted[emitted.length - 1]).toEqual([{ produit, quantite: 1 }]);
        });

        it('sauvegarde le panier dans le localStorage', () => {
            const produit = { id: 1, nom: 'Assiette', prix: 10 } as any;

            service.addToCart(produit);

            const stored = JSON.parse(localStorage.getItem('cart')!);
            expect(stored).toEqual([{ produit, quantite: 1 }]);
        });
    });

    describe('removeItem()', () => {
        it('retire le produit du panier', () => {
            const p1 = { id: 1, nom: 'A', prix: 5 } as any;
            const p2 = { id: 2, nom: 'B', prix: 8 } as any;
            service.addToCart(p1);
            service.addToCart(p2);

            service.removeItem(p1);

            expect(service.getItems()).toEqual([{ produit: p2, quantite: 1 }]);
        });

        it('émet la liste mise à jour via cartItems$', () => {
            const produit = { id: 1, nom: 'A', prix: 5 } as any;
            service.addToCart(produit);

            service.removeItem(produit);

            expect(service.cartItems$.value).toEqual([]);
        });
    });

    describe('clearCart()', () => {
        it('vide le panier et le localStorage', () => {
            const produit = { id: 1, nom: 'A', prix: 5 } as any;
            service.addToCart(produit);

            service.clearCart();

            expect(service.getItems()).toEqual([]);
            expect(localStorage.getItem('cart')).toBeNull();
        });

        it('émet un tableau vide via cartItems$', () => {
            const produit = { id: 1, nom: 'A', prix: 5 } as any;
            service.addToCart(produit);

            service.clearCart();

            expect(service.cartItems$.value).toEqual([]);
        });
    });

    describe('getArticleCommandes()', () => {
        it('envoie un GET sur le bon endpoint', () => {
            const mockData = [{ id: 1, produit: { id: 1 }, quantite: 2 }];

            service.getArticleCommandes().subscribe(data => {
                expect(data).toEqual(mockData);
            });

            const req = httpMock.expectOne(apiUrl);
            expect(req.request.method).toBe('GET');
            req.flush(mockData);
        });
    });

    describe('getArticleCommandeById()', () => {
        it('envoie un GET avec le bon id', () => {
            const mockData = { id: 5, produit: { id: 1 }, quantite: 3 };

            service.getArticleCommandeById(5).subscribe(data => {
                expect(data).toEqual(mockData);
            });

            const req = httpMock.expectOne(`${apiUrl}/5`);
            expect(req.request.method).toBe('GET');
            req.flush(mockData);
        });
    });

    describe('createArticleCommande()', () => {
        it('envoie un POST avec le bon body', () => {
            const ac = { id: 0, produit: { id: 1 }, quantite: 2 } as any;

            service.createArticleCommande(ac).subscribe(data => {
                expect(data).toEqual({ ...ac, id: 1 });
            });

            const req = httpMock.expectOne(apiUrl);
            expect(req.request.method).toBe('POST');
            expect(req.request.body).toEqual(ac);
            req.flush({ ...ac, id: 1 });
        });
    });

    describe('updateArticleCommande()', () => {
        it('envoie un PUT avec le bon id et body', () => {
            const ac = { id: 3, produit: { id: 1 }, quantite: 5 } as any;

            service.updateArticleCommande(3, ac).subscribe(data => {
                expect(data).toEqual(ac);
            });

            const req = httpMock.expectOne(`${apiUrl}/3`);
            expect(req.request.method).toBe('PUT');
            expect(req.request.body).toEqual(ac);
            req.flush(ac);
        });
    });

    describe('deleteArticleCommande()', () => {
        it('envoie un DELETE avec le bon id', () => {
            service.deleteArticleCommande(7).subscribe();

            const req = httpMock.expectOne(`${apiUrl}/7`);
            expect(req.request.method).toBe('DELETE');
            req.flush(null);
        });
    });

    describe('assignCommande()', () => {
        it('envoie un POST sur le bon endpoint', () => {
            service.assignCommande(2, 10).subscribe();

            const req = httpMock.expectOne(`${apiUrl}/2/commande/10`);
            expect(req.request.method).toBe('POST');
            expect(req.request.body).toEqual({});
            req.flush(null);
        });
    });

    describe('validerCommande()', () => {
        it('envoie un POST sur l\'endpoint commandes', () => {
            const commande = { id: 0, articleCommandes: [], user: null, payement: 'carte', facture: null } as any;

            service.validerCommande(commande).subscribe(data => {
                expect(data).toEqual({ ...commande, id: 1 });
            });

            const req = httpMock.expectOne(commandeUrl);
            expect(req.request.method).toBe('POST');
            req.flush({ ...commande, id: 1 });
        });
    });
});