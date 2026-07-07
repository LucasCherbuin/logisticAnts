import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { beforeEach, describe, expect, it, afterEach } from "vitest";
import { AdminDashboardService } from "../../services/adminDashboard.service";
import { API_BASE_URL } from "../../services/api.config";

describe("AdminDashboardService", () => {
    let service: AdminDashboardService;
    let httpMock: HttpTestingController;
    const apiUrl = `${API_BASE_URL}/dashboard`;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AdminDashboardService]
        });
        service = TestBed.inject(AdminDashboardService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('crée le service', () => {
        expect(service).toBeTruthy();
    });

    describe('getAllPrix()', () => {
        it('retourne les données prix', () => {
            const mockResponse = { remboursement: 101, achat: 413, prixTotal: 470, date: '2026-06-24' };
            service.getAllPrix().subscribe(data => {
                expect(data).toEqual(mockResponse);
            });
            const req = httpMock.expectOne(`${apiUrl}/prix`);
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });
    });

    describe('createPrix()', () => {
        it('crée une entrée prix', () => {
            const newPrix = { prixTotal: 0, remboursement: 1, achat: 0, date: new Date() };
            const mockResponse = { id: '1', ...newPrix };
            service.createPrix(newPrix).subscribe(data => {
                expect(data).toEqual(mockResponse);
            });
            const req = httpMock.expectOne(`${apiUrl}/prix`);
            expect(req.request.method).toBe('POST');
            expect(req.request.body).toEqual(newPrix);
            req.flush(mockResponse);
        });
    });

    describe('getAllProduitPhareDashboard()', () => {
        it('retourne les produits phare et le total achats', () => {
            const mockResponse = {
                produits: [
                    { id: '1', produit: 'Produit A', achat: 5 },
                    { id: '2', produit: 'Produit B', achat: 2 }
                ],
                achats: 7
            };
            service.getAllProduitPhareDashboard().subscribe(data => {
                expect(data.produits.length).toBe(2);
                expect(data.achats).toBe(7);
            });
            const req = httpMock.expectOne(`${apiUrl}/produitPhare`);
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });
    });

    describe('createProduitPhare()', () => {
        it('crée un produit phare', () => {
            const newProduit = { produit: 'Produit A', achat: 0 } as any;
            const mockResponse = { id: '1', ...newProduit };
            service.createProduitPhare(newProduit).subscribe(data => {
                expect(data).toEqual(mockResponse);
            });
            const req = httpMock.expectOne(`${apiUrl}/produitPhare`);
            expect(req.request.method).toBe('POST');
            expect(req.request.body).toEqual(newProduit);
            req.flush(mockResponse);
        });
    });
});