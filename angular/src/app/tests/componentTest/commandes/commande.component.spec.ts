import { TestBed, ComponentFixture } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { beforeEach, afterEach, describe, vi, expect, it } from "vitest";
import { CommandeComponent } from "../../../component/client/commandes/commande.component";
import { CommandeService } from "../../../services/commande.service";
import { ArticleCommandeService } from "../../../services/articleCommande.service";
import { ProduitService } from "../../../services/produit.service";
import { of } from "rxjs";

describe("CommandeComponent", () => {
    let component: CommandeComponent;
    let fixture: ComponentFixture<CommandeComponent>;

    const mockCommandeService = {
        getCommandes: vi.fn(),
        downloadFactureFile: vi.fn()
    };
    const mockArticleCommandeService = {
        getArticleCommandes: vi.fn()
    };
    const mockProduitService = {
        getProduits: vi.fn()
    };

    beforeEach(async () => {
        vi.clearAllMocks();

        mockCommandeService.getCommandes.mockReturnValue(of([]));
        mockArticleCommandeService.getArticleCommandes.mockReturnValue(of([]));
        mockProduitService.getProduits.mockReturnValue(of([]));

        window.URL.createObjectURL = vi.fn().mockReturnValue('blob:http://localhost/fake-pdf-url');
        window.URL.revokeObjectURL = vi.fn();

        await TestBed.configureTestingModule({
            imports: [CommandeComponent],
            providers: [
                { provide: CommandeService, useValue: mockCommandeService },
                { provide: ArticleCommandeService, useValue: mockArticleCommandeService },
                { provide: ProduitService, useValue: mockProduitService }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(CommandeComponent);
        component = fixture.componentInstance;
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('crée le composant', () => {
        expect(component).toBeTruthy();
    });

    it('charge les commandes au démarrage', () => {
        const mockData = [{ id: 1, articleCommandes: [], payement: 'Paypal', facture: null }];
        mockCommandeService.getCommandes.mockReturnValue(of(mockData));
        fixture.detectChanges();
        expect(mockCommandeService.getCommandes).toHaveBeenCalledOnce();
        expect(component.commandes).toEqual(mockData);
    });

    it('charge les articleCommandes au démarrage', () => {
        const mockData = [{ id: 1, produit: { id: 10 }, quantite: 3 }];
        mockArticleCommandeService.getArticleCommandes.mockReturnValue(of(mockData));
        fixture.detectChanges();
        expect(mockArticleCommandeService.getArticleCommandes).toHaveBeenCalledOnce();
        expect(component.articleCommandes).toEqual(mockData);
    });

    it('charge les produits au démarrage', () => {
        const mockData = [{ id: 1, nom: 'Assiette', prix: 10, quantiteStock: 20, perissable: false, datePeremption: null, dernierAjout: null, fournisseur: [] }];
        mockProduitService.getProduits.mockReturnValue(of(mockData));
        fixture.detectChanges();
        expect(mockProduitService.getProduits).toHaveBeenCalledOnce();
        expect(component.produits).toEqual(mockData);
    });

    describe('getTotalByCommande', () => {
        it('calcule le total correct pour une commande', () => {
            component.produits = [
                { id: 10, nom: 'Assiette', prix: 12, quantiteStock: 50, perissable: false, datePeremption: new Date('2000-11-11'), dernierAjout: new Date('2000-11-11'), fournisseur: { id: 1 , nom: '', email: '', adresse: '' } },
                { id: 11, nom: 'Verre', prix: 5, quantiteStock: 30, perissable: false, datePeremption: new Date('2000-11-11'), dernierAjout: new Date('2000-11-11'), fournisseur: { id: 2 ,nom: '', email: '', adresse: '' } }
            ];
            component.articleCommandes = [
                { id: 1, produit: { id: 10 }, quantite: 2 },
                { id: 1, produit: { id: 11 }, quantite: 4 }
            ] as any;
            const total = component.getTotalByCommande(1);
            expect(total).toBe(44);
        });

        it('retourne 0 si le produit est introuvable', () => {
            component.produits = [{ id: 10, nom: 'Assiette', prix: 12, quantiteStock: 50, perissable: false, datePeremption: new Date(), dernierAjout: new Date(), fournisseur: { id: 1, nom: '', email: '', adresse: '' }}];
            component.articleCommandes = [{ id: 1, produit: { id: 999 }, quantite: 2 }] as any;
            expect(component.getTotalByCommande(1)).toBe(0);
        });

        it('retourne 0 si la commande est inexistante', () => {
            component.produits = [];
            component.articleCommandes = [];
            expect(component.getTotalByCommande(404)).toBe(0);
        });
    });

    describe('downloadFacture', () => {
        it('génère un lien de téléchargement et le clique', () => {
            const fakeBase64 = btoa('pdf-content');
            const commande = { id: 1, facture: fakeBase64 } as any;
            const dummyAnchor = document.createElement('a');
            const clickSpy = vi.spyOn(dummyAnchor, 'click');
            vi.spyOn(document, 'createElement').mockReturnValue(dummyAnchor);
            component.downloadFacture(commande);
            expect(window.URL.createObjectURL).toHaveBeenCalled();
            expect(dummyAnchor.download).toBe('facture-1.pdf');
            expect(clickSpy).toHaveBeenCalledOnce();
            expect(window.URL.revokeObjectURL).toHaveBeenCalledWith('blob:http://localhost/fake-pdf-url');
        });

        it('ne fait rien si la facture est absente', () => {
            const commande = { id: 1, facture: null } as any;
            component.downloadFacture(commande);
            expect(window.URL.createObjectURL).not.toHaveBeenCalled();
        });
    });
});