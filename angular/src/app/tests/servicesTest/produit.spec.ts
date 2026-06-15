import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { beforeEach, describe, expect, it, afterEach } from "vitest";
import { ProduitService } from "../../services/produit.service";
import { API_BASE_URL } from "../../services/api.config";

describe("ProduitService", () => {
    let service: ProduitService;
    let httpMock: HttpTestingController;

    const apiUrl = `${API_BASE_URL}/Produits`;

    const mockProduit = {
        id: 1,
        nom: 'Assiette',
        prix: 10,
        quantiteStock: 20,
        perissable: false,
        datePeremption: null,
        dernierAjout: null,
        fournisseur: []
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ProduitService]
        });

        service = TestBed.inject(ProduitService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('crée le service', () => {
        expect(service).toBeTruthy();
    });

    describe('getProduits()', () => {
        it('envoie un GET et retourne les produits', () => {
            service.getProduits().subscribe(data => {
                expect(data).toEqual([mockProduit]);
            });

            const req = httpMock.expectOne(apiUrl);
            expect(req.request.method).toBe('GET');
            req.flush([mockProduit]);
        });
    });

    describe('getProduitById()', () => {
        it('envoie un GET avec le bon id', () => {
            service.getProduitById(1).subscribe(data => {
                expect(data).toEqual(mockProduit);
            });

            const req = httpMock.expectOne(`${apiUrl}/1`);
            expect(req.request.method).toBe('GET');
            req.flush(mockProduit);
        });
    });

    describe('createProduit()', () => {
        it('envoie un POST avec le bon body', () => {
            const nouveau = { ...mockProduit, id: 0 } as any;

            service.createProduit(nouveau).subscribe(data => {
                expect(data).toEqual(mockProduit);
            });

            const req = httpMock.expectOne(apiUrl);
            expect(req.request.method).toBe('POST');
            expect(req.request.body).toEqual(nouveau);
            req.flush(mockProduit);
        });
    });

    describe('updateProduit()', () => {
        it('envoie un PUT avec le bon id et body', () => {
            const updated = { ...mockProduit, nom: 'Verre' } as any;

            service.updateProduit(1, updated).subscribe(data => {
                expect(data).toEqual(updated);
            });

            const req = httpMock.expectOne(`${apiUrl}/1`);
            expect(req.request.method).toBe('PUT');
            expect(req.request.body).toEqual(updated);
            req.flush(updated);
        });
    });

    describe('deleteProduit()', () => {
        it('envoie un DELETE avec le bon id', () => {
            service.deleteProduit(1).subscribe();

            const req = httpMock.expectOne(`${apiUrl}/1`);
            expect(req.request.method).toBe('DELETE');
            req.flush(null);
        });
    });

    describe('searchProduits()', () => {
        it('envoie un GET avec le bon paramètre de recherche', () => {
            service.searchProduits('Verre').subscribe(data => {
                expect(data).toEqual([mockProduit]);
            });

            const req = httpMock.expectOne(`${apiUrl}/search?nom=Verre`);
            expect(req.request.method).toBe('GET');
            req.flush([mockProduit]);
        });

        it('retourne un tableau vide si aucun résultat', () => {
            service.searchProduits('inexistant').subscribe(data => {
                expect(data).toEqual([]);
            });

            const req = httpMock.expectOne(`${apiUrl}/search?nom=inexistant`);
            req.flush([]);
        });
    });
});