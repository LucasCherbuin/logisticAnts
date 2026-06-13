import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { beforeEach, describe, expect, it, afterEach } from "vitest";
import { CommandeService } from "../../services/commande.service";
import { API_BASE_URL } from "../../services/api.config";

describe("CommandeService", () => {
    let service: CommandeService;
    let httpMock: HttpTestingController;

    const apiUrl = `${API_BASE_URL}/Commandes`;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CommandeService]
        });

        service = TestBed.inject(CommandeService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('crée le service', () => {
        expect(service).toBeTruthy();
    });

    describe('getCommandes()', () => {
        it('envoie un GET et retourne les commandes', () => {
            const mockData = [{ id: 1, articleCommandes: [], user: null, payement: 'carte', facture: null }];

            service.getCommandes().subscribe(data => {
                expect(data).toEqual(mockData);
            });

            const req = httpMock.expectOne(apiUrl);
            expect(req.request.method).toBe('GET');
            req.flush(mockData);
        });
    });

    describe('getCommandeById()', () => {
        it('envoie un GET avec le bon id', () => {
            const mockData = { id: 3, articleCommandes: [], user: null, payement: 'paypal', facture: null };

            service.getCommandeById(3).subscribe(data => {
                expect(data).toEqual(mockData);
            });

            const req = httpMock.expectOne(`${apiUrl}/3`);
            expect(req.request.method).toBe('GET');
            req.flush(mockData);
        });
    });

    describe('createCommande()', () => {
        it('envoie un POST avec le bon body', () => {
            const commande = { id: 0, articleCommandes: [], user: null, payement: 'twint', facture: null } as any;

            service.createCommande(commande).subscribe(data => {
                expect(data).toEqual({ ...commande, id: 1 });
            });

            const req = httpMock.expectOne(apiUrl);
            expect(req.request.method).toBe('POST');
            expect(req.request.body).toEqual(commande);
            req.flush({ ...commande, id: 1 });
        });
    });

    describe('updateCommande()', () => {
        it('envoie un PUT avec le bon id et body', () => {
            const commande = { id: 2, articleCommandes: [], user: null, payement: 'Facture', facture: null } as any;

            service.updateCommande(2, commande).subscribe(data => {
                expect(data).toEqual(commande);
            });

            const req = httpMock.expectOne(`${apiUrl}/2`);
            expect(req.request.method).toBe('PUT');
            expect(req.request.body).toEqual(commande);
            req.flush(commande);
        });
    });

    describe('deleteCommande()', () => {
        it('envoie un DELETE avec le bon id', () => {
            service.deleteCommande(5).subscribe();

            const req = httpMock.expectOne(`${apiUrl}/5`);
            expect(req.request.method).toBe('DELETE');
            req.flush(null);
        });
    });

    describe('updatedFacture()', () => {
        it('envoie un PUT avec le bon Content-Type et les bytes', () => {
            const pdfBytes = new ArrayBuffer(8);

            service.updatedFacture(4, pdfBytes).subscribe();

            const req = httpMock.expectOne(`${apiUrl}/4/facture`);
            expect(req.request.method).toBe('PUT');
            expect(req.request.headers.get('Content-Type')).toBe('application/octet-stream');
            expect(req.request.body).toEqual(pdfBytes);
            req.flush(null);
        });
    });
});