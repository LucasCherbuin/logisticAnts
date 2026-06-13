import { TestBed, ComponentFixture } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { beforeEach, describe, vi, expect, it } from "vitest";
import { ShopComponent } from "../../component/client/shop.component";
import { ProduitService } from "../../services/produit.service";
import { RouterModule } from "@angular/router";
import { of } from "rxjs";

describe("ShopComponent", () => {
    let component: ShopComponent;
    let fixture: ComponentFixture<ShopComponent>;

    const mockProduitService = {
        getProduits: vi.fn(),
        searchProduits: vi.fn()
    };

    beforeEach(async () => {
        vi.clearAllMocks();
        mockProduitService.getProduits.mockReturnValue(of([]));

        await TestBed.configureTestingModule({
            imports: [ShopComponent, FormsModule, RouterModule.forRoot([])],
            providers: [
                { provide: ProduitService, useValue: mockProduitService }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(ShopComponent);
        component = fixture.componentInstance;
    });

    it('crée le composant', () => {
        expect(component).toBeTruthy();
    });

    it('charge les produits au démarrage', () => {
        const mockData = [
            { id: 1, nom: 'Assiette', prix: 10, quantiteStock: 20, perissable: false, datePeremption: null, dernierAjout: null, fournisseur: { nom: '', email: '', adresse: '' } }
        ];
        mockProduitService.getProduits.mockReturnValue(of(mockData));
        fixture.detectChanges();
        expect(mockProduitService.getProduits).toHaveBeenCalled();
        expect(component.produits).toEqual(mockData);
    });

    describe('onSearch()', () => {
        it('recharge tous les produits si la recherche est vide', () => {
            fixture.detectChanges();
            component.searchTerm = '   ';
            component.onSearch();
            expect(mockProduitService.getProduits).toHaveBeenCalledTimes(3);
        });

        it('appelle searchProduits avec le terme saisi', () => {
            const mockResults = [{ id: 2, nom: 'Verre', prix: 5 }];
            mockProduitService.searchProduits.mockReturnValue(of(mockResults));
            fixture.detectChanges();
            component.searchTerm = 'Verre';
            component.onSearch();
            expect(mockProduitService.searchProduits).toHaveBeenCalledWith('Verre');
            expect(component.produits).toEqual(mockResults);
        });
    });
});