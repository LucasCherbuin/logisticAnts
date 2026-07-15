import { TestBed, ComponentFixture } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { beforeEach, describe, vi, expect, it } from "vitest";
import { CardComponent } from "../../../component/client/card.component";
import { ProduitService } from "../../../services/produit.service";
import { ArticleCommandeService } from "../../../services/articleCommande.service";
import { RouterModule } from "@angular/router";
import { of } from "rxjs";
import { BehaviorSubject } from "rxjs";

describe("CardComponent", () => {
    let component: CardComponent;
    let fixture: ComponentFixture<CardComponent>;

    const mockProduitService = {
        getProduits: vi.fn(),
        searchProduits: vi.fn()
    };

    const cartSubject = new BehaviorSubject<any[]>([]);
    const mockArticleCommandeService = {
        cartItems$: cartSubject,
        addToCart: vi.fn()
    };

    beforeEach(async () => {
        vi.clearAllMocks();
        mockProduitService.getProduits.mockReturnValue(of([]));

        await TestBed.configureTestingModule({
            imports: [CardComponent, RouterModule.forRoot([])],
            providers: [
                { provide: ProduitService, useValue: mockProduitService },
                { provide: ArticleCommandeService, useValue: mockArticleCommandeService }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(CardComponent);
        component = fixture.componentInstance;
    });

    it('crée le composant', () => {
        expect(component).toBeTruthy();
    });

    it('charge les produits au démarrage', () => {
        const mockData = [
            { id: 1, nom: 'Assiette', prix: 10, quantiteStock: 20, perissable: false, datePeremption: null, dernierAjout: null, fournisseur: [] }
        ];
        mockProduitService.getProduits.mockReturnValue(of(mockData));

        fixture.detectChanges();

        expect(mockProduitService.getProduits).toHaveBeenCalledOnce();
        expect(component.produits).toEqual(mockData);
    });

    it('retourne le bon nombre d\'articles dans le panier', () => {
        cartSubject.next([{ produit: { id: 1 }, quantite: 2 }, { produit: { id: 2 }, quantite: 1 }]);
        fixture.detectChanges();

        expect(component.cartCount).toBe(2);
    });

    it('appelle addToCart avec le bon produit', () => {
        fixture.detectChanges();
        const produit = { id: 1, nom: 'Assiette', prix: 10 } as any;

        component.addToCart(produit);

        expect(mockArticleCommandeService.addToCart).toHaveBeenCalledWith(produit);
    });
});